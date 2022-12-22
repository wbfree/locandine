/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect, useCallback } from "react"
import { useParams } from "react-router-dom"
import Locandina from './locandina'
import Card from 'react-bootstrap/Card'
import LocandinaEdit from './LocandinaEdit'

function useStateApi(path: string) {

  const backendHost = 'https://balinona.synology.me/locandine_backend/'
  const [item, setItem] = useState<any>([]);

  const fetchItems = useCallback(() => {
    fetch(backendHost + path)
      .then(response => response.json())
      .then(data => setItem(data));
  }, [])

  useEffect(() => {
    fetchItems();
  }, [])

  return [item, fetchItems]
}

function Item(props: any) {

  let { id } = useParams();
  const [item_it] = useStateApi('api_movie_detail.php?lang=it-IT&id=' + id);
  const [items_db, fetchLocandine] = useStateApi('locandine.php?id2=' + id);
  const [item_empty] = useStateApi('locandine.php?idn=' + id);

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