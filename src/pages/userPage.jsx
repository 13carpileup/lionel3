import { useParams } from "react-router-dom"
import React, {useEffect, useState} from 'react';
import ReactHtmlParser from 'react-html-parser';

export function UserPage() {
  const {userID} = useParams()

  const [ID, setID] = useState(null);
  const [name, setName] = useState("Name Fetch Failed");
  const [subjects,setSubjects] = useState([]);
  const [year, setYear] = useState(null);
  const [timetable, setTimetable] = useState([[]]);
  const [homework, setHomework] = useState([]);


  useEffect(() => {
    fetch('https://lionel45.shuttleapp.rs/students/'+userID)
      .then(response => response.json())
      .then(json => 
        {
          setID(json.id);
          setName(json.name);
          setSubjects(json.subjects);
          setYear(json.year);
        }
      )
      .catch(error => console.error(error));

    fetch('https://lionel45.shuttleapp.rs/students/timetable/'+userID)
    .then(response => response.json())
    .then(json => 
      {
        setTimetable(json);
      }
    )
    .catch(error => console.error(error));

    fetch('https://lionel45.shuttleapp.rs/students/homework/'+userID)
    .then(response => response.json())
    .then(json => 
      {
        setHomework(json);
      }
    )
    .catch(error => console.error(error));
  }, []);

  return (
    <div>
      {ID ? 
        <>
          <h4 class = "name">{name}</h4>
          <p class = "subheading">Classes: (debugging)</p>
          {
            subjects.map((subject, i) =>
              <>
              <ul>
                <li class = "subjectList">
                  {subject}
                </li>
              </ul>
              </>
            )
          }


          <div class = "timetable">
            {
              timetable.map((day, i) =>
                <div class = "period">
                  <p>Day {i + 1}</p>
                  <ul class = "timetable_list">
                  {day.map((period, j) => 
                    <>
                      <li class = "timetable_period">
                      {period.subject}
                      </li>
                    </>
                  )}
                  </ul>

                </div>
            
            ) 
            }
          </div>

          <div class = "homework"> 
          
          {
            homework.map((entry, i) =>
            <>
              <h4>Homework Entry:</h4>
              {ReactHtmlParser(entry.text)}
            </>
          )
          }
          
          </div>
        </>

      : <p>'Loading...'</p>}
    </div>
  );
}