import validate from "../EditUserPage/EditUserValidate";
import React, { useEffect, useState } from "react";
import UnauthorizedPage from '../../components/Unauthorized';

export default function EditUserPage(props)
{
    const [user, setUser] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        password2: ''
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (props.match.params.id !== undefined) {
            fetch('api/User/GetUserToEditById/?id=' + props.match.params.id)
                .then(response => response.json())
                .then(json => setUser({ id: json.id, firstName: json.firstName, lastName: json.lastName, email: json.email, phoneNumber: json.phoneNumber, password: json.password, password2: json.password }))
                //.then(setUser({ ...user, password2: user.password }))         
        }
    }, []);

    const [session, setSession] = useState();
    useEffect(() => {
        (
            async () => {
                const response = await fetch('api/Session', { method: 'GET' });
                const content = await response.json();

                await setSession(content);
            }
        )();
    }, []);

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = e => {
        e.preventDefault()
        console.log(JSON.stringify(user));
        const returnedErrors = validate(user);
        setErrors(returnedErrors);

        if (Object.keys(returnedErrors).length == 0) {
            fetch('api/User/EditUser', { method: 'PUT', body: JSON.stringify(user), headers: { "Content-Type": "application/json" } })
                .then(function (data) {
                    setSuccess(true);
                })
                .catch(function (error) {
                    setSuccess(false);
                });
            document.getElementById("editForm").reset();
        }
        else {
            setSuccess(false);
        }
    }

    if (session !== undefined) {
        if (session.title !== "Unauthorized") {
            if (session.role !== "Student") {
                return (
                    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */

                    <div class="DivCard">
                        <h1>Edit</h1>
                        <form onSubmit={onSubmit} id="editForm">
                            {/* register your input into the hook by invoking the "register" function */}
                            <table>
                                <tr>
                                    <td>
                                        <input type="text" name="firstName" value={user.firstName} placeholder="Firstname" onChange={handleChange} />
                                        {errors.firstName && <p class="ErrorParagraph">{errors.firstName}</p>}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="text" name="lastName" value={user.lastName} placeholder="Lastname" onChange={handleChange} />
                                        {errors.lastName && <p class="ErrorParagraph">{errors.lastName}</p>}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="text" name="email" value={user.email} placeholder="Email" onChange={handleChange} />
                                        {errors.email && <p class="ErrorParagraph">{errors.email}</p>}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="text" name="phoneNumber" value={user.phoneNumber} placeholder="PhoneNumber" onChange={handleChange} />
                                        {errors.phonenumber && <p class="ErrorParagraph">{errors.phoneNumber}</p>}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="password" name="password" value={user.password} placeholder="Password" onChange={handleChange} />
                                        {errors.password && <p class="ErrorParagraph">{errors.password}</p>}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="password" name="password2" value={user.password2} placeholder="Confirm password" onChange={handleChange} />
                                        {errors.password2 && <p class="ErrorParagraph">{errors.password2}</p>}
                                    </td>
                                </tr>
                            </table>
                            <input type="submit" />
                        </form>
                        {success && <p class="SuccessParagraph">User {user.firstName} successfully edited.</p>}
                    </div>
                );
            }
        }
    }
    return (
        <UnauthorizedPage />
    );
}