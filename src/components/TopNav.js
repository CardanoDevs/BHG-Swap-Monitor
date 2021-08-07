import React, {Component} from 'react';
import {Container, Navbar,} from 'react-bootstrap';
import { MDBDataTable ,MDBIcon} from 'mdbreact';



class TopNav extends Component {
    render () {
        return (
            <Navbar  bg="dark" expand="lg" variant = "dark">
                    <Navbar.Brand href="#home"><MDBIcon icon="home" fixed /> <h1>Uniswap Monitor</h1></Navbar.Brand>
            </Navbar>
        );
    }
}

export default TopNav;