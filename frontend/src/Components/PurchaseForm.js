import React from 'react';
import StripeCheckout from "react-stripe-checkout";
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import history from './history';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const key = 'pk_test_51IWDDSIrudzbU4L9IiwODE8Vkbf9Lq7PjUUi3K8NaJoFfK0VrV1awUM28R2KVonprzylkRykTc3oQg6AasLtEHT500FXMDYaNn';

class PurchaseForm extends React.Component {
  constructor(props) {
    super(props);

    let pathname = props.location.pathname;
    let id = pathname.split("/")[2];

    this.state = {
        id: id,
        name: "",
        description: "",
        start: "",
        end: "",
        tickets: 0,
        ticket_price: 0,
        full_ticket_price: 0,
        over_nineteen: false,
        aboveAge: false,
        fullPrice: true,
        customerName: "",
        customerLastname: "",
        customerEmail: "",
        addressLineOne: "",
        addressLineTwo: "",
        postalCode: "",
        city: "",
        customerPhone: "",
        ticketAmount: 1,
        poBox: "",
        stripe_full_price: "",
        stripe_price: "",
        stripe_product: "",
        errorLabel: "",
        valid: false,
        loading: true,
    }

    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleCheckboxChangePrice = this.handleCheckboxChangePrice.bind(this);
    this.getRaffleData = this.getRaffleData.bind(this);
    this.convertDate = this.convertDate.bind(this);
    this.cancelPurchase = this.cancelPurchase.bind(this);
    this.createPurchase = this.createPurchase.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.makePayment = this.makePayment.bind(this);
  }

  componentDidMount(){
    this.getRaffleData();
  }

  async getRaffleData() {
    let myRaffles = await getPurchaseForm(this.state.id);
    if(myRaffles.length > 0) {
        this.setState({name: myRaffles[0].name});
        this.setState({description: myRaffles[0].description});
        this.setState({start: myRaffles[0].start});
        this.setState({end: myRaffles[0].end});
        this.setState({tickets: myRaffles[0].tickets});
        this.setState({ticket_price: myRaffles[0].ticket_price});
        this.setState({full_ticket_price: myRaffles[0].full_ticket_price});
        this.setState({over_nineteen: myRaffles[0].over_nineteen});
        this.setState({stripe_full_price: myRaffles[0].stripe_full_price});
        this.setState({stripe_price: myRaffles[0].stripe_price});
        this.setState({stripe_product: myRaffles[0].stripe_product});
    }
    this.setState({loading: false})
  }

  convertDate(oldDate) {
    let newDate = new Date(oldDate)
    if(newDate) {
      return  newDate.toLocaleString('default', { dateStyle: 'full' });
    }
    else {
      return "";
    }
  }

  handleStateChange = async(e) => {
    await this.setState({ [e.target.id]: e.target.value });
    this.validateInputs();
  }

  handleCheckboxChange = async(e) => {
    let newValue = !this.state.aboveAge;
    await this.setState({ aboveAge: newValue });
    this.validateInputs();
  }

  handleCheckboxChangePrice = async(e) => {
    let newValue = !this.state.fullPrice;
    await this.setState({ fullPrice: newValue });
    this.validateInputs();
  }

  async cancelPurchase() {
    await history.push("/raffle/" + this.state.id);
    window.location.reload();
  }

