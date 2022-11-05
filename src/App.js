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
  const [currentSigner, setCurrentSigner] = useState('');
  const [userErrorMessage, setUserErrorMessage] = useState('');

  const checkIfWalletIsConnected = async () => {
    setWalletConnectd(false);
    setIsCheckingForWallet(true);
      try {
        const { ethereum } =  window;
        const signer = await ethereum.request({method: 'eth_requestAccounts'});
        setWalletConnectd(true);
        setCurrentSigner(signer[0]);
      } catch(err) {
        setWalletConnectd(false);
        setIsCheckingForWallet(false);
        setUserErrorMessage(err.message);
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
            <div className='px-5'>
            <div className='text-white my-5 text-center'>Connected Acccount: {currentSigner}</div>
              <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/create' element={<Create currentSigner={currentSigner}/>} />
                <Route path='/search' element={<Search/>} />
                <Route path='*' element={<PageNotFound/>} />
              </Routes>
            </div>
          </BrowserRouter>
          :
          <div className='m-auto text-center w-80'>
            <CheckForWallet 
            isCheckingForWallet={isCheckingForWallet} 
            walletConnected={walletConnected} 
            checkIfWalletIsConnected={checkIfWalletIsConnected} 
            userMessage={userErrorMessage}/>
          </div>
        }
      </>
    );
  }


export default App;
