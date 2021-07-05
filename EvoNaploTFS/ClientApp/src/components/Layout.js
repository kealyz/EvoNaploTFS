import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';

export default function Layout(props) {
    return (
        <div>
            <NavMenu session={props.session} />
            <Container>
                {props.children}
            </Container>
        </div>
    );
}