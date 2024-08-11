import FlightRegistrationForm from "../components/RegisterFlightLog";
import { useDispatch, useSelector } from 'react-redux'

export default function Flights() {
    return (
        <div>
            <h1>Flights</h1>
            <FlightRegistrationForm />
        </div>
    )
}