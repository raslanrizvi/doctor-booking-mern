import jwt from "jsonwebtoken"

//doctor authentication middleware
const authDoctor = async (req, res, next) => {
  try {
    //Verify the doctor token
    const { dtoken } = req.headers
    if (!dtoken) {
      return res.json({ success: false, message: "Not Authorized Login" })
    }
    //decoding the token received
    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET)
    req.docId = token_decode.id
    next()
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "userAuth " + error.message })
  }
}

export default authDoctor
