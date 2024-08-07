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
        <li><Link to="/countdown">Results Countdown</Link></li>
        </ul>
      </nav>

      <TransitionGroup component={null}>
        <CSSTransition class = "herehere" timeout={300} classNames='fade' key={location.key} unmountOnExit> 
          <Routes location={location}>
            <Route path="/" element={<Home/>}/>
            <Route path="/countdown" element={<Countdown/>}/>
            <Route path="/user/:userID" element={<UserPage/>}/>
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </>
  )
}

export default App
