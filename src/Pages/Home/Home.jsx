import React from 'react'
import useAuth from '../../Hooks/useAuth'

const Home = () => {
  const {user} = useAuth()
  return (
    <div className='bg-gray-200 mt-17'>{user?.displayName}</div>
  )
}

export default Home