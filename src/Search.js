import React from "react";
import { useState, useEffect } from "react"
import Table from 'react-bootstrap/Table'
import ImageTooltip from './ImageTooltip'
import Button from 'react-bootstrap/Button'

function Search(props) {

  function getImageLink(path) {
    return 'http://image.tmdb.org/t/p/original/' + path;
  }

  const [items, setItems] = useState({ "page": 1, "results": [], "total_pages": 0, "total_results": 0 });

  useEffect(() => {
    fetch('https://balinona.synology.me/locandine_backend/api_movie.php?q=' + new URLSearchParams(props.location.search).get("id"))
      .then(response => response.json())
      .then(data => setItems(data))
  }, [props])

  const createMovie = (item) => {

    const post_data = {
      "tmdb": item.id,
      "title": item.title,
      "anno": parseInt(item.release_date.substring(0, 4))
    }
    const postOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post_data)
    };
    fetch('https://balinona.synology.me/locandine_backend/api.php?table=_movies', postOptions)
      .then(response => response.json())
      .then(data => alert(JSON.stringify(data, null, 2)));
  }


  return (
    <div className="App-body">
      <Table striped bordered hover size="sm" variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Titolo</th>
            <th>Titolo originale</th>
            <th>Data</th>
            <th>Voto</th>
          </tr>
        </thead>
        <tbody>
          {items.results.map((item, index) => (
            <tr key={index}>
              <td>
                <Button variant="primary" size="sm" onClick={() => createMovie(item)}>
                  Create {item.id}
                </Button>&nbsp;
              </td>
              <td>
                <a href={'/item/' + item.id}>{item.title}</a>
                &nbsp;{(item.poster_path) ? <ImageTooltip link={getImageLink(item.poster_path)} /> : ""}</td>
              <td>{item.original_title}</td>
              <td>{item.release_date}</td>
              <td>{item.vote_average}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
export default Search;
