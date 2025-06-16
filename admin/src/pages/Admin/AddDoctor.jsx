import React, { useContext, useState } from "react"
import { assets } from "../../assets/assets"
import { AdminContext } from "../../context/AdminContext"
import { toast } from "react-toastify"
import axios from "axios"

const AddDoctor = () => {
  //useStates
  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [experience, setExperience] = useState("1 Year")
  const [fees, setFees] = useState("")
  const [about, setAbout] = useState("")
  const [speciality, setSpeciality] = useState("General Physician")
  const [degree, setDegree] = useState("MBBS")
  const [address1, setAddress1] = useState("")
  const [address2, setAddress2] = useState("")

  const { backendUrl, aToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (!docImg) {
        return toast.error("Image Not Selected")
      }

      const formData = new FormData()

      formData.append("image", docImg)
      formData.append("name", name)
      formData.append("email", email)
      formData.append("password", password)
      formData.append("experience", experience)
      formData.append("fees", Number(fees))
      formData.append("speciality", speciality)
      formData.append("degree", degree)
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      )
      formData.append("about", about)

      //console Log formData
      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`)
      })

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } }
      )

      if (data.success) {
        toast.success(data.message)
        setDocImg(false)
        setName("")
        setEmail("")
        setPassword("")
        setExperience("1 Year")
        setFees("")
        setSpeciality("General Physician")
        setDegree("MBBS")
        setAddress1("")
        setAddress2("")
        setAbout("")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error)
      console.log(error)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium'>Add Doctor</p>

      <div className='bg-white px-8 py-8 border rounded-lg w-full max-w-4xl max-h-[80vh] overflow-x-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor='doc-img'>
            <img
              className='w-16 bg-gray-100 rounded-full cursor-pointer'
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=''
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type='file'
            id='doc-img'
            hidden
          />
          <p>
            Upload Doctor <br /> Picture
          </p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className='border rounded-md px-3 py-2 border-[#c1c1c1]'
                type='text'
                placeholder='Jon Doe'
                required
              />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className='border rounded-md px-3 py-2 border-[#c1c1c1]'
                type='text'
                placeholder='doc@mail.lk'
                required
              />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className='border rounded-md px-3 py-2 border-[#c1c1c1]'
                type='password'
                placeholder='Enter Strong Password'
                required
              />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Experience</p>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className='border rounded-md px-3 py-2 border-[#c1c1c1]'
                name=''
                id=''
              >
                <option value='1 Year'>1 Year</option>
                <option value='2 Years'>2 Years</option>
                <option value='3 Years'>3 Years</option>
                <option value='4 Years'>4 Years</option>
                <option value='5 Years'>5 Years</option>
                <option value='6 Years'>6 Years</option>
                <option value='7 Years'>7 Years</option>
                <option value='8 Years'>8 Years</option>
                <option value='9 Years'>9 Years</option>
                <option value='10 Years'>10 Years</option>
              </select>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Fees</p>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                className='border rounded-md px-3 py-2 border-[#c1c1c1]'
                type='number'
                placeholder='1950.00'
                required
              />
            </div>
          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Speciality</p>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className='border rounded-md px-3 py-2 border-[#c1c1c1]'
                name=''
                id=''
                required
              >
                <option value='General Physician'>General Physician</option>
                <option value='Gynecologist'>Gynecologist</option>
                <option value='Dermatologist'>Dermatologist</option>
                <option value='Pediatricians'>Pediatricians</option>
                <option value='Neurologist'>Neurologist</option>
                <option value='Gastroenterologist'>Gastroenterologist</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Degree Type</p>
              <select
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                className='border rounded-md px-3 py-2 border-[#c1c1c1]'
                name=''
                id=''
                required
              >
                <option value='MBBS'>MBBS</option>
                <option value='MMed'>MMed</option>
                <option value='MMSc'>MMSc</option>
                <option value='MPH'>MPH</option>
                <option value='PhD'>PhD</option>
                <option value='BDS'>BDS</option>
                <option value='MDS'>MDS</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Address</p>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                className='border rounded-md px-3 py-2 border-[#c1c1c1]'
                type='text'
                placeholder='Address 1'
                required
              />
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                className='border rounded-md px-3 py-2 border-[#c1c1c1]'
                type='text'
                placeholder='Address 2'
                required
              />
            </div>
          </div>
        </div>

        <div className='flex-1 flex flex-col gap-1'>
          <p className='mt-4 mb-2'>About Doctor</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className='w-full border rounded-md px-4 pt-2 border-[#c1c1c1]'
            placeholder='Write a about to doctor'
            rows={5}
            required
          />
        </div>
        <button className='bg-navFot px-10 py-3 mt-4 text-white rounded-full'>
          Add Doctor
        </button>
      </div>
    </form>
  )
}

export default AddDoctor
