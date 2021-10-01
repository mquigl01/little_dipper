import React from 'react';
import { SocialIcon } from 'react-social-icons';

class ContactForm extends React.Component {
  render() {
    return (
      <div>
        <div className="tabContent">
          <div style={{margin: "20px", marginTop: "10px", marginBottom: "10px"}}>
            <h3>Contact Us</h3>

            <img  alt="Little Dipper Paws Logo" style={{width: "180px", height: "100px", margin: "auto"}} src="./img/paws.png"/>
            <br/>
            <br/>
            
            <p><SocialIcon style={{margin: "20px", width: "30px", height: "30px"}} url="https://www.facebook.com/littledipperleather/" />
            <SocialIcon style={{margin: "20px", width: "30px", height: "30px"}} url="https://www.instagram.com/littledipperleather/" />
            <SocialIcon style={{margin: "20px", width: "30px", height: "30px"}} url="https://www.youtube.com/c/littledipperleathercustoms" />@littledipperleather</p><br/>
            <p><a href="mailto:littledipperleathercustoms@gmail.com" style={{color: "black", textDecoration: "none"}}>littledipperleathercustoms@gmail.com</a></p>
            <br/>
            <p><a href="https://www.etsy.com/ca/shop/LittleDipperLeather" target="_blank" style={{color: "black", textDecoration: "none"}}>https://www.etsy.com/ca/shop/LittleDipperLeather</a>
            </p>
            <br/>
          </div>
        </div>
      </div>
    );
  }
}


export default ContactForm;