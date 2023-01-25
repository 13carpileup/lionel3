import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Routes, Route, Link } from 'react-router-dom'
import {Home} from "./pages/home"
import { Schedule } from './pages/schedule'
import { UserSchedule } from './pages/userSchedule'

function App() {
  return (
    <>
    <nav>
      <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/schedule">schedules</Link></li>
      </ul>
    </nav>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/schedule" element={<Schedule/>}/>
      <Route path="/schedule:id" element={<UserSchedule/>}/>
    </Routes>
    </>
  )
}

export default App
