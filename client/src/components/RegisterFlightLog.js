import { Form } from "react-bootstrap";
import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Link, useNavigate } from "react-router-dom";

function FlightRegistrationForm( {setFormVisible} ) {
    const [formData, setFormData] = useState({})
    // use userSlice or should we use flightSlice?
    const {loading, error} = useSelector((state)=> state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const validateFormBeforeSubmit = () => {
        var flag = false;
        if (!formData.flightID || formData.flightID.trim() === '') {
            // dispatch(signInFailure("flightID is required."))
            flag = true;
        }
        if (!formData.tailNumber || formData.tailNumber.trim() === '') {
            // dispatch(signInFailure("tailNumber is required."))
            flag = true;
        }
        if (!formData.takeoff || formData.takeoff.trim() === '') {
            // dispatch(signInFailure("takeoff is required."))
            flag = true;
        }
        if (!formData.landing || formData.landing.trim() === '') {
            // dispatch(signInFailure("landing is required."))
            flag = true;
        }
        if (!formData.Duration || formData.Duration.trim() === '') {
            // dispatch(signInFailure("Duration is required."))
            flag = true;
        }
        if (flag == true) {
            return false;
        }
        else {
            return true;
        }
    }

    const submitForm = (e) => {
        e.preventDefault();
        if (!validateFormBeforeSubmit()) {
            return;
        }
        console.log(formData)
        setFormData({});
        setFormVisible(false)
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
            <h1 className="text-2xl font-semibold mb-4 text-center">Registration Form</h1>
            <form onSubmit={submitForm}>
                <Form.Group className="mb-4">
                    <Form.Label className="block text-gray-700 font-medium">Flight ID</Form.Label>
                    <Form.Control
                        type="text"
                        name="flightID"
                        placeholder="Enter Flight ID"
                        onChange={handleChange}
                        className="border-gray-300 rounded-md"
                    />
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label className="block text-gray-700 font-medium">Tail Number</Form.Label>
                    <Form.Control
                        type="text"
                        name="tailNumber"
                        placeholder="Enter Tail Number"
                        onChange={handleChange}
                        className="border-gray-300 rounded-md"
                    />
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label className="block text-gray-700 font-medium">Take Off</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        name="takeoff"
                        placeholder="Enter Take Off"
                        onChange={handleChange}
                        className="border-gray-300 rounded-md"
                    />
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label className="block text-gray-700 font-medium">Landing</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        name="landing"
                        placeholder="Enter Landing"
                        onChange={handleChange}
                        className="border-gray-300 rounded-md"
                    />
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label className="block text-gray-700 font-medium">Duration</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        name="Duration"
                        placeholder="Enter Duration"
                        onChange={handleChange}
                        className="border-gray-300 rounded-md"
                    />
                </Form.Group>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 transition-colors"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
export default FlightRegistrationForm;