  async createPurchase(token) {
    this.setState({errorLabel: ""})

    let data = await getLocationDetails();

    if(data.state !== "Ontario") {
      this.setState({errorLabel: "You must be located in Ontario to purchase a ticket."})
      return;
    }

    if(this.validateInputs() === true) {
      this.setState({loading: true})

      let myJson = {};
      myJson.firstname = this.state.customerName;
      myJson.lastname = this.state.customerLastname;
      myJson.email = this.state.customerEmail;
      myJson.phone = this.state.customerPhone;

      myJson.address_line_one = this.state.addressLineOne;
      myJson.address_line_two = this.state.addressLineTwo;
      myJson.postal_code = this.state.postalCode;
      myJson.po_box = this.state.poBox;
      myJson.city = this.state.city;
      myJson.province = "Ontario";
      myJson.country = "Canada";
      let address = "";

      if(this.state.poBox !== "") {
        address = "PO.Box: " + this.state.poBox + ", ";
      }

      if(this.state.addressLineTwo !== "") {
        address = address + this.state.addressLineOne + ", " + this.state.addressLineTwo + ", " + this.state.postalCode + ", Ontario, Canada";
      }
      else {
        address = address + this.state.addressLineOne + ", " + this.state.postalCode + ", Ontario, Canada";
      }

      myJson.address = address;

      let response = await addStripeCustomer(myJson);

      if(response.id !== undefined) {
        let createCardJson = {};
        createCardJson.customer_id = response.id;
        createCardJson.card_token = token;
        let cardResponse = await addStripeCard(createCardJson);
        console.log(cardResponse.id)
        console.log(cardResponse.id)
        myJson.card_id = cardResponse.id;

        myJson.stripe_id = response.id;
        myJson.stripe_customer_id = response.id;
        myJson.stripe_product_id = this.state.stripe_product;
        myJson.tickets = this.state.ticketAmount;
        myJson.draw_id = this.state.id;
          
        if(this.state.fullPrice === true) {
          console.log("Charge full price");
          myJson.stripe_price_id = this.state.stripe_full_price;
          let orderQueueResult = await addOrderQueue(myJson);

            if(orderQueueResult.error === undefined) {
              await history.push("/queue/" + orderQueueResult.insertId);
              window.location.reload();
            }
            else {
              console.log(orderQueueResult.error);
              this.setState({errorLabel: "There was an error adding your order to the queue"})
            }
        }
        else {
            console.log("Charge set price");
            myJson.stripe_price_id = this.state.stripe_price;
            let orderQueueResult = await addOrderQueue(myJson);

            if(orderQueueResult.error === undefined) {
              await history.push("/queue/" + orderQueueResult.insertId);
              window.location.reload();
            }
            else {
              console.log(orderQueueResult.error);
              this.setState({errorLabel: "There was an error adding your order to the queue"})
            }
        }
      }

      this.setState({loading: false})
    }
  }

  validateInputs() {
    if(this.state.aboveAge === false) {
        this.setState({errorLabel: "You must confirm to being above the age requirement"})
        this.setState({valid: false})
        return false;
    }
    else if(this.state.customerName === "") {
      this.setState({errorLabel: "You must enter a first name"})
      this.setState({valid: false})
      return false;
    }
    else if(this.state.customerLastname === "") {
      this.setState({errorLabel: "You must enter a last name"})
      this.setState({valid: false})
      return false;
    }
    else if(this.state.customerEmail === "") {
      this.setState({errorLabel: "You must enter an email"})
      this.setState({valid: false})
      return false;
    }
    else if(!(this.state.customerEmail.includes("@"))) {
      this.setState({errorLabel: "You must enter a valid email address"})
      this.setState({valid: false})
      return false;
    }
    else if(!(this.state.customerEmail.includes("."))) {
      this.setState({errorLabel: "You must enter a valid email address"})
      this.setState({valid: false})
      return false;
    }
    else if(this.state.customerPhone === "") {
      this.setState({errorLabel: "You must enter a phone number"})
      this.setState({valid: false})
      return false;
    }
    else if(this.state.addressLineOne === "") {
      this.setState({errorLabel: "You must enter a valid address"})
      this.setState({valid: false})
      return false;
    }
    else if(this.state.postalCode === "") {
      this.setState({errorLabel: "You must enter a valid postal code"})
      this.setState({valid: false})
      return false;
    }
    else if(this.state.postalCode.length !== 7) {
      this.setState({errorLabel: "Postal code must be in the format A1A 1A1"})
      this.setState({valid: false})
      return false;
    }
    else if(!(this.state.postalCode[1] >= '0' && this.state.postalCode[1] <= '9') || 
    !(this.state.postalCode[4] >= '0' && this.state.postalCode[4] <= '9') ||
    !(this.state.postalCode[6] >= '0' && this.state.postalCode[6] <= '9')) {
      this.setState({errorLabel: "Postal code must be in the format A1A 1A1"})
      this.setState({valid: false})
      return false;
    }
    else if(!(this.state.postalCode[0].match(/[a-z]/i) ) ||
    !(this.state.postalCode[2].match(/[a-z]/i)) ||
    !(this.state.postalCode[5].match(/[a-z]/i))) {
      this.setState({errorLabel: "Postal code must be in the format A1A 1A1"})
      this.setState({valid: false})
      return false;
    }
    else if(this.state.postalCode[3] !== ' ') {
      this.setState({errorLabel: "Postal code must be in the format A1A 1A1"})
      this.setState({valid: false})
      return false;
    }
    else if(this.state.ticketAmount <= 0 || this.state.ticketAmount >= 10) {
      this.setState({errorLabel: "You must purchase a between 1 and 10 tickets"})
      this.setState({valid: false})
      return false;
    }

    this.setState({errorLabel: ""})
    this.setState({valid: true})

    return true;
  }

