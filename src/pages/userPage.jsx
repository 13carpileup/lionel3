import { useParams } from "react-router-dom"
import React, {useEffect, useState} from 'react';


export function UserPage() {
    const {id} = useParams()

    const [ids, setIds] = useState("432");
    const [loading,setLoading] = useState(true);

    const getStudentData = async () => {
        const response = await fetch('http://localhost:3000/students/9668', {
            method: 'GET',
            headers: {
              "Access-Control-Allow-Origin": "*",
            }
        })
        .then(response => {setIds(response.json().id)})
        .catch(error => {
            console.log(error);
        })
        .finally(
            setLoading(false)
        )
    }

    useEffect(() => {
        getStudentData();
      }, [])
  
    return (
        <>
        <p>{id}</p>
        
        {
            loading ? (
                <p>Loading...</p>
            ) : (
                <p>{ids}</p>
            )
        }

        {ids}

        </>
    )
}