import React, {Component, useState, handleShow} from 'react';
import { InputGroup, FormControl, Button, Modal } from 'react-bootstrap';
import { MDBDataTable } from 'mdbreact';

class WalletList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            walletAddress : 0,
            walletLabel : '',
            walletListId : 0,
            walletLists : []
        }
    }

    render () {
      const rows = this.state.walletLists
        const data = {
            columns: [
              {
                label: 'WalletID',
                field: 'walletListId',
                sort: 'asc',
                width: 150
              },
              {
                label: 'Wallet Address',
                field: 'WalletAddress',
                sort: 'asc',
                width: 270
              },
              {
                label: 'Label',
                field: 'walletLabel',
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
                
                <Example/>
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
    validate();
    checkRepeat();
    
    setShow(false)
  }


  const handleAddress = (e) => {
    addAddress  = e.target.value
  }


  const handleLabel = (e) => {
    addLabel  = e.target.value
  }

  const validate = () => {

  }

  const checkRepeat = () =>{

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