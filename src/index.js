import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import PageNotFound from './pages/PageNotFound';
import Create from './pages/Create';
import Search from './pages/Search';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

// const checkIfWalletIsConnected = async () => {
  //   console.log(contractABI)
  //     try {
  //       const { ethereum } =  window;
        
  //       if(ethereum) {
  //         console.log('Ethereum object: ', ethereum);
  //       } else {
  //         console.log('Ethereum not found.');
  //       }
  //     } catch(err) {
  //     console.log(err);
  //   }
  // }
  
root.render(
  <BrowserRouter>
  <div><NavBar/></div>
    <Routes>
      <Route path='/' element={<App/>} />
      <Route path='/create' element={<Create/>} />
      <Route path='/search' element={<Search/>} />
      <Route path='*' element={<PageNotFound/>} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
