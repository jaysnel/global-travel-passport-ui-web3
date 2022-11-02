import React, { useState } from 'react';
import '../App.css';
import abi from '../utils/GlobalPassport.json';
import Button from '../components/Button';

export default function Create() {
  const ethers = require('ethers');
  const contractAddress = process.env.REACT_APP_GLOBAL_PASSPORT_CONTRACT_ADDRESS;
  const contractABI = abi.abi;
  const date = new Date();
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; // Months are 0 based
  const year = date.getUTCFullYear();
  const timestamp = `${month}/${day}/${year}`
  const expirartion = `${month}/${day}/${year + 10}`
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [previousId, setPreviousId] = useState([]);
  const [verifiyer, setVerifiyer] = useState('');
  const [dob, setDob] = useState('');
  const [photo, setPhoto] = useState('');
  const [citizenship, setCitizenship] = useState([]);

  const person =  {
    citizenBio: [
      {
        id, // passport/id number
        name,
        previousId,
        issued: timestamp,
        expiration: expirartion,
        verifiyer, // ID of entity that did original verification when signing up the first time
        dob,
        photo, // maybe needs to be formated in a different way
        citizenship
      },
    ], 

    citizenInfo: [
       {
        lastUpdated: timestamp,
        status: [{ verified: true, wanted: false }],
        visited: [{ country: 'colombia', dateStart: timestamp, dateEnd: timestamp, countrySignature: 'CO123456' }]
      }
    ]
    }
  
    // Goes through the object and turns each value into an array of strings
    // to send to contract
    function stringifyObjects(item) {
      const currentObject = item
      const objectValues = Object.values(currentObject)

      objectValues.forEach((el) => {
        el.forEach((el2, idx) => {
          el[idx] = JSON.stringify(el2);
        })
      })
    }

  

  const updateName = (e) => {
    setName(e.target.value);
  }

  const updateDOB = (e) => {
    setDob(e.target.value);
  }

  const updatePhotoURL = (e) => {
    setPhoto(e.target.value);
  }

  async function createPassport() {
    try {
      const { ethereum } =  window;

      if(ethereum) {
        // Goes through the object and turns each value into an array of strings
        // to send to contract
        stringifyObjects(person)
  
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const globalPassportContract = new ethers.Contract(contractAddress, contractABI, signer);
        const createPassportTxn = await globalPassportContract.createNewPassport(person.citizenBio, person.citizenInfo);
        console.log('Mining...', createPassportTxn.hash);
        await createPassportTxn.wait();
      
      }

    } catch(err) {
      console.error(err);
    }
    
  }

    return (
      <>
        <h2 className='mb-5 text-2xl'>Create New Passport</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-4 gap-5">
          <div className='create-item'>
            <label>ID</label>
            <input type='number' name='id' placeholder='ID' disabled/>
          </div>

          <div className='create-item'>
            <label>Name</label>
            <input type='text' name='name' placeholder='Name' onChange={updateName}/>
          </div>

          <div className='create-item'>
            <label>Issued</label>
            <input type='text' name='issued' value={timestamp} disabled/>
          </div>

          <div className='create-item'>
            <label>Expirartion</label>
            <input type='text' name='expirartion' value={expirartion} disabled/>
          </div>

          <div className='create-item'>
            <label>Verifiyer</label>
            <input type='text' name='verifiyer' value={verifiyer} disabled/>
          </div>

          <div className='create-item'>
            <label>Date Of Birth</label>
            <input type='text' name='dob' placeholder='DOB' onChange={updateDOB}/>
          </div>

          <div className='create-item'>
            <label>Photo</label>
            <input type='text' name='photo' placeholder='Photo URL' onChange={updatePhotoURL}/>
          </div>

        </div>
        <Button buttonText='Create Passport' buttonClassNames='bg-cyan-500 max-w-sm py-3 mt-5' buttonFunction={createPassport}/>
      </>
    )
  }