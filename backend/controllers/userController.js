import validator from "validator"
import bcrypt from "bcrypt"
import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"
import { v2 as cloudinary } from "cloudinary"
import doctorModel from "../models/doctorModel.js"
import appointmentModel from "../models/appoitmentModel.js"
import Stripe from "stripe"

//
//
//API to Register User
const registerUser = async (req, res) => {
  try {
    //destructure the property
    const { name, email, password } = req.body

    //validating
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" })
    }

    //Validating Email Format
    if (!validator.isEmail(email)) {
      res.json({ success: false, message: "Enter Valid Email Address" })
    }

    //Validating Password
    if (password.length < 8) {
      res.json({
        success: false,
        message: "Enter a Strong Password Above 8 Characters",
      })
    }

    //Encrypt Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Storing register Details on userData Object
    const userData = {
      name,
      email,
      password: hashedPassword,
    }

    //Saving to db
    const newUser = new userModel(userData)
    const user = await newUser.save()

    //Generating Token for User
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.json({ success: true, token })

    //
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

//API for User Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })

    if (!user) {
      return res.json({ success: false, message: "User Does Not Exist" })
    }

    //checking if password is matching
    const isMatch = await bcrypt.compare(password, user.password)

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      res.json({ success: true, token })
    } else {
      res.json({ success: false, message: "Invalid Credentials" })
    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

//API to get user profile data
const getProfile = async (req, res) => {
  try {
    const userId = req.userId
    const userData = await userModel.findById(userId).select("-password")

    res.json({ success: true, userData })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "getProfile" + error.message })
  }
}

//API to update user profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.userId
    const { name, phone, address, dob, gender } = req.body
    const imageFile = req.file

    if (!name || !phone || !dob || !address || !gender) {
      return res.json({ success: false, message: "Details Missing" })
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    })

    if (imageFile) {
      //upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      })
      const imageURL = imageUpload.secure_url

      await userModel.findByIdAndUpdate(userId, { image: imageURL })
    }

    res.json({ success: true, message: "Profile Updated Successfully" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "update Profile : " + error.message })
  }
}

// API to Book Appointment
const bookAppointment = async (req, res) => {
  try {
    const userId = req.userId
    const { docId, slotDate, slotTime } = req.body

    //requesting Doc Data except password field
    const docData = await doctorModel.findById(docId).select("-password")

    //Checking for doc's availability
    if (!docData.availability) {
      return res.json({ success: false, message: "Doctor Not Available" })
    }

    //retrieving booked slots data
    let slots_booked = docData.slots_booked

    //checking if slot selected available
    //
    //checking if doc already has bookings on selected day
    if (slots_booked[slotDate]) {
      //checking if doc already has the selected time from on that day
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot Not Available" })
      } else {
        slots_booked[slotDate].push(slotTime)
      }
    }
    //if doc has no bookings recorded on the selected day then book day and time
    else {
      slots_booked[slotDate] = []
      slots_booked[slotDate].push(slotTime)
    }

    //retrieving user data
    const userData = await userModel.findById(userId).select("-password")

    delete docData.slots_booked

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    }

    //saving data to db
    const newAppointment = new appointmentModel(appointmentData)
    newAppointment.save()

    //saving new slots data in docData
    await doctorModel.findByIdAndUpdate(docId, { slots_booked })
    res.json({ success: true, message: "Appointment Booked" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

//API to get user Appointments to myAppointments Page
const listAppointment = async (req, res) => {
  try {
    const userId = req.userId
    const appointments = await appointmentModel.find({ userId })
    res.json({ success: true, appointments })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "List Appointment : " + error.message })
  }
}

//API to Cancel Appointment
const cancelAppointment = async (req, res) => {
  try {
    const userId = req.userId
    const { appointmentId } = req.body

    const appointmentData = await appointmentModel.findById(appointmentId)

    //verify appointment user
    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "unauthorized Action" })
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

    //releasing docSlot
    const { docId, slotDate, slotTime } = appointmentData

    const doctorData = await doctorModel.findById(docId)

    let slots_booked = doctorData.slots_booked

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    )

    await doctorModel.findByIdAndUpdate(docId, { slots_booked })

    res.json({ success: true, message: "Appointment Cancelled Successfully" })
  } catch (error) {
    console.log("Appointment Cancellation Failed" + error)
    res.json({
      success: false,
      message: "Appointment Cancellation Failed" + error,
    })
  }
}

//API to make payment for appointment via stripe
const stripe = new Stripe(process.env.STRIPE_SECRET)
const paymentStripe = async (req, res) => {
  try {
    const userId = req.userId
    const { appointmentId } = req.body

    const userData = await userModel.findById(userId)
    const appointmentData = await appointmentModel.findById(appointmentId)
    const doctorData = await doctorModel.findById(appointmentData.docId)

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment Cancelled or Not Found",
      })
    }

    //Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_SITE_URL}/my-appointments?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_SITE_URL}/my-appointments/`,
      customer_email: userData.email,
      client_reference_id: appointmentId,
      line_items: [
        {
          price_data: {
            currency: "lkr",
            unit_amount: appointmentData.amount * 100,
            product_data: {
              name: doctorData.name,
              description: doctorData.speciality,
              images: [doctorData.image],
            },
          },
          quantity: 1,
        },
      ],
    })

    res.status(200).json({
      success: true,
      message: "Paid Successfully",
      session,
    })
  } catch (error) {
    console.log("Appointment Payment Failed: " + error)
    res.status(500).json({
      success: false,
      message: "Appointment Payment Failed: " + error,
    })
  }
}

//verifying stripe payment
const verifyStripe = async (req, res) => {
  try {
    const { sessionId } = req.body

    if (!sessionId) {
      return res
        .status(400)
        .json({ success: false, message: "Session ID is required" })
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status === "paid") {
      // Payment is confirmed
      const appointmentId = session.client_reference_id
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        payment: true,
      })
      res.json({
        success: true,
        message: "Appointment Paid Successfully",
      })
    } else {
      res.json({ success: false, message: "Payment Failed" })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error verifying payment: " + error.message,
    })
  }
}

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentStripe,
  verifyStripe,
}
