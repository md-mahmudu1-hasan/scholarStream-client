import React from 'react'
import { Outlet } from 'react-router'
import Footer from '../Pages/Footer/Footer'
import Navber from '../Pages/Navber/Navber'

const Mainmother = () => {
  return (
    <div className='bg-gray-200 min-h-screen flex flex-col'>
        <Navber></Navber>
        <div className='flex-1'>
        <Outlet></Outlet>
        </div>
        <Footer></Footer>
    </div>
  )
}

export default Mainmother