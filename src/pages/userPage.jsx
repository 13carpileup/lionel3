import { useParams } from "react-router-dom"
import React, {useEffect, useState} from 'react';


export function UserPage() {
  const {userID} = useParams()

  const [ID, setID] = useState(null);
  const [name, setName] = useState("Name Fetch Failed");
  const [subjects,setSubjects] = useState([]);
  const [year, setYear] = useState(null);


  useEffect(() => {
    fetch('http://localhost:3000/students/'+userID)
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
  }, []);

  return (
    <div>
      {ID ? 
        <>
          <h4 class = "name">{name}</h4>
          <p>{ID}</p>
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
        </>

      : <p>'Loading...'</p>}
    </div>
  );
}