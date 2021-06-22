import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import DropdownMenu from './DropdownMenu/DropdownMenu';
import './NavMenu.css';

function GetLists() {
    return (
        <div>
            <ul>
                <li>
                    <a href="/Students">Students</a>
                </li>
                <li>
                    <a href="/Mentors">Mentors</a>
                </li>
                <li>
                    <a href="/Projects">Projects</a>
                </li>
            </ul>
        </div>
    );
}

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 NavMenuColor" light>
                    <Container>
                        <NavbarBrand tag={Link} className="text-light" to="/">EvoNaploTFS</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-light" to="/">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <DropdownMenu title="Lists" content={GetLists()} />
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-light" to="/Register">Register</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-light" to="/Admins">Admins</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-light" to="/Semesters">Semesters</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-light" to="/JoinSemester">Join Semester</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-light" to="/StartSemester">Start Semester</NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
