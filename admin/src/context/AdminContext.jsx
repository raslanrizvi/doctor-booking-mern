import { createContext, useState } from "react"

export const AdminContext = createContext()

const AdminContextProvider = (props) => {
  //state to remember aToken
  const [aToken, setAToken] = useState(
    //useState checks for aToken in Local Storage
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  )

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const value = {
    aToken,
    setAToken,
    backendUrl,
  }
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  )
}

export default AdminContextProvider
