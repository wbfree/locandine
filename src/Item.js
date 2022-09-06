import React from "react";
import { useState, useEffect, useRef } from "react"
import Locandina from './locandina'
import LocandinaNew from './LocandinaNew'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

function Item(props) {
  const [item_it, setItem_it] = useState([]);
  const [items_db, setItems_db] = useState([]);
  const hasFetchedInfo = useRef(false);
  const hasFetchedLocandine = useRef(false);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const refetchLocandine = () => {
    fetch('https://balinona.synology.me/locandine_backend/locandine.php?id='+props.match.params.id)
    .then(response => response.json())
    .then(data => setItems_db(data), hasFetchedLocandine.current=true );
  }
  
  useEffect(() => {
	if (!hasFetchedInfo.current) {
        fetch('https://balinona.synology.me/locandine_backend/api_movie_detail.php?lang=it-IT&id='+props.match.params.id)
        .then(response => response.json())
        .then(data => setItem_it(data), hasFetchedInfo.current=true);
      }

      if (!hasFetchedLocandine.current) {
        fetch('https://balinona.synology.me/locandine_backend/locandine.php?id='+props.match.params.id)
        .then(response => response.json())
        .then(data => setItems_db(data), hasFetchedLocandine.current=true );
		  }
    },[props])
    
    return (
      <div className="p-3 App-body">
      <Card className="mb-3 bg-dark text-white">
        <Card.Header as="h5">{item_it.title}</Card.Header>
        <Card.Body>
          <Card.Text>{item_it.overview}</Card.Text>
          <Card.Text>Data: {item_it.release_date}</Card.Text>
          <Card.Text><LocandinaNew onReload={refetchLocandine} show={show} setShow={setShow} idmovie={item_it.id}/></Card.Text>
          <Button variant="success" onClick={handleShow}>New</Button>
        </Card.Body>
          <Card.Footer>
            {/*<small className="text-muted">Last updated 3 mins ago</small>*/}
          </Card.Footer>
      </Card>
      {(items_db.length) 
        ?items_db.map((item_db, index) => (<Locandina item={item_db} onReload={refetchLocandine} show={show} setShow={setShow}/>)) 
        :<Spinner animation="border" role="status"/>}
    </div>
    );
  }
  
  export default Item;