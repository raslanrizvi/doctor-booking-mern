import React from "react"
import { assets } from "../assets/assets"

const About = () => {
  return (
    <div>
      {/* Page Heading */}
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>
          About <span className='text-[#086733] font-medium'>Us</span>
        </p>
      </div>

      {/* Image On Left */}
      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img
          className='w-full md:max-w-[360px]'
          src={assets.about_image}
          alt=''
        />
        {/* Texts On Left */}
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>
            Welcome to MediCey, your trusted partner in managing your healthcare
            needs conveniently and efficiently. At MediCey, we understand the
            challenges individuals face when it comes to scheduling doctor
            appointments and managing their health records.
          </p>
          <p>
            MediCey is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, MediCey is here to support you every step of the way.
          </p>
          <b className='text-[#086733]'>Our Vision</b>
          <p>
            Our vision at MediCey is to create a seamless healthcare experience
            for every user. We aim to bridge the gap between patients and
            healthcare providers, making it easier for you to access the care
            you need, when you need it.
          </p>
        </div>
      </div>
      {/* Section 2 */}
      <div>
        <p className='text-2xl my-4'>
          WHY <span className='text-[#086733] font-semibold'>CHOOSE US</span>
        </p>
      </div>
      <div className='flex flex-col md:flex-row mb-20'>
        <div className='text-[#047e3b] border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] rounded-t-xl md:rounded-tr-none md:rounded-l-xl group hover:bg-primary transition-all duration-300 hover:text-white'>
          <b>Efficiency:</b>
          <p className='text-gray-600 group-hover:text-white'>
            Streamlined appointment scheduling that fits into your busy
            lifestyle.
          </p>
        </div>
        <div className='text-[#047e3b] border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] group hover:bg-primary transition-all duration-300 hover:text-white'>
          <b>Convenience:</b>
          <p className='text-gray-600 group-hover:text-white'>
            Access to a network of trusted healthcare professionals in your
            area.
          </p>
        </div>
        <div className='text-[#047e3b] border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] rounded-b-xl md:rounded-bl-none md:rounded-r-xl group hover:bg-primary transition-all duration-300 hover:text-white'>
          <b>Personalization:</b>
          <p className='text-gray-600 group-hover:text-white'>
            Tailored recommendations and reminders to help you stay on top of
            your health.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
