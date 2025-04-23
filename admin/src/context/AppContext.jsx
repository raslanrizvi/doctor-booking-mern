import { createContext } from "react"

export const AppContext = createContext()

const AppContextProvider = (props) => {
  // Currency Symbol
  const currencySymbol = " LKR"

  // Calculate Age
  const calculateAge = (dob) => {
    const today = new Date()
    const birthDate = new Date(dob)

    //deference in year
    let age = today.getFullYear() - birthDate.getFullYear()
    return age
  }

  // Months Array for Formatting date
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

  // Date formatting function
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_")
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    )
  }

  const value = {
    calculateAge,
    slotDateFormat,
    currencySymbol,
  }
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  )
}

export default AppContextProvider
