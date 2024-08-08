import { Form } from "react-bootstrap";
// import React, { useState } from 'react';

function FlightRegistrationForm() {
    // const [username, setUserName] = useState('');
    // const [password, setPassword] = useState('');

    const submitForm = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const payload = Object.fromEntries(formData)
        console.log(payload)
    }
    return (
        <>
            <h1>Registration form</h1>
            <form onSubmit={submitForm}>
                <Form.Group className="mb-3">
                    <Form.Label>FlightID</Form.Label>
                    <Form.Control type="text" name="flightID" placeholder="Enter username" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Tail Number</Form.Label>
                    <Form.Control type="text" name="tailNumber" placeholder="Enter username" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Take off</Form.Label>
                    <Form.Control type="text" name="takeOff" placeholder="Enter username" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Landing</Form.Label>
                    <Form.Control type="text" name="landing" placeholder="Enter username" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control type="text" name="Duration" placeholder="Enter Password" />
                </Form.Group>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )

}
export default FlightRegistrationForm;