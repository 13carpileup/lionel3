import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import {Home} from "./pages/home"
import { Schedule } from './pages/schedule'
import { UserSchedule } from './pages/userSchedule'

function App() {
  return (
    <>
    <nav>
      <ul>
      <li><Link to="/">Lionel 3</Link></li>
      <li><Link to="/schedule">Schedules</Link></li>
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
