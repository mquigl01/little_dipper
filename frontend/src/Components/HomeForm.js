import React from 'react';
import { Carousel } from 'react-carousel-minimal';

const captionStyle = {
  color: "transparent"
}

class HomeForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
    }

    this.getImageData = this.getImageData.bind(this);
  }

  componentDidMount () {
    this.getImageData();
  }

  async getImageData() {
    let myImages = await getImages();

    let convertedImages = []
    for(let i = 0; i < myImages.length; i++) {
        convertedImages[i] = {};
        convertedImages[i].image = myImages[i].src;
        convertedImages[i].caption = myImages[i].caption;
    }

    console.log(convertedImages)
    this.setState({images: convertedImages})
  }

  render() {
    return (
      <div className="tabContent">
        <br/>
        <br/>
        <h3 style={{fontSize: "25px"}}>“Success is a label that the world confers on you, but mastery is an ever onward ‘almost.’”<br/>– Dr. Sarah Lewis</h3>
        <br/>
        {this.state.images.length > 0 &&
            <Carousel
              data={this.state.images}
              time={2000}
              width="100%"
              height="900px"
              captionStyle={captionStyle}
              radius="20px"
              slideNumber={false}
              captionPosition="bottom"
              automatic={true}
              dots={true}
              pauseIconColor="white"
              pauseIconSize="40px"
              slideBackgroundColor="white"
              slideImageFit="contain"
              thumbnails={true}
              thumbnailWidth="150px"
              style={{
                textAlign: "center",
                maxWidth: "100%",
                maxHeight: "100%",
                marginLeft: "30px",
                marginRight: "30px",
              }}
            />
          }
        <br></br>
        <br></br>
        <br></br>
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


export default HomeForm;