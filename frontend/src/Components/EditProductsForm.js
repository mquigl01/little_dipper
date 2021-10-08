import React from 'react';
import TextField from '@material-ui/core/TextField';
import history from './history';

class EditProductsForm extends React.Component {
  constructor(props) {
    super(props);

    let pathname = props.location.pathname;
    let id = pathname.split("/")[2];

    this.state = {
        id: id,
        name: "",
        description: "",
        images: "",
        errorLabel: "",
        valid: false,
    }

    this.handleStateChange = this.handleStateChange.bind(this);
    this.getProductData = this.getProductData.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
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
      else {
        let myProduct = await getProduct(this.state.id);
        console.log(myProduct)
        
        this.setState({name: myProduct[0].name});
        this.setState({description: myProduct[0].description});
        this.setState({images: myProduct[0].images});
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
    await history.push("/Products");
    window.location.reload();
  }

  async updateProduct() {
    if(this.validateInputs) {
      let myJson = {};
      myJson.id = this.state.id;
      myJson.name = this.state.name;
      myJson.description = this.state.description;
      myJson.images = this.state.images;

      let response = await updateProduct(myJson);

      if(response.insertId !== undefined && response.insertId !== 0) {
        await history.push("/Products");
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
        <h3>Edit Product</h3>
        <br/>
          <div>
            <div className="input-item">
            <p>Name:</p>
              <TextField className="input-item-field" id="name" variant="outlined" required onChange={this.handleStateChange} value={this.state.name}/> 
            </div><br/>

            <div className="input-item">
              <p>Description:</p>
              <TextField className="input-item-field" id="description" variant="outlined" required onChange={this.handleStateChange} value={this.state.description}/> 
            </div><br/>

            <div className="input-item">
              <p>Images:</p>
              <TextField className="input-item-field" id="images" variant="outlined" required onChange={this.handleStateChange} value={this.state.images}/> 
            </div><br/><br/>

            <button className="cancel-button" onClick={this.cancelEdit}>Cancel</button>

            { this.state.valid === true &&
              <button className="raffle-button" onClick={this.updateProduct}>Submit</button>
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

async function updateProduct(myJson) {
    let data = {};
  
    await (async () => {
      const rawResponse = await fetch('/api/v1/updateProduct', {
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

export default EditProductsForm;