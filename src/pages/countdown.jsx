import { Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react';


export function Countdown() {
    const [days, setDays] = useState([]);
    const [hours, setHours] = useState([]);
    const [minutes, setMinutes] = useState([]);
    const [seconds, setSeconds] = useState([]);
    const [time, setTime] = useState("i love catland central");
    const stor = [];
    const deadline = [
    ["June, 28, 2024, 13:00", "FREEDOM"],
    ["August, 14, 2024, 8:10", "no more freedom"],
    ["August, 20, 2024, 8:00", "EE Deadline"]
    ]

    useEffect(() => {
      fetch('http://localhost:3000/students/'+userID)
        .then(response => response.json())
        .then(json => 
          {
            setTime("3");
          }
        )
        .catch(error => console.error(error));
    }, []);
    
    for (let i = 0; i < deadline.length; i++) {
      const time = Date.parse(deadline[i][0])  - Date.now();
      if (time < 0) {
        stor.push(i);
      }
    }

    for (let i = stor.length-1; i >= 0  ; i--) {
      deadline.splice(stor[i],1);
    }

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
      getTime();
      const interval = setInterval(() => getTime(deadline), 1000);
      return () => clearInterval(interval);
    }, []);

    return (
      <div class="fade">
        <div class="parallax">

        <h2>Exam Countdown</h2>
        
        {/*<Link to="/schedule/1">Test</Link>*/}
        {deadline.map((x,i) =>
          <div class="cont">
            <hr/>
            <h3>{deadline[i][1]}</h3>
            <div class="timer" role="timer" id="container">
              <ul class = "timer">
                <li class="col-4">
                <div class="box">
                  <span class="num">{(days[i] < 10 && days[i] >= 0) ? "0" + days[i] : days[i]} Days</span>
                </div>
                </li>
                <li class="col-4">
                  <div class="box">
                    <span class="num">{(hours[i] < 10 && hours[i] >= 0) ? "0" + hours[i] : hours[i]} Hours</span>
                  </div>
                </li>    
                <li class="col-4">
                  <div class="box">
                    <span class="num">{(minutes[i] < 10 && minutes[i] >= 0) ? "0" + minutes[i] : minutes[i]} Minutes</span>
                  </div>
                </li>
                <li class="col-4">
                  <div class="box">
                    <span class="num">{(seconds[i] < 10 && minutes[i] >= 0) ? "0" + seconds[i] : seconds[i]} Seconds</span>
                  </div>
                </li>
              </ul>
            </div>      
          </div>
        )}
        <hr/>
        </div>
        </div>
        
    )
}