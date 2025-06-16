import React, { useContext, useEffect } from "react"
import { AdminContext } from "../../context/AdminContext"
import { assets } from "../../assets/assets"
import { AppContext } from "../../context/AppContext"

const Dashboard = () => {
  const { aToken, getDashData, dashData, cancelAppointment } =
    useContext(AdminContext)

  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return (
    dashData && (
      <div className='m-5'>
        <div className='flex flex-wrap gap-3'>
          {/* Doctors Stats */}
          <div className='flex items-center gap-2 bg-[#d1ecdc] p-4 min-w-52 rounded-xl border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
            <img className='w-14' src={assets.doctor_icon} alt='doctor-icon' />
            <div>
              <p className='text-xl font-semibold text-gray-600'>
                {dashData.doctors}
              </p>
              <p className='text-gray-500'>Doctors</p>
            </div>
          </div>

          {/* Appointment Stats */}
          <div className='flex items-center gap-2 bg-[#d1ecdc] p-4 min-w-52 rounded-xl border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
            <img
              className='w-14'
              src={assets.appointments_icon}
              alt='doctor-icon'
            />
            <div>
              <p className='text-xl font-semibold text-gray-600'>
                {dashData.appointments}
              </p>
              <p className='text-gray-500'>Appointments</p>
            </div>
          </div>

          {/* Patient Stats */}
          <div className='flex items-center gap-2 bg-[#d1ecdc] p-4 min-w-52 rounded-xl border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
            <img
              className='w-14'
              src={assets.patients_icon}
              alt='doctor-icon'
            />
            <div>
              <p className='text-xl font-semibold text-gray-600'>
                {dashData.patients}
              </p>
              <p className='text-gray-500'>Patients</p>
            </div>
          </div>
        </div>

        {/* latest Appointments Table List */}
        <div className='bg-[#d1ecdc] rounded-xl'>
          <div className='flex items-center gap-2.5 px-4 py-3 mt-10 border-b-2 border-gray-300'>
            <img src={assets.list_icon} alt='list-icon' />
            <p className='font-semibold'>Latest Bookings</p>
          </div>

          <div className='pt-4 border border-t-0 rounded-b-xl'>
            {dashData.latestAppointments.map((item, index) => (
              <div
                className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100'
                key={index}
              >
                <img
                  className='rounded-full w-10'
                  src={item.docData.image}
                  alt=''
                />
                <div className='flex-1 text-sm'>
                  <p className='text-gray-800 font-medium'>
                    {item.docData.name}
                  </p>
                  <p className='text-gray-600'>
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>
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
                    onClick={() => cancelAppointment(item._id)}
                    className='w-10 cursor-pointer'
                    src={assets.cancel_icon}
                    alt=''
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  )
}

export default Dashboard
