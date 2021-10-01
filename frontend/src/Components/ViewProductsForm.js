import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";

class ViewProductsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      loading: true
    };

    this.getProductData = this.getProductData.bind(this);
  }

  componentDidMount() {
    this.getProductData();
  }

  async getProductData() {
    let myProducts = await getProducts();
    console.log(myProducts)
    this.setState({products: myProducts, loading: false})
  }

  buildMenu() {
    return (
      <div class="product-card">
        {this.state.products.map((product) => (
          <Link 
            className="inactive-tab-button"
            style={{fontSize: "22px"}}
            to={"/Product/" + product.id}>
              {product.name}
          </Link>
        ))}
    </div>
    )
  }

  render() {
    return (
      <div className="tabContent">
        < div style={{ margin: "20px", marginTop: "10px", marginBottom: "10px" }}>
          {this.state.products.length === 0 && this.state.loading === false &&
            <div>
              <h3>Coming Soon</h3> <br/><br/>
              <p style={{width: "70%", textAlign: "center", margin: "auto"}}>We are working hard to get orders set up on this site, in the meantime if you want to place an order you can visit my <a href="https://www.etsy.com/ca/shop/LittleDipperLeather" target="_blank" style={{color: "black"}}>etsy shop</a> or message me on <a href="https://www.instagram.com/littledipperleather/" target="_blank" style={{color: "black"}}>instagram</a>! See the contact us page for ways to get in touch.</p>
            </div>
          }
          
          {this.buildMenu()}
        </div>
      </div>
    );
  }
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


export default ViewProductsForm;