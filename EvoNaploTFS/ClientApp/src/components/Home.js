import React, { Component } from 'react';

export default function Home(props) {
    if ('role' in props.session) {
        return (
            <div>
                <h1>Hali {props.session.name}!</h1>
                <p>Egy kisse atdolgoztam a feluletet... Remelem tetszik.</p>
            </div>
        );
    }
    else {
        return (
            <p>Lepjel befele</p>
        );
    }
};