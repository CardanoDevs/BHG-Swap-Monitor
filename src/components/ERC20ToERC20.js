import React, {Component} from 'react';
import { Button, Form, Row, Col, Table } from 'react-bootstrap';
import Web3 from 'web3';
import abiDecoder from  'abi-decoder'
import { abi, contract_abi } from './abi.js';
import { select } from 'async';

import axios from 'axios';
import Notifications, {notify} from 'react-notify-toast';



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

const erc20abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}]


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
            url: 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD',
            rating :0,
            loading: true,
            table_index : 0,
         }
     }
    
     getRating () {
        axios
          .get (this.state.url)
          .then (
            function (response) {
              this.setState ({rating: response.data['USD']});
              setTimeout (() => {
                this.setState ({loading: false});
              }, 400);
            }.bind (this)
          )
          .catch (function (error) {
            console.log (error);
          });
      }


    async componentWillMount() {
        await this.getRating();
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
                        
                            this.state.fromAddress[this.state.ID] = tx.from;
                        //--------------------------------------------------------------------
                            this.state.timeStamp[this.state.ID] = new Date().toISOString();
                            this.state.label[this.state.ID] = 'john'
                        //--------------------------------------------------------------------
                            if (decodedData["name"]=="swapExactTokensForETH"){
                                let MyContract = new web3.eth.Contract(erc20abi,decodedData["params"][2]["value"][0]);
                                this.state.tokenIn[this.state.ID] = await MyContract.methods.symbol().call().then(function(res) {
                                                                                            return res;
                                                                                            })
                                this.state.amountIn[this.state.ID] = decodedData["params"][0]["value"];
                                this.state.tokenOut[this.state.ID] =  "WETH"
                                this.state.AmountOut[this.state.ID] = decodedData["params"][1]["value"];      
                                this.state.payLoad[this.state.ID] =this.state.rating*this.state.AmountOut[this.state.ID]/1000000000000000000;
                            }
                            else if(decodedData["name"]=="swapExactTokensForTokens"){

                                let MyContract = new web3.eth.Contract(erc20abi,decodedData["params"][2]["value"][0]);
                                this.state.tokenIn[this.state.ID] = await MyContract.methods.symbol().call().then(function(res) {
                                                                                            return res;
                                                                                            })
                                this.state.amountIn[this.state.ID] = decodedData["params"][1]["value"];
                                let MyContract1 = new web3.eth.Contract(erc20abi,decodedData["params"][2]["value"][3]);
                                this.state.tokenOut[this.state.ID] = await MyContract1.methods.symbol().call().then(function(res) {
                                                                                return res;
                                                                                })
                                this.state.AmountOut[this.state.ID] = decodedData["params"][0]["value"];


                                // let V2router  = new web3.eth.Contract(abi, 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D);                                                         
                                // let amounts = await V2router.getAmountsOut(this.state.amountIn[this.state.ID], [decodedData["params"][2]["value"][0], 0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2]);
                                this.state.payLoad[this.state.ID] =tx.value;
                            }    
                            else if(decodedData["name"]="swapExactETHForTokens"){
                               
                                this.state.tokenIn[this.state.ID] = "WETH";
                                this.state.amountIn[this.state.ID] = tx.value;
                                let MyContract = new web3.eth.Contract(erc20abi,decodedData["params"][1]["value"][1]);
                                this.state.tokenOut[this.state.ID] = await MyContract.methods.symbol().call().then(function(res) {
                                                                        return res;
                                                                        })
                                this.state.AmountOut[this.state.ID] = decodedData["params"][0]["value"];
                                this.state.payLoad[this.state.ID] = tx.value * this.state.rating/100000000000000000;

                            }
                            this.state.txHash[this.state.ID] = tx.hash;

                            console.log("time:");
                            console.log(this.state.timeStamp[this.state.ID]);

                            console.log("label:");
                            console.log(this.state.label[this.state.ID]);

                            console.log("tokenin:");
                            console.log(this.state.tokenIn[this.state.ID]);

                            console.log("amountin:");
                            console.log(this.state.amountIn[this.state.ID]);

                            console.log("tokenout:");
                            console.log(this.state.tokenOut[this.state.ID]);

                            console.log("amountout:");
                            console.log(this.state.AmountOut[this.state.ID]);

                            console.log("hash:");
                            console.log(this.state.txHash[this.state.ID])

                            console.log("payload:");
                            console.log(this.state.payLoad[this.state.ID])

                            console.log(" ");
                            this.state.ID += 1;
                            }


                    } catch (err) {
                     console.error(err);
                }
              });
            });
    }


    renderTableDate(timeStamp, label, tokenIn, amountIn,tokenOut, AmountOut, payLoad, txHash, index){
        var index = 0 
        for(index = 0 ; index < this.state.ID; index++ ){
            return(
                <tr key = {index}>
                    <td>{timeStamp}</td>
                    <td>{label}</td>
                    <td>{tokenIn}</td>
                    <td>{amountIn}</td>
                    <td>{tokenOut}</td>
                    <td>{AmountOut}</td>
                    <td>{payLoad}</td>
                    <td>{txHash}</td>
                </tr>
            )
        }
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
                        <Form.Control type="text" placeholder="0x" />
                    </Form.Group> 
                    <Form.Group>
                        <Button onClick={() => this.init()} >start</Button>
                    </Form.Group>
                </Form>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>TimeStamp</th>
                            <th>Label</th>
                            <th>Token IN</th>
                            <th>Amount In</th>
                            <th>Token Out</th>
                            <th>Amount Out</th>
                            <th>Payload</th>
                            <th>TX Hash</th>
                        </tr>
                    </thead>
                    <tbody>
                       {this.renderTableDate(this.state.timeStamp, this.state.label, this.state.tokenIn, this.state.amountIn, this.state.tokenOut, this.state.AmountOut, this.state.payLoad, this.state.txHash,this.statetable_index)}
                    </tbody>
                </Table>
            </div>
        );
    }
}
export default ERC20ToERC20;

