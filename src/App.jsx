import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import {Home} from "./pages/home"
import { Countdown } from './pages/countdown'
import { UserPage } from './pages/userPage'
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
    <Analytics />
    <nav>
      <ul>
      <li><Link to="/">Lionel 3</Link></li>
      <li><Link to="/countdown">Exam Countdown</Link></li>
      </ul>
    </nav>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/countdown" element={<Countdown/>}/>
      <Route path="/user/:id" element={<UserPage/>}/>
    </Routes>
    </>
  )
}

export default App
