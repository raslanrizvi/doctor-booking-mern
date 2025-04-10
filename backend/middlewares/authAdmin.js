import jwt from "jsonwebtoken"

//admin authentication middleware
const authAdmin = async (req, res, next) => {
  try {
    //Verify the Admin token
    const { atoken } = req.headers
    if (!atoken) {
      return res.json({ success: false, message: "Not Authorized Login" })
    }
    //decodeing the token received
    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)

    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: "Not Authorized Login" })
    }

    next()
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

export default authAdmin
