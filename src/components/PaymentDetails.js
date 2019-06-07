import React, { Component } from 'react';

class PaymentDetails extends Component {

  render(){
    const { handleChange } = this.props;
    return (
      <div id="paymentDetails" className="panel">
        <h4 className="panelTitle">Payment Details</h4>

        <div style={{visibility: 'visible'}} id="sq-ccbox">
            <div id="nonce-form" onSubmit={()=>{}}>
                <div className="">
                    <legend>Your Information</legend>
                    <input onChange={handleChange} className="sq-input full" type="text" name="name" id="name" placeholder="Full name" />
                    <input onChange={handleChange} className="sq-input full" type="email" name="email" id="email" placeholder="Email address" />
                </div>
                <div className="">
                    <legend>Card Details</legend>
                    <div id="sq-card-number" name="sq-card-number" className="sq-input" ></div>
                    <div id="sq-cvv" name="sq-cvv" className="sq-input" ></div>
                    <div id="sq-expiration-date" name="sq-expiration-date" className="sq-input" ></div>
                    <div id="sq-postal-code" name="sq-postal-code" className="sq-input" ></div>
                </div>
                <input type="hidden" id="card-nonce" name="nonce" />
                <input type="hidden" id="itemVarID" name="itemVarID" value="AU7ZKVRYDSWHJT7YEBFP7ZRF" />
            </div>
          </div>
        </div>
    )
  }
}

export default PaymentDetails;
