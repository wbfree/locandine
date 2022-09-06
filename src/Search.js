import React from "react";
import { useState, useEffect } from "react"
import Table from 'react-bootstrap/Table'
import ImageTooltip from './ImageTooltip'

function Search(props) {

  function getImageLink(path) {
	  return 'http://image.tmdb.org/t/p/original/'+path;
  }

  const [items, setItems] = useState({"page":1,"results":[],"total_pages":0,"total_results":0});

    useEffect(() => {
        fetch('https://balinona.synology.me/locandine_backend/api_movie.php?q='+new URLSearchParams(props.location.search).get("id"))
        .then(response => response.json())
        .then(data => {setItems(data); console.log(data); })
      },[props])

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
            <tr>
              <td>{item.id}</td>
              <td>
            	<a href={'/item/'+ item.id }>{item.title}</a>
            	&nbsp;{(item.poster_path) ?<ImageTooltip link={getImageLink(item.poster_path)}/> :""}</td>
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
  