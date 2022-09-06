import React from "react";
import { useState, useEffect } from "react"
import Table from 'react-bootstrap/Table'
import ImageTooltip from './ImageTooltip'
import { FaLink } from "@react-icons/all-files/fa/FaLink";

function Items(props) {
  const Styles_text = {
    textAlign: "left",
  };  

	const [items, setItems] = useState([]);

    useEffect(() => {
        fetch(props.url)
        .then(response => response.json())
        .then(data => setItems(data))
      },[props])
    
    return (
      <div className="eBay App-body">
          <Table striped bordered hover size="sm" variant="dark">
          <thead>
            <tr>
              <th>Data</th>
              <th>Titolo</th>
              <th>Prezzo</th>
              <th>Sorgente</th>
              <th>Aggiornamento</th>
            </tr>
          </thead>
          <tbody>
          {items.map((item, index) => (
            <tr>
              <td>{item.last_insert}</td>
              <td style={Styles_text}>
                <ImageTooltip link={item.image_link}/>
                &nbsp;{item.title}
                &nbsp;<a href={item.item_link} target='_BLANK' rel="noreferrer"><FaLink/></a>
              </td>
              <td>{item.price}</td>
              <td>{item.source}</td>
              <td>{item.last_update}</td>
            </tr>
            ))}
          </tbody>
          </Table>
      </div>
    );
  }
  
  export default Items;
  