import FlightRegistrationForm from "./RegisterFlightLog";
import UserRegistrationForm from "./RegisterUser";
import Home from "./Home";
import UserSignInForm from "./UserSignIn";
import {BrowserRouter, Routes, Route} from 'react-router-dom';


const DashBoard = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/sign_up" element={<UserRegistrationForm/>}/>
                    <Route path="/sign_in" element={<UserSignInForm/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default DashBoard;