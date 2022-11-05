import React, { useEffect, useState } from 'react';
import '../App.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import abi from '../utils/GlobalPassport.json';
import Button from '../components/Button';
import stringifyObjects from '../helpers/stringifyObject';
import LoadingIcon from '../components/LoadingIcon';

export default function Create(props) {
  const {currentSigner} = props;
  const ethers = require('ethers');
  const contractAddress = process.env.REACT_APP_GLOBAL_PASSPORT_CONTRACT_ADDRESS;
  const contractABI = abi.abi;
  const date = new Date();
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; // Months are 0 based
  const year = date.getUTCFullYear();
  const timestamp = `${month}/${day}/${year}`
  const expirartion = `${month}/${day}/${year + 10}`
  const [isCreatingPassport, setIsCreatingPassport] = useState(false);
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [previousId, setPreviousId] = useState([]);
  const [verifier, setVerifiyer] = useState(currentSigner);
  const [formattedDob, setFormattedDob] = useState('');
  const [theDob, setTheDob] = useState(new Date());
  const [photo, setPhoto] = useState('');
  const [citizenship, setCitizenship] = useState([]);
  const [totalCitizenCount, setTotalCitizenCount] = useState(0);

  const getTotalCitizenCount = async () => {
    const { ethereum } =  window;
    try {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner();
      const globalPassportContract = new ethers.Contract(contractAddress, contractABI, signer);
      const citizens = await globalPassportContract.getCitizen();
      const citizenCount = citizens.length;
      setId(citizenCount + 1);
    } catch (err) {
      console.log(err)
    }
  }

  const person =  {
    citizenBio: [
      {
        id, // passport/id number
        name,
        previousId,
        issued: timestamp,
        expiration: expirartion,
        verifier, // ID of entity that did original verification when signing up the first time
        dob: formattedDob,
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

  
  const updateName = (e) => {
    setName(e.target.value);
  }

  const updateDOB = (e) => {
    const date = e;
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const selectedDOB = `${month}/${day}/${year}`;
    setTheDob(date);
    setFormattedDob(selectedDOB);
  }

  const updatePhotoURL = (e) => {
    setPhoto(e.target.value);
  }

  async function createPassport() {
    return console.log(person)
    setIsCreatingPassport(true);
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
        setIsCreatingPassport(false);
      
      }

    } catch(err) {
      setIsCreatingPassport(false);
      console.error(err);
    }
    
  }

  useEffect(() => {
    getTotalCitizenCount();
  })

    return (
      <>
        <h2 className='mb-5 text-2xl'>Create New Passport</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-4 gap-5">
          <div className='create-item'>
            <label>ID</label>
            <input type='number' name='id' placeholder={id} disabled/>
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
            <label>verifier</label>
            <input type='text' name='verifier' value={verifier} disabled/>
          </div>

          <div className='create-item'>
            <label>Date Of Birth</label>
            {/* <input type='text' name='dob' placeholder='DOB' onChange={updateDOB}/> */}
            <DatePicker 
            className='w-full'
            selected={theDob} 
            onChange={date => updateDOB(date)} 
            />
          </div>

          <div className='create-item'>
            <label>Photo</label>
            <input type='text' name='photo' placeholder='Photo URL' onChange={updatePhotoURL}/>
          </div>

        </div>
        {isCreatingPassport && <LoadingIcon classNames='m-auto mt-5' fill='rgb(34 211 238)'/>}
        {!isCreatingPassport && <Button buttonText='Create Passport' buttonClassNames='bg-cyan-500 max-w-sm py-3 mt-5' buttonFunction={createPassport}/>}
      </>
    )
  }