import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import {Home} from "./pages/home"
import { Countdown } from './pages/countdown'
import { UserPage } from './pages/userPage'
import { Analytics } from '@vercel/analytics/react'
import { useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group"
import "../styles.css"



function App() {
  const location = useLocation();
  return (
    <>
      
      <Analytics />
      <nav>
        <ul>
        <li><Link to="/">Lionel 3</Link></li>
        <li><Link to="/countdown">Exam Countdown</Link></li>
        </ul>
      </nav>

      <TransitionGroup component={null}>
        <CSSTransition timeout={3000} classNames='fade' key={location.key} unmountOnExit> 
          <Routes location={location}>
            <Route path="/" element={<Home/>}/>
            
            <Route path="/countdown" element={<Countdown/>}/>
            <Route path="/user/:id" element={<UserPage/>}/>
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </>
  )
}

export default App
