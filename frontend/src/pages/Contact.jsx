import React from "react"
import { assets } from "../assets/assets"

const Contact = () => {
  return (
    <div>
      {/* Page Heading */}
      <div>
        <p className='text-center text-3xl pt-10 text-gray-500 uppercase'>
          Contact <span className='text-[#096733]'>US</span>
        </p>
      </div>
      {/* Image on Left */}
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img
          className='w-full md:max-w-[360px]'
          src={assets.contact_image}
          alt=''
        />
        {/* Text On Right */}
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-lg text-gray-600'>Our Office</p>
          <p className='text-gray-500'>
            54709 Willms Station <br /> Suite 350, Washington, USA
          </p>
          <div>
            <a className='text-gray-500' href='tel:+94115766942'>
              Tel: +94 11 576 6942
            </a>
            <br />
            <a className='text-gray-500' href='mailto:contact@medicey.lk'>
              Email: contact@medicey.lk
            </a>
          </div>
          <p className='font-semibold text-lg text-[#096733]'>
            Careers at MediCey
          </p>
          <p className='text-gray-500'>
            Learn more about our teams and job openings.
          </p>
          <button className='border-2 border-[#047e3b] px-4 py-2 rounded-xl text-[#047e3b] hover:text-white hover:bg-secondary transition-all duration-500'>
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  )
}

export default Contact
