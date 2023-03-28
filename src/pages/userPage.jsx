import { useParams } from "react-router-dom"

export function UserPage() {
    const {id} = useParams()
    return (
        <p>{id}</p>
    )
}