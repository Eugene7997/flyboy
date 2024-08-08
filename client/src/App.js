import logo from './logo.svg';
import './App.css';
import UserRegistrationForm from './components/RegisterUser';
import FlightRegistrationForm from './components/RegisterFlightLog';
import UserSignInForm from './components/UserSignIn';
import DashBoard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <DashBoard/>
    </div>
  );
}

export default App;
