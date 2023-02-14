import { Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react';


export function Countdown() {
    const array=[1,23]
    const [days, setDays] = useState([]);
    const [hours, setHours] = useState([]);
    const [minutes, setMinutes] = useState([]);
    const [seconds, setSeconds] = useState([]);

    const deadline = [
    ["April, 26, 2023, 8:30","Chinese 2nd Lang"],
    ["April, 28, 2023, 8:30","Chinese 2nd Lang"],
    ["May, 3, 2023, 8:30","English Lang"],
    ["May, 3, 2023, 8:30","Geography"],
    ["May, 5, 2023, 8:30","English Lang"],
    ["May, 11, 2023, 8:30","Chinese 1st Lang"],
    ["May, 12, 2023, 8:30","Computer Science"],
    ["May, 15, 2023, 8:30","Business"],
    ["May, 15, 2023, 8:30","Geography"],
    ["May, 15, 2023, 8:30","English World Literature"],
    ["May, 15, 2023, 8:30","Religious Studies"],
    ["May, 16, 2023, 8:30","Biology"],
    ["May, 17, 2023, 8:30","English World Literature"],
    ["May, 18, 2023, 8:30","Computer Science"],
    ["May, 18, 2023, 8:30","Chinese 1st Lang"],
    ["May, 18, 2023, 8:30","History"],
    ["May, 19, 2023, 8:30","Sports Studies"],
    ["May, 19, 2023, 8:30","Psychology"],
    ["May, 19, 2023, 8:30","Maths"],
    ["May, 22, 2023, 8:30","Business"],
    ["May, 22, 2023, 8:30","Chinese Foreign Lang"],
    ["May, 22, 2023, 8:30","Chemistry"],
    ["May, 23, 2023, 8:30","Music"],
    ["May, 23, 2023, 8:30","French"],
    ["May, 23, 2023, 8:30","Religious Studies"],
    ["May, 24, 2023, 8:30","Chinese Foreign Lang"],
    ["May, 24, 2023, 8:30","Economics"],
    ["May, 25, 2023, 8:30","Physics"],
    ["May, 26, 2023, 8:30","Drama"],
    ["May, 26, 2023, 8:30","Psychology"],
    ["May, 26, 2023, 8:30","Further Pure Maths"],
    ["May, 26, 2023, 8:30","German"],
    ["June, 6, 2023, 8:30","Spanish"],
    ["June, 7, 2023, 8:30","History"],
    ["June, 7, 2023, 8:30","Maths"],
    ["June, 8, 2023, 8:30","Further Pure Maths"],
    ["June, 14, 2023, 8:30","Economics"],
    ["June, 19, 2023, 8:30","DT"],
    ["June, 20, 2023, 8:30","Food Tech"]
    ];

    

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
      <>
        <div class="parallax">

        <h2>Mock Countdown</h2>
        
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
        </>
    )
}