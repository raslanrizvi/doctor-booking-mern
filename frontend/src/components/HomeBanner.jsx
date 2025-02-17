import React from "react"
import { assets } from "../assets/assets"

const HomeBanner = () => {
  return (
    <div className='flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10'>
      {/* ---- Left Side ---- */}
      <div>
        <div>
          <p>Book Appointment</p>
          <p>With 100+ Trusted Doctors</p>
        </div>
        <button>Create Account</button>
      </div>

      {/* ---- Right Side ---- */}
      <div>
        <img src={assets.appointment_img} alt='' />
      </div>
    </div>
  )
}

export default HomeBanner
