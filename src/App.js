import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react"
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

import Navigator from './Navigator.js';
import Items from './Items';
import Item from './Item';
import Search from './Search';
import Dashboard from './Dashboard';
import Bind from './Bind';

function App() {
	const [selection, setSelection] = useState([]);

	function onMouseUp() {
		setSelection(window.getSelection().toString());
	    };

  return (
    <div className="App" onMouseUp={onMouseUp}>
  
	<Auth0Provider
    	domain="dev-5hvl4wx1.eu.auth0.com"
    	clientId="nONDUjQzwlXlaeK2xNdCylNGYgBtdBeJ"
    	redirectUri={window.location.origin}>
      <Navigator selection={selection}></Navigator>
	</Auth0Provider>,
  
      <Router>
        <Route path="/ebay"><Items url='https://balinona.synology.me/locandine_backend/db_test.php?type=ebay'/></Route>
        <Route path="/scrapy"><Items url='https://balinona.synology.me/locandine_backend/db_test.php?type=scrapy'/></Route>
        <Route path="/all"><Items url='https://balinona.synology.me/locandine_backend/db_test.php?type=all'/></Route>
        <Route path="/search" component={Search} />
        <Route path="/item/:id" component={Item} />
        <Route path="/bind/:group/:id" component={Bind} />
        <Route exact path="/"><Dashboard/></Route>
      </Router>
    </div>
  );
}

export default App;
