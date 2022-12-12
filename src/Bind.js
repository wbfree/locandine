import React from "react";
import { useState, useEffect } from "react"
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import ReactImageMagnify from 'react-image-magnify';

import './Bind.css';

function Bind(props) {
  const [annuncio, setAnnuncio] = useState([]);

  useEffect(() => {
    fetch('https://balinona.synology.me/ebay/ebay.php?id=' + props.match.params.id + '&group=' + props.match.params.group)
      .then(response => response.json())
      .then(data => {
        data.galleryURL = data.galleryURL.replace("s-l140", "s-l500");
        data.galleryURLBig = data.galleryURL.replace("s-l500", "s-l1600");
        return setAnnuncio(data)
      });
  }, [])

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://balinona.synology.me/locandine_backend/db_test.php?query=' + annuncio.title)
      .then(response => response.json())
      .then(data => setItems(data));
  }, [annuncio])

  //const imgLink = () => annuncio.galleryURL.replace("s-l140", "s-l1600");

  return (
    <div className="p-3 App-body">
      <Card className="mb-3 bg-dark text-white">
        <Card.Header as="h5">{annuncio.title}</Card.Header>
        <Card.Body>
          <Card.Text>
            <div className="fluid">
              <div className="fluid__image-container">
                <ReactImageMagnify {...{
                  smallImage: {
                    alt: 'Wristwatch by Ted Baker London',
                    isFluidWidth: true,
                    src: annuncio.galleryURL,
                  },
                  largeImage: {
                    src: annuncio.galleryURLBig,
                    width: 800,
                    height: 1800
                  },
                  enlargedImagePosition: 'over'
                }} />
              </div></div>
          </Card.Text>

        </Card.Body>
      </Card>




      <Table striped bordered hover size="sm" variant="dark">
        <thead>
          <tr>
            <th>Id</th>
            <th>Movie</th>
            <th>Movie</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr>
              <td>{item.idmovie}</td>
              <td>{item.title}</td>
              <td>{item.score}</td>
            </tr>
          ))}
        </tbody>
      </Table>

    </div>
  );
}

export default Bind;