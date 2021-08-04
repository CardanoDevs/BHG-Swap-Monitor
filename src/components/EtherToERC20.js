import React, {Component} from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';


const Web3 = require("web3");
const url = "ADD_YOUR_ETHEREUM_NODE_WSS_URL";
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
const web3 = new Web3(new Web3.providers.WebsocketProvider(url, options));
const subscription = web3.eth.subscribe("pendingTransactions", (err, res) => {
  if (err) console.error(err);







class EtherToERC20 extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         swapID : '',
    //         process : '',
    //         openValue : 500,
    //         closeValue : 200,
    //     }
    //     this.handleOpenValue    = this.handleOpenValue.bind(this)
    //     this.handleCloseValue   = this.handleCloseValue.bind(this)
    // }
    
    async componentWillMount() {
        await this.open();
    }

 




        // this.setState({
        //     contract : contract,
        //     openToken : openToken,
        //     closeToken : closeToken,
        //     openValue : openValue,
        //     closeValue : closeValue,
        //     swapID : swapID,
        //     accounts : accounts,
        //     serverPrivateKey : serverPrivateKey,
        //     process: ''
        // })
    

    
    async open(){
      subscription.on("data", (txHash) => {
        setTimeout(async () => {
          try {
            let tx = await web3.eth.getTransaction(txHash);
            console.log(tx)
          } catch (err) {
            console.error(err);
          }
        });
      });
    }





    render () {
        return (
            <div>
                
                <h2>ERC20 to ERC20 Atomic Swap</h2>
                <Form>
                    {/* <Form.Group className="mb-3">
                        <Form.Label>Swap ID</Form.Label>
                        <Form.Control type="text" placeholder="Swap ID" defaultValue={this.state.swapID} />
                    </Form.Group> */}
                    <Form.Group>
                        <Button onClick={() => this.open()} >Open-Close process</Button>
                    </Form.Group>
                </Form>
            </div>
        );

    }
}

export default EtherToERC20;