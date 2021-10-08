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
            <p>Email: <a href="mailto:littledipperleathercustoms@gmail.com" style={{color: "black", textDecoration: "none"}}>littledipperleathercustoms@gmail.com</a></p>
            <br/>
            <p>On Instagram: <a href="https://www.instagram.com/littledipperleather/" target="_blank" style={{color: "black", textDecoration: "none"}}>https://www.instagram.com/littledipperleather/</a>
            </p>
            <br/>
            <p>On Facebook: <a href="https://www.facebook.com/littledipperleather/" target="_blank" style={{color: "black", textDecoration: "none"}}>https://www.facebook.com/littledipperleather/</a>
            </p>
            <br/>
            <p>On Youtube: <a href="https://www.youtube.com/c/littledipperleathercustoms" target="_blank" style={{color: "black", textDecoration: "none"}}>https://www.youtube.com/c/littledipperleathercustoms</a>
            </p>
            <br/>
            <p>On Etsy: <a href="https://www.etsy.com/ca/shop/LittleDipperLeather" target="_blank" style={{color: "black", textDecoration: "none"}}>https://www.etsy.com/ca/shop/LittleDipperLeather</a>
            </p>
            <br/>
            <br/>
            <br/>

            <SocialIcon style={{margin: "20px", width: "30px", height: "30px"}} url="https://www.facebook.com/littledipperleather/" />
            <SocialIcon style={{margin: "20px", width: "30px", height: "30px"}} url="https://www.instagram.com/littledipperleather/" />
            <SocialIcon style={{margin: "20px", width: "30px", height: "30px"}} url="https://www.youtube.com/c/littledipperleathercustoms" />
            <br/>
          </div>
        </div>
      </div>
    );
  }
}


export default ContactForm;