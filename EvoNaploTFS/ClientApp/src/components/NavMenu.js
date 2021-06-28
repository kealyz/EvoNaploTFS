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
                    <a href="/Students"><div class="LinkSelector" />Students</a>
                </li>
                <li>
                    <a href="/Mentors"><div class="LinkSelector" />Mentors</a>
                </li>
                <li>
                    <a href="/Projects"><div class="LinkSelector" />Projects</a>
                </li>
                <li>
                    <a href="/Admins"><div class="LinkSelector" />Admins</a>
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
                        <NavbarBrand tag={Link} className="NavLinkFonts" to="/">EvoNaploTFS</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="NavLinkFonts" to="/">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <DropdownMenu title="Lists" content={GetLists()} />
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="NavLinkFonts" to="/Register">Registration</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="NavLinkFonts" to="/JoinSemester">Join Semester</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="NavLinkFonts" to="/StartSemester">Start Semester</NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
