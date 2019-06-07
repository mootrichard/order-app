import React, { Component } from 'react'
import Layout from '../components/layout';
import { withAuthenticator } from 'aws-amplify-react';
import Amplify, { Auth } from 'aws-amplify';
import awsmobile from '../aws-exports';
import { Button } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css'

Amplify.configure(awsmobile);

class AccountPage extends Component {
  render(){
    Auth.currentUserInfo().then(user => console.log(user));
    return (
      <Layout displayBack={true}>
        <div className="container">
          <h1>Account</h1>
          <table>
            <tbody>
              <tr>
                <td>
                  Name:
                </td>
                <td>
                  {this.props.authData.attributes.name}
                </td>
              </tr>
              <tr>
                <td>
                  Email:
                </td>
                <td>
                  {this.props.authData.attributes.email}
                </td>
              </tr>
              <tr>
                <td>
                  Address:
                </td>
                <td>
                  {this.props.authData.attributes.address}
                </td>
              </tr>
            </tbody>
          </table>
          <Button className="primary right" onClick={async()=>{
            await Auth.signOut()
            if (typeof window !== 'undefined') {
              window.location = '/'
            }
          }} >Signout</Button>
        </div>
      </Layout>
    )
  }
}

export default withAuthenticator(AccountPage, {
  signUpConfig: {
    hideAllDefaults: false,
    hiddenDefaults: ['phone_number', 'email'],
    signUpFields: [
      {
        label: 'Email',
        key: 'username',
        require: true,
        displayOrder: 1,
        type: 'email'
      },
      {
        label: 'Password',
        key: 'password',
        require: true,
        displayOrder: 2,
        type: 'string'
      },
      {
        label: 'Name',
        key: 'name',
        require: false,
        displayOrder: 3,
        type: 'string'
      },
      {
        label: 'Address',
        key: 'address',
        require: false,
        displayOrder: 4,
        type: 'string'
      },
    ]
  }
})
