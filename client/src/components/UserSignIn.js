import { Form } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';

function UserRegistrationForm() {
    const [formData, setFormData] = useState({})
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const validateFormBeforeSubmit = () => {
        if (!formData.username || formData.username.trim() === '') {
            setError("Username is required.");
            return false;
        }
        if (!formData.password || formData.password.trim() === '') {
            setError("Password is required.");
            return false;
        }
        return true;
    }
    const submitForm = async (e) => {
        e.preventDefault();
        if (!validateFormBeforeSubmit()) {
            return;
        }
        try {
            setLoading(true)
            const res = await fetch("http://localhost:5000/api/users/sign_in", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            })
            if (!res.ok) {
                const errorData = await res.json();
                if (res.status === 404 || (errorData.message && errorData.message.includes('Username not found'))) {
                    throw new Error("Username is not found.");
                }
                else if (res.status === 401 || (errorData.message && errorData.message.includes('Wrong Password entered'))) {
                    throw new Error("Incorrect password. Try again.");
                } 
                else {
                    throw new Error(errorData.message || "Something went wrong. Please try again.");
                }
            }
            const data = await res.json()
            console.log(data)
            setLoading(false)
            setError(false)
            setSuccess(data.message)
            navigate('/')
        }
        catch (err) {
            setLoading(false)
            console.log(err)
            setError(err.message)
        }
        
    }
    return (
        <>
            <h1 className="text-3xl text-center font-semibold my-7" >User Sign In form</h1>
            <form className="flex flex-col gap-4" onSubmit={submitForm}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control className="bg-slate-100 p-3 rounded-lg" type="text" name="username" placeholder="Enter username" onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control className="bg-slate-100 p-3 rounded-lg" type={showPassword ? "text" : "password"} name="password" placeholder="Enter Password" onChange={handleChange}/>
                    <IconButton
                        onClick={handleClickShowPassword}
                    >
                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                </Form.Group>
                <button disabled={loading} type="submit" className="bg-slate-700 text-white p-3">{loading ? "Loading..." : 'Sign In'}</button>
            </form>
            <div className='flex gap-2 mt-5'>
                <p>Don't have an account?</p>
                <Link to='/sign_up'>
                    <span className='text-blue-500'>Sign up</span>
                </Link>
            </div>
            <div>
                <p className='text-red-700'>{error}</p>
                <p>{success}</p>
            </div>
        </>
    )

}
export default UserRegistrationForm;