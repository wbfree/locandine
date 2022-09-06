import React from "react";
import { useState, useEffect, useRef } from "react"
//import Figure from 'react-bootstrap/Figure'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
//import Row from 'react-bootstrap/Row'

function Movieposter(props) {
  const [posters, setPosters] = useState([{"waiting":true, "image_data":"https://product-image.juniqe-production.juniqe.com/media/catalog/product/seo-cache/x800/93/83/93-83-101P/Waiting-for-the-Sun-Viktor-Hertz-Poster.jpg"}]);
  const hasFetchedData = useRef(false);

  useEffect(() => {
	if (!hasFetchedData.current) {
		fetch('https://balinona.synology.me/locandine_backend/scrapy.php?crawler=emovieposter_search&film='+props.film)
			.then(response => response.json())
			.then(data => setPosters(data))
			hasFetchedData.current = true;
		}
      },[props])
    
    return (
        <div><CardGroup>
          {posters.map((poster, index) => (
			  <Card>
			    <Card.Img variant="top" src={'http://fantautosoft.altervista.org/locandina_img.php?url='+poster.image_link} />
			    <Card.Body>
			      <Card.Title>{poster.title}</Card.Title>
			      <Card.Link href={poster.search_link} target="_blank">Search Link</Card.Link>
			      <Card.Link href={poster.item_link} target="_blank">Item Link</Card.Link>
			      <Card.Text>{poster.source}</Card.Text>
			    </Card.Body>
			    <Card.Footer>
			      <small className="text-muted">Last updated 3 mins ago</small>
			    </Card.Footer>{console.log('http://fantautosoft.altervista.org/locandina_img.php?url='+poster.image_link)}
			  </Card>
            ))}
        </CardGroup></div>
    );
  }
  
  export default Movieposter;
  