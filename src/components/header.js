import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Auth } from 'aws-amplify';

Auth.currentAuthenticatedUser()
    .then(user => console.log(user))
    .catch(error => console.log(error))

class Header extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: false
    }
  }

  async UNSAFE_componentWillMount(){
    const user = await Auth.currentAuthenticatedUser()
    this.setState({
      user
    })
  }

  render() {
  const { siteTitle, displayBack } = this.props;
  const { user } = this.state;
  console.log(user);
  return (
    <header>
          {
            displayBack && <div className="left">
              <a href="/" className="back">Back</a>
            </div>
          }
          <Link
            to="/"
            style={{
              position: 'absolute',
              left: 'calc(50% - 17px)',
              color: `white`,
              textDecoration: `none`,
              margin: '0 auto'
            }}
            >
            <svg style={{
              color: `white`,
              textDecoration: `none`,
              margin: '0 auto'
            }} className="center" width="32px" height="32px" viewBox="0 0 32 32" version="1.1">
                <title>Square : Logo</title>
                <defs/>
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="01-ecomm_demo-storefront" transform="translate(-704.000000, -48.000000)" fill="#373F4A">
                        <path d="M724,67 C724,67.562 723.559,68 723,68 L717,68 C716.44,68 716,67.562 716,67 L716,61 C716,60.439 716.44,60 717,60 L723,60 C723.559,60 724,60.439 724,61 L724,67 L724,67 Z M730,72 C730,72.898 728.898,74 728,74 L712,74 C711.101,74 710,72.898 710,72 L710,56 C710,55.102 711.101,54 712,54 L728,54 C728.898,54 730,55.102 730,56 L730,72 L730,72 Z M736,53 C736,50.053 733.945,48 731,48 L709,48 C706.053,48 704,50.388 704,53.335 L704,75 C704,77.945 706.053,80 709,80 L731,80 C733.945,80 736,77.945 736,75 L736,53 L736,53 Z" id="Square-:-Logo"/>
                    </g>
                </g>
            </svg>
          </Link>
          <Link className="right" to="/account">{(this.state.user) ? this.state.user.attributes.name : "Account"}</Link>
    </header>
  )}
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
