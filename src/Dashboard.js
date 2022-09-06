import React from "react";
import { useState, useEffect } from "react"
import Table from 'react-bootstrap/Table'

const TableRender = (title,items) => {
    return (
          <Table striped bordered hover size="sm" variant="dark">
          <thead>
            <tr>
              <th width='5%'>ID</th>
              <th style={{ color: 'red' }}>{title}</th>
              <th width='15%'>Aggiornamento</th>
              <th width='5%'>Ratio</th>
            </tr>
          </thead>
          <tbody>
          {items.map((item, index) => (
            <tr>
              <td>{item.idmovie}</td>
              <td><a href={'/item/'+ item.idmovie }>{item.movie}</a></td>
              <td>{item.last_update}</td>
              <td>{item.requests}</td>
            </tr>
            ))}
          </tbody>
          </Table>
    );

}

function Dashboard(props) {

	const [items_updated, setItemsUpdated] = useState([]);
	const [items_requested, setItemsRequested] = useState([]);

    useEffect(() => {
        fetch('https://balinona.synology.me/locandine_backend/db_test.php?type=news')
        .then(response => response.json())
        .then(data => setItemsUpdated(data))

        fetch('https://balinona.synology.me/locandine_backend/db_test.php?type=requested')
        .then(response => response.json())
        .then(data => setItemsRequested(data))

      },[props])
    
    return (
      <div className="eBay App-body">
    	{TableRender("Piu' richiesti",items_requested)}
    	{TableRender("Ultimi aggiornamenti",items_updated)}
      </div>
    	);
}
  
  export default Dashboard;
  