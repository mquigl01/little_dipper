import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HomeForm from "./Components/HomeForm";
import { BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import MediaQuery  from 'react-responsive';
import CheeseburgerMenu from 'cheeseburger-menu';
import HamburgerMenu from 'react-hamburger-menu';
import { SocialIcon } from 'react-social-icons';
import history from './Components/history';
import AboutForm from './Components/AboutForm';
import CustomForm from './Components/CustomForm';
import LoginForm from './Components/LoginForm';
import OrdersForm from './Components/OrdersForm';
import EditOrderForm from './Components/EditOrderForm';
import ItemForm from './Components/ItemForm';
import ProductsForm from './Components/ProductsForm';
import AddProductsForm from './Components/AddProductsForm';
import EditProductsForm from './Components/EditProductsForm';
import ViewProductsForm from './Components/ViewProductsForm';
import GalleryForm from './Components/GalleryForm';
import ContactForm from './Components/ContactForm';
import ColoursForm from './Components/ColoursForm';
import AddColoursForm from './Components/AddColourForm';
import AddImageForm from './Components/AddImageForm';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import ImagesForm from './Components/ImagesForm';
import EditImageForm from './Components/EditImageForm';

const mobileOptions = {
  backgroundColor: "white",
  color: 'black', 
  textAlign: 'center',
  fontSize: '18px',
  paddingTop: "10px",
  letterSpacing: '4px',
  paddingBottom: "10px",
  textDecoration: 'none',
  border: "1px solid grey",
}


const tabStyle = {
  color: 'black',
  fontSize: '16px',
  letterSpacing: '4px',
  textDecoration: 'none',
  padding: "20px"
};

const hoverTabStyle = {
  color: 'grey',
  fontSize: '16px',
  letterSpacing: '4px',
  textDecoration: 'none',
  padding: "20px"
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: false,
      title: "",
      date: "",
      description: "",
      username: "",
      password: "",
      hoverWatchstraps: false,
      hoverHome: false,
      hoverWallets: false,
      hoverBags: false,
      hoverAbout: false,
      hoverBelts: false,
      hoverCustom: false,
      hoverDropdown: false,
      hoverOrders: false,
      hoverProducts: false,
      hoverGallery: false,
      hoverAdminProducts: false,
      hoverContact: false,
      hoverColours: false,
      menuOpen: false,
      showMenu: false,
      products: []
    };

    this.updateAuth = this.updateAuth.bind(this);
    this.removeAuth = this.removeAuth.bind(this);
    this.checkAuthData = this.checkAuthData.bind(this);

    this.handleStateChange = this.handleStateChange.bind(this);
    this.hoverHomeOn = this.hoverHomeOn.bind(this);
    this.hoverHomeOff = this.hoverHomeOff.bind(this);
    this.selectHome = this.selectHome.bind(this);

    this.hoverGalleryOn = this.hoverGalleryOn.bind(this);
    this.hoverGalleryOff = this.hoverGalleryOff.bind(this);
    this.selectGallery = this.selectGallery.bind(this);

    this.hoverAboutOn = this.hoverAboutOn.bind(this);
    this.hoverAboutOff = this.hoverAboutOff.bind(this);
    this.selectAbout = this.selectAbout.bind(this);

    this.hoverCustomOff = this.hoverCustomOff.bind(this);
    this.hoverCustomOn = this.hoverCustomOn.bind(this);
    this.selectCustom = this.selectCustom.bind(this);

    this.hoverOrdersOff = this.hoverOrdersOff.bind(this);
    this.hoverOrdersOn = this.hoverOrdersOn.bind(this);
    this.selectOrders = this.selectOrders.bind(this);

    this.hoverProductsOff = this.hoverProductsOff.bind(this);
    this.hoverProductsOn = this.hoverProductsOn.bind(this);
    this.selectProducts = this.selectProducts.bind(this);

    this.hoverAdminProductsOff = this.hoverAdminProductsOff.bind(this);
    this.hoverAdminProductsOn = this.hoverAdminProductsOn.bind(this);
    this.selectAdminProducts = this.selectAdminProducts.bind(this);

    this.hoverColoursOff = this.hoverColoursOff.bind(this);
    this.hoverColoursOn = this.hoverColoursOn.bind(this);
    this.selectColours = this.selectColours.bind(this);

    this.hoverContactOff = this.hoverContactOff.bind(this);
    this.hoverContactOn = this.hoverContactOn.bind(this);
    this.selectContact = this.selectContact.bind(this);

    this.showMenu = this.showMenu.bind(this); 
    this.closeMenu = this.closeMenu.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    this.checkAuthData();
    this.getProductData();
  }

  async getProductData() {
    let myProducts = await getProducts();
    this.setState({products: myProducts})
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
  showMenu() {
    let visible = this.state.showMenu;
    this.setState({
      showMenu: !visible,
    });
  }

  openMenu() {
    this.setState({ menuOpen: true })
  }

  closeMenu() {
    this.setState({ menuOpen: false })
  }

  
  async selectHome() {
    this.setState({ hoverHome: true });
    this.setState({ hoverAbout: false });
    this.setState({ hoverCustom: false });
    this.setState({ hoverOrders: false });
    this.setState({ hoverAdminProducts: false });
    this.setState({ hoverProducts: false });
    this.setState({ hoverGallery: false });
    this.setState({ hoverColours: false });
    await history.push("/");
  }
  hoverHomeOn(){
    this.setState({ hoverHome: true });
  }
  hoverHomeOff(){ 
    if(history.location.pathname !== "/") {
      this.setState({ hoverHome: false });
    }
  }

  async selectGallery() {
    this.setState({ hoverHome: false });
    this.setState({ hoverAbout: false });
    this.setState({ hoverCustom: false });
    this.setState({ hoverOrders: false });
    this.setState({ hoverAdminProducts: false });
    this.setState({ hoverProducts: false });
    this.setState({ hoverContact: false });
    this.setState({ hoverGallery: true });
    this.setState({ hoverColours: false });
    await history.push("/Gallery");
  }
  hoverGalleryOn(){
    this.setState({ hoverGallery: true });
  }
  hoverGalleryOff(){ 
    if(history.location.pathname !== "/Gallery") {
      this.setState({ hoverGallery: false });
    }
  }

  async selectAbout() {
    this.setState({ hoverHome: false });
    this.setState({ hoverAbout: true });
    this.setState({ hoverCustom: false });
    this.setState({ hoverOrders: false });
    this.setState({ hoverAdminProducts: false });
    this.setState({ hoverProducts: false });
    this.setState({ hoverGallery: false });
    this.setState({ hoverContact: false });
    this.setState({ hoverColours: false });
    await history.push("/About");
  }
  hoverAboutOn(){
    this.setState({ hoverAbout: true });
  }
  hoverAboutOff(){ 
    if(history.location.pathname !== "/About") {
      this.setState({ hoverAbout: false });
    }
  }

  async selectCustom() {
    this.setState({ hoverHome: false });
    this.setState({ hoverAbout: false });
    this.setState({ hoverCustom: true });
    this.setState({ hoverOrders: false });
    this.setState({ hoverAdminProducts: false });
    this.setState({ hoverProducts: false });
    this.setState({ hoverGallery: false });
    this.setState({ hoverContact: false });
    this.setState({ hoverColours: false });
    await history.push("/Custom");
  }
  hoverCustomOn(){
    this.setState({ hoverCustom: true });
  }
  hoverCustomOff(){ 
    if(history.location.pathname !== "/Custom") {
      this.setState({ hoverCustom: false });
    }
  }

  async selectOrders() {
    this.setState({ hoverHome: false });
    this.setState({ hoverAbout: false });
    this.setState({ hoverCustom: false });
    this.setState({ hoverOrders: true });
    this.setState({ hoverAdminProducts: false });
    this.setState({ hoverProducts: false });
    this.setState({ hoverGallery: false });
    this.setState({ hoverContact: false });
    this.setState({ hoverColours: false });
    await history.push("/AdminOrders");
  }
  hoverOrdersOn(){
    this.setState({ hoverOrders: true });
  }
  hoverOrdersOff(){ 
    if(history.location.pathname !== "/AdminOrders") {
      this.setState({ hoverOrders: false });
    }
  }

  async selectProducts() {
    this.setState({ hoverHome: false });
    this.setState({ hoverAbout: false });
    this.setState({ hoverCustom: false });
    this.setState({ hoverOrders: false });
    this.setState({ hoverAdminProducts: false });
    this.setState({ hoverProducts: true });
    this.setState({ hoverGallery: false });
    this.setState({ hoverContact: false });
    this.setState({ hoverColours: false });
    await history.push("/Products");
  }
  hoverProductsOn(){
    this.setState({ hoverProducts: true });
  }
  hoverProductsOff(){ 
    if(history.location.pathname !== "/Products") {
      this.setState({ hoverProducts: false });
    }
  }

  async selectAdminProducts() {
    this.setState({ hoverHome: false });
    this.setState({ hoverAbout: false });
    this.setState({ hoverCustom: false });
    this.setState({ hoverOrders: false });
    this.setState({ hoverProducts: false });
    this.setState({ hoverAdminProducts: true });
    this.setState({ hoverGallery: false });
    this.setState({ hoverContact: false });
    this.setState({ hoverColours: false });
    await history.push("/AdminProducts");
  }
  hoverAdminProductsOn(){
    this.setState({ hoverAdminProducts: true });
  }
  hoverAdminProductsOff(){ 
    if(history.location.pathname !== "/AdminProducts") {
      this.setState({ hoverAdminProducts: false });
    }
  }

  async selectColours() {
    this.setState({ hoverHome: false });
    this.setState({ hoverAbout: false });
    this.setState({ hoverCustom: false });
    this.setState({ hoverOrders: false });
    this.setState({ hoverProducts: false });
    this.setState({ hoverAdminProducts: false });
    this.setState({ hoverGallery: false });
    this.setState({ hoverContact: false });
    this.setState({ hoverColours: true });
    await history.push("/AdminColours");
  }
  hoverColoursOn(){
    this.setState({ hoverColours: true });
  }
  hoverColoursOff(){ 
    if(history.location.pathname !== "/AdminColours") {
      this.setState({ hoverColours: false });
    }
  }

  async selectContact() {
    this.setState({ hoverHome: false });
    this.setState({ hoverAbout: false });
    this.setState({ hoverCustom: false });
    this.setState({ hoverOrders: false });
    this.setState({ hoverAdminProducts: false });
    this.setState({ hoverProducts: false });
    this.setState({ hoverGallery: false });
    this.setState({ hoverContact: true });
    this.setState({ hoverColours: false });
    await history.push("/Contact");
  }
  hoverContactOn(){
    this.setState({ hoverContact: true });
  }
  hoverContactOff(){ 
    if(history.location.pathname !== "/Contact") {
      this.setState({ hoverContact: false });
    }
  }

  handleStateChange = async(e) => {
    await this.setState({ [e.target.id]: e.target.value });
  }

  async logOut() {
    this.closeMenu();
    let authData = getCookieData();
    console.log(authData);

    if(authData.username && authData.token) {
      let response = await logOut(authData.username, authData.token);
      this.removeAuth();
      await history.push("/login");
      window.location.reload();

      if(response.error !== undefined) {
        console.log(response.error);
      }
    }
  }

  render() {
    return (
      <div>
        <Router>
          <div>
              <MediaQuery query='(min-width: 1000px)'>
              <div style={{float: "left", marginLeft: "10px",  marginTop: "0px", padding: "0px", display: "flex", justifyContent: "center"}}>
                <img  alt="Little Dipper Logo" style={{borderRadius: "50%", width: "180px", height: "180px", margin: "auto", marginRight: "20px"}} src="./img/dipper_logo.png"/>
              </div>

              <div style={{float: "right", marginRight: "10px", letterSpacing: "3px"}}>
              {!this.state.auth &&
                    <Link 
                      className="inactive-tab-button"
                      style={{fontSize: "12px"}}
                      to="/login">
                      login
                    </Link>
                  }

                  {this.state.auth &&
                    <div>
                      <a 
                        className="inactive-tab-button"
                        style={{fontSize: "12px"}}
                        onClick={this.logOut}
                        >
                        logout
                      </a>
                    </div>
                  }
                </div>
              
                <nav className="tabHeader">
              
                  {history.location.pathname === "/" && 
                    <Link 
                    style={hoverTabStyle} 
                    to="/">
                    home
                    </Link>
                  }

                  {history.location.pathname !== "/" &&
                    <Link 
                    style={this.state.hoverHome ? hoverTabStyle : tabStyle} 
                    onMouseEnter={this.hoverHomeOn} 
                    onMouseLeave={this.hoverHomeOff}  
                    onClick={this.selectHome} 
                    to="/">
                    home
                    </Link>
                  }

                  
                  {history.location.pathname !== "/Gallery" &&
                    <Link 
                    style={this.state.hoverGallery ? hoverTabStyle : tabStyle} 
                    onMouseEnter={this.hoverGalleryOn} 
                    onMouseLeave={this.hoverGalleryOff}  
                    onClick={this.selectGallery} 
                    to="/Gallery">
                    gallery
                    </Link>
                  }

                  {history.location.pathname === "/Gallery" && 
                    <Link 
                    style={hoverTabStyle} 
                    to="/Gallery">
                    gallery
                    </Link>
                  }

                  
                  {history.location.pathname === "/About" && 
                    <Link 
                    style={hoverTabStyle} 
                    to="/About">
                    about
                    </Link>
                  }

                  {history.location.pathname !== "/About" &&
                    <Link 
                    style={this.state.hoverAbout ? hoverTabStyle : tabStyle} 
                    onMouseEnter={this.hoverAboutOn} 
                    onMouseLeave={this.hoverAboutOff}  
                    onClick={this.selectAbout} 
                    to="/About">
                    about
                    </Link>
                  }

                {(history.location.pathname === "/Products") && 
                    <Link 
                      style={hoverTabStyle} 
                      to="/Products">
                      products
                    </Link>
                  }

                  {(history.location.pathname !== "/Products") &&
                    <Link 
                      style={this.state.hoverProducts ? hoverTabStyle : tabStyle} 
                      onMouseEnter={this.hoverProductsOn} 
                      onMouseLeave={this.hoverProductsOff}  
                      onClick={this.selectProducts} 
                      to="/Products">
                      products
                    </Link>
                  }

                  {history.location.pathname === "/Custom" && 
                    <Link 
                    style={hoverTabStyle} 
                    to="/Custom">
                    custom
                    </Link>
                  }

                  {history.location.pathname !== "/Custom" &&
                    <Link 
                    style={this.state.hoverCustom ? hoverTabStyle : tabStyle} 
                    onMouseEnter={this.hoverCustomOn} 
                    onMouseLeave={this.hoverCustomOff}  
                    onClick={this.selectCustom} 
                    to="/Custom">
                    custom
                    </Link>
                  }

                  {history.location.pathname !== "/Contact" &&
                    <Link 
                    style={this.state.hoverContact ? hoverTabStyle : tabStyle} 
                    onMouseEnter={this.hoverContactOn} 
                    onMouseLeave={this.hoverContactOff}  
                    onClick={this.selectContact} 
                    to="/Contact">
                    contact
                    </Link>
                  }

                  {history.location.pathname === "/Contact" && 
                    <Link 
                    style={hoverTabStyle} 
                    to="/Contact">
                    contact
                    </Link>
                  }

                  <br/>

                  {this.state.auth &&
                  <div style={{float: "right", marginRight: "5px", marginTop: "-30px"}}>
                    <br/>
                    <br/>
                      <DropdownButton className="dropdown-basic-button" id="dropdown-basic-button" title="admin">
                        <Dropdown.Item className="dropdown-item" href="/AdminOrders">orders</Dropdown.Item>
                        <Dropdown.Item className="dropdown-item" href="/AdminProducts">products</Dropdown.Item>
                        <Dropdown.Item className="dropdown-item" href="/AdminColours">colours</Dropdown.Item>
                        <Dropdown.Item className="dropdown-item" href="/AdminImages">images</Dropdown.Item>
                      </DropdownButton>
                    
                  </div>
                }
              </nav>
              <br/><br/><br/>
          </MediaQuery>

          <MediaQuery query='(max-width: 999px)'>
            <div className="mobileTabHeader">
                <CheeseburgerMenu
                  isOpen={this.state.menuOpen}
                  closeCallback={this.closeMenu.bind(this)}>
                        <Link onClick={this.closeMenu.bind(this)} style={{textDecoration: "none"}} to="/">
                          <p style={{mobileOptions}}>home</p>
                        </Link>
                        <br/>

                        <Link  onClick={this.closeMenu.bind(this)} style={{textDecoration: "none"}} to="/Gallery">
                          <p style={{mobileOptions}}>gallery</p>
                        </Link>
                        <br/>

                        <Link  onClick={this.closeMenu.bind(this)} style={{textDecoration: "none"}} to="/About">
                          <p style={{mobileOptions}}>about</p>
                        </Link>
                        <br/>

                        <Link  onClick={this.closeMenu.bind(this)} style={{textDecoration: "none"}} to="/Products">
                          <p style={{mobileOptions}}>products</p>
                        </Link>
                        <br/>

                        <Link  onClick={this.closeMenu.bind(this)} style={{textDecoration: "none"}} to="/Custom">
                          <p style={{mobileOptions}}>custom</p>
                        </Link>
                        <br/>

                        <Link  onClick={this.closeMenu.bind(this)} style={{textDecoration: "none"}} to="/Contact">
                          <p style={{mobileOptions}}>contact</p>
                        </Link>
                        <br/>

                        { this.state.auth &&
                          <div>
                            <br/>
                            <Link  onClick={this.closeMenu.bind(this)} style={{textDecoration: "none"}} to="/AdminOrders">
                              <p style={{mobileOptions}}>orders</p>
                            </Link>
                            <br/>
                            <Link  onClick={this.closeMenu.bind(this)} style={{textDecoration: "none"}} to="/AdminProducts">
                              <p style={{mobileOptions}}>products</p>
                            </Link>
                            <br/>
                            <Link  onClick={this.closeMenu.bind(this)} style={{textDecoration: "none"}} to="/AdminColours">
                              <p style={{mobileOptions}}>colours</p>
                            </Link>
                            <br/>
                            <Link  onClick={this.closeMenu.bind(this)} style={{textDecoration: "none"}} to="/AdminImages">
                              <p style={{mobileOptions}}>images</p>
                            </Link>
                          </div>
                        }
                </CheeseburgerMenu>
          
                <HamburgerMenu
                  isOpen={this.state.menuOpen}
                  menuClicked={this.openMenu.bind(this)}
                  width={32}
                  height={24}
                  strokeWidth={3}
                  rotate={0}
                  color='black'
                  borderRadius={0}
                  animationDuration={0.5}
                  className="hamburgerMenu"
                />
            </div>
            
        </MediaQuery>

        <div>

            <Switch onChange={this.updateHistory}>
                <Route exact path="/" onChange={this.updateHistory}><HomeForm/></Route>
                <Route exact path="/Gallery" onChange={this.updateHistory}><GalleryForm/></Route>
                <Route exact path="/Product/:id" onChange={this.updateHistory} render={props => (<ItemForm {...props}  />)}/>
                <Route exact path="/Custom" onChange={this.updateHistory}><CustomForm /></Route>
                <Route exact path="/About" onChange={this.updateHistory}><AboutForm /></Route>
                <Route exact path="/Products" onChange={this.updateHistory}><ViewProductsForm/></Route>
                <Route exact path="/Contact" onChange={this.updateHistory}><ContactForm/></Route>

                <Route exact path="/Login" onChange={this.updateHistory}><LoginForm changeAuth={this.updateAuth} changeRemoveAuth={this.removeAuth} /></Route>
                <Route exact path="/AdminOrders" onChange={this.updateHistory}><OrdersForm changeAuth={this.updateAuth} changeRemoveAuth={this.removeAuth} /></Route>
                <Route exact path="/AdminProducts" onChange={this.updateHistory}><ProductsForm changeAuth={this.updateAuth} changeRemoveAuth={this.removeAuth} /></Route>
                <Route exact path="/AddProduct" onChange={this.updateHistory}><AddProductsForm changeAuth={this.updateAuth} changeRemoveAuth={this.removeAuth} /></Route>
                <Route exact path="/AdminColours" onChange={this.updateHistory}><ColoursForm changeAuth={this.updateAuth} changeRemoveAuth={this.removeAuth} /></Route>
                <Route exact path="/AdminImages" onChange={this.updateHistory}><ImagesForm changeAuth={this.updateAuth} changeRemoveAuth={this.removeAuth} /></Route>
                <Route exact path="/AddColour" onChange={this.updateHistory}><AddColoursForm changeAuth={this.updateAuth} changeRemoveAuth={this.removeAuth} /></Route>
                <Route exact path="/AddImage" onChange={this.updateHistory}><AddImageForm changeAuth={this.updateAuth} changeRemoveAuth={this.removeAuth} /></Route>
                <Route exact path="/EditOrder/:id" onChange={this.updateHistory} render={props => (<EditOrderForm changeAuth={this.updateAuth} changeRemoveAuth={this.removeAuth}  {...props} />)} />
                <Route exact path="/EditProduct/:id" onChange={this.updateHistory} render={props => (<EditProductsForm changeAuth={this.updateAuth} changeRemoveAuth={this.removeAuth}  {...props} />)} />
                <Route exact path="/EditImage/:id" onChange={this.updateHistory} render={props => (<EditImageForm changeAuth={this.updateAuth} changeRemoveAuth={this.removeAuth}  {...props} />)} />
            </Switch>

            { history.location.pathname !== "/Contact" &&
              <div>
                <SocialIcon style={{margin: "20px", width: "30px", height: "30px"}} url="https://www.facebook.com/littledipperleather/" />
                <SocialIcon style={{margin: "20px", width: "30px", height: "30px"}} url="https://www.instagram.com/littledipperleather/" />
                <SocialIcon style={{margin: "20px", width: "30px", height: "30px"}} url="https://www.youtube.com/c/littledipperleathercustoms" />
              </div>
            }
            <br/>
            <br/>
          </div>
        </div>
      </Router>
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

async function logOut(username, token) {
  let myJson = {};
  myJson.username = username;
  myJson.token = token;

  console.log(myJson)
  let data = {};

  await (async () => {
    const rawResponse = await fetch('/api/v1/LogOut', {
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


export default App;