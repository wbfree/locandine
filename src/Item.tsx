/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect, useCallback } from "react"
import { useParams } from "react-router-dom"
import Locandina from './locandina'
import Card from 'react-bootstrap/Card'
import { _ComponentAPI } from './_component'
import LocandinaEdit from './LocandinaEdit'

function Item(props :any) {
  const [item_it, setItem_it] = useState<any>([]);
  const [items_db, setItems_db] = useState<any>([]);
  const [item_empty, setItem_empty] = useState<any>([]);
  let { id } = useParams();

  const backendHost = 'https://balinona.synology.me/locandine_backend/'

  const componentAPI = new _ComponentAPI(
    new Object(), backendHost+'api.php?table=_illustratori', 'illustratori'
  );


  const fetchInfo = useCallback(() => {
    fetch(backendHost + 'api_movie_detail.php?lang=it-IT&id=' + id)
      .then(response => response.json())
      .then(data => setItem_it(data));
  },[])

  const fetchLocandine = useCallback(() => {
    fetch(backendHost + 'locandine.php?id2=' + id)
      .then(response => response.json())
      .then(data => setItems_db(data));
  },[])

  const fetchLocandineNew = useCallback(() => {
    fetch(backendHost + 'locandine.php?idn=' + id)
      .then(response => response.json())
      .then(data => setItem_empty(data));
  },[])

  useEffect(() => {
    fetchInfo();
    fetchLocandine();
    fetchLocandineNew();
  }, [])

  return (
    <div className="p-3 App-body">
      <Card className="mb-3 bg-dark text-white">
        <Card.Header as="h5">{item_it.title}</Card.Header>
        <Card.Body>
          <Card.Text>{item_it.overview}</Card.Text>
          <Card.Text>Data: {item_it.release_date}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Card.Text><LocandinaEdit item={item_empty} onReload={fetchLocandine} /></Card.Text>

          {/*<small className="text-muted">Last updated 3 mins ago</small>*/}
        </Card.Footer>
      </Card>
      {(items_db.length)
        && items_db.map((item_db: any, index: any) => (<Locandina key={index} item={item_db} onReload={fetchLocandine} />))
      }

    </div>
  );
}

export default Item;