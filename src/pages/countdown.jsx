import { Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react';


export function Countdown() {
    const [days, setDays] = useState([]);
    const [hours, setHours] = useState([]);
    const [minutes, setMinutes] = useState([]);
    const [seconds, setSeconds] = useState([]);
    const stor = [];
    const deadline = [
    ["January, 1, 2023, 0:00","New Year's Day"],
    ["April, 21, 2023, 15:20","Study Leave"],
    ["April, 26, 2023, 13:00","Chinese 2nd Lang Writing/Reading"],
    ["April, 28, 2023, 12:15","Chinese 2nd Lang Listening"],
    ["May, 3, 2023, 8:30","Geography Themes"],
    ["May, 3, 2023, 11:00","English Lang P1"],
    ["May, 5, 2023, 11:00","English Lang P2"],
    ["May, 11, 2023, 9:00","Chinese 1st Lang Reading"],
    ["May, 12, 2023, 11:30","Computer Science P1"],
    ["May, 15, 2023, 8:30","Geography Skills"],
    ["May, 15, 2023, 10:45","Business P1"],
    ["May, 15, 2023, 13:00","English Lit Unseen"],
    ["May, 15, 2023, 15:30","PRS P1"],
    ["May, 16, 2023, 12:30","Biology"],
    ["May, 17, 2023, 11:30","English Lit SOW"],
    ["May, 18, 2023, 8:30","Chinese 1st Lang Writing"],
    ["May, 18, 2023, 11:00","Computer Science P2"],
    ["May, 18, 2023, 13:30","History Depth"],
    ["May, 19, 2023, 9:00","Sports Studies Theory"],
    ["May, 19, 2023, 12:30","Maths P1"],
    ["May, 19, 2023, 19:00","Psychology P1"],
    ["May, 22, 2023, 8:30","Business P2"],
    ["May, 22, 2023, 10:45","Chinese Foreign Lang Listening/Writing"],
    ["May, 22, 2023, 13:30","Chemistry"],
    ["May, 23, 2023, 9:00","Music Listening"],
    ["May, 23, 2023, 12:30","French"],
    ["May, 23, 2023, 19:00","PRS P2"],
    ["May, 24, 2023, 13:00","Chinese Foreign Lang Reading"],
    ["May, 24, 2023, 15:30","Economics P1"],
    ["May, 25, 2023, 12:30","Physics"],
    ["May, 26, 2023, 9:00","Drama"],
    ["May, 26, 2023, 12:30","German"],
    ["May, 26, 2023, 16:30","FPM P1"],
    ["May, 26, 2023, 19:30","Psychology P1"],
    ["June, 6, 2023, 13:00","Spanish"],
    ["June, 7, 2023, 12:30","Maths P2"],
    ["June, 7, 2023, 8:30","History Breadth"],
    ["June, 8, 2023, 8:30","FPM P2"],
    ["June, 9, 2023, 15:30","Biology Triple"],
    ["June, 13, 2023, 13:30","Chemistry Triple"],
    ["June, 14, 2023, 15:30","Economics P2"],
    ["June, 16, 2023, 12:30","Physics Triple"],
    ["June, 19, 2023, 15:00","DT"],
    ["June, 20, 2023, 15:15","Food Tech"],
    ["August, 16, 2023, 13:00", "Cambridge Results"],
    ["August, 24, 2023, 15:30", "Pearson/AQA Results"]
    ];
    
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