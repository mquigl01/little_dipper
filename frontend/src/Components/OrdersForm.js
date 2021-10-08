import React from 'react';
import history from './history';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';

class OrdersForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
    }

    this.getOrderData = this.getOrderData.bind(this);
    this.orderData = this.orderData.bind(this);
    this.convertDate = this.convertDate.bind(this);
  }

  componentDidMount () {
    this.getOrderData();
  }

  async getOrderData() {
    let authData = getCookieData();

    console.log(authData)
    if(authData.username && authData.token) { 
      let authCheck = await checkAuth(authData.username, authData.token);

      if(authCheck.length === 0) {
        await history.push("/login");
        window.location.reload();
        this.props.changeRemoveAuth();
      }
      else {
        let myOrders = await getOrders(this.state.id);
        this.setState({orders: myOrders})

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

  orderData() {
    return (
      <TableBody>
        {this.state.orders.map((order) => (
          <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell style={{width: "80px"}}>
                {order.status}
              </TableCell>
              <TableCell style={{width: "80px"}}>
                {order.product}
              </TableCell>
              <TableCell>
                {order.email}
              </TableCell>
              <TableCell>
                {order.details}
              </TableCell>
              <TableCell>
                {order.notes}
              </TableCell>
              <TableCell>
                {this.convertDate(order.date_added)}
              </TableCell>
              <TableCell>
                <Tooltip title="Edit Order">
                  <Link to={"/EditOrder/" + order.id}>
                      <EditIcon className="print-button-icon" style={{ fontSize: 30 }} />
                  </Link>
                </Tooltip>
              </TableCell>
          </TableRow>
        ))}
      </TableBody>
    )
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

  render() {
    return (
      <div className="tabContent">
        {this.state.loading === true &&
          <div className="loader"></div>
        }

        {this.state.loading === false &&
          <div>
            <h3>Orders</h3><br/>
            <div style={{maxHeight: "600px", overflowY: "scroll", maxWidth: "80%", margin: "auto"}}>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Product</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Details</TableCell>
                        <TableCell>My Notes</TableCell>
                        <TableCell>Added</TableCell>
                      </TableRow>
                    </TableHead>
                    {this.orderData()}
                  </Table>
              </TableContainer>
            </div>
          </div>
        }
      </div>
    );
  }
}

async function getOrders() {
    let data = {};
  
    await (async () => {
      const rawResponse = await fetch('/api/v1/getOrders', {
        method: 'get'
      });
      data = await rawResponse.json();
    })();
  
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

export default OrdersForm;