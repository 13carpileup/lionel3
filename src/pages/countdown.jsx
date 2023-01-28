import { Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react';


export function Countdown() {
    const array=[1,23]
    const [days, setDays] = useState([]);
    const [hours, setHours] = useState([]);
    const [minutes, setMinutes] = useState([]);
    const [seconds, setSeconds] = useState([]);

    const deadline = ["January, 30, 2023, 8:30","March, 30, 2023, 10:30"];

    

    const getTime = () => {
      
      setDays([]);
      setHours([]);
      setMinutes([]);
      setSeconds([]);
      
      for (let i = 0; i < deadline.length; i++) {
        const time = Date.parse(deadline[i]) - Date.now();
        
        setDays(oldArray => [...oldArray, Math.floor(time / (1000 * 60 * 60 * 24))]);
        setHours(oldArray => [...oldArray,Math.floor((time / (1000 * 60 * 60)) % 24)]);
        setMinutes(oldArray => [...oldArray,Math.floor((time / 1000 / 60) % 60)]);
        setSeconds(oldArray => [...oldArray,Math.floor((time / 1000) % 60)]);
      }
    };


    useEffect(() => {
      const interval = setInterval(() => getTime(deadline), 1000);
      return () => clearInterval(interval);
    }, []);

    return (
        <div>
        <h2>Mock Countdown</h2>
        {/*<Link to="/schedule/1">Test</Link>*/}
        {deadline.map((x,i) =>
        <div>
        <div class="timer"></div>
        <div class="timer" role="timer">
     <ul>
      <li class="col-4">
        <div class="box">
          <p id="day">{(days[i] < 10 && days[i] >= 0) ? "0" + days[i] : days[i]}
          <span class="text"> Days</span></p>
        </div>
      </li>
      <li class="col-4">
        <div class="box">
          <p id="hour">{(hours[i] < 10 && hours[i] >= 0) ? "0" + hours[i] : hours[i]}
          <span class="text"> Hours</span></p>
        </div>
      </li>    
      <li class="col-4">
        <div class="box">
          <p id="minute">{(minutes[i] < 10 && minutes[i] >= 0) ? "0" + minutes[i] : minutes[i]}
          <span class="text"> Minutes</span></p>
        </div>
      </li>
      <li class="col-4">
        <div class="box">
          <p id="second">{(seconds[i] < 10 && minutes[i] >= 0) ? "0" + seconds[i] : seconds[i]}
          <span class="text"> Seconds</span></p>
        </div>
      </li>
      </ul>
    </div>
    </div>
        )}
        </div>
    )
}