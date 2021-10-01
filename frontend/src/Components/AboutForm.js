import React from 'react';
//import MediaQuery from 'react-responsive';
import history from './history';
import { Router } from 'react-router-dom';

class AboutForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Router history={history}>
          <div className="tabContent">
            <div style={{ margin: "20px", marginTop: "10px", marginBottom: "10px", textAlign: "left" }}>
              <h3>About</h3>
              <br /><br />
              <div style={{margin: "auto", width: "100%", textAlign: "left"}}>
                <p style={{maxWidth: "60%", fontWeight: "bold", margin: "auto"}}>
                Tara Quigley – Owner, Designer, Maker
                </p>
                <br/>
                <p style={{ maxWidth: "60%", margin: "auto"}}>
                After the Christmas of 2019, I made the difficult decision to stop pursuing my Master’s Degree. What did I want from life? That Christmas, I convinced family and friends to buy me a few leatherworking tools to explore a new hobby.
                <br/><br/>
                I didn’t know it at the time, but these decisions shaped me deeply, and they are the reason you find me here.
                <br/><br/>
                You might wonder, why leatherworking? Why leather? Maybe it’s leather’s humble beginnings and extensive history. Maybe it’s the way it feels and looks. A large part of my love for the craft is the welcoming community and the peace of the practice. I hope, with every piece I make, some of that rich history and peaceful, welcoming community finds its way into your life.
                <br/><br/>
                Little Dipper Leather & Customs was officially born in July of 2021, after years of making and learning and gifting to family and friends who were too polite to turn down early prototypes. I am at the beginning of my lifelong journey of mastering this craft. It would be an understatement to say I am excited to share that journey with the world through the pieces I create. I hope to bring a modern and colourful twist to the leatherworking community.
                <br/><br/>
                Outside of leatherworking, I enjoy spending time with my family. We like to get away and camp or relax in the quiet countryside. You’ll find me outside or at the gym climbing when I can. I studied neuroscience in school, and now enjoy absorbing science through podcasts and books. I also enjoy photography and film, which has helped me get started sharing my pieces through YouTube videos and social media.
                <br/><br/>
                Thank you for taking interest in my craft and business. Thank you for joining me on this journey.
                </p>
                <br/><br/><br/><br/>
                <p style={{maxWidth: "60%", fontWeight: "bold", margin: "auto"}}>
                Bear – Senior Branch Manager (Big Dipper)
                </p>
                <br/><br/>
                <p style={{ maxWidth: "60%", margin: "auto"}}>
                Bear joined us as a 2 month old foster failure in June of 2020. After many hours of good training, he has become a very loyal, trusting, and kind addition to our very small team at Little Dipper Leather. We look forward to the day he can play a bigger role in the shop as our business grows and we are able to claim a space.
                </p>
                <br/><br/><br/><br/>
                <p style={{maxWidth: "60%", fontWeight: "bold", margin: "auto"}}>
                Pebbles – Marketing and Modeling (Little Dipper)
                </p>
                <br/><br/>
                <p style={{ maxWidth: "60%", margin: "auto"}}>
                Pebbles joined us one short month after Bear at 11 weeks old. He had made a home of a dumpster, and we are grateful and proud to say he has flourished here as part of the Little Dipper Leather team. He has naturally stepped into a modeling role here and thrives in the limelight. We look forward to many more photos and videos of Pebbles as we grow.
                </p>
                <br/><br/><br/><br/>
                <p style={{maxWidth: "60%", fontWeight: "bold", margin: "auto"}}>
                Company Values
                </p>
                <br/><br/>
                <p style={{ maxWidth: "60%", margin: "auto"}}>
                I hope to run this business informed by the world around me and the struggles we are facing. Animal and fruit leather are biodegradable. I hand make each leather product to order in Ontario, Canada. All packaging is recycled and made of paper where possible. As a small business in its very beginnings, many of my dreams of being environmentally responsible and informed are in the “hopes and dreams” phase. In the not-so-distant future, I would like to personally vouch for the conditions on farms producing animal leather I source from. I would like to continue to improve my packaging to reduce unnecessary manufacturing and nonbiodegradable waste. I offer repair services for any goods of my own and am happy to take on repair projects for other leather goods. I am also happy to take in goods that are broken or no longer being used to provide them with a chance at a second life.
                </p>
              </div>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}


export default AboutForm;