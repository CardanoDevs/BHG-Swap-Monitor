import React, {Component} from 'react';
import {Container, Navbar,} from 'react-bootstrap';
class TopNav extends Component {
    render () {
        return (
            <Navbar>
                    <Navbar.Brand href="#home"><h1>Uniswap Monitor</h1></Navbar.Brand>
            </Navbar>
        );
    }
}

export default TopNav;