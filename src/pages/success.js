import React, { Component } from 'react';

import Layout from '../components/layout';
import '../components/main.css';

class Success extends Component {
  constructor(props){
    super(props)
    this.state ={
      cartItem: {}
    }
  }

  UNSAFE_componentWillMount(){
    if(typeof document !== `undefined` && typeof window !== `undefined`){
      const cart = JSON.parse(localStorage.getItem('cart'));
      this.setState({
        cartItem: cart.node
      })
    }
  }

  render() {
    const { cartItem } = this.state;
    return (
      <Layout displayBack={false}>
        <div className="container">
        <h1 className="pageTitle">Your order was successfully processed.</h1>
          <div id="orderConfirmation">
            <div className="panel">
                <img className="orderImage" alt={cartItem.name} src={cartItem.image_url} />
                <h3>{cartItem.name}</h3>
                <p>
                    Please see a Square representative to receive your item.
                </p>
            </div>

            <a className="button" href="./">Continue Shopping</a>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Success;
