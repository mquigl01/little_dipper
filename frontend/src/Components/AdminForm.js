import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";

class AdminForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    };

    this.updateAuth = this.updateAuth.bind(this);
    this.removeAuth = this.removeAuth.bind(this);
    this.checkAuthData = this.checkAuthData.bind(this);
  }

  componentDidMount() {
    this.checkAuthData();
  }

  async checkAuthData() {
    let authData = getCookieData();

    if(authData.username && authData.token) { 
      let authCheck = await checkAuth(authData.username, authData.token);

      if(authCheck.length > 0) {
        this.setState({auth: true})
      }
      else {
        this.setState({auth: false})
      }
    }
    else {
      this.setState({auth: false})
    }
  }

  updateAuth() {
    this.setState({
      auth: true
    })
  }

  removeAuth() {
    this.setState({
      auth: false
    })
  }


  render() {
    return (
      <div>
        { this.state.auth &&
                          <div>
                            <br/>
                            <Link  onClick={this.closeMenu.bind(this)} style={{textDecoration: "none"}} to="/AdminOrders">
                              <p style={{mobileOptions}}>admin - orders</p>
                            </Link>
                            <br/>
                            <Link  onClick={this.closeMenu.bind(this)} style={{textDecoration: "none"}} to="/AdminProducts">
                              <p style={{mobileOptions}}>admin - products</p>
                            </Link>
                            <br/>
                            <Link  onClick={this.closeMenu.bind(this)} style={{textDecoration: "none"}} to="/Colours">
                              <p style={{mobileOptions}}>admin - colours</p>
                            </Link>
                          </div>
        }
      </div>
    );
  }
}

async function checkAuth(username, token) {
  let myJson = {};
  myJson.username = username;
  myJson.token = token;
  let data = {};

  await (async () => {
    const rawResponse = await fetch('/api/v1/checkAuth', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myJson)
    });
    data = await rawResponse.json();
  })();

  console.log(data);

  return data;
}

// loads the date object from the savedDate cookie
// returns the date as a string or null if it does not exist
// can be converted back to date with new Date(dateString)
function getCookieData() {
  const cookieObj = Object.fromEntries(
    document.cookie.split("; ").map(c => {
      const [key, ...v] = c.split("=");
      return [key, v.join("=")];
    })
  );
  return cookieObj || [];
}

async function getProducts() {
  let data = {};

  await (async () => {
    const rawResponse = await fetch('/api/v1/getProducts', {
      method: 'get'
    });
    data = await rawResponse.json();
  })();

  return data;
}


export default AdminForm;