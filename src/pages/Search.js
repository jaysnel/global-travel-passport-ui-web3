import React, { useEffect, useState } from 'react'
import abi from '../utils/GlobalPassport.json';


export default function Search() {
  const ethers = require('ethers');
  const contractAddress = process.env.REACT_APP_GLOBAL_PASSPORT_CONTRACT_ADDRESS;
  const contractABI = abi.abi;
  const [fullList, setFullList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [valueName, setValueName] = useState('');
  const [valueId, setValueId] = useState('');
  const [valueIssued, setValueIssued] = useState('');
  const NotAvailable = 'N/A';
  // Getting local images
  // function importAll(r) {
  //   return r.keys().map(r);
  // }
  // const headshotImages = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));
  const defaultImage = '../images/headshot1.jpeg'

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

        // Default list. Source of truth
        setFullList([...modifiedList])

        // List to make sure intial load has everything we need
        setFilteredList([...modifiedList])
      }

    } catch(err) {
        console.error(err);
    }
  }

  const setFilterSearchParams = (input, type) => {
    const value = input.target.value.toString().toLowerCase();
    type === 'name' && setValueName(value);
    type === 'id' && setValueId(value);
    type === 'issued' && setValueIssued(value);
  }

  const filterSearchResults = () => {
    function getSearchResults(obj, valueType) {
      const valueMapping = {
        'name': valueName,
        'id': valueId,
        'issued': valueIssued
      }
      const searchValue = valueMapping[valueType] || '';

      return obj.citizenBio[valueType].toString().toLowerCase().includes(searchValue);
    }

    const filteredSearch = fullList.filter((el) => {
      return getSearchResults(el, 'name') 
      && getSearchResults(el, 'id') 
      && getSearchResults(el, 'issued');
    })


    setFilteredList(filteredSearch);
  }

  useEffect(() => {
    getAllCitizens();
  }, [])

  useEffect(() => {
    filterSearchResults();
  }, [valueName, valueId, valueIssued])




  return (
    <>
      <div className='m-auto text-center my-5'>
        <input type="text" placeholder='Search Name' onChange={(e) => {setFilterSearchParams(e, 'name')}}/>
        <input className='ml-2' type="number" placeholder='Search Id' onChange={(e) => {setFilterSearchParams(e, 'id')}}/>
        <input className='ml-2' type="text" placeholder='Search Issued' onChange={(e) => {setFilterSearchParams(e, 'issued')}}/>
      </div>
      <div className=' grid grid-cols-2 gap-5'>
        {
          filteredList.map((el, idx) => {
            console.log(el)
            return (
              <div key={idx} className='border border-solid border-cyan-400'>
                <div>
                <div >
                    <img src={defaultImage} alt={`${el.citizenBio.name} headshot`} className='headshot'/>
                  </div>
                  <div className='information-container'>
                    <div className='search-item'>
                      <label>Last Updated</label>
                      <input type="text" value={el.citizenInfo.lastUpdated || NotAvailable} disabled/>
                    </div>
                    <div className='search-item'>
                      <label>Status</label>
                      <div className='search-item-list'>
                        {
                          el.citizenInfo.status.map((el, idx) => {
                            return (
                              <div key={idx}>
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
                    <div className='search-item'>
                      <label>Name</label>
                      <input type="text" value={el.citizenBio.name || NotAvailable} disabled/>
                    </div>
                    <div className='search-item'>
                      <label>ID</label>
                      <input type="text" value={el.citizenBio.id || NotAvailable} disabled/>
                    </div>
                    <div className='search-item'>
                      <label>Issued</label>
                      <input type="text" value={el.citizenBio.issued || NotAvailable} disabled/>
                    </div>
                    <div className='search-item'>
                      <label>Expiration</label>
                      <input type="text" value={el.citizenBio.expiration || NotAvailable} disabled/>
                    </div>
                    <div className='search-item'>
                      <label>DOB</label>
                      <input type="text" value={el.citizenBio.dob || NotAvailable} disabled/>
                    </div>
                    <div className='search-item'>
                      <label>Verfiyer</label>
                      <input type="text" value={el.citizenBio.verifyer || NotAvailable} disabled/>
                    </div>
                    <div className='search-item'>
                      <label>Citizenship</label>
                      <div className='search-item-list'>
                        {
                          el.citizenBio.citizenship.map((el, idx) => {
                            return (
                              <div key={idx}>
                                <input type="text" value={el.country || NotAvailable} disabled/>
                                <input type="text" value={el.signature || NotAvailable} disabled/>
                                <input type="text" value={el.date || NotAvailable} disabled/>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                    <div className='search-item'>
                      <label>Previous ID</label>
                      <div className='search-item-list'>
                        {
                          el.citizenBio.previousId.map((el, idx) => {
                            return (
                              <div key={idx}>
                                <input type="text" value={el || NotAvailable} disabled/>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                    <div className='search-item'>
                      <label>Visited</label>
                      <div className='search-item-list'>
                        {
                          el.citizenInfo.visited.map((el, idx) => {
                            return (
                              <div key={idx}>
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
                

                
                </div>
              </div>
            )
          })
        }
      </div>
    </>
  )
}
