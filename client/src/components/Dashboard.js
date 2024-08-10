// import FlightRegistrationForm from "./RegisterFlightLog";
import Home from "./Home";
import About from "./About";
import Header from "./Header";
import UserSignInForm from "./UserSignIn";
import UserRegistrationForm from "./UserSignUp";
import FlightRegistrationForm from "./RegisterFlightLog";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from "./PrivateRoute";
import Profile from "./Profile";

const DashBoard = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/sign_up" element={<UserRegistrationForm />} />
                <Route path="/sign_in" element={<UserSignInForm />} />
                <Route element={<PrivateRoute />} >
                    <Route path="/flightlogs" element={<FlightRegistrationForm/>} />
                    <Route path="/profile" element={<Profile/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
export default DashBoard;