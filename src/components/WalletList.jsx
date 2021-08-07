import React, {Component} from 'react';
import { Form } from 'react-bootstrap';
import { MDBDataTable } from 'mdbreact';


class WalletList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            walletAddress : 0,
            walletLabel : '',
            walletListId : 0,

        }
    }





    render () {

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
         
          };
       
        
        
        return (
            <div>
                <h2>Wallet List</h2>
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

