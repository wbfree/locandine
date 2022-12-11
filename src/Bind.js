import React from "react";
import { useState, useEffect, useRef } from "react"
import Card from 'react-bootstrap/Card'

function Bind(props) {
  const [item, setItem] = useState([]);

  useEffect(() => {
      fetch('https://balinona.synology.me/ebay/ebay.php?id='+ props.match.params.id + '&group=' + props.match.params.group)
        .then(response => response.json())
        .then(data => setItem(data));
    })


  return (
    <div className="p-3 App-body">
      <Card className="mb-3 bg-dark text-white">
        <Card.Header as="h5">{item.title}</Card.Header>
        <Card.Body>
          <Card.Text>{props.match.params.id}</Card.Text>
        </Card.Body>
        <Card.Footer>
          {/*<small className="text-muted">Last updated 3 mins ago</small>*/}
        </Card.Footer>
      </Card>
    </div>
  );
}

export default Bind;