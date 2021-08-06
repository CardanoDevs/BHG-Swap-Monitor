import React, {Component} from 'react';
import {Container, Navbar, Nav, NavDropdown} from 'react-bootstrap';
class TopNav extends Component {
    render () {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Uniswap Monitor</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                </Container>
            </Navbar>
        );
    }
}

export default TopNav;