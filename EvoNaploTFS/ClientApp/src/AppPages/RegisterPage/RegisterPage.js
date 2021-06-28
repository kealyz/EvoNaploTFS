import React, { useEffect, useState, useRef } from "react";
//import { useForm } from "react-hook-form";
import '../Forms.css';
import validate from "../RegisterPage/RegisterValidate";

//const bcrypt = require('bcrypt');
//const saltRounds = 10;


const RegisterPage = () => {
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        password2: ''
    });

    const [errors, setErrors] = useState({});

    const [success, setSuccess] = useState(false);

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = e => {
        e.preventDefault()

        const returnedErrors = validate(user);
        setErrors(returnedErrors);
        const hashedPass = "";

        if (Object.keys(returnedErrors).length == 0) {
            //bcrypt.hash(user.password, saltRounds).then(function (hash) {
            //    hashedPass = hash;
            //});
            console.log([user.firstname, user.lastname, user.email, hashedPass]);
            fetch('api/Student/AddStudent', { method: 'POST', body: JSON.stringify([user.firstname, user.lastname, user.email, hashedPass]), headers: { "Content-Type": "application/json" } })
                .then(function (data) {
                    setSuccess(true);
                })
                .catch(function (error) {
                    setSuccess(false);
                });
            document.getElementById("registrationForm").reset();
        }
        else {
            setSuccess(false);
        }

    }

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */

        <div class="DivCard">
            <h1>Registration</h1>
            <form onSubmit={onSubmit} id="registrationForm">
                {/* register your input into the hook by invoking the "register" function */}
                <table>
                    <tr>
                        <td>
                            <input type="text" name="firstname" value={user.firstname} placeholder="Firstname" onChange={handleChange} />
                            {errors.firstname && <p class="ErrorParagraph">{errors.firstname}</p>}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" name="lastname" value={user.lastname} placeholder="Lastname" onChange={handleChange} />
                            {errors.lastname && <p class="ErrorParagraph">{errors.lastname}</p>}
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
            {success && <p class="SuccessParagraph">Student {user.firstname} successfully added.</p>}
        </div>
    );
}

export default RegisterPage;