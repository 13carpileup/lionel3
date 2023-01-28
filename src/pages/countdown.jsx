import { Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react';


export function Countdown() {
    const array=[1,23]
    const [days, setDays] = useState([]);
    const [hours, setHours] = useState([]);
    const [minutes, setMinutes] = useState([]);
    const [seconds, setSeconds] = useState([]);

    const deadline = [["January, 30, 2023, 8:30","Math P1"],["January, 30, 2023, 11:30","PRS P1"],["January, 31, 2023, 8:30","Euro Listening"],["January, 31, 2023, 11:30","Econ/Business"],["February, 2, 2023, 8:30", "English P2"],["February, 2, 2023, 11:15","DT/Comp sci P1"],["February, 3, 2023, 8:30","Biology"],["February, 3, 2023, 11:30","Chinese Reading/Writing"],["February, 6, 2023, 8:30", "Sound Of Fucking Waves"],["February, 6, 2023, 11:30","Chemistry"],["February, 7, 2023, 8:30","Euro Reading/Writing"],["February, 7, 2023, 11:15","Math P2"],["February, 9, 2023, 8:30","Chinese Writing/Listening"],["February, 9, 2023, 11:30","PRS P2"],["February, 10, 2023, 8:30","Physics"],["February, 10, 2023, 11:30","Comp sci P2"],["February, 10, 2023, 14:00","FPM"]];

    

    const getTime = () => {
      
      setDays([]);
      setHours([]);
      setMinutes([]);
      setSeconds([]);
      
      for (let i = 0; i < deadline.length; i++) {
        const time = Date.parse(deadline[i][0]) - Date.now();
        
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
        <h3>{deadline[i][1]}</h3>
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