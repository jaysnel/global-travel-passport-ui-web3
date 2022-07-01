import React, { useEffect, useState } from 'react'
import abi from '../utils/GlobalPassport.json';


export default function Search() {
  const ethers = require('ethers');
  const contractAddress = process.env.REACT_APP_GLOBAL_PASSPORT_CONTRACT_ADDRESS;
  const contractABI = abi.abi;
  const [fullList, setFullList] = useState([]);
  const NotAvailable = 'N/A';

  // Getting local images
  function importAll(r) {
    return r.keys().map(r);
  }
  const headshotImages = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));

  async function getAllCitizens() {
    try {
      const { ethereum } =  window;

      if(ethereum) {

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const globalPassportContract = new ethers.Contract(contractAddress, contractABI, signer);
        const citizens = await globalPassportContract.getCitizen();
        const modifiedList = [];

        for(let i = 0; i < citizens.length; i++) {
          if(citizens[i].citizenBio[0] !== '') {
            if(citizens[i].citizenInfo[0] !== '') {
              modifiedList.push({
                citizenInfo: JSON.parse(citizens[i].citizenInfo[0]),
                citizenBio: JSON.parse(citizens[i].citizenBio[0])
              })
            }
          }
        }

        setFullList([...modifiedList])
      }

    } catch(err) {
        console.error(err);
    }
  }

  useEffect(() => {
    getAllCitizens();
  }, [])

  

  // console.log(fullList);

  return (
    <div className='search-container'>
      {
        fullList.map((el, idx) => {
          console.log(el)
          return (
            <div key={idx} className='search-result'>
              <div>
                <div className='information-container'>
                  <div className='form-section'>
                    <label>Last Updated</label>
                    <input type="text" value={el.citizenInfo.lastUpdated || NotAvailable} disabled/>
                  </div>
                  <div className='form-section'>
                    <label>Status</label>
                    <div className='form-section-list'>
                      {
                        el.citizenInfo.status.map((el) => {
                          return (
                            <div>
                              <div>
                                <label>Verified</label>
                                <input type="text" value={el.verified || NotAvailable} disabled/>
                                <label>Wanted</label>
                                <input type="text" value={el.wanted || NotAvailable} disabled/>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                  <div className='form-section'>
                    <label>Name</label>
                    <input type="text" value={el.citizenBio.name || NotAvailable} disabled/>
                  </div>
                  <div className='form-section'>
                    <label>ID</label>
                    <input type="text" value={el.citizenBio.id || NotAvailable} disabled/>
                  </div>
                  <div className='form-section'>
                    <label>Issued</label>
                    <input type="text" value={el.citizenBio.issued || NotAvailable} disabled/>
                  </div>
                  <div className='form-section'>
                    <label>Expiration</label>
                    <input type="text" value={el.citizenBio.expiration || NotAvailable} disabled/>
                  </div>
                  <div className='form-section'>
                    <label>DOB</label>
                    <input type="text" value={el.citizenBio.dob || NotAvailable} disabled/>
                  </div>
                  <div className='form-section'>
                    <label>Verfiyer</label>
                    <input type="text" value={el.citizenBio.verifyer || NotAvailable} disabled/>
                  </div>
                  <div className='form-section'>
                    <label>Citizenship</label>
                    <div className='form-section-list'>
                      {
                        el.citizenBio.citizenship.map((el) => {
                          return (
                            <div>
                              <input type="text" value={el.country || NotAvailable} disabled/>
                              <input type="text" value={el.signature || NotAvailable} disabled/>
                              <input type="text" value={el.date || NotAvailable} disabled/>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                  <div className='form-section'>
                    <label>Previous ID</label>
                    <div className='form-section-list'>
                      {
                        el.citizenBio.previousId.map((el) => {
                          return (
                            <div>
                              <input type="text" value={el || NotAvailable} disabled/>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                  <div className='form-section'>
                    <label>Visited</label>
                    <div className='form-section-list'>
                      {
                        el.citizenInfo.visited.map((el) => {
                          return (
                            <div>
                              <div>
                                <label>Country</label>
                                <input type="text" value={el.country || NotAvailable} disabled/>
                                <label>Date Start</label>
                                <input type="text" value={el.dateStart || NotAvailable} disabled/>
                                <label>Date End</label>
                                <input type="text" value={el.dateEnd || NotAvailable} disabled/>
                                <label>Country Signature</label>
                                <input type="text" value={el.countrySignature || NotAvailable} disabled/>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
              

                <div >
                  {/* <img src={el.citizenBio.photo || UltraInstictGoku} alt={`${el.citizenBio.name} headshot`} className='headshot'/> */}
                  <img src={headshotImages[idx]} alt={`${el.citizenBio.name} headshot`} className='headshot'/>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
