import React from 'react';
import TextField from '@material-ui/core/TextField';
import history from './history';

class EditOrderForm extends React.Component {
  constructor(props) {
    super(props);

    let pathname = props.location.pathname;
    let id = pathname.split("/")[2];

    this.state = {
        id: id,
        notes: "",
        status: "",
        email: "",
        date_added: "",
        details: "",
        first_name: "",
        last_name: "",
        postal_code: "",
        po_box: "",
        address_line_one: "",
        address_line_two: "",
        city: "",
        country: "",
        province: "",
        errorLabel: "",
        valid: false,
    }

    this.handleStateChange = this.handleStateChange.bind(this);
    this.getOrderData = this.getOrderData.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
  }

  componentDidMount(){
    this.getOrderData();
  }

  async getOrderData() {
    let authData = getCookieData();
    console.log(authData);

    if(authData.username && authData.token) { 
      let authCheck = checkAuth(authData.username, authData.token);

      if(authCheck.length === 0) {
        await history.push("/login");
        window.location.reload();
        this.props.changeRemoveAuth();
      }
      else {
        let myOrder = await getOrderDetails(this.state.id);
        console.log(myOrder)
        
        this.setState({date_added: myOrder[0].date_added});
        this.setState({status: myOrder[0].status});
        this.setState({notes: myOrder[0].notes});
        this.setState({email: myOrder[0].email});
        this.setState({details: myOrder[0].details});

        this.setState({first_name: myOrder[0].first_name});
        this.setState({last_name: myOrder[0].last_name});
        this.setState({city: myOrder[0].city});
        this.setState({po_box: myOrder[0].po_box});
        this.setState({postal_code: myOrder[0].postal_code});
        this.setState({province: myOrder[0].province});
        this.setState({country: myOrder[0].country});
        this.setState({address_line_one: myOrder[0].address_line_one});
        this.setState({address_line_two: myOrder[0].address_line_two});

        this.props.changeAuth();
        this.setState({loading: false})
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
    await history.push("/AdminOrders");
    window.location.reload();
  }

  async updateOrder() {
    if(this.validateInputs) {
      let myJson = {};
      myJson.id = this.state.id;
      myJson.status = this.state.status;
      myJson.notes = this.state.notes;
      myJson.details = this.state.details;
      myJson.date_added = this.state.date_added;
      myJson.first_name = this.state.first_name;
      myJson.last_name = this.state.last_name;
      myJson.email = this.state.email;
      myJson.phone = this.state.phone;
      myJson.address_line_one = this.state.address_line_one;
      myJson.address_line_two = this.state.address_line_two;
      myJson.postal_code = this.state.postal_code;
      myJson.city = this.state.city;
      myJson.po_box = this.state.po_box;
      myJson.province = this.state.province;
      myJson.country = this.state.country;

      let response = await updateOrderData(myJson);

      if(response.insertId !== undefined && response.insertId !== 0) {
        await history.push("/AdminOrders");
        window.location.reload();
      }
    }
    else {
        console.log("Invalid input");
    }
  }

  validateInputs() {
    console.log(this.state.postal_code)
    if(!(this.state.email.includes("@")) && this.state.email !== "") {
      this.setState({errorLabel: "You must enter a valid email address"})
      this.setState({valid: false})
      return false;
    }
    else if(!(this.state.email.includes(".")) && this.state.email !== "") {
      this.setState({errorLabel: "You must enter a valid email address"})
      this.setState({valid: false})
      return false;
    }
    /*else if(this.state.postal_code.length !== 7 && this.state.postal_code.length !== 0) {
      this.setState({errorLabel: "Postal code must be in the format A1A 1A1"})
      this.setState({valid: false})
      return false;
    }
    else if((this.state.postal_code.length !== 0 && !(this.state.postal_code[1] >= '0' && this.state.postal_code[1] <= '9')) || 
    !(this.state.postal_code[4] >= '0' && this.state.postal_code[4] <= '9') ||
    !(this.state.postal_code[6] >= '0' && this.state.postal_code[6] <= '9')) {
      this.setState({errorLabel: "Postal code must be in the format A1A 1A1"})
      this.setState({valid: false})
      return false;
    }
    else if((this.state.postal_code.length !== 0 && !(this.state.postal_code[0].match(/[a-z]/i))) ||
    !(this.state.postal_code[2].match(/[a-z]/i)) ||
    !(this.state.postal_code[5].match(/[a-z]/i))) {
      this.setState({errorLabel: "Postal code must be in the format A1A 1A1"})
      this.setState({valid: false})
      return false;
    }
    else if(this.state.postal_code.length !== 0 && this.state.postal_code[3] !== ' ') {
      this.setState({errorLabel: "Postal code must be in the format A1A 1A1"})
      this.setState({valid: false})
      return false;
    }*/

    this.setState({errorLabel: ""})
    this.setState({valid: true})

    return true;
  }

  render() {
    return (
      <div className="tabContent">
        <h3>Edit Order Details</h3>
        <br/>
          <div>
            <div className="input-item">
            <p>Status:</p>
              <TextField className="input-item-field" id="status" variant="outlined" required onChange={this.handleStateChange} value={this.state.status}/> 
            </div><br/>

            <div className="input-item">
              <p>My Notes:</p>
              <TextField className="input-item-field" id="notes" variant="outlined" required onChange={this.handleStateChange} value={this.state.notes}/> 
            </div><br/>

            <div className="input-item">
              <p>Details:</p>
              <TextField className="input-item-field" id="details" variant="outlined" required onChange={this.handleStateChange} value={this.state.details}/> 
            </div><br/>

            <div className="input-item">
              <p>Firstname:</p>
              <TextField className="input-item-field" id="first_name" variant="outlined" required onChange={this.handleStateChange} value={this.state.first_name}/> 
            </div><br/>

            <div className="input-item">
              <p>Lastname:</p>
              <TextField className="input-item-field" id="last_name" variant="outlined" required onChange={this.handleStateChange} value={this.state.last_name}/> 
            </div><br/>

            <div className="input-item">
              <p>Email:</p>
              <TextField className="input-item-field" id="email" variant="outlined" required onChange={this.handleStateChange} value={this.state.email}/> 
            </div><br/>
            
            <div className="input-item">
              <p>Phone:</p>
              <TextField className="input-item-field" id="phone" variant="outlined" required onChange={this.handleStateChange} value={this.state.phone}/> 
            </div><br/><br/>

            <div className="input-item">
              <p>PO Box:</p>
              <TextField className="input-item-field" id="po_box" variant="outlined" required onChange={this.handleStateChange} value={this.state.po_box}/> 
            </div><br/>
            
            <div className="input-item">
              <p>Address Line 1:</p>
              <TextField className="input-item-field" id="address_line_one" variant="outlined" required onChange={this.handleStateChange} value={this.state.address_line_one}/> 
            </div><br/>

            <div className="input-item">
              <p>Address Line 2:</p>
              <TextField className="input-item-field" id="address_line_two" variant="outlined" onChange={this.handleStateChange} value={this.state.address_line_two}/> 
            </div><br/>

            <div className="input-item">
              <p>Postal Code:</p>
              <TextField className="input-item-field" id="postal_code" variant="outlined" onChange={this.handleStateChange} value={this.state.postal_code}/> 
            </div><br/>

            <div className="input-item">
              <p>City:</p>
              <TextField className="input-item-field" id="city" variant="outlined" onChange={this.handleStateChange} value={this.state.city}/> 
            </div><br/>

            <div className="input-item">
              <p>Province:</p>
              <TextField className="input-item-field" id="province" variant="outlined" onChange={this.handleStateChange} value={this.state.province}/> 
            </div><br/>

            <div className="input-item">
              <p>Country:</p>
              <TextField className="input-item-field" id="country" variant="outlined" onChange={this.handleStateChange} value={this.state.country}/> 
            </div><br/><br/>

            <button className="cancel-button" onClick={this.cancelEdit}>Cancel</button>

            { this.state.valid === true &&
              <button className="raffle-button" onClick={this.updateOrder}>Submit</button>
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

async function getOrderDetails(id) {
  let myJson = {};
  myJson.id = id;
  let data = {};

  await (async () => {
    const rawResponse = await fetch('/api/v1/getOrderStatus', {
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


async function updateOrderData(myJson) {
    let data = {};
  
    await (async () => {
      const rawResponse = await fetch('/api/v1/updateOrderData', {
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

export default EditOrderForm;