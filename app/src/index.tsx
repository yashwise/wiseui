import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Transcript from './Transcript';
import Deals from './Deals';
import Deal from './Deal';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Deals />} />
          {/* <Route path="/signup" element={<Signup />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/deal/:id" element={<Deal />} />
          <Route path="/transcript/:id" element={<Transcript />} />
        </Routes>
      </div>
    </Router>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
