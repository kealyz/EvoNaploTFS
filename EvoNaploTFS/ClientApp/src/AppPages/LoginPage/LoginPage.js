import React, { Component, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

export default function Login() {
    const [user, setUser] = useState({});

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        fetch('api/Auth/Login', { method: 'POST', body: JSON.stringify(user), headers: { "Content-Type": "application/json" } })
            .then(function (data) {
                console.log(data);

                window.location.reload(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="email" onChange={handleChange}/>
                <input type="password" name="password" onChange={handleChange} />
                <input type="submit"/>
            </form>
        </div>
    );
}