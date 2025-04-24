import React, { useContext, useState } from "react"
import { assets } from "../assets/assets.js"
import { AdminContext } from "../context/AdminContext.jsx"
import axios from "axios"
import { toast } from "react-toastify"
import { DoctorContext } from "../context/DoctorContext.jsx"

const login = () => {
  const [state, setState] = useState("Admin")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { setAToken, backendUrl } = useContext(AdminContext)
  const { setDToken } = useContext(DoctorContext)

  const onSubmitHandler = async (event) => {
    //preventing the form from Refreshing
    event.preventDefault()

    //Try Block for Admin/Doc login
    try {
      //checking if the state is Admin
      if (state === "Admin") {
        //if state is admin post to Admin Router
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        })

        //Checking for Admin Credentials
        if (data.success) {
          //store token on local storage
          localStorage.setItem("aToken", data.token)
          //set aToken state
          setAToken(data.token)
        } else {
          //Displaying Invalid Credentials message via Toast
          toast.error(data.message)
        }

        //If State is !== Admin then
      } else {
        const { data } = await axios.post(backendUrl + "/api/doctor/login", {
          email,
          password,
        })

        //Checking for Doctor Credentials
        if (data.success) {
          //store token on local storage
          localStorage.setItem("dToken", data.token)
          //set dToken state
          setDToken(data.token)
        } else {
          //Displaying Invalid Credentials message via Toast
          toast.error(data.message)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'>
          <span className='text-primary'> {state} </span> Login
        </p>
        <div className='w-full'>
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='border-2 border-[#DADADA] rounded w-full p-2 mt-1'
            type='email'
            required
          />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className='border-2 border-[#DADADA] rounded w-full p-2 mt-1'
            type='password'
            required
          />
        </div>
        <button className='bg-primary text-white w-full py-2 rounded-md text-base'>
          Login
        </button>
        {state === "Admin" ? (
          <p>
            Doctor Login?{" "}
            <span
              className='text-primary underline cursor-pointer'
              onClick={() => setState("Doctor")}
            >
              Click Here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{" "}
            <span
              className='text-primary underline cursor-pointer'
              onClick={() => setState("Admin")}
            >
              Click Here
            </span>
          </p>
        )}
      </div>
    </form>
  )
}

export default login
