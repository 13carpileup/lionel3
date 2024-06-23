import { useParams } from "react-router-dom"
import React, {useEffect, useState} from 'react';


export function UserPage() {
    const {id} = useParams()

    const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/students/9668')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
    </div>
  );
}