  calculateTotal() {
    if(this.state.fullPrice === true) {
      return (this.state.full_ticket_price * this.state.ticketAmount).toFixed(2)
    }
    else {
      return (this.state.ticket_price * this.state.ticketAmount).toFixed(2)
    }
  }

  makePayment = token => {
    console.log(token)
    this.createPurchase(token.id)
  }

  render() {
    return (
      <div className="tabContent">
        <h3>Purchase Tickets for {this.state.name}</h3>
        <br/>
          {this.state.loading === true &&
            <div className="loader"></div>
          }

          {this.state.loading === false &&
          <div>
            <div className="input-item">
              <p>Firstname:</p>
              <TextField className="input-item-field" id="customerName" variant="outlined" required onChange={this.handleStateChange} value={this.state.customerName}/> 
            </div><br/>

            <div className="input-item">
              <p>Lastname:</p>
              <TextField className="input-item-field" id="customerLastname" variant="outlined" required onChange={this.handleStateChange} value={this.state.customerLastname}/> 
            </div><br/>

            <div className="input-item">
              <p>Email:</p>
              <TextField className="input-item-field" id="customerEmail" variant="outlined" required onChange={this.handleStateChange} value={this.state.customerEmail}/> 
            </div><br/>
            
            <div className="input-item">
              <p>Phone:</p>
              <TextField className="input-item-field" id="customerPhone" variant="outlined" required onChange={this.handleStateChange} value={this.state.customerPhone}/> 
            </div><br/><br/><br/><br/>
            <br/>

           <p style={{fontWidth: "bold", fontSize: "24px"}}>Shipping Address</p><br/><br/>

            <div className="input-item">
            <p>PO Box:</p>
              <TextField className="input-item-field" id="poBox" variant="outlined" required onChange={this.handleStateChange} value={this.state.poBox}/> 
            </div><br/>
            
            <div className="input-item">
            <p>Address Line 1:</p>
              <TextField className="input-item-field" id="addressLineOne" variant="outlined" required onChange={this.handleStateChange} value={this.state.addressLineOne}/> 
            </div><br/>

            <div className="input-item">
            <p>Address Line 2:</p>
              <TextField className="input-item-field" id="addressLineTwo" variant="outlined" onChange={this.handleStateChange} value={this.state.addressLineTwo}/> 
            </div><br/>

            <div className="input-item">
            <p>Postal Code:</p>
              <TextField className="input-item-field" id="postalCode" variant="outlined" onChange={this.handleStateChange} value={this.state.postalCode}/> 
            </div><br/>

            <div className="input-item">
            <p>City:</p>
              <TextField className="input-item-field" id="city" variant="outlined" onChange={this.handleStateChange} value={this.state.city}/> 
            </div><br/>

            <div className="input-item">
            <p>Province:</p>
              <TextField className="input-item-field" disabled variant="outlined" value="Ontario"/> 
            </div><br/>

            <div className="input-item">
            <p>Country:</p>
              <TextField className="input-item-field" disabled variant="outlined" value="Canada"/> 
            </div><br/><br/>

            <p style={{fontWidth: "bold", fontSize: "24px"}}>Order Summary:</p><br/><br/>

            <div className="input-item">
            <p>Number of Tickets:</p>
              <TextField className="input-item-field" id="ticketAmount" type="number" variant="outlined" required onChange={this.handleStateChange} value={this.state.ticketAmount}/> 
            </div><br/><br/>

            { this.state.fullPrice === true &&
              <div className="input-item">
                  <p>Price:</p>
                  <p>${(this.state.full_ticket_price).toFixed(2)}</p>
                </div>
            }
            { this.state.fullPrice === false &&
              <div className="input-item">
                  <p>Price:</p>
                  <p>${(this.state.ticket_price).toFixed(2)}</p>
                </div>
            }

            <br/>

            { this.state.ticketAmount > 0 &&
                <div className="input-item">
                  <p>Total:</p>
                  <p>${this.calculateTotal()}</p>
                </div>
            }

            {this.state.over_nineteen === 1 &&
              <div>
                <div className="input-item">
                  <p >I confirm that I am 19+ years of age and that if I win the draw, my prize will be revoked if I can not prove this.</p>
                  <Checkbox
                    className="input-item-field"
                    checked={this.state.aboveAge}
                    onChange={this.handleCheckboxChange}
                    id="aboveAge"
                    color="primary"
                  />
                </div>
              </div>
            }

            {this.state.over_nineteen === 0 &&
              <div>
                <div className="input-item">
                  <p >I confirm that I am 18+ years of age and that if I win the draw, my prize will be revoked if I can not prove this.</p>
                  <Checkbox
                    className="input-item-field"
                    checked={this.state.aboveAge}
                    onChange={this.handleCheckboxChange}
                    id="aboveAge"
                    color="primary"
                  />
                </div>
              </div>
            }
            <br/>
            <br/>
            <br/>
            <br/>

            <div className="input-item">
              <p >I would like to cover the costs of the draw.</p>
              <Checkbox
                className="input-item-field"
                checked={this.state.fullPrice}
                onChange={this.handleCheckboxChangePrice}
                id="fullPrice"
                color="primary"
              />
            </div>
            <br/> <br/>
            <br/> <br/>
            <br/> <br/>

            <button className="cancel-button" onClick={this.cancelPurchase}>Cancel</button>
            { this.state.valid === false &&
              <button className="raffle-button-disabled">Place Order</button>
            }

            { this.state.valid === true &&
              <StripeCheckout 
                stripeKey={key} 
                token={this.makePayment} 
                name="Purchase Tickets"
                amount={this.calculateTotal() * 100}
                currency="CAD"
              >
                <button className="raffle-button">Place Order</button>
              </StripeCheckout>
            }

            <br/><br/><br/>
            <p className="errorLabel" >{ this.state.errorLabel }</p>
            <br/>
          </div>
        }
      </div>
    );
  }
}

async function getLocationDetails() {
  let data = {};

  await (async () => {
    const rawResponse = await fetch('https://geolocation-db.com/json/f9902210-97f0-11eb-a459-b997d30983f1');
    data = await rawResponse.json();
  })();

  return data;
}

async function addStripeCustomer(myJson) {
  let data = {};

  await (async () => {
    const rawResponse = await fetch('/api/v1/createStripeCustomer', {
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

async function addStripeCard(myJson) {
  let data = {};

  await (async () => {
    const rawResponse = await fetch('/api/v1/createStripeCard', {
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

async function addOrderQueue(myJson) {
  let data = {};

  await (async () => {
    const rawResponse = await fetch('/api/v1/addOrderQueue', {
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

async function getPurchaseForm(raffleID) {
  let myJson = {};
  myJson.id = raffleID;
  let data = {};

  await (async () => {
    const rawResponse = await fetch('/api/v1/getRaffleDetails', {
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

export default PurchaseForm;