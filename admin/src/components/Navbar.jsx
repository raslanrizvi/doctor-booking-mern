import React, { useContext } from "react"
import { assets } from "../assets/assets"
import { AdminContext } from "../context/AdminContext"
import { useNavigate } from "react-router-dom"
import { DoctorContext } from "../context/DoctorContext"

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext)
  const { dToken, setDToken } = useContext(DoctorContext)
  const navigate = useNavigate()

  const logout = () => {
    navigate("/")
    aToken && setAToken("")
    aToken && localStorage.removeItem("aToken")
    dToken && setDToken("")
    dToken && localStorage.removeItem("dToken")
  }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-navFot text-white select-none'>
      <div className='flex items-center gap-2 text-sx'>
        <img
          draggable='false'
          className='w-36 cursor-pointer '
          src={assets.admin_logo}
          alt='Logo'
        />
        <p className='border px-2.5 rounded-full text-sm ml-2'>
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        onClick={logout}
        className='bg-cardBg text-gray-600 text-sm px-10 py-2 rounded-2xl font-medium hover:shadow-xl hover:bg-[#c1dfcd] hover:text-gray-800 transition-all duration-300'
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar
