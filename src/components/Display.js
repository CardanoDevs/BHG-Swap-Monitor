import React, {Component} from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import Web3 from 'web3';
import abiDecoder from  'abi-decoder'
import { abi } from './abi.js';
import axios from 'axios';
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

    componentWillMount() {
          this.getRating()
    }

    async stop(){
        subscription.unsubscribe(function(error, success){
            if(success)
                console.log('Successfully unsubscribed!');
        });

    }



    async init() {
            subscription.on("data", async (txHash) => {
             
                try {
                    let tx = await web3.eth.getTransaction(txHash);
                    abiDecoder.addABI(abi);
                    const decodedData = abiDecoder.decodeMethod(tx.input);
                        if(tx.to == this.state.toAddress) {
                            if(decodedData["name"]=="swapExactTokensForETH"||decodedData["name"]=="swapTokensForExactETH"||decodedData["name"]=="swapExactTokensForETHSupportingFeeOnTransferTokens"||
                               decodedData["name"]=="swapTokensForExactTokens"||decodedData["name"]=="swapExactTokensForTokens"||decodedData["name"]=="swapExactTokensForTokensSupportingFeeOnTransferTokens"||
                               decodedData["name"]=="swapExactETHForTokens"||decodedData["name"]=="swapETHForExactTokens"||decodedData["name"]=="swapExactETHForTokensSupportingFeeOnTransferTokens"){

                            let transaction = {
                                fromAddress : tx.from,
                                label : 'john',
                                timeStamp : new Date().toISOString(),
                            }
                            console.log(decodedData["name"])
                            //--------------------------------------------------------------------
                            if (decodedData["name"]=="swapExactTokensForETH"||decodedData["name"]=="swapTokensForExactETH"||decodedData["name"]=="swapExactTokensForETHSupportingFeeOnTransferTokens"){
                                let MyContract = new web3.eth.Contract(erc20abi,decodedData["params"][2]["value"][0]);
                                transaction.tokenIn = await MyContract.methods.symbol().call().then(function(res) {
                                    return res;
                                })
                                transaction.amountIn    = decodedData['params'][0]['value']
                                transaction.tokenOut    = 'WETH'
                                transaction.AmountOut   = decodedData['params'][1]['value']
                                await this.getRating();
                                transaction.payLoad     = this.state.rating * transaction.AmountOut / 1000000000000000000
                            } 
                            

                            else if (decodedData["name"]=="swapTokensForExactTokens"||decodedData["name"]=="swapExactTokensForTokens"||decodedData["name"]=="swapExactTokensForTokensSupportingFeeOnTransferTokens") {

                                let MyContract = new web3.eth.Contract(erc20abi,decodedData["params"][2]["value"][0]);
                                transaction.tokenIn = await MyContract.methods.symbol().call().then(function(res) {
                                    return res;
                                })
                                transaction.amountIn    = decodedData['params'][1]['value']
                                let MyContract1         = new web3.eth.Contract(erc20abi, decodedData['params'][2]['value'][2])
                                transaction.tokenOut    = await MyContract1.methods.symbol().call().then(function(res) {
                                    return res
                                })

                                transaction.AmountOut   = decodedData['params'][0]['value']
                                await this.getRating();
                                let MyContract2 = new web3.eth.Contract(abi, this.state.toAddress)
                                let ethAmount = await MyContract2.methods.getAmountsOut(decodedData['params'][1]['value'], [decodedData["params"][2]["value"][0] , decodedData["params"][2]["value"][1]]).call();
 
                                transaction.payLoad     = this.state.rating * ethAmount[1] / 1000000000000000000
                            }   
                            
                            

                            else if(decodedData["name"]=="swapExactETHForTokens"||decodedData["name"]=="swapETHForExactTokens"||decodedData["name"]=="swapExactETHForTokensSupportingFeeOnTransferTokens"){
                                transaction.tokenIn     = 'WETH'
                                transaction.amountIn    = tx.value
                                let MyContract  = new web3.eth.Contract(erc20abi, decodedData['params'][1]['value'][1])
                                transaction.tokenOut    = await MyContract.methods.symbol().call().then(function (res) {
                                    return res
                                })
                                transaction.AmountOut   = decodedData['params'][0]['value']
                                await this.getRating();
                                transaction.payLoad     = tx.value * this.state.rating / 100000000000000000
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
    }

    render () {
        const renderTable = this.state.transactions.map((transaction) => 
            <tr key={transaction.ID}>
                <td>{transaction.timeStamp}</td>
                <td>{transaction.label}</td>
                <td>{transaction.tokenIn}</td>
                <td>{Math.round(transaction.amountIn)}</td>
                <td>{transaction.tokenOut}</td>
                <td>{Math.round(transaction.AmountOut)}</td>
                <td>{"$"+Math.round(transaction.payLoad)}</td>
                <td><a href={transaction.txHashLink} target="_blank">{transaction.txHash}</a></td>
                <td><a href="https://app.uniswap.org/#/swap" target="_blank">Go to Uniswap</a></td>
            </tr>
        )
        
        return (
           
            <div>
                <TopNav />
                <h2>Monitor</h2>
                
                <Form>
                    <Form.Group >
                        <Form.Label>Uniswap Address</Form.Label>
                        <Form.Control type="text" placeholder="Swap ID" defaultValue={this.state.toAddress}/>
                    </Form.Group> 
                    <Form.Group>
                        <Form.Label>From Address</Form.Label>
                        <Form.Control type="text" placeholder="0x" />
                    </Form.Group> 
                    <Form.Group>
                        <Button onClick={() => this.init()} >start</Button>
                        <Button onClick={() => this.stop() } >stop</Button>
                    </Form.Group>
                </Form>

                <Table responsive>
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

