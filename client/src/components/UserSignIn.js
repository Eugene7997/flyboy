import { Form } from "react-bootstrap";
import { useState } from "react";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';

function UserSignInForm() {
    const [values, setValues] = useState({
        password: "",
        showPassword: false
    });
    
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const submitForm = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const payload = Object.fromEntries(formData)
        console.log(payload)
    }
    return (
        <>
            <h1>Sign in</h1>
            <form onSubmit={submitForm}>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" placeholder="Enter username" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type={values.showPassword? "text": "password"} name="password" placeholder="Enter Password" />
                </Form.Group>
                <IconButton 
                    onClick={handleClickShowPassword}
                >
                    {values.showPassword? <VisibilityIcon/>: <VisibilityOffIcon/>}
                </IconButton>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )

}
export default UserSignInForm;