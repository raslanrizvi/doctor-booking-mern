import express from "express"
import {
  getProfile,
  loginUser,
  registerUser,
  updateProfile,
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

export default userRouter
