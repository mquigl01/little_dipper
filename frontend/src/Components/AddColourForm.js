import React from 'react';
import TextField from '@material-ui/core/TextField';
import history from './history';

class AddColoursForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        name: "",
        hex: "",
        errorLabel: "",
        valid: false,
    }

    this.handleStateChange = this.handleStateChange.bind(this);
    this.getProductData = this.getProductData.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.addColour = this.addColour.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
  }

  componentDidMount(){
    this.getProductData();
  }

  async getProductData() {
    let authData = getCookieData();
    console.log(authData);

    if(authData.username && authData.token) { 
      let authCheck = checkAuth(authData.username, authData.token);

      if(authCheck.length === 0) {
        await history.push("/login");
        window.location.reload();
        this.props.changeRemoveAuth();
      }
    }
    else {
      await history.push("/login");
      window.location.reload();
      this.props.changeRemoveAuth();
    }
  }

  handleStateChange = async(e) => {
    await this.setState({ [e.target.id]: e.target.value });
    this.validateInputs();
  }

  async cancelEdit() {
    await history.push("/AdminColours");
    window.location.reload();
  }

  async addColour() {
    if(this.validateInputs) {
      let myJson = {};
      myJson.name = this.state.name;
      myJson.hex = this.state.hex;

      let response = await addColour(myJson);

      if(response.warningCount === 0) {
        await history.push("/AdminColours");
        window.location.reload();
      }
    }
    else {
        console.log("Invalid input");
    }
  }

  validateInputs() {
    this.setState({errorLabel: ""})
    this.setState({valid: true})

    return true;
  }

  render() {
    return (
      <div className="tabContent">
        <h3>add colour</h3>
        <br/>
          <div>
            <div className="input-item">
              <p>Name:</p>
              <TextField className="input-item-field" id="name" variant="outlined" required onChange={this.handleStateChange} value={this.state.name}/> 
            </div><br/>

            <div className="input-item">
              <p>Hex:</p>
              <TextField className="input-item-field" id="hex" variant="outlined" required onChange={this.handleStateChange} value={this.state.hex}/> 
            </div><br/>

            <button className="cancel-button" onClick={this.cancelEdit}>Cancel</button>

            { this.state.valid === true &&
              <button className="raffle-button" onClick={this.addColour}>Submit</button>
            }

            { this.state.valid === false &&
              <button className="raffle-button-disabled">Submit</button>
            }

            <br/><br/><br/>
            <p className="errorLabel" >{ this.state.errorLabel }</p>
            <br/>
          </div>
      </div>
    );
  }
}

async function addColour(myJson) {
    let data = {};
  
    await (async () => {
      const rawResponse = await fetch('/api/v1/addColour', {
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

export default AddColoursForm;