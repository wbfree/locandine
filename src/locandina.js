import React from "react";
import { useState } from "react"
import Card from 'react-bootstrap/Card'
import { Row, Col } from 'react-bootstrap';

import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

import LocandinaEdit from './LocandinaEdit'

function Locandina(props) {
    
  const [show, setShow] = useState(false);

  return (
        <Card className="mb-3 bg-dark text-white">
          <Row>s
            <Col>
              <Card.Body>
              <Card.Text><b>Edizione:&nbsp;</b>{props.item.edizione}</Card.Text>
              <Card.Text><b>Tipografica:&nbsp;</b>{props.item.tipografica}</Card.Text>
              <Card.Text><b>Autore:&nbsp;</b>{props.item.autore}</Card.Text>
              <Card.Text><b>Valutazione:&nbsp;</b>{props.item.valutazione}</Card.Text>
              <Card.Text>{props.item.info}</Card.Text>
              <Card.Text><LocandinaEdit item={props.item} onReload={props.onReload} show={show} setShow={setShow} /></Card.Text>
              </Card.Body>
            </Col>
            <Col xs="col-md-auto" className="p-3 mr-3">
			  <Zoom >
			    <img
            alt="locandina"
			      //src={'http://fantautosoft.altervista.org/locandina_img.php?url='+props.item.image_link}
			      src={props.item.image_link}
			      width="200"
			    />
			  </Zoom>     
            </Col>
          </Row>
        </Card>
    );
  }
  
  export default Locandina;