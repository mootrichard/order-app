import React, { Component } from 'react';
import PaymentDetails from '../components/PaymentDetails';
import OrderSummary from '../components/OrderSummary';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/main.css'
import '../css/sqpaymentform.css';
import Layout from '../components/layout';

class CheckoutWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  UNSAFE_componentWillMount() {
    const that = this;
    if(typeof document !== `undefined` && typeof window !== `undefined`){
      let sqPaymentScript = document.createElement("script");
      sqPaymentScript.src = "https://js.squareup.com/v2/paymentform";
      sqPaymentScript.type = "text/javascript";
      sqPaymentScript.async = false;
      sqPaymentScript.onload = () => {
        that.setState({
          loaded: true
        });
      };
      document.getElementsByTagName("head")[0].appendChild(sqPaymentScript);
    }
  }

  render() {
    if(typeof document !== `undefined` && typeof window !== `undefined`){
      return (
        this.state.loaded && <Checkout paymentForm={window.SqPaymentForm} />
      );
    } else {
      return ( <div></div> )
    }
  }
}

class Checkout extends Component {
  constructor(props){
    super(props);
    const cart = JSON.parse(localStorage.getItem('cart'));
    this.state = {
      cartItem: cart.node,
      nonce: undefined,
      googlePay: false,
      applePay: false,
      masterpass: false,
      customer: {
        name: "",
        email: ""
      }
    };
    this.requestCardNonce = this.requestCardNonce.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  requestCardNonce() {
    this.paymentForm.requestCardNonce();
  }

  componentDidMount() {
    const config = {
      applicationId: "sq0idp-CFW8Y_2T55dtejd69UMLQg",
      locationId: "6GRJ6DQFJ5DZ5",
      inputClass: "sq-input",
      autoBuild: false,
      inputStyles: [
        {
          fontSize: "16px",
          fontFamily: "Helvetica Neue",
          padding: "0px",
          color: "#373F4A",
          backgroundColor: "transparent",
          lineHeight: "28px",
          placeholderColor: "#E0E2E3",
          _webkitFontSmoothing: "antialiased",
          _mozOsxFontSmoothing: "grayscale"
        }
      ],
      applePay: {
        elementId: "sq-apple-pay"
      },
      masterpass: {
        elementId: "sq-masterpass"
      },
      googlePay: {
        elementId: "sq-google-pay"
      },
      cardNumber: {
        elementId: "sq-card-number",
        placeholder: "• • • •  • • • •  • • • •  • • • •"
      },
      cvv: {
        elementId: "sq-cvv",
        placeholder: "CVV"
      },
      expirationDate: {
        elementId: "sq-expiration-date",
        placeholder: "MM/YY"
      },
      postalCode: {
        elementId: "sq-postal-code",
        placeholder: "Zip"
      },
      callbacks: {
        methodsSupported: methods => {
          if (methods.googlePay) {
            this.setState({
              googlePay: methods.googlePay
            });
          }
          if (methods.applePay) {
            this.setState({
              applePay: methods.applePay
            });
          }
          if (methods.masterpass) {
            this.setState({
              masterpass: methods.masterpass
            });
          }
          return;
        },
        createPaymentRequest: () => {
          return {
            requestShippingAddress: false,
            requestBillingInfo: true,
            currencyCode: "USD",
            countryCode: "US",
            total: {
              label: "Square Swag Store",
              amount: "0.00",
              pending: false
            },
            lineItems: [
              {
                label: "Subtotal",
                amount: "0.00",
                pending: false
              }
            ]
          };
        },
        cardNonceResponseReceived: (errors, nonce, cardData) => {
          if (errors) {
            // Log errors from nonce generation to the Javascript console
            console.log("Encountered errors:");
            errors.forEach(function(error) {
              console.log("  " + error.message);
            });

            return;
          }
          this.setState({
            nonce: nonce
          });
          if(typeof document !== `undefined` && typeof window !== `undefined`){
            fetch('/pay', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                nonce: nonce,
                item: this.state.cartItem,
                customer: this.state.customer
              })
            }).then((resp)=>{
              if(resp.ok){
                window.location.pathname = '/success'
              }
            })
          }
        },
        unsupportedBrowserDetected: () => {},
        inputEventReceived: inputEvent => {
          switch (inputEvent.eventType) {
            case "focusClassAdded":
              break;
            case "focusClassRemoved":
              break;
            case "errorClassAdded":
              // document.getElementById("error").innerHTML =
              //   "Please fix card information errors before continuing.";
              break;
            case "errorClassRemoved":
              // document.getElementById("error").style.display = "none";
              break;
            case "cardBrandChanged":
              if (inputEvent.cardBrand !== "unknown") {
                this.setState({
                  cardBrand: inputEvent.cardBrand
                });
              } else {
                this.setState({
                  cardBrand: ""
                });
              }
              break;
            case "postalCodeChanged":
              break;
            default:
              break;
          }
        },
        paymentFormLoaded: function() {
          // document.getElementById("name").style.display = "inline-flex";
        }
      }
    };
    this.paymentForm = new this.props.paymentForm(config);
    this.paymentForm.build();
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState((prevState)=> {
      prevState.customer[name] = `${value}`;
      return prevState;
    })
  }

  render(){
    const { cartItem, googlePay, applePay, masterpass } = this.state;
    return (
      <Layout displayBack={true}>
        <div className="">
          {/* <header className="container">
              <div className="left">
                  <a href="/" className="back">Back</a>
              </div>
              <div id="square-logo">
              </div>
          </header> */}
          <h1 className="pageTitle">Review &amp; Complete Your Order</h1>
          <div style={{width: '960px', margin: '0 auto'}} className="">
          <PaymentDetails handleChange={this.handleChange} requestCardNonce={this.requestCardNonce} googlePay={googlePay} applePay={applePay} masterpass={masterpass} />
          <OrderSummary cartItem={cartItem} />
          <div style={{
            width: '376px',
            margin: '0 12px',
            float: 'left',
            padding: 0
          }}>
          {/* <div className="button-grid">
            <button id="sq-creditcard" className="button-credit-card" onClick={this.requestCardNonce}>Pay with Card</button>
            <button style={{ display: this.state.googlePay ? "inline-block" : "none" }} id="sq-google-pay" name="sq-google-pay" className="sq-input full" ></button>
            <button style={{ display: this.state.applePay ? "inline-block" : "none" }} id="sq-apple-pay" name="sq-apple-pay" className="sq-input full" ></button>
            <button style={{ display: this.state.masterpass ? "inline-block" : "none" }} id="sq-masterpass" name="sq-masterpass" className="sq-input full" ></button>
          </div> */}
          </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default CheckoutWrapper
