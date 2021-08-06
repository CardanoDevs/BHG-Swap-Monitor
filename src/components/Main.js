import React, {Component} from 'react';
import { Container, Col } from 'react-bootstrap';
import {
    Switch,
    Route,
} from "react-router-dom";

import Display from './Display.js';
import WalletList  from './WalletList.js';
import AddWallet from './AddWallet.js'
// import Erc20 from './Erc20.js';

class Main extends Component {
    render() {
        return (
            <Container>
                <Col lg="12" >
                    <Switch>
                        <Route path="/Display">
                            <Display/>
                        </Route>
                        <Route Path="/WalletList">
                            <WalletList/>
                        </Route>
                        <Route path = "/AddWallet">
                            <AddWallet/>
                        </Route>
                    </Switch>
                </Col>
            </Container>
        );
    }
}

export default Main;