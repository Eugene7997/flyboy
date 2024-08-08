import { Form } from "react-bootstrap";

function UserRegistrationForm() {
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
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" placeholder="Enter username" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" name="password" placeholder="Enter Password" />
                </Form.Group>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )

}
export default UserRegistrationForm;