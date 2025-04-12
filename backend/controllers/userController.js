import validator from "validator"
import bcrypt from "bcrypt"
import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"

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
export { registerUser }
