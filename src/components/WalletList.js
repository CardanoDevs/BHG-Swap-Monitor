import React, {Component} from 'react';
import { Form } from 'react-bootstrap';
import Web3 from 'web3';
import TopNav from './TopNav.js'



const url = "wss://ancient-proud-sky.quiknode.pro/448fa0f4002c4f02ba95c5a1f77c1c2bfa343bd5/";
const options = {
  timeout: 30000,
  clientConfig: {
    maxReceivedFrameSize: 100000000,
    maxReceivedMessageSize: 100000000,
  },
  reconnect: {
    auto: true,
    delay: 5000,
    maxAttempts: 15,
    onTimeout: false,
  },
};


class WalletList extends Component {
    render () {
       
        
        
        return (
            <div>
                <h2>Wallet List</h2>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Uniswap Router Address</Form.Label>
                        <Form.Control type="text" placeholder="Swap ID" />
                    </Form.Group> 
                    <Form.Group className="mb-3">
                        <Form.Label>From Address</Form.Label>
                        <Form.Control type="text" placeholder="0x" />
                    </Form.Group> 
                    <Form.Group>
                    </Form.Group>
                </Form>


            </div>
        );
    }
}
export default WalletList;

