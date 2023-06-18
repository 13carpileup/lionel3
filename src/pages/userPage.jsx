import { useParams } from "react-router-dom"



export function UserPage() {
    const {id} = useParams()
        let response = fetch('http://localhost:3001/user/' + id);    
  
    return (
        <p>{id}</p>
    )
}