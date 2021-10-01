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
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';

class ImagesForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
    }

    this.getImageData = this.getImageData.bind(this);
    this.imageData = this.imageData.bind(this);
    this.convertDate = this.convertDate.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
  }

  componentDidMount () {
    this.getImageData();
  }

  async getImageData() {
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
        let myImages = await getImages();
        this.setState({images: myImages})

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

  async deleteImage(id) {
    console.log(id)
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
        let myJson = {};
        myJson.id = id;

        let response = await deleteImage(myJson);
        console.log(response)
        this.getImageData();
      }
    }
    else {
      await history.push("/login");
      window.location.reload();
      this.props.changeRemoveAuth();
    }
  }

  imageData() {
    return (
      <TableBody>
        {this.state.images.map((image) => (
          <TableRow key={image.id}>
              <TableCell>{image.id}</TableCell>
              <TableCell style={{width: "80px"}}>
                {image.caption}
              </TableCell>
              <TableCell>
              {image.src}
              </TableCell>
              <TableCell>
                <div style={{display: "flex", justifyContent: "center", float: "left"}}>
                    <img src={image.src} alt={image.caption} width="40px" height="40px" />
                </div>
              </TableCell>
              <TableCell>
                {this.convertDate(image.date_added)}
              </TableCell>
              <TableCell>
                <Tooltip title="Edit image">
                  <Link to={"/EditImage/" + image.id}>
                      <EditIcon className="print-button-icon" style={{ fontSize: 30 }} />
                  </Link>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title="Delete image">
                  <DeleteIcon className="print-button-icon" style={{ fontSize: 30 }} onClick={() => this.deleteImage(image.id)} />
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
              <Tooltip title="Add image">
                <Link to="/AddImage">
                  <AddCircleIcon style={{fontSize: "30px", marginTop: "30px"}}/>
                </Link>
              </Tooltip>
            </div>

            <h3 style={{margin: "auto"}}>Images</h3><br/>
            <br/>
            <div style={{maxHeight: "600px", overflowY: "scroll", maxWidth: "80%", margin: "auto"}}>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Caption</TableCell>
                        <TableCell>Src</TableCell>
                        <TableCell>Preview</TableCell>
                        <TableCell>Added</TableCell>
                      </TableRow>
                    </TableHead>
                    {this.imageData()}
                  </Table>
              </TableContainer>
            </div>
          </div>
        }
      </div>
    );
  }
}

async function getImages() {
    let data = {};
  
    await (async () => {
      const rawResponse = await fetch('/api/v1/getImages', {
        method: 'get'
      });
      data = await rawResponse.json();
    })();
  
    return data;
}

async function deleteImage(myJson) {
  let data = {};

  await (async () => {
    const rawResponse = await fetch('/api/v1/deleteImage', {
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

export default ImagesForm;