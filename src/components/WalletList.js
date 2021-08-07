import React, {Component} from 'react';
import { Form } from 'react-bootstrap';
import Web3 from 'web3';
import TopNav from './TopNav.js'




class WalletList extends Component {

    constructor(props) {
        super(props)
        this.state = {

            WallList : []
            
        }

    }



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

