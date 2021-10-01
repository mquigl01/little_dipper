import React from 'react';
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'
import PhotoswipeUIDefault from 'photoswipe/dist/photoswipe-ui-default'
import { Gallery, Item } from 'react-photoswipe-gallery'



class GalleryForm extends React.Component {
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
    this.setState({images: myImages})
  }

  imageGallery() {
    return (
      <div style={{marginTop: "120px", maxWidth: "100%"}}>
        {this.state.images.map((image, index) => (
            <img style={{width: "350px", height: "250px", margin: "5px"}} src={image.src} alt={image.caption} />
        ))}
      </div>
    );
  }

  imageGalleryViewer() {
    return (
      <div style={{marginTop: "120px", maxWidth: "100%"}}>
        {this.state.images.map((image, index) => (
           <Item
            id={image.index}
            original={image.src}
            thumbnail={image.src}
            height="800"
            width="1100"
          >
            {({ ref, open }) => (
              <img ref={ref} onClick={open} src={image.src} height="300" width="400" style={{margin: "5px"}} />
            )}
          </Item>
    ))}
    </div>
  );
}

  render() {
    return (
      <div>
        <Gallery>
          {this.imageGalleryViewer()}
        </Gallery>
        <br/>
        <br/>
        <br/>
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


export default GalleryForm;