import React, {Component} from 'react';
import { Container, Col } from 'react-bootstrap';
import {
    Switch,
    Route,
} from "react-router-dom";

import ERC20ToERC20 from './ERC20ToERC20.js';
// import Erc20 from './Erc20.js';

class Main extends Component {
    render() {
        return (
            <Container>
                <Col lg="12" >
                    <Switch>
                        <Route path="/erc20toerc20">
                            <ERC20ToERC20 />
                        </Route>
                    </Switch>
                </Col>
            </Container>
        );
    }
}

export default Main;