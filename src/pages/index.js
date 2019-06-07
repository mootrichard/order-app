import React, { Component } from 'react';
import { Modal, Button, ModalBody, } from 'reactstrap';

import Layout from '../components/layout'
import SEO from '../components/seo'
import { graphql, Link } from 'gatsby'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/main.css'


const priceFormat = (number) => {
  return `$${(number/100).toFixed(0)}`
}

class IndexPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      isOpen: "",
      modal: false,
      modalItem: {
        node: {
          name: "",
          image_url: "",
          description: "",
          variations: [
            {
              price_money: {
                amount: 0
              }
            }
          ]
        }
      }
    }
    this.setModalItem = this.setModalItem.bind(this);
    this.toggle = this.toggle.bind(this);
    this.pushItemToCart = this.pushItemToCart.bind(this);
  }
  pushItemToCart(item){
    localStorage.setItem('cart', JSON.stringify(item));
  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  setModalItem(e){
    // console.log(e.target);
    this.setState({
      modalItem: e,
    })
    this.toggle();
  }
  render(){
    const { data } = this.props;
    const { modalItem, modal } = this.state;
    return (<Layout displayBack={false} >
      <SEO title="Home" keywords={[`shop`, `swag`, `Square`]} />
      <div id="products" className="" >
        {
          data.allSquareCatalogItem.edges.map((elem, ind)=>{
            return (
              <div key={elem.node.id} id={elem.node.id} className="product" onClick={()=>{
                this.setModalItem(elem);
              }}>
                  <div className="imageContainer">
                      <img alt={elem.node.name} className="productImage" src={elem.node.image_url} />
                      <div className="imageOverlay">
                          <button>View Details</button>
                      </div>
                  </div>
              </div>
            )
          })
        }
      </div>
      <Modal
        className="clearfix"
        size="lg"
        isOpen={modal}
        toggle={this.toggle}
        backdrop={true}
        centered={true}
      >
        <ModalBody>
            <Button className="close" onClick={this.toggle}>Close</Button>
            <img alt={modalItem.node.name} className="modalImage" src={modalItem.node.image_url}  />
            <div className="productInfo">
                <h2 className="productTitle">{modalItem.node.name}</h2>
                <p className="productDescription">{modalItem.node.description}</p>
                <div className="productMeta">
                      <h2 className="productCost">
                            <span className="green">{priceFormat(modalItem.node.variations[0].price_money.amount)}</span>*
                      </h2>
                    <span className="helperText">*We"re not actually going to charge you.</span>
                    <form style={{marginBottom: 0}}>
                        <input name="itemVarID" type="hidden" readOnly value={modalItem.node.id} style={{display: 'none'}} />
                        <input name="price" type="hidden" readOnly value={modalItem.node.variations[0].price_money.amount} style={{display: 'none'}} />
                        <input name="name" type="hidden" readOnly value={modalItem.node.name} style={{display: 'none'}} />
                        <Link to="/checkout" onClick={()=>{
                          this.pushItemToCart(modalItem)
                        }}><Button type="submit" className="productPurchase">Buy This</Button></Link>
                    </form>
                </div>
            </div>
        </ModalBody>
      </Modal>
    </Layout>
    )
  }
}

export const query = graphql`
  query {
    allSquareCatalogItem{
      edges {
        node {
          id
          name
          description
          image_url
          variations{
            id
            name
            price_money {
              amount
            }
          }
        }
      }
    }
  }
`

export default IndexPage
