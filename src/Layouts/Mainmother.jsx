import React from 'react'
import { Outlet } from 'react-router'
import Footer from '../Pages/Footer/Footer'
import Navber from '../Pages/Navber/Navber'

const Mainmother = () => {
  return (
    <div>
        <Navber></Navber>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default Mainmother