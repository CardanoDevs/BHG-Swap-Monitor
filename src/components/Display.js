import React, {Component} from 'react';
import { Button, Form, Row, Col, Table,FormControl,InputGroup } from 'react-bootstrap';
import Web3 from 'web3';
import abiDecoder from  'abi-decoder'
import { abi, contract_abi } from './abi.js';
import { select } from 'async';

import axios from 'axios';
import Notifications, {notify} from 'react-notify-toast';
import { Link } from 'react-router-dom';



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
var subscription = web3.eth.subscribe("pendingTransactions", (err, res) => {
  if (err) console.error(err);
});

const erc20abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}]


class Display extends Component {
     
    constructor(props) {
         super(props)
         this.state = {

            //------------
            ID : 0,
            toAddress : '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
            fromAddress : '',
            timeStamp : 0,
            label : '',
            tokenIn : '',
            amountIn : 0,
            tokenOut : '',
            AmountOut : 0,
            payLoad :0,
            txHash : '',
            txHashLink : '',
            tokenIn_Decimals : 0,
            TokenOut_Decimals : 0,
            //------------
            rating :0,
            loading: true,
            table_index : 0,
            url: 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD',
            //------------
            transactions : [],
         }
     }
    
    async getRating () {
       let mycontract = new web3.eth.Contract(abi, this.state.toAddress)
       let rating  = await mycontract.methods.getAmountsOut(1000000000000, ['0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' , '0xdac17f958d2ee523a2206206994597c13d831ec7']).call();
       this.setState ({rating: rating[1]});
      }

    async componentWillMount() {
          await this.getRating()
    }
    async init() {
            subscription.on("data", (txHash) => {
              setTimeout(async () => {
                try {
                    let tx = await web3.eth.getTransaction(txHash);
                    abiDecoder.addABI(abi);
                    var decodedData = abiDecoder.decodeMethod(tx.input);

                        if(tx.to == this.state.toAddress) {
                            
                               if(decodedData["name"]=="swapExactTokensForETH"||decodedData["name"]=="swapTokensForExactETH"||decodedData["name"]=="swapExactTokensForETHSupportingFeeOnTransferTokens"||
                               decodedData["name"]=="swapTokensForExactTokens"||decodedData["name"]=="swapExactTokensForTokens"||decodedData["name"]=="swapExactTokensForTokensSupportingFeeOnTransferTokens"||
                               decodedData["name"]=="swapExactETHForTokens"||decodedData["name"]=="swapETHForExactTokens"||decodedData["name"]=="swapExactETHForTokensSupportingFeeOnTransferTokens")
                               {

                            let transaction = {
                                fromAddress : tx.from,
                                label : 'john',
                                timeStamp : new Date().toISOString(),
                            }
                            console.log(decodedData["name"])
                            //--------------------------------------------------------------------
                            if (decodedData["name"]=="swapExactTokensForETH"||decodedData["name"]=="swapExactTokensForETHSupportingFeeOnTransferTokens"){
                                let MyContract = new web3.eth.Contract(erc20abi,decodedData["params"][2]["value"][0]);
                                transaction.tokenIn = await MyContract.methods.symbol().call().then(function(res) {
                                    return res;
                                })
                                transaction.tokenIn_Decimals = await MyContract.methods.decimals().call()
                                transaction.amountIn    =  decodedData['params'][0]['value'] / Math.pow(10,transaction.tokenIn_Decimals)
                                transaction.tokenOut    = 'WETH'
                                transaction.AmountOut   = decodedData['params'][1]['value'] / Math.pow(10,18)
                                await this.getRating();
                                transaction.payLoad     = this.state.rating * transaction.AmountOut
                            } 

                            else if (decodedData["name"]=="swapTokensForExactETH"){
                                let MyContract = new web3.eth.Contract(erc20abi,decodedData["params"][2]["value"][0]);
                                transaction.tokenIn = await MyContract.methods.symbol().call().then(function(res) {
                                    return res;
                                })
                                transaction.tokenIn_Decimals = await MyContract.methods.decimals().call()
                                transaction.amountIn    = decodedData['params'][1]['value'] / Math.pow(10,transaction.tokenIn_Decimals)
                                transaction.tokenOut    = 'WETH'
                                transaction.AmountOut   = decodedData['params'][0]['value'] / Math.pow(10,18)
                                await this.getRating();
                                transaction.payLoad     = this.state.rating * transaction.AmountOut
                            } 
                            //------------------------------------------------------------------------------------------------------------------------------
                            

                            else if (decodedData["name"]=="swapExactTokensForTokens"||decodedData["name"]=="swapExactTokensForTokensSupportingFeeOnTransferTokens") {

                                let MyContract =      await new web3.eth.Contract(erc20abi,decodedData["params"][2]["value"][0]);
                                transaction.tokenIn = await MyContract.methods.symbol().call().then(function(res) {
                                    return res;
                                })
                                transaction.tokenIn_Decimals = await MyContract.methods.decimals().call()
                                transaction.amountIn    = decodedData['params'][0]['value'] /Math.pow(10,transaction.tokenIn_Decimals)

                                let MyContract1         = new web3.eth.Contract(erc20abi, decodedData['params'][2]['value'][2])
                                transaction.tokenOut    = await MyContract1.methods.symbol().call().then(function(res) {
                                    return res
                                })
                                transaction.TokenOut_Decimals = await MyContract1.methods.decimals().call()
                                transaction.AmountOut   = decodedData['params'][1]['value'] / Math.pow(10,transaction.tokenOut_Decimals)
                                await this.getRating();
                                let MyContract2 = new web3.eth.Contract(abi, this.state.toAddress)
                                let Amount = await MyContract2.methods.getAmountsOut(transaction.amountIn, [decodedData["params"][2]["value"][0] , '0xdac17f958d2ee523a2206206994597c13d831ec7']).call();
                                transaction.payLoad  =  Amount[1] / 1000000 * transaction.tokenIn_Decimals
                            }  
                            

                            else if (decodedData["name"]=="swapTokensForExactTokens") {
                                let MyContract =      await new web3.eth.Contract(erc20abi,decodedData["params"][2]["value"][0]);
                                transaction.tokenIn = await MyContract.methods.symbol().call().then(function(res) {
                                    return res;
                                })
                                transaction.tokenIn_Decimals = await MyContract.methods.decimals().call()
                                transaction.amountIn    = decodedData['params'][1]['value'] / Math.pow(10,transaction.tokenIn_Decimals)


                                let MyContract1         = new web3.eth.Contract(erc20abi, decodedData['params'][2]['value'][2])
                                transaction.tokenOut    = await MyContract1.methods.symbol().call().then(function(res) {
                                    return res
                                })
                                transaction.TokenOut_Decimals = await MyContract1.methods.decimals().call()
                                transaction.AmountOut   = decodedData['params'][0]['value'] /Math.pow(10,transaction.tokenOut_Decimals)
                                await this.getRating();
                                let MyContract2 = new web3.eth.Contract(abi, this.state.toAddress)
                                let Amount = await MyContract2.methods.getAmountsOut(decodedData['params'][0]['value'], [decodedData["params"][2]["value"][2] , '0xdac17f958d2ee523a2206206994597c13d831ec7']).call();
                                transaction.payLoad  =  Amount[1] / 1000000 * transaction.tokenOut_Decimals
                            }   
                                                       
                            else if(decodedData["name"]=="swapExactETHForTokens"||decodedData["name"]=="swapETHForExactTokens"||decodedData["name"]=="swapExactETHForTokensSupportingFeeOnTransferTokens"){
                                transaction.tokenIn     = 'WETH'
                                transaction.amountIn    = tx.value / Math.pow(10,18)

                                let MyContract  = new web3.eth.Contract(erc20abi, decodedData['params'][1]['value'][1])
                                transaction.tokenOut    = await MyContract.methods.symbol().call().then(function (res) {
                                    return res
                                })

                                transaction.TokenOut_Decimals = await MyContract.methods.decimals().call()
                                transaction.AmountOut   = decodedData['params'][0]['value'] / Math.pow(10, transaction.TokenOut_Decimals)
                                await this.getRating();
                                transaction.payLoad     = transaction.amountIn   * this.state.rating
                            }
                            


                            transaction.ID      = this.state.ID + 1
                            transaction.txHash  = tx.hash
                            transaction.txHashLink = "https://etherscan.io/tx/" + tx.hash
                            let transactions    = this.state.transactions
                            transactions.push(transaction)

                            this.setState(transaction);
                            this.setState({
                                transactions : transactions
                            })
                        }
                    }
                        } catch (err) {
                     console.error(err);
                }
            });
        });
    }

