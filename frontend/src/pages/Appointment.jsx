import React, { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import { useParams } from "react-router-dom"
import { assets } from "../assets/assets"
import RelatedDoctors from "../components/RelatedDoctors"

const appointment = () => {
  // assigning the parameters
  const { docId } = useParams()
  const { doctors, currencySymbol } = useContext(AppContext)
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

  //useState to set docInfo
  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState("")

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSlots = async () => {
    setDocSlots([])

    //getting current date
    let today = new Date()

    for (let i = 0; i < 7; i++) {
      //getting date with index
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      //setting end time of the date with index
      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      //setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        )
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })

        //add slot to array
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        })

        //increment current time by 30 mins
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }
      setDocSlots((prev) => [...prev, timeSlots])
    }
  }

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    getAvailableSlots()
  }, [docInfo])

  useEffect(() => {
    console.log(docSlots)
  }, [docSlots])

  return (
    docInfo && (
      <div className='select-none'>
        {/* ------------ Doctors Details ------------ */}
        <div className='flex flex-col sm:flex-row gap-4'>
          <div>
            <img
              draggable='false'
              className='bg-gradient-to-t from-[#61c072] to-[#016f26] w-full sm:max-w-72 rounded-xl'
              src={docInfo.image}
              alt=''
            />
          </div>

          <div className='flex-1 border border-[#047e3b]/20 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-88px] sm:mt-0'>
            {/* ------------ Doctors Basic Info ------------ */}
            <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
              {docInfo.name}{" "}
              <img
                draggable='false'
                className='w-5'
                src={assets.verified_icon}
                alt='verified icon'
              />
            </p>
            <div className='flex items-center gap-2 text-sm mt-1 text-gray-500 font-heading font-medium'>
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className='py-0.5 px-2 border-2 border-[#047e3b] text-xs rounded-full'>
                {docInfo.experience}
              </button>
            </div>
            {/* ------------ Doctors About Paragraph ------------ */}
            <div>
              <p className='flex items-center gap-1 text-sm font-semibold text-gray-900 mt-3 font-subHeading'>
                About <img draggable='false' src={assets.info_icon} alt='' />
              </p>
              <p className='text-sm text-gray-500 max-w-[700px] mt-1 font-text'>
                {docInfo.about}
              </p>
            </div>
            <p className='text-gray-500 font-heading font-medium mt-4'>
              Appointment Fee :{" "}
              <span className='text-gray-700'>
                {docInfo.fees}
                {currencySymbol}
              </span>
            </p>
          </div>
        </div>

        {/* ------------ BOOKING SLOTS ------------ */}
        <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
          <p>Booking Slots</p>
          <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4 py-3'>
            {docSlots.length &&
              docSlots.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === index
                      ? "bg-[#4a9e5a] text-white drop-shadow-[0_2px_1px_rgba(75,158,90,0.40)]"
                      : "bg-white border border-gray-300"
                  }`}
                >
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>

          <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
            {docSlots.length &&
              docSlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  className={`text-gray-600 text-base font-normal flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    item.time === slotTime
                      ? "bg-[#4a9e5a] text-white drop-shadow-[0_2px_1px_rgba(75,158,90,0.40)]"
                      : "bg-white border border-gray-400"
                  }`}
                  key={index}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>
          <button className='bg-[#047e3b] text-white text-xl font-medium px-24 py-6 rounded-full my-6 drop-shadow-[0_5px_4px_rgba(4,126,59,0.40)]'>
            Book an Appointment
          </button>
        </div>
        {/* Listing thr Related Doctors Components */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  )
}

export default appointment
