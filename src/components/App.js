import React, {Component} from 'react';
import { Tab, Col, Row, Nav } from 'react-bootstrap';
import TopNav from './TopNav.js';
import Web3 from 'web3';
import './App.css'


import Display from './Display.js';
import WalletList  from './WalletList.js';
import AddWallet from './AddWallet.js'
import {
    BrowserRouter as Router,
} from "react-router-dom";

class App extends Component {
    async componentWillMount() {
        await this.loadWeb3();
    }

    async loadWeb3() {
        if(window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if(window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        } else {
            window.alert('Non-Ethereum browser detected. Your should consider trying MetaMask!')
        }
    }
    render () {
        return (
            <div>
                
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col xs="1">
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                        <Nav.Link eventKey="first">Monitor</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="second">Wallet List</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    </Col>
                    <Col xs="11">
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                        <Display />
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                        <WalletList />
                        </Tab.Pane>
                    </Tab.Content>
                    </Col>
                </Row>
                </Tab.Container>
            </div>
        );
    }
}

export default App;