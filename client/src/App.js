import logo from './logo.svg';
import './App.css';
import UserRegistrationForm from './components/RegisterUser';
import FlightRegistrationForm from './components/RegisterFlightLog';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
      </header> */}
      <div>
        <UserRegistrationForm/>
        <FlightRegistrationForm/>
      </div>
    </div>
  );
}

export default App;
