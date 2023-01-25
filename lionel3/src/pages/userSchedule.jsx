import { useParams } from "react-router-dom"

export function UserSchedule() {
    const {id} = useParams()
    return (
        <p>{id}</p>
    )
}