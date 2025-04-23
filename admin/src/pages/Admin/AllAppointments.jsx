import React, { useContext, useEffect } from "react"
import { AdminContext } from "../../context/AdminContext"
import { AppContext } from "../../context/AppContext"
import { assets } from "../../assets/assets"

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currencySymbol } =
    useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-gray-100 border rounded-xl text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b '>
          <p className='m-auto'>#</p>
          <p className='m-auto'>Patient Name</p>
          <p className='m-auto'>Age</p>
          <p className='m-auto'>Date & Time</p>
          <p className='m-auto'>Doctor</p>
          <p className='m-auto'>Fees</p>
          <p className='m-auto'>Actions</p>
        </div>

        {appointments.map((item, index) => (
          <div
            className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-cardBg '
            key={index}
          >
            <p className='max-sm:hidden m-auto'>{index + 1}</p>
            {/* Patient Image and Name */}
            <div className='flex items-center justify-start gap-2 mx-auto'>
              <img
                className='w-8 rounded-full'
                src={item.userData.image}
                alt=''
              />{" "}
              <p>{item.userData.name}</p>
            </div>
            {/* Patient Age */}
            <p className='max-sm:hidden m-auto'>
              {calculateAge(item.userData.dob)}
            </p>
            {/* Appointment Date and Time */}
            <p className='m-auto'>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>
            {/* Doctor Image and Name */}
            <div className='flex items-center gap-2 w-fit'>
              <img
                className='w-8 rounded-full bg-gray-200'
                src={item.docData.image}
                alt=''
              />{" "}
              <p>{item.docData.name}</p>
            </div>
            {/* Appointment Fee */}
            <p className='m-auto'>
              {item.amount}
              {currencySymbol}
            </p>
            {/* Appointment Status and Action */}
            <div className='m-auto'>
              {item.cancelled ? (
                <p className='border-2 border-red-400 bg-red-50 px-2.5 mx-auto rounded-full text-sm ml-2'>
                  Cancelled
                </p>
              ) : item.payment ? (
                <p className='border-2 border-secondary bg-green-100 px-2.5 mx-auto rounded-full text-sm ml-2'>
                  Paid
                </p>
              ) : (
                <img
                  className='w-10 cursor-pointer'
                  src={assets.cancel_icon}
                  alt=''
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllAppointments
