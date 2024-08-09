// import FlightRegistrationForm from "./RegisterFlightLog";
import Home from "./Home";
import About from "./About";
import Header from "./Header";
import UserSignInForm from "./UserSignIn";
import UserRegistrationForm from "./UserSignUp";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const DashBoard = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/sign_up" element={<UserRegistrationForm />} />
                <Route path="/sign_in" element={<UserSignInForm />} />
            </Routes>
        </BrowserRouter>
    )
}
export default DashBoard;