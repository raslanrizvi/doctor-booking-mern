import express from "express"
import {
  getProfile,
  loginUser,
  registerUser,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentStripe,
  verifyStripe,
} from "../controllers/userController.js"
import authUser from "../middlewares/authUser.js"
import upload from "../middlewares/multer.js"

const userRouter = express.Router()

//Authentication Route
userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)

//profile route
userRouter.get("/get-profile", authUser, getProfile)
userRouter.post(
  "/update-profile",
  upload.single("image"),
  authUser,
  updateProfile
)
userRouter.post("/book-appointment", authUser, bookAppointment)
userRouter.get("/appointments", authUser, listAppointment)
userRouter.post("/cancel-appointment", authUser, cancelAppointment)
userRouter.post("/payment-stripe", authUser, paymentStripe)
userRouter.post("/verify-stripe", authUser, verifyStripe)

export default userRouter
