import React from "react";
import { useState } from "react"
import Card from 'react-bootstrap/Card'
import { Row, Col } from 'react-bootstrap';
import Carousel from './Carousel'

import 'react-medium-image-zoom/dist/styles.css'

import LocandinaEdit from './LocandinaEdit'

function Locandina(props) {

  const [show, setShow] = useState(false);

  return (
    <Card className="mb-3 bg-dark text-white">
      <Row>
        <Col>
          <Card.Body>
            <Card.Text><b>Edizione:&nbsp;</b>{props.item.edizione}</Card.Text>
            <Card.Text><b>Tipografica:&nbsp;</b>{props.item.tipografica}</Card.Text>
            <Card.Text><b>Autore:&nbsp;</b>{props.item.autore}</Card.Text>
            {/*<Card.Text><b>Valutazione:&nbsp;</b>{props.item.valutazione}</Card.Text>*/}
            <Card.Text>{props.item.info}</Card.Text>
            <Card.Text><LocandinaEdit item={props.item} onReload={props.onReload} show={show} setShow={setShow} /></Card.Text>
          </Card.Body>
        </Col>
        <Col xs="col-md-auto" className="p-3 mr-3">
          <Carousel annunci={props.item.annunci}></Carousel>
        </Col>
      </Row>
    </Card>
  );
}

export default Locandina;