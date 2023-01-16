import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import ReactImageMagnify from 'react-image-magnify';
import Button from 'react-bootstrap/Button'
import Carousel from './Carousel'

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
  const [edizioni, setEdizioni] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(0);
  const [selectedEdizione, setSelectedEdizione] = useState([]);

  let { group, id } = useParams();

  const fetchAnnuncio = () => {
    fetch('https://balinona.synology.me/ebay/ebay.php?id=' + id + '&group=' + group)
      .then(response => response.json())
      .then(data => {
        data.galleryURL = data.galleryURL.replace("s-l140", "s-l500");
        data.galleryURLBig = data.galleryURL.replace("s-l500", "s-l1600");
        //console.log(data)
        return setAnnuncio(data)
      })
  }
  useEffect(fetchAnnuncio, [group, id])

  const fetchMovies = (title) => {
    if (title)
      fetch('https://balinona.synology.me/locandine_backend/db_test.php?query=' + title)
        .then(response => response.json())
        .then(data => setMovies(data))
  }
  useEffect(() => fetchMovies(annuncio.title), [annuncio.title])

  const fetchMoviesTMDB = (title) => {
    if (title)
      fetch('https://balinona.synology.me/locandine_backend/api_movie.php?qs=' + title)
        .then(response => response.json())
        .then(data => setMovies(data))
  }

  const fetchEdizioni = () => {
    if (selectedMovie > 0)
      fetch('https://balinona.synology.me/locandine_backend/locandine.php?id2=' + selectedMovie)
        .then(response => response.json())
        .then(data => setEdizioni(data))
  }
  useEffect(fetchEdizioni, [selectedMovie])

  const createDefaultEdizione = (item) => {
    const postOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        idmovie: item.idmovie,
        tipo: 1,
        anno_da: parseInt(item.anno)
      })
    };
    fetch('https://balinona.synology.me/locandine_backend/api.php?table=_edizioni', postOptions)
      .then(response => response.json())
      .then(data => {
        alert(JSON.stringify(data, null, 2))
        selectMovie(item)
      });
  }

  const selectMovie = (item) => {
    setEdizioni([])
    setSelectedEdizione([])
    setSelectedMovie(item.tmdb)
  }

  const handleBind = (edizione) => {
    const post_data = {
      "itemId": annuncio.itemId,
      "idmovie": edizione.idmovie,
      "idedizione": edizione.idedizione,
      "currentPrice": annuncio.sellingStatus.currentPrice,
      "galleryURL": annuncio.galleryURLBig,
      "endTime": annuncio.listingInfo.startTime,
      "startTime": annuncio.listingInfo.endTime
    }
    const postOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post_data)
    };
    fetch('https://balinona.synology.me/locandine_backend/scrapy_to_db_class_ebay.php', postOptions)
      .then(response => response.json())
      .then(data => {
        alert(JSON.stringify(data, null, 2))
        fetchEdizioni()
      });

  }

  useEffect(() => {
    edizioni.map((edizione) => {
      if (edizione.idedizione === selectedEdizione.idedizione)
        setSelectedEdizione(edizione)
      return []
    })
  }, [edizioni, selectedEdizione.idedizione])

  return (
    <div className="p-3 App-body">
      <Card className="mb-3 bg-dark text-white">
        <Card.Header as="h5">{annuncio.title}&nbsp;
          <Button variant="success" onClick={() => fetchMoviesTMDB(window.getSelection().toString())}>Rebind</Button>
        </Card.Header>

        <Card.Body>
          <Card.Text>
            <div className="row">
              <div className="lcolumn"><ItemEbay annuncio={annuncio}></ItemEbay></div>
              <div className="ccolumn">{edizioni.map((edizione, index) => (
                <div key={index} >
                  <Button variant="info" size="sm" onClick={() => setSelectedEdizione(edizione)}>
                    <>{edizione.edizione}<br />{edizione.info}</>
                  </Button>

                  {(selectedEdizione.idedizione === edizione.idedizione && <Button variant="success" size="sm" onClick={() => handleBind(selectedEdizione)}>Bind</Button>)}
                  <br /><br />
                </div>
              ))}
              </div>
              <div className="rcolumn">{selectedEdizione && <Carousel edizione={selectedEdizione} ></Carousel>}</div>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>

      <Table striped bordered hover size="sm" variant="dark">
        <thead>
          <tr>
            <th>Id</th>
            <th>Movie</th>
            <th>Year</th>
            <th>Edizioni</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((item, index) => (
            <tr key={index}>
              <td>
                <Button variant="primary" size="sm" onClick={() => selectMovie(item)}>
                  Select
                </Button>&nbsp;
                <Button variant="info" size="sm" href={'/item/' + item.tmdb} target='_blank' rel='noreferrer'>
                  Link
                </Button>&nbsp;
                {item.edizioni === '0' && <Button variant="success" size="sm" onClick={() => createDefaultEdizione(item)}>Create Ed.</Button>}

              </td>
              <td>{item.title}</td>
              <td>{item.anno}</td>
              <td>{item.edizioni}</td>
            </tr>
          ))}
        </tbody>
      </Table>

    </div>
  );
}

export default Bind;