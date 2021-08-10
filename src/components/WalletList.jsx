import React, {Component, useState, handleShow} from 'react';
import { InputGroup, FormControl, Button, Modal } from 'react-bootstrap';
import { MDBDataTable } from 'mdbreact';
import { database, storage, auth } from './firebase/firebase';

const flag = true;

class WalletList extends Component {


    constructor(props) {
        super(props)
        this.state = {
            walletLists : []
        }
    }

    async componentWillMount() {
      await this.Init()
    }

    Init(){
        database.ref('wallet/').get().then((snapshot) => {
            if (snapshot.exists) {
              var walletList = [];
                const newArray = snapshot.val();
                if (newArray) {
                    Object.keys(newArray).map((key, index) => {
                        const value = newArray[key];
                        walletList.push({
                            id: index,
                            Address : value.Address,
                            Label   : value.Label,
                        })
                    })
                }
                this.setState({
                walletLists : walletList
              })
            }
        });
    }

    render () {
      const rows = this.state.walletLists
        const data = {
            columns: [
              {
                label: 'WalletID',
                field: 'id',
                sort: 'asc',
                width: 150
              },
              {
                label: 'Wallet Address',
                field: 'Address',
                sort: 'asc',
                width: 270
              },
              {
                label: 'Label',
                field: 'Label',
                sort: 'asc',
                width: 200
              },
              {
                label: 'Actions',
                field: 'age',
                sort: 'asc',
                width: 100
              }
            ],
            rows : rows
          };
        return (
            <div>
                <h2>MY WALLET LIST</h2>
                <hr/><br/><br/>
                
                <Example walletData = {this.state.walletLists}/>
                <br/><br/>
                
                <MDBDataTable
                striped
                bordered
                small
                data={data}
            />
            </div>
        );
    }



    
}


export default WalletList;


function Example() {

  var  addLabel = ''
  var  addAddress = ''
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const addwallet = () =>{
      console.log(addLabel)
      console.log(addAddress)
      console.log(this.pro)
      setShow(false)
      const walletList= {
        Label   : addLabel,
        Address : addAddress
      }
      var userListRef = database.ref('wallet')
      var newUserRef = userListRef.push();
      newUserRef.set(walletList);
  }
  const handleAddress = (e) => {
    addAddress  = e.target.value
  }

  const handleLabel = (e) => {
    addLabel  = e.target.value
  }
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Wallet
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon3">
            Address
          </InputGroup.Text>
          <FormControl id="basic-url1" aria-describedby="basic-addon3"  type="text" 
          placeholder="0x" defaultValue={addAddress} onChange={handleAddress} />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon3">
             Label 
          </InputGroup.Text>
          <FormControl id="basic-url" aria-describedby="basic-addon3" type="text" 
          placeholder="open Value" defaultValue={addLabel} onChange={handleLabel} />
        </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary"   onClick={addwallet}>
            Save Address
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}