import jwt from "jsonwebtoken"

//doctor authentication middleware
const authDoctor = async (req, res, next) => {
  try {
    //Verify the doctor token
    const { dToken } = req.headers
    if (!dToken) {
      return res.json({ success: false, message: "Not Authorized Login" })
    }
    //decoding the token received
    const token_decode = jwt.verify(dToken, process.env.JWT_SECRET)
    req.docId = token_decode.id
    next()
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "userAuth " + error.message })
  }
}

export default authDoctor
