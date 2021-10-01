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
import AddCircleIcon from '@material-ui/icons/AddCircle';

class ColoursForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      colours: [],
    }

    this.getcolourData = this.getcolourData.bind(this);
    this.colourData = this.colourData.bind(this);
    this.convertDate = this.convertDate.bind(this);
  }

  componentDidMount () {
    this.getcolourData();
  }

  async getcolourData() {
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
        let myColours = await getColours();
        this.setState({colours: myColours})

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

  colourData() {
    return (
      <TableBody>
        {this.state.colours.map((colour) => (
          <TableRow key={colour.id}>
              <TableCell>{colour.id}</TableCell>
              <TableCell style={{width: "80px"}}>
                {colour.name}
              </TableCell>
              <TableCell>
                <div style={{display: "flex", justifyContent: "center", float: "left"}}>
                    {colour.hex}
                    <div style={{marginLeft: "10px", marginTop: "-2px", backgroundColor: colour.hex, width: "18px", height: "18px", borderRadius: "50%"}}></div>
                </div>
              </TableCell>
              <TableCell>
                {this.convertDate(colour.date_added)}
              </TableCell>
              <TableCell>
                <Tooltip title="Edit Colour">
                  <Link to={"/EditColour/" + colour.id}>
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
            <div style={{float: "right", marginRight: "140px"}}>
              <Tooltip title="Add Colour">
                <Link to="/AddColour">
                  <AddCircleIcon style={{fontSize: "30px", marginTop: "30px"}}/>
                </Link>
              </Tooltip>
            </div>

            <h3>colours</h3><br/>
            <div style={{maxHeight: "600px", overflowY: "scroll", maxWidth: "80%", margin: "auto"}}>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Hex</TableCell>
                        <TableCell>Added</TableCell>
                      </TableRow>
                    </TableHead>
                    {this.colourData()}
                  </Table>
              </TableContainer>
            </div>
          </div>
        }
      </div>
    );
  }
}

async function getColours() {
    let data = {};
  
    await (async () => {
      const rawResponse = await fetch('/api/v1/getColours', {
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

export default ColoursForm;