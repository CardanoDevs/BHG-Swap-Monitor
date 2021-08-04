import React, {Component} from 'react';
import { Button, Form, Row, Col, Table } from 'react-bootstrap';
import Web3 from 'web3';
import abiDecoder from  'abi-decoder'
import { abi, contract_abi } from './abi.js';
import { select } from 'async';






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

const web3 = new Web3(new Web3.providers.WebsocketProvider(url, options));
const subscription = web3.eth.subscribe("pendingTransactions", (err, res) => {
  if (err) console.error(err);
});





class ERC20ToERC20 extends Component {
     constructor(props) {
         super(props)
         this.state = {
            toAddress : 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D,
            ID : 0,
            fromAddress : [],
            timeStamp :[],
            label :[],
            tokenIn : [],
            amountIn : [],
            tokenOut : [],
            AmountOut : [],
            payLoad :[],
            txHash : [],
         }
     }
    
    async componentWillMount() {
        // await this.init();
    }

    async init() {
            subscription.on("data", (txHash) => {
              setTimeout(async () => {
                try {
                    let tx = await web3.eth.getTransaction(txHash);
                        if(tx.to == this.state.toAddress)
                        {

                            abiDecoder.addABI(abi);
                            const decodedData = abiDecoder.decodeMethod(tx.input);
                            console.log(decodedData["name"])


                            this.state.fromAddress[this.state.ID] = tx.from;

                        //--------------------------------------------------------------------
                            this.state.timeStamp[this.state.ID] = new Date().toISOString();
                            this.state.label[this.state.ID] = 'john'

                        //--------------------------------------------------------------------
                            if (decodedData["name"]=="swapExactTokensForETH"){
                                this.state.tokenIn[this.state.ID] = decodedData["params"][2]["value"][0];
                                this.state.amountIn[this.state.ID] = decodedData["params"][0]["value"];
                                console.log(this.state.amountIn[this.state.ID])
                                this.state.tokenOut[this.state.ID] = 'uni';
                                this.state.AmountOut[this.state.ID] = tx.value;
                            }
                            else if(decodedData["name"]=="swapExactTokensForTokens"){
                                this.state.tokenIn[this.state.ID] = tx.from;
                                this.state.amountIn[this.state.ID] = tx.value;
                                this.state.tokenOut[this.state.ID] = 'uni';
                                this.state.AmountOut[this.state.ID] = tx.value;
                            }
                            else if(decodedData["name"]="swapExactETHForTokens"){
                                this.state.tokenIn[this.state.ID] = tx.from;
                                this.state.amountIn[this.state.ID] = tx.value;
                                this.state.tokenOut[this.state.ID] = 'uni';
                                this.state.AmountOut[this.state.ID] = tx.value;
                            }
                            


                            this.state.payLoad[this.state.ID] = tx.value;
                            this.state.txHash[this.state.ID] = tx.hash;
                            this.state.ID += 1;

                           

                        }
                    } catch (err) {
                     console.error(err);
                }
              });
            });
    }

    renderTableDate(timeStamp, label, tokenIn, amountIn,tokenOut, AmountOut, payLoad, txHash, index){

        return(
            <tr key = {index}>
                <td>{this.state.ID}</td>
                <td>{this.state.timeStamp}</td>
                <td>{this.state.fromAddress}</td>
                <td>{this.state.label}</td>
                <td>{this.state.tokenIn}</td>
                <td>{this.state.amountIn}</td>
                <td>{this.state.tokenOut}</td>
                <td>{this.state.AmountOut}</td>
                <td>{this.state.payLoad}</td>
                <td>{this.state.txHash}</td>
            </tr>
        )

        }
   
    render () {
        return (
            <div>
                
                <h2>Uniswap Action tracking</h2>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Uniswap Router Address</Form.Label>
                        <Form.Control type="text" placeholder="Swap ID" defaultValue={this.state.toAddress} />
                    </Form.Group> 
                    <Form.Group className="mb-3">
                        <Form.Label>From Address</Form.Label>
                        <Form.Control type="text" placeholder="0x" defaultValue={this.state.fromAddress} />
                    </Form.Group> 
                    <Form.Group>
                        <Button onClick={() => this.init()} >start</Button>
                    </Form.Group>
                </Form>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>TimeStamp</th>
                            <th>Label</th>
                            <th>Token IN</th>
                            <th>Amount In</th>
                            <th>Token Out</th>
                            <th>Amount Out</th>
                            <th>Payload</th>
                            <th>TX Hash</th>
                            <th>DEX Link</th>
                        </tr>
                    </thead>
                    <tbody>
                       {this.renderTableDate}
                    </tbody>
                </Table>
            </div>
        );

    }
}

export default ERC20ToERC20;

