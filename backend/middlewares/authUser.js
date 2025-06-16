import jwt from "jsonwebtoken"

//user authentication middleware
const authUser = async (req, res, next) => {
  try {
    //Verify the User token
    const { token } = req.headers
    if (!token) {
      return res.json({ success: false, message: "Not Authorized Login" })
    }
    //decoding the token received
    const token_decode = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = token_decode.id
    next()
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "userAuth " + error.message })
  }
}

export default authUser
