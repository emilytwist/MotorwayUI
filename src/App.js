import React, { useEffect, useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpandArrowsAlt} from '@fortawesome/free-solid-svg-icons'
import {Row, Col, Button, Modal, Form} from 'react-bootstrap';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import ColourPickerButton from "./ColourPickerButton";
import RangeSlider from 'react-bootstrap-range-slider';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import Img from "react-cool-img";
import Masonry from 'react-masonry-css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import loadingImage from "./logo.svg";
import errorImage from "./logo.svg";

const App = () => {
  const [images, setImages] = useState();
  const [currentImage, setCurrentImage] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [value, setValue] = useState(20000);

  useEffect(() => {
    fetch('images?limit=10')
      .then(res => res.json())
      .then(data => {
        setImages(data);
        setInfo(data[0]);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const breakpointColumnsObj = {
    default: 4,
    1600: 3,
    1250: 2,
    480: 1
  };

  const setInfo = (current) => {
    setCurrentImage(current.url + ".jpg");
    const profileImage = document.getElementById("profile-image");
          profileImage.src= current.user.profile_image + ".webp";
          profileImage.alt = current.user.name + " profile";
    const imageName = document.getElementById("image-name");
    const overlayInfo = document.getElementById(current.id + "-overlay");
    const imageDescription = document.getElementById("image-description");
          imageName.innerHTML = "";
          overlayInfo.innerHTML = "";
          imageDescription.innerHTML = "";
          if (current.user.name) {
            imageName.innerHTML = current.user.name;
            overlayInfo.innerHTML = current.user.name 
            if (current.description) {
              overlayInfo.innerHTML += " - "; 
            }
          }
          if (current.description) {
            overlayInfo.innerHTML += current.description.substring(0, 30) + "...";
            imageDescription.innerHTML = current.description;
          }
  }

  const setCurrent = (id) => {
    const arrayImage = images.find(image => image.id === id);
    const previousImage = document.getElementsByClassName("active");
          previousImage[0].classList.remove("active");
    const previousOverlay = document.getElementsByClassName("overlay-description");
          previousOverlay[0].classList.remove("overlay-description");
    const previousLightbox = document.getElementsByClassName("overlay-lightbox");
          previousLightbox[0].classList.remove("overlay-lightbox");
    const currentImage = document.getElementById(id);
          currentImage.classList.add("active");
    const currentOverlay = document.getElementById(id + "-overlay");
          currentOverlay.classList.add("overlay-description");
    const currentLightbox = document.getElementById(id + "-lightbox");
          currentLightbox.classList.add("overlay-lightbox");
   setInfo(arrayImage);
  }

  return (
    <>
    <Modal show={formOpen} onHide={() => setFormOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Step 3 - Forms</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
        <Form.Group as={Row} className="mb-3" controlId="formName">
            <Form.Label column sm="2">
              Name
            </Form.Label>
            <Col sm="10">
              <Form.Control required type="text" placeholder="Enter Name" feedback="Your name is required"/>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formEmail">
            <Form.Label column sm="2">
              Email
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" placeholder="Enter email here" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formDOB">
            <Form.Label column sm="2">
              Date of Birth
            </Form.Label>
            <Col sm="10">
              <Datetime dateFormat="Do MMM YYYY" timeFormat={false} closeOnSelect={true}/>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formColour">
            <Form.Label column sm="2">
              Favourite Colour
            </Form.Label>
            <Col sm="10">
              <ColourPickerButton />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formRange">
            <Form.Label column sm="2">
              Salary
            </Form.Label>
            <Col sm="10">
              <RangeSlider
                min={10000} max={100000} value={value} step={5000} tooltip='auto'
                onChange={e => setValue(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setFormOpen(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setFormOpen(false)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    {isOpen &&
      <Lightbox
      mainSrc={currentImage}
      onCloseRequest={() => setIsOpen(false)}
      />
    }
    <div className='app'>
        <Row className="justify-content-between">
          <Col xs={12} sm={8} md={3}>
            <img id="logo" className='mt-4 ml-4' src="logo.png" alt="Motorway" />
          </Col>
          <Col xs={12} sm={4}>
            {!formOpen &&
            <Button variant="primary" className="form-button" onClick={() => setFormOpen(true)}>
              View Form
            </Button>
            }
          </Col>
        </Row>
        <Row className="white-bg p-4 mt-xs-2 mt-md-4">
          <Col xs={12} md={8}>
            
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            {
                      images && images.map(img => (
                        <div className="image-container" key={img.id} >
                          <Img
                          id={img.id}
                          className={images[0].id === img.id ? "portfolio-images active" : "portfolio-images"}
                          placeholder={loadingImage}
                          src={`${img.url}.jpg`}
                          error={errorImage}
                          alt={img.alt_description}
                          onClick={()=>setCurrent(img.id)}
                        />
                          <div className="image-overlay d-md-none">
                            <span id={img.id + "-lightbox"} className={images[0].id === img.id ? "overlay overlay-lightbox" : "overlay"} onClick={() => setIsOpen(true)}><FontAwesomeIcon icon={faExpandArrowsAlt} /></span>
                            <span id={img.id + "-overlay"} className={images[0].id === img.id ? "overlay overlay-description" : "overlay"}></span>
                          </div>
                        </div>
                      ))

                    }
          </Masonry>
          
          </Col>
          <Col xs={12} md={4} className="p-4 d-none d-md-block">
            <img id="profile-image" className="float-left profile-image" src="" alt="" />
            <span id="image-name" className="float-right"></span>
            <p id="image-description"></p>
            <Button variant="primary" onClick={() => setIsOpen(true)}>
              View Larger Image
            </Button>
          </Col>
        </Row>
    </div>
    </>
  );
}

export default App;
