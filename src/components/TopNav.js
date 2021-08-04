import React, {Component} from 'react';
import {Container, Navbar, Nav, NavDropdown} from 'react-bootstrap';
class TopNav extends Component {
    render () {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Action</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/erc20toerc20">Uniswap</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#deets">Client</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default TopNav;