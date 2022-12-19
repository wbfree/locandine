import React from "react";
import { useState, useEffect, useRef } from "react"
import Locandina from './locandina'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'

function Item(props) {
  const [item_it, setItem_it] = useState([]);
  const [items_db, setItems_db] = useState([]);
  const hasFetchedInfo = useRef(false);
  const hasFetchedLocandine = useRef(false);

  const refetchLocandine = () => {
    fetch('https://balinona.synology.me/locandine_backend/locandine.php?id=' + props.match.params.id)
      .then(response => response.json())
      .then(data => setItems_db(data), hasFetchedLocandine.current = true);
  }

  useEffect(() => {
    if (!hasFetchedInfo.current) {
      fetch('https://balinona.synology.me/locandine_backend/api_movie_detail.php?lang=it-IT&id=' + props.match.params.id)
        .then(response => response.json())
        .then(data => setItem_it(data), hasFetchedInfo.current = true);
    }

    if (!hasFetchedLocandine.current) {
      fetch('https://balinona.synology.me/locandine_backend/locandine.php?id2=' + props.match.params.id)
        .then(response => response.json())
        .then(data => setItems_db(data), hasFetchedLocandine.current = true);
    }
  }, [props])

  const emptyItem = {
    anno: null,
    anno_da: null,
    idedizione: 0,
    idillustratore: 1,
    idmovie: props.match.params.id,
    idtipografica: null,
    tipo: null,
    versione: null
  }
  return (
    <div className="p-3 App-body">
      <Card className="mb-3 bg-dark text-white">
        <Card.Header as="h5">{item_it.title}</Card.Header>
        <Card.Body>
          <Card.Text>{item_it.overview}</Card.Text>
          <Card.Text>Data: {item_it.release_date}</Card.Text>
        </Card.Body>
        <Card.Footer>
          {/*<small className="text-muted">Last updated 3 mins ago</small>*/}
        </Card.Footer>
      </Card>
      {(items_db.length)
        ? items_db.map((item_db, index) => (<Locandina item={item_db} onReload={refetchLocandine} />))
        : <Spinner animation="border" role="status" />}
      <Locandina item={emptyItem} onReload={refetchLocandine} />

    </div>
  );
}

export default Item;