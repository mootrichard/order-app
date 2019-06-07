import React, { Component } from 'react';

class OrderSummary extends Component {

  render(){
    const { cartItem } = this.props;
    return (
      <div id="orderSummary">
        <div className="panel clearfix">
          <h4 className="panelTitle">Order Summary</h4>

          <div className="lineItems">
              <div className="lineItem clearfix">
                  <div className="left">
                      <img alt="Cart item" src={cartItem.image_url} />
                  </div>
                  <div className="left">
                      1 × {cartItem.name}
                  </div>
                  <div className="right tabularFigures">
                      <strong>$1.00 USD</strong>
                  </div>
              </div>
          </div>
          <div className="orderSummation clearfix">
              <div className="left">
                <span>Demo Discount</span>
              </div>
              <div className="right "><span>($1.00) USD</span></div>
          </div>
          <div className="orderSummation clearfix">
              <div className="left"><strong>Total</strong></div>
              <div className="right tabularFigures orderTotal"><strong>$0.00 USD</strong></div>
          </div>
        </div>
      </div>
    )
  }
}

export default OrderSummary;
