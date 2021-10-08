import React from 'react';
import history from './history';
import { Router } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Modal from 'react-modal';

let modalTitle = "";
let modalText = "";

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  };

class CustomForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            colour: "",
            thread_colour: "",
            email: "",
            checkBox: false,
            errorMessage: "",
            description: "",
            modalIsOpen: false,
            hardware_type: "",
            firstname: "",
            lastname: "",
            type: "",
            likes_dislikes: "",
            links: "",
        };

        this.changeColour = this.changeColour.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changeDescription = this.changeDescription.bind(this);
        this.changeCheckbox = this.changeCheckbox.bind(this);
        this.orderCustom = this.orderCustom.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.changeThreadColour = this.changeThreadColour.bind(this);
        this.changeHardware = this.changeHardware.bind(this);
        this.changeFirstName = this.changeFirstName.bind(this);
        this.changeLastName = this.changeLastName.bind(this);
        this.changeType = this.changeType.bind(this);
        this.changeLikesDislikes = this.changeLikesDislikes.bind(this);
        this.changeLinks = this.changeLinks.bind(this);
    }
  
    closeModal() {
      this.setState({ modalIsOpen: false });
    }

    changeType = (event) => {
        this.setState({errorMessage: ""});
        this.setState({ type: event.target.value });
    }

    changeLikesDislikes = (event) => {
        this.setState({errorMessage: ""});
        this.setState({ likes_dislikes: event.target.value });
    }

    changeLinks = (event) => {
        this.setState({errorMessage: ""});
        this.setState({ links: event.target.value });
    }

    changeFirstName = (event) => {
        this.setState({errorMessage: ""});
        this.setState({ firstname: event.target.value });
    }

    changeLastName = (event) => {
        this.setState({errorMessage: ""});
        this.setState({ lastname: event.target.value });
    }

    changeColour = (event) => {
        this.setState({errorMessage: ""});
        this.setState({ colour: event.target.value });
    }

    changeThreadColour = (event) => {
        this.setState({errorMessage: ""});
        this.setState({ thread_colour: event.target.value });
    }

    changeHardware = (event) => {
        this.setState({errorMessage: ""});
        this.setState({ hardware_type: event.target.value });
    }

    changeEmail = (event) => {
        this.setState({errorMessage: ""});
        this.setState({ email: event.target.value });
    }

    changeDescription = (event) => {
        this.setState({errorMessage: ""});
        this.setState({ description: event.target.value });
    }

    changeCheckbox = (event) => {
        this.setState({errorMessage: ""});
        let currentState = this.state.checkBox;
        this.setState({ checkBox: !currentState });
    }

    async orderCustom() {
        this.setState({errorMessage: ""});
        console.log(this.state.engraving);
        console.log(this.state.colour);

        if(this.state.checkBox === false) {
            this.setState({errorMessage: "Please agree to the checkbox to continue."});
        }
        else {
            if(this.state.email === "") {
                this.setState({errorMessage: "Please enter an email."});
            }
            else {
                if(this.state.colour === "") {
                    this.setState({errorMessage: "Please select a colour."});
                }
                else {
                        let myJSON = {};
                        myJSON.type = this.state.type;
                        myJSON.firstname = this.state.firstname;
                        myJSON.lastname = this.state.lastname;
                        myJSON.colour = this.state.colour;
                        myJSON.thread_colour = this.state.thread_colour;
                        myJSON.hardware = this.state.hardware_type;
                        myJSON.description = this.state.description;
                        myJSON.likes_dislikes = this.state.likes_dislikes;
                        myJSON.links = this.state.links;
                        myJSON.email = this.state.email;
                        myJSON.engraving = "";
                        myJSON.product = "Custom Item";
                        console.log(myJSON);
                        let result = await addOrder(myJSON);
                        console.log(result);

                        if (result.insertId !== undefined && result.insertId !== 0) {
                            modalTitle = "Order Quote Sent!";
                            modalText = "Thank you for ordering a quote, I will get back to you as soon as I can!";
                            this.setState({ modalIsOpen: true, links: "", email: "", likes_dislikes: "", description: "", hardware: "", thread_colour: "", colour: "", firstname: "", lastname: "", type: "", checkBox: false});
                        }
                        else {
                            modalTitle = "Order Quote Could Not Be Placed";
                            modalText = "Due to some issue, your quote request could not be made. Please try again, or contact me directly.";
                            this.setState({ modalIsOpen: true });
                        }
                }
            }
        }
    }

    render() {
        return (
            <div>
                <Router history={history}>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    >
                    <div style={{ textAlign: "center" }}>
                        <h1 style={{ fontSize: "40px" }}>{modalTitle}</h1>
                        <p >{modalText}</p>
                        <button onClick={this.closeModal}>Okay</button>
                    </div>
                    </Modal>

                    <div className="tabContent">
                        < div style={{ margin: "20px", marginTop: "10px", marginBottom: "10px" }}>
                            <h3>Custom Order</h3>
                            <br/><br/>
                                <label>First Name:</label>
                                <TextField style={{width: "200px", marginTop: "25px"}} value={this.state.firstname} onChange={this.changeFirstName} />
                                <br/>
                                <label>Last Name:</label>
                                <TextField style={{width: "200px", marginTop: "25px"}} value={this.state.lastname} onChange={this.changeLastName} />
                                <br/>
                                <label>Email:</label>
                                <TextField style={{width: "200px", marginTop: "25px"}} value={this.state.email} onChange={this.changeEmail} />
                                <br />
                                <label>Type:</label>
                                <TextField style={{width: "200px", marginTop: "25px"}} value={this.state.type} onChange={this.changeType} />
                                <br/>
                                <label>Leather Colour:</label>
                                <TextField style={{width: "200px", marginTop: "25px"}} value={this.state.colour} onChange={this.changeColour} />
                                <br/>
                                <label>Thread Colour:</label>
                                <TextField style={{width: "200px", marginTop: "25px"}} value={this.state.thread_colour} onChange={this.changeThreadColour} />
                                <br/>
                                <label>Hardware Colour:</label>
                                <TextField style={{width: "200px", marginTop: "25px"}} value={this.state.hardware_type} onChange={this.changeHardware} />
                                <br/><br /><br />
                                <label>Description:</label> <br/>
                                <TextField style={{width: "500px"}} multiline rowsMax={10} value={this.state.description} onChange={this.changeDescription} />
                                <br />
                                <label>What do you like and dislike about past versions of these items you have owned?</label> <br/>
                                <TextField style={{width: "500px"}} multiline rowsMax={10} value={this.state.likes_dislikes} onChange={this.changeLikesDislikes} />
                                <br />
                                <label>If you have some, please add links to pictures you feel help describe what you are looking for:</label> <br/>
                                <TextField style={{width: "500px"}} multiline rowsMax={10} value={this.state.links} onChange={this.changeLinks} />
                                <br />
                                <br />
                                <br />
                                <br />
                                <Checkbox
                                    checked={this.state.checkBox}
                                    onChange={this.changeCheckbox}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                    style={{marginTop: "-100px"}}
                                />
                                <label>I make each item to order, so if I get a lot of orders it might take <br/>
                                    me longer to get to your order. Input your email and your order details <br/>
                                    and I will get back to you with an estimated price and time for this item. <br/>
                                    Check this box to aknowledge this message.
                                </label>

                                <br />
                                <br />
                                <button onClick={this.orderCustom}>Quote</button>
                                <br/>
                                <label style={{color: "red"}}>{this.state.errorMessage}</label>
                            </div>
                    </div>
                </Router>
            </div>
        );
    }
}

async function addOrder(myjson) {
    console.log(myjson);
  
    let data = {};
  
    await (async () => {
      const rawResponse = await fetch('/api/v1/addOrder', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(myjson)
      });
      data = await rawResponse.json();
    })();
  
    return data;
  }

export default CustomForm;