import React from "react";
import { useState, useEffect } from "react"
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import ReactImageMagnify from 'react-image-magnify';
import Button from 'react-bootstrap/Button'

import './Bind.css';

function ItemEbay(props) {
  return (
    <div className="fluid">
      <ReactImageMagnify {...{
        smallImage: {
          alt: 'Wristwatch by Ted Baker London',
          isFluidWidth: true,
          src: props.annuncio.galleryURL,
        },
        largeImage: {
          src: props.annuncio.galleryURLBig,
          width: 800,
          height: 1800
        },
        enlargedImagePosition: 'over'
      }} />
    </div>
  )
}


function Bind(props) {
  const [annuncio, setAnnuncio] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(0);
  const [edizioni, setEdizioni] = useState([]);

  const fetchAnnuncio = () => {
    console.log('render annunci')
    fetch('https://balinona.synology.me/ebay/ebay.php?id=' + props.match.params.id + '&group=' + props.match.params.group)
      .then(response => response.json())
      .then(data => {
        data.galleryURL = data.galleryURL.replace("s-l140", "s-l500");
        data.galleryURLBig = data.galleryURL.replace("s-l500", "s-l1600");
        return setAnnuncio(data)
      })
  }
  useEffect(fetchAnnuncio, [props.match.params])

  const fetchMovies = (title) => {
    console.log('render movies')
    if (title)
      fetch('https://balinona.synology.me/locandine_backend/db_test.php?query=' + title)
        .then(response => response.json())
        .then(data => setMovies(data))
  }
  useEffect( () => fetchMovies(annuncio.title), [annuncio.title])

  const fetchEdizioni = () => {
    console.log('render edizioni')
    if (selectedMovie > 0)
      fetch('https://balinona.synology.me/locandine_backend/locandine.php?id2=' + selectedMovie)
        .then(response => response.json())
        .then(data => setEdizioni(data))
  }
  useEffect(fetchEdizioni, [selectedMovie])

  return (
    <div className="p-3 App-body">
      <Card className="mb-3 bg-dark text-white">
        <Card.Header as="h5">{annuncio.title}&nbsp;
        <Button variant="success" onClick={() => fetchMovies(window.getSelection().toString())}>Rebind</Button>
        </Card.Header>

        <Card.Body>
          <Card.Text>
            <div class="row">
              <div class="lcolumn"><ItemEbay annuncio={annuncio}></ItemEbay></div>
              <div class="rcolumn">{edizioni.map((edizione,index) => (
                <div>{edizione.edizione}</div>

              ))}</div>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>

      <Table striped bordered hover size="sm" variant="dark">
        <thead>
          <tr>
            <th>Id</th>
            <th>Movie</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((item, index) => (
            <tr>
              <td><a href="#" onClick={() => setSelectedMovie(item.tmdb)}>{item.tmdb}</a></td>
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