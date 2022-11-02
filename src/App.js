import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import PageNotFound from './pages/PageNotFound';
import Create from './pages/Create';
import Search from './pages/Search';
import CheckForWallet from './components/CheckForWallet';

function App() {
  const [walletConnected, setWalletConnectd] = useState(false);
  const [isCheckingForWallet, setIsCheckingForWallet] = useState(true);

  const checkIfWalletIsConnected = async () => {
      try {
        const { ethereum } =  window;
        const accounts= await ethereum.request({method: 'eth_requestAccounts'});
        setWalletConnectd(true);
        setIsCheckingForWallet(true);
        console.log(accounts)
      } catch(err) {
        setWalletConnectd(false);
        setIsCheckingForWallet(false);
      console.log(err);
    }
  }
  
    useEffect(() => {
      checkIfWalletIsConnected();
    }, [])

    return (
      <>
        <h1 className='text-center text-xl my-5'>Global Travel Passport</h1>
        {
          walletConnected 
          ?
          <BrowserRouter>
            <div><NavBar/></div>
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/create' element={<Create/>} />
              <Route path='/search' element={<Search/>} />
              <Route path='*' element={<PageNotFound/>} />
            </Routes>
          </BrowserRouter>
          :
          <CheckForWallet isCheckingForWallet={isCheckingForWallet} walletConnected={walletConnected}/>
        }
      </>
    );
  }


export default App;
