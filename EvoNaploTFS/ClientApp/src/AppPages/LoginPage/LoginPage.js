import React, { Component, useEffect, useState } from 'react';

export default function Login() {
    const [user, setUser] = useState({});

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = () => {

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