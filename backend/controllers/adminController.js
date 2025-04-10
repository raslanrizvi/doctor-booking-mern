import validator from "validator"
import bcrypt from "bcrypt"
import { v2 as cloudinary} from 'cloudinary'

//API for adding Doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body
    const imageFile = req.file

    //Checking for all data to add doc
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address ||
      !imageFile
    ) {
      return res.json({ success: false, message: "Missing Details" })
    }

    //Validating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please Enter a Valid Email" })
    }

    //Validating Password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please Enter a Strong Password",
      })
    }

    
    //hashing doctor password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Upload image to cloudinary
    const imageUploadd = await 

  } catch (error) {}
}

export { addDoctor }
