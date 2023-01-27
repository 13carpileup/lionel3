import { Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react';


export function Countdown() {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const deadline = "January, 30, 2023, 8:30";

    const getTime = () => {
        const time = Date.parse(deadline) - Date.now();

        setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
  };

    useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);

    return () => clearInterval(interval);
  }, []);
    return (
        <div>
        <h2>Mock Countdown</h2>
        {/*<Link to="/schedule/1">Test</Link>*/}
        <div class="timer"></div>
        <div class="timer" role="timer">
     <ul>
      <li class="col-4">
        <div class="box">
          <p id="day">{(days < 10 && days >= 0) ? "0" + days : days}
          <span class="text"> Days</span></p>
        </div>
      </li>
      <li class="col-4">
        <div class="box">
          <p id="hour">{(hours < 10 && hours >= 0) ? "0" + hours : hours}
          <span class="text"> Hours</span></p>
        </div>
      </li>    
      <li class="col-4">
        <div class="box">
          <p id="minute">{(minutes < 10 && minutes >= 0) ? "0" + minutes : minutes}
          <span class="text"> Minutes</span></p>
        </div>
      </li>
      <li class="col-4">
        <div class="box">
          <p id="second">{(seconds < 10 && minutes >= 0) ? "0" + seconds : seconds}
          <span class="text"> Seconds</span></p>
        </div>
      </li>
      </ul>
    </div>
        </div>
    )
}