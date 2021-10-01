import React from 'react';
import TextField from '@material-ui/core/TextField';
import history from './history';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      errorLabel: "",
    }

    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.checkAuthData = this.checkAuthData.bind(this);
  }

  componentDidMount(){
    this.checkAuthData();
  }

  async checkAuthData() {
    let authData = getCookieData();

    if(authData.username && authData.token) { 
      let authCheck = await checkAuth(authData.username, authData.token);

      if(authCheck.length > 0) {
        await history.push("/AdminOrders");
        window.location.reload();
        this.props.changeAuth();
      }
    }
  }

  updateUsername(e) {
    this.setState({username: e.target.value, errorLabel: ""})
  }

  updatePassword(e) {
    this.setState({password: e.target.value, errorLabel: ""})
  }

  async submitLogin() {
    this.setState({ errorLabel: "" })
    let response = await checkLogin(this.state.username, this.state.password);

    if(response.err === undefined) {
      var date = new Date();
      date.setTime(date.getTime()+(2*60*60*1000));
      var expires = date.toGMTString();

      document.cookie = `username=${response.username}; expires=${expires};`;
      document.cookie = `token=${response.token}; expires=${expires};`;

      this.props.changeAuth();

      await history.push("/AdminOrders");
      window.location.reload();
    }
    else if(response.err === "no username found") {
      this.setState({ errorLabel: "Username/password is incorrect." })
    }
    else {
      this.setState({ errorLabel: "An unexpected error occured." })
    }
  }

  render() {
    return (
      <div>
        <div className="tabContent">
          <div style={{margin: "20px", marginTop: "10px", marginBottom: "10px", display: "inline"}}>
            <h3>Login</h3>
            <br/>
            <br/>
            <div className="all-items">
            <div className="input-item">
              <p >Username:</p>
                <TextField
                className="input-item-field"
                variant="outlined"
                id="username"
                type="text"
                onChange={this.updateUsername}
                value={this.state.username}
                />
            </div><br/>
            <div className="input-item">
                <p >Password:</p>
                <TextField
                className="input-item-field"
                variant="outlined"
                id="password"
                type="password"
                onChange={this.updatePassword}
                value={this.state.password}
                />
            </div><br/>
            </div>
            <button className="raffle-button" onClick={this.submitLogin}>Submit</button>
            <br/><br/><br/>
            <p className="errorLabel" >{ this.state.errorLabel }</p>
            </div>
        </div>
      </div>
    );
  }
}

async function checkLogin(username, password) {
  let myJson = {};
  myJson.username = username;
  myJson.password = password;
  let data = {};

  await (async () => {
    const rawResponse = await fetch('/api/v1/checkLogin', {
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

export default LoginForm;