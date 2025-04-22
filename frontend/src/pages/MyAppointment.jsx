import React, { act, useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import axios from "axios"
import { toast } from "react-toastify"

const MyAppointment = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)

  const [appointments, setAppointments] = useState([])
  const months = [
    "",
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ]

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_")
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    )
  }

  const getUserAppointment = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      })
      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments)
      }
    } catch (error) {
      console.log(error)
      toast.error(error)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      )
      if (data.success) {
        toast.success(data.message)
        getUserAppointment()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {}
  }

  const appointmentStripe = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-stripe",
        { appointmentId },
        { headers: { token } }
      )
      if (data.session.url) {
        window.location.href = data.session.url
        //console.log(data.session)
      }

      if (!data.success) {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointment()
    }
  }, [token])

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>
        My Appointments
      </p>
      <div>
        {appointments.slice(0, 4).map((item, index) => (
          <div
            className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b'
            key={index}
          >
            <div>
              <img
                className='w-32 bg-[#e0f1e7] rounded-md'
                src={item.docData.image}
                alt=''
              />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>
                {item.docData.name}
              </p>
              <p>{item.docData.speciality}</p>
              <p className='text-zinc-700 font-medium mt-1'>Address</p>
              <p className='text-sm'>{item.docData.address.line1}</p>
              <p className='text-sm'>{item.docData.address.line2}</p>
              <p className='text-sm mt-1'>
                <span className='text-sm text-neutral-700 font-medium'>
                  Date & Time:
                </span>
                {" " + slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>
            <div></div>
            <div className='flex flex-col gap-2 justify-end font-medium'>
              {!item.cancelled && !item.payment && (
                <button
                  onClick={() => appointmentStripe(item._id)}
                  className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border-2 border-navFot rounded-lg hover:bg-navFot hover:text-white hover:shadow-md transition-all duration-300'
                >
                  Pay Now
                </button>
              )}
              {item.payment && (
                <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border-2 border-cardBg bg-cardBg rounded-lg'>
                  Paid
                </button>
              )}
              {!item.payment && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  disabled={item.cancelled}
                  className={`text-sm text-center sm:min-w-48 py-2 border-2 rounded-lg
                  ${
                    item.cancelled
                      ? `bg-red-300 border-red-300 text-gray-600`
                      : `text-stone-500 border-navFot hover:bg-red-600 hover:text-white hover:border-red-600 hover:shadow-md transition-all duration-300`
                  }`}
                >
                  {item.cancelled
                    ? "Appointment Cancelled"
                    : "Cancel Appointment"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointment
