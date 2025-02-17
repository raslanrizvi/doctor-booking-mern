import React from "react"
import Header from "../components/Header"
import Speciality from "../components/Speciality"
import TopDoctors from "../components/TopDoctors"
import HomeBanner from "../components/HomeBanner"

const Home = () => {
  return (
    <div>
      <Header />
      <Speciality />
      <TopDoctors />
      <HomeBanner />
    </div>
  )
}

export default Home
