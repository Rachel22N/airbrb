import { React, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ChavronLeft from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate as navigate } from 'react-router-dom';

import { listDetail, listCreate, listUpdate } from '../../apis';
import { fileToDataUrl } from '../../helpers'
import InterfaceHeader from '../InterfaceHeader';

function PagePropertyEdit (props) {
  // props
  const { token, uemail, pid } = props;

  // state
  const [thumb, setThumb] = useState('');
  const [imglist, setImglist] = useState([]);
  const [title, setTitle] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postcode, setPostcode] = useState('');
  const [country, setCountry] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState(0);
  const [nbed, setNbed] = useState(1);
  const [nbath, setNbath] = useState(1);
  const [amenity, setAmenity] = useState('');
  const [postedon, setPostedon] = useState('');
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  // private: update property
  function pUpdate () {
    listUpdate(
      token,
      pid,
      title,
      { street, city, state, postcode, country },
      price,
      thumb,
      { nbed, nbath, amenities: amenity, imglist, postedon },
    )
      .then((res) => {
        navigate('/dashboard');
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
      { nbed, nbath, amenities: amenity, imglist, postedon: new Date().toISOString() },
    )
      .then((res) => {
        navigate('/dashboard');
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
    const ret = [];
    files.forEach(x => {
      fileToDataUrl(x)
        .then((res) => ret.push(res))
        .catch((res) => {
          setAlert(true);
          setAlertMsg(res);
        })
    });
    setImglist(ret);
  }

  // fetch property detail, or create property
  if (pid) {
    listDetail(pid)
      .then((res) => {
        setThumb(res.thumbnail);
        setImglist(res.metadata.imglist);
        setTitle(res.title);
        setStreet(res.address.street);
        setCity(res.address.city);
        setState(res.address.state);
        setPostcode(res.address.postcode);
        setCountry(res.address.country);
        setType(res.metadata.type);
        setPrice(res.price);
        setNbed(res.metadata.nbed);
        setNbath(res.metadata.nbath);
        setAmenity(res.metadata.amenities);
        setPostedon(res.metadata.postedOn)
      })
      .catch((res) => {
        setAlert(true);
        setAlertMsg(res);
      })
  }

  return (
    <Container fluid>
      <InterfaceHeader uemail={uemail} />
      { alert && <Alert variant='danger' onClose={() => setAlert(false)} dismissible>{alertMsg}</Alert> }
      <Row>
        <Col><Button variant='primary'><ChavronLeft color='white' size={42} />Back</Button></Col>
      </Row>
      <Row>
        <Col><Form>
          <Form.Group as={Row} className='mb-3' controlId='propertyedit-thumbnail'>
            <Form.Label column sm='2'>Thumbnail</Form.Label>
            <Col sm='10'><Form.Control type='file' value={thumb} onChange={e => parseThumb(e.target.files[0])} /></Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3' controlId='propertyedit-title'>
            <Form.Label column sm='2'>Title</Form.Label>
            <Col sm='10'><Form.Control type='text' value={title} onChange={e => setTitle(e.target.value)} /></Col>
          </Form.Group>
          <h3>Address</h3>
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
          <br />
          <Form.Group as={Row} className='mb-3' controlId='propertyedit-type'>
            <Form.Label column sm='2'>Type</Form.Label>
            <Col sm='10'><Form.Select value={type} onChange={e => setType(e.target.value)}>
              <option>House</option>
              <option>Apartment</option>
            </Form.Select></Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3' controlId='propertyedit-price'>
            <Form.Label column sm='2'>Price</Form.Label>
            <Col sm='10'><Form.Control type='text' value={price} onChange={e => setPrice(parseInt(e.target.value))} /></Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3' controlId='propertyedit-nbed'>
            <Form.Label column sm='2'>#Bedroom</Form.Label>
            <Col sm='10'><Form.Select value={nbed} onChange={e => setNbed(e.target.value)}>
              <option selected>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
            </Form.Select></Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3' controlId='propertyedit-nbath'>
            <Form.Label column sm='2'>#Bathroom</Form.Label>
            <Col sm='10'><Form.Select value={nbath} onChange={e => setNbath(e.target.value)}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
            </Form.Select></Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3' controlId='propertyedit-amenities'>
            <Form.Label column sm='2'>Amenities</Form.Label>
            <Col sm='10'><Form.Control type='text' value={amenity} onChange={e => setAmenity(e.target.value)} /></Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3' controlId='propertyedit-imglist'>
            <Form.Label column sm='2'>Other Images</Form.Label>
            <Col sm='10'><Form.Control type='file' multiple value={imglist} onChange={e => parseImglist(e.target.files)} /></Col>
          </Form.Group>
        </Form></Col>
        {
          pid
            ? <Button variant='primary' onClick={pUpdate}>Save</Button>
            : <Button variant='primary' onClick={pCreate}>Create</Button>
        }
      </Row>
    </Container>
  )
}

export default PagePropertyEdit;
