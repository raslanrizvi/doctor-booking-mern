import React from "react"
import { assets } from "../assets/assets"
import { NavLink } from "react-router-dom"

const Footer = () => {
  return (
    <div className='bg-navFot rounded-t-[16px] text-white font-text select-none'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 px-20 py-20 mt-48 text-sm'>
        {/* ---- Left Section ---- */}
        <div>
          <img
            draggable='false'
            className='mb-5 w-40'
            src={assets.logo}
            alt=''
          />
          <p className='w-full md:w-2/3  leading-6'>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

        {/* ---- Center Section ---- */}
        <div>
          <p className='text-lg font-heading font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2'>
            <li>
              <NavLink to={"/"} onClick={() => scrollTo(0, 0)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to={"/doctors"} onClick={() => scrollTo(0, 0)}>
                Doctors
              </NavLink>
            </li>
            <li>
              <NavLink to={"/about"} onClick={() => scrollTo(0, 0)}>
                About US
              </NavLink>
            </li>
            <li>
              <NavLink to={"/contact"} onClick={() => scrollTo(0, 0)}>
                Contact
              </NavLink>{" "}
              Us
            </li>
            <li>
              <NavLink to={"/"} onClick={() => scrollTo(0, 0)}>
                Privacy Policy
              </NavLink>
            </li>
          </ul>
        </div>

        {/* ---- Right Section ---- */}
        <div className='text-wrap'>
          <p className='text-lg font-heading font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2'>
            <li>
              <a href='tel:+94115766942'>+94-11-576-6942</a>
            </li>
            <li>
              <a href='mailto:contact@medicey.lk'>contact@medicey.lk</a>
            </li>
          </ul>
        </div>
      </div>
      <div>
        {/* ---- Copyright Tag ---- */}
        <hr className='h-1 w-[80%] bg-[#05251b] border-0 mx-[auto] rounded-sm' />
        <p className='py-5 text-sm text-center font-headingTwo font-semibold'>
          Copyright © 2025 MediCey - All Right Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