    render () {
        const renderTable = this.state.transactions.map((transaction) => 
            <tr key={transaction.ID}>
                <td>{transaction.timeStamp}</td>
                <td>{transaction.label}</td>
                <td>{transaction.tokenIn}</td>
                <td>{Math.round(transaction.amountIn * 100000) /100000}</td>
                <td>{transaction.tokenOut}</td>
                <td>{Math.round(transaction.AmountOut*100000)/100000}</td>
                <td>{"$"+Math.round(transaction.payLoad)}</td>
                <td><a href={transaction.txHashLink} target="_blank">click here</a></td>
                <td><a href="https://app.uniswap.org/#/swap" target="_blank">Go to Uniswap</a></td>
            </tr>
        )
        
        return (
            <div>
                
                <h2>Uniswap Action Monitor</h2>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Uniswap Router Address</Form.Label>
                        <Form.Control type="text" placeholder="Swap ID" defaultValue={this.state.toAddress}/>
                    </Form.Group> 

                    <InputGroup className="mb-3">
                        
                        <FormControl
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="basic-addon2"
                        />
                        <Button variant="outline-secondary" id="button-addon2">
                       Search
                        </Button>
                    </InputGroup>
                    <Form.Group>
                        <Button onClick={() => this.init()} >start</Button>
                    </Form.Group>
                </Form>

                <Table striped bordered hover overflow="auto" >
                    <thead>
                        <tr>
                            <th>TimeStamp</th>
                            <th>Label</th>
                            <th>Token In</th>
                            <th>Amount In</th>
                            <th>Token Out</th>
                            <th>Amount Out</th>
                            <th>Payload</th>
                            <th>TX Hash</th>
                            <th>Dex</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTable}
                    </tbody>

                </Table>
            </div>
        );
    }
}
export default Display;