import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AppContext } from "../context/AppContext"

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFitlerDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()

  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFitlerDoc(doctors.filter((doc) => doc.speciality === speciality))
    } else {
      setFitlerDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div>
      <p className='text-grey-600 text-xl'>
        Browse through the doctors specialist.
      </p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button
          className={`py-1 px-3 border-2 border-navFot rounded-lg text-sm font-medium transition-all sm:hidden ${
            showFilter ? "bg-navFot text-white shadow-md" : ""
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Show Filters
        </button>
        <div
          className={`flex-col gap-4 text-sm yext-gray-600 ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          <p
            onClick={() =>
              speciality === "General Physician"
                ? navigate("/doctors")
                : navigate("/doctors/General Physician")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-[#047e3b]/20 rounded-lg transition-all cursor-pointer text-grey-600 text-base font-normal ${
              speciality === "General Physician"
                ? "bg-[#e7f8ea] text-grey-700"
                : ""
            }`}
          >
            General Physician
          </p>
          <p
            onClick={() =>
              speciality === "Gynecologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gynecologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-[#047e3b]/20 rounded-lg transition-all cursor-pointer text-grey-600 text-base font-normal ${
              speciality === "Gynecologist" ? "bg-[#e7f8ea] text-grey-700" : ""
            }`}
          >
            Gynecologist
          </p>
          <p
            onClick={() =>
              speciality === "Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-[#047e3b]/20 rounded-lg transition-all cursor-pointer text-grey-600 text-base font-normal ${
              speciality === "Dermatologist" ? "bg-[#e7f8ea] text-grey-700" : ""
            }`}
          >
            Dermatologist
          </p>
          <p
            onClick={() =>
              speciality === "Pediatricians"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatricians")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-[#047e3b]/20 rounded-lg transition-all cursor-pointer text-grey-600 text-base font-normal ${
              speciality === "Pediatricians" ? "bg-[#e7f8ea] text-grey-700" : ""
            }`}
          >
            Pediatricians
          </p>
          <p
            onClick={() =>
              speciality === "Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-[#047e3b]/20 rounded-lg transition-all cursor-pointer text-grey-600 text-base font-normal ${
              speciality === "Neurologist" ? "bg-[#e7f8ea] text-grey-700" : ""
            }`}
          >
            Neurologist
          </p>
          <p
            onClick={() =>
              speciality === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gastroenterologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-[#047e3b]/20 rounded-lg transition-all cursor-pointer text-grey-600 text-base font-normal ${
              speciality === "Gastroenterologist"
                ? "bg-[#e7f8ea] text-grey-700"
                : ""
            }`}
          >
            Gastroenterologist
          </p>
        </div>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {filterDoc.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              className='border border-blue rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
              key={index}
            >
              <img className='bg-cardBg' src={item.image} alt='' />
              <div className='p-4'>
                <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                  <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                  <p>Available</p>
                </div>
                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                <p className='text-gray-600 text-sm'>{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors
