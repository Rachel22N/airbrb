import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate, useParams, Link } from 'react-router-dom';

import { listDetail, listCreate, listUpdate } from '../../apis';
import { fileToDataUrl } from '../../helpers'
import InterfaceHeader from '../InterfaceHeader';

function PagePropertyEdit () {
  // props
  const token = localStorage.getItem('token');
  const pid = useParams().listingId;
  console.log(`[INFO] PropertyEdit/Create: ${pid}`)

  // state
  const [thumb, setThumb] = useState('');
  const [imglist, setImglist] = useState([]);
  const [title, setTitle] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postcode, setPostcode] = useState('');
  const [country, setCountry] = useState('');
  const [type, setType] = useState('House');
  const [price, setPrice] = useState(0);
  const [nbed, setNbed] = useState(1);
  const [nbath, setNbath] = useState(1);
  const [nroom, setNroom] = useState(1);
  const [aWifi, setAWifi] = useState(false);
  const [aPark, setAPark] = useState(false);
  const [aAC, setAAC] = useState(false);
  const [aBreakfast, setABreakfast] = useState(false);
  const [aPets, setAPets] = useState(false);
  const [aSPA, setASPA] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  const navigate = useNavigate();

  // private: update property
  function pUpdate () {
    listUpdate(
      token,
      pid,
      title,
      { street, city, state, postcode, country },
      price,
      thumb,
      { type, numBed: nbed, numBath: nbath, numRoom: nroom, wifi: aWifi, parking: aPark, airConditioning: aAC, breakfast: aBreakfast, pets: aPets, spa: aSPA, imgList: imglist }
    )
      .then((res) => {
        return navigate('/dashboard');
      })
      .catch((res) => {
        setAlert(true);
        setAlertMsg(res);
      })
  }

  // private: create property
  function pCreate () {
    listCreate(
      token,
      title,
      { street, city, state, postcode, country },
      price,
      thumb,
      { type, numBed: nbed, numBath: nbath, numRoom: nroom, wifi: aWifi, parking: aPark, airConditioning: aAC, breakfast: aBreakfast, pets: aPets, spa: aSPA, imgList: imglist }
    )
      .then((res) => {
        return navigate('/dashboard');
      })
      .catch((res) => {
        setAlert(true);
        setAlertMsg(res);
      })
  }

  // private: set thumbnail
  function parseThumb (file) {
    fileToDataUrl(file)
      .then((res) => setThumb(res))
      .catch((res) => {
        setAlert(true);
        setAlertMsg(res);
      })
  }

  // private set imglist
  function parseImglist (files) {
    console.log(files);
    for (let i = 0; i < files.length; i++) {
      fileToDataUrl(files[i])
        .then((res) => {
          const tmp = imglist;
          tmp.push(res);
          setImglist(tmp);
        })
        .catch((res) => {
          setAlert(true);
          setAlertMsg(res);
        })
    }
  }

  // fetch property detail, or create property
  useEffect(() => {
    if (!pid) return;
    const fetchData = async () => {
      try {
        const res = await listDetail(pid);
        setThumb(res.listing.thumbnail);
        setImglist(res.listing.metadata.imgList);
        setTitle(res.listing.title);
        setStreet(res.listing.address.street);
        setCity(res.listing.address.city);
        setState(res.listing.address.state);
        setPostcode(res.listing.address.postcode);
        setCountry(res.listing.address.country);
        setType(res.listing.metadata.type);
        setPrice(res.listing.price);
        setNbed(res.listing.metadata.numBed);
        setNbath(res.listing.metadata.numBath);
        setNroom(res.listing.metadata.numRoom);
        setAWifi(res.listing.metadata.wifi);
        setAPark(res.listing.metadata.parking);
        setAAC(res.listing.metadata.airConditioning);
        setABreakfast(res.listing.metadata.breakfast);
        setAPets(res.listing.metadata.pets);
        setASPA(res.listing.metadata.spa);
      } catch (error) {
        setAlert(true);
        setAlertMsg(error);
      }
    };

    fetchData();
  }, [pid]);

  return (
    <><InterfaceHeader />
    <Container fluid>
      { alert && <Alert variant='danger' onClose={() => setAlert(false)} dismissible>{alertMsg}</Alert> }
      <Row className='my-5'>
        <Col>
          <Link to='/dashboard' className='fs-5 link-underline link-underline-opacity-0'>&#8617; Back</Link>
        </Col>
      </Row>
      <Row className='mx-5'>
        <Col><Form>
          <h5>Pictures</h5>
          <Form.Group as={Row} className='mb-3' controlId='propertyedit-thumbnail'>
            <Form.Label column sm='2'>Thumbnail</Form.Label>
            <Col sm='10'><Form.Control type='file' onChange={e => parseThumb(e.target.files[0])} /></Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3' controlId='propertyedit-imglist'>
            <Form.Label column sm='2'>Other Images</Form.Label>
            <Col sm='10'><Form.Control type='file' multiple onChange={e => parseImglist(e.target.files)} /></Col>
          </Form.Group>
          <h5 className='mt-5'>Name</h5>
          <Form.Group as={Row} className='mb-3' controlId='propertyedit-title'>
            <Form.Label column sm='2'>Title</Form.Label>
            <Col sm='10'><Form.Control type='text' value={title} onChange={e => setTitle(e.target.value)} /></Col>
          </Form.Group>
          <h5 className='mt-5'>Address</h5>
          <Form.Group as={Row} className='mb-3' controlId='propertyedit-address-street'>
            <Form.Label column sm='2'>Street</Form.Label>
            <Col sm='10'><Form.Control type='text' value={street} onChange={e => setStreet(e.target.value)} /></Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3' controlId='propertyedit-address-city'>
            <Form.Label column sm='2'>City</Form.Label>
            <Col sm='10'><Form.Control type='text' value={city} onChange={e => setCity(e.target.value)} /></Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3' controlId='propertyedit-address-state'>
            <Form.Label column sm='2'>State</Form.Label>
            <Col sm='10'><Form.Control type='text' value={state} onChange={e => setState(e.target.value)} /></Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3' controlId='propertyedit-address-postcode'>
            <Form.Label column sm='2'>Postcode</Form.Label>
            <Col sm='10'><Form.Control type='text' value={postcode} onChange={e => setPostcode(e.target.value)} /></Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3' controlId='propertyedit-address-country'>
            <Form.Label column sm='2'>Country</Form.Label>
            <Col sm='10'><Form.Control type='text' value={country} onChange={e => setCountry(e.target.value)} /></Col>
          </Form.Group>
          <h5 className='mt-5'>Detail</h5>
          <Form.Group as={Row} className='mb-3' controlId='propertyedit-type'>
            <Form.Label column sm='2'>Type</Form.Label>
            <Col sm='10'><Form.Select value={type} onChange={e => setType(e.target.value)} defaultValue='House'>
              <option>House</option>
              <option>Apartment</option>
              <option>Studio</option>
            </Form.Select></Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3' controlId='propertyedit-price'>
            <Form.Label column sm='2'>Price</Form.Label>
            <Col sm='10'><Form.Control type='text' value={price} onChange={e => setPrice(parseInt(e.target.value))} /></Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3' controlId='propertyedit-nbed'>
            <Form.Label column sm='2'>#Bedroom</Form.Label>
            <Col sm='10'><Form.Select value={nbed} onChange={e => setNbed(e.target.value)} defaultValue='1'>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
            </Form.Select></Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3' controlId='propertyedit-nbath'>
            <Form.Label column sm='2'>#Bathroom</Form.Label>
            <Col sm='10'><Form.Select value={nbath} onChange={e => setNbath(e.target.value)} defaultValue='1'>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
            </Form.Select></Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3' controlId='propertyedit-nroom'>
            <Form.Label column sm='2'>#Room</Form.Label>
            <Col sm='10'><Form.Select value={nroom} onChange={e => setNroom(e.target.value)} defaultValue='1'>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
            </Form.Select></Col>
          </Form.Group>
          <h5 className='mt-5'>Amenities</h5>
          <Form.Check type='checkbox' id='propertyedit-amenities-wifi' label='Wi-Fi' checked={aWifi} onChange={(e) => setAWifi(e.target.checked)} />
          <Form.Check type='checkbox' id='propertyedit-amenities-park' label='Car Park' checked={aPark} onChange={(e) => setAPark(e.target.checked)} />
          <Form.Check type='checkbox' id='propertyedit-amenities-ac' label='A/C' checked={aAC} onChange={(e) => setAAC(e.target.checked)} />
          <Form.Check type='checkbox' id='propertyedit-amenities-breakfast' label='Breakfast Included' checked={aBreakfast} onChange={(e) => setABreakfast(e.target.checked)} />
          <Form.Check type='checkbox' id='propertyedit-amenities-pets' label='Pets Allowed' checked={aPets} onChange={(e) => setAPets(e.target.checked)} />
          <Form.Check type='checkbox' id='propertyedit-amenities-spa' label='SPA Facility' checked={aSPA} onChange={(e) => setASPA(e.target.checked)} />
          <Row className='my-5'><Col className='d-grid'>
          {
            pid
              ? <Button variant='primary' onClick={() => pUpdate()}>Save</Button>
              : <Button variant='primary' onClick={() => pCreate()}>Create</Button>
          }
          </Col></Row>
        </Form></Col>
      </Row>
    </Container></>
  )
}

export default PagePropertyEdit;
