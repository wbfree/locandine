import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react"
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
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
        <Routes>
          <Route path="/ebay" element={<Items url='https://balinona.synology.me/locandine_backend/db_test.php?type=ebay' />} />
          <Route path="/scrapy" element={<Items url='https://balinona.synology.me/locandine_backend/db_test.php?type=scrapy' />} />
          <Route path="/all" element={<Items url='https://balinona.synology.me/locandine_backend/db_test.php?type=all' />} />
          <Route path="/search" element={<Search location={window.location} />} />
          <Route path="/item/:id" element={<Item />} />
          <Route path="/bind/:group/:id" element={<Bind />} />
          <Route exact path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
