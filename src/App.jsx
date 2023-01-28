import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import {Home} from "./pages/home"
import { Countdown } from './pages/countdown'
import { UserSchedule } from './pages/userSchedule'
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
    <Analytics />
    <nav>
      <ul>
      <li><Link to="/">Lionel 3</Link></li>
      <li><Link to="/countdown">Mock Countdown</Link></li>
      </ul>
    </nav>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/countdown" element={<Countdown/>}/>
      <Route path="/countdown:id" element={<UserSchedule/>}/>
    </Routes>
    </>
  )
}

export default App
