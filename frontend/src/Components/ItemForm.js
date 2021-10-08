import React from 'react';
import history from './history';
import { Router } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Modal from 'react-modal';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

let modalTitle = "";
let modalText = "";
const hardwareOptions = require("./hardware.json");
const colourOptions = require("./colour.json");
const threadColourOptions = require("./thread_colour.json");

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

class ItemForm extends React.Component {
    constructor(props) {
        super(props);

        let pathname = props.location.pathname;
        let id = pathname.split("/")[2];
    
        this.state = {
            id: id,
            colour: "Navy",
            engraving: "",
            email: "",
            checkBox: false,
            errorMessage: "",
            modalIsOpen: false,
            hardware_type: "Gold",
            images: [],
            name: "",
            description: "",
            loading: false,
        };

        this.changeColour = this.changeColour.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changeEngraving = this.changeEngraving.bind(this);
        this.changeCheckbox = this.changeCheckbox.bind(this);
        this.orderItem = this.orderItem.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.changeThreadColour = this.changeThreadColour.bind(this);
        this.changeHardware = this.changeHardware.bind(this);
    }

    componentDidMount () {
        this.getProductData();
    }
    
    async getProductData() {
        let productData = await getProduct(this.state.id);
        this.setState({name: productData[0].name})
        this.setState({description: productData[0].description})
        console.log(productData[0].images)
        console.log(JSON.parse(productData[0].images))
        this.setState({images: JSON.parse(productData[0].images)})
        this.setState({loading: false})
    }
  
    closeModal() {
      this.setState({ modalIsOpen: false });
    }

    changeColour = (event) => {
        this.setState({errorMessage: ""});
        this.setState({ colour: event.target.id });
    }

    changeThreadColour = (event) => {
        this.setState({errorMessage: ""});
        this.setState({ thread_colour: event.target.id });
    }

    changeHardware = (event) => {
        this.setState({errorMessage: ""});
        this.setState({ hardware_type: event.target.id });
    }


    changeEmail = (event) => {
        this.setState({errorMessage: ""});
        this.setState({ email: event.target.value });
    }

    changeEngraving = (event) => {
        this.setState({errorMessage: ""});
        this.setState({ engraving: event.target.value });
    }

    changeCheckbox = (event) => {
        this.setState({errorMessage: ""});
        let currentState = this.state.checkBox;
        this.setState({ checkBox: !currentState });
    }

    async orderItem() {
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
                    if(this.state.engraving.length > 10) {
                        this.setState({errorMessage: "Engraving can not be more than 10 characters."});
                    }
                    else {
                        let myJSON = {};
                        myJSON.type = this.state.name;
                        myJSON.colour = this.state.colour;
                        myJSON.thread_colour = this.state.thread_colour;
                        myJSON.hardware = this.state.hardware_type;
                        myJSON.email = this.state.email;
                        myJSON.description = "";
                        myJSON.engraving = this.state.engraving;
                        myJSON.product = this.state.name;
                        console.log(myJSON);
                        let result = await addOrder(myJSON);
                        console.log(result);
                        if (result.insertId !== undefined && result.insertId !== 0) {
                        modalTitle = "Order Quote Sent!";
                        modalText = "Thank you for ordering, I will get back to you as soon as I can!";
                        this.setState({ modalIsOpen: true });
                        this.setState({ engraving: "" });
                        this.setState({ email: "" });
                        this.setState({ colour: "Navy" });
                        this.setState({ thread_colour: "Navy" });
                        }
                        else {
                        modalTitle = "Order Quote Could Not Be Sent";
                        modalText = "Due to some issue, your email was unable to send. Please try again.";
                        this.setState({ modalIsOpen: true });
                        }
                    }
                }
            }
        }
    }

    carouselData() {
        return (
            <Carousel useKeyboardArrows={true} swipeable={true} className="carousel-style" showThumbs={true} infiniteLoop={true} showStatus={false} autoPlay={true} centerMode={true}>
            {this.state.images.map((image, index) => (
                <div className="slider-item-div" key={image.name}>
                  <img src={image.src} alt={image.name} />
                </div>
            ))}
         </Carousel>
        );
      }

    hardwarePicker() {
        return (
            <div className="colour-picker">
                {hardwareOptions.map((hardware) => (
                    <Tooltip title={hardware.name}>
                        <button onClick={this.changeHardware} id={hardware.id} className={ this.state.hardware_type === hardware.id ? hardware.class_selected : hardware.class}> </button>
                    </Tooltip>
                ))}
            </div>
        )
    }

    colourPicker() {
        return (
            <div className="colour-picker">
                {colourOptions.map((colours, index) => (
                    <Tooltip title={colours.name} key={colours.name}>
                        <button onClick={this.changeColour} id={colours.id} className={ this.state.colour === colours.id ? colours.class_selected : colours.class}> </button>
                    </Tooltip>
                ))}
            </div>
        )
    }

    threadColourPicker() {
        return (
            <div className="colour-picker">
                {threadColourOptions.map((colours, index) => (
                    <Tooltip title={colours.name} key={colours.name}>
                        <button onClick={this.changeColour} id={colours.id} className={ this.state.colour === colours.id ? colours.class_selected : colours.class}> </button>
                    </Tooltip>
                ))}
            </div>
        )
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
                            <h3>{this.state.name}</h3>
                            <br/><br/>

                            {this.carouselData()}

                            <div style={{width: "65%", borderBottom: "2px solid black", float: "left", marginLeft: "265px"}} />
                            <br/>
                            <p>{this.state.description}</p>
                            <br/>
                            
                            <br/>
                                <label>Colour:</label>
                                {this.colourPicker()}
                                <br />
                                <label>Thread Colour:</label>
                                {this.threadColourPicker()}
                                <br/>
                                <label>Hardware:</label>
                                {this.hardwarePicker()}
                                <br/>
                                <label>Custom Lettering:</label>
                                <TextField style={{width: "200px"}} value={this.state.engraving} onChange={this.changeEngraving} />

                                <br />
                                <br />
                                <label>Email:</label>
                                <TextField style={{width: "200px"}} value={this.state.email} onChange={this.changeEmail} />

                                <br />
                                <br />
                                <Checkbox
                                    checked={this.state.checkBox}
                                    onChange={this.changeCheckbox}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                                <label>I make each item to order, so if I get a lot of orders it might take <br/>
                                    me longer to get to your order. Input your email and your order details <br/>
                                    and I will get back to you with an estimated price and time for this item. <br/>
                                    Check this box to aknowledge this message.
                                </label>

                                <br />
                                <br />
                                <button onClick={this.orderItem}>Quote</button>
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

  async function getProduct(id) {
    let myJson = {};
    myJson.id = id;
    let data = {};
  
    await (async () => {
      const rawResponse = await fetch('/api/v1/getProduct', {
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

export default ItemForm;