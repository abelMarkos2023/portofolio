import { useState } from 'react'
import Dashboard from './pages/Dashboard/Dashboard'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

import {Routes,Route} from 'react-router-dom'
function App() {
  console.log(import.meta.env.VITE_FB_APIKEY)

  return (
    <>
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
      
    </>
  )
}

export default App
