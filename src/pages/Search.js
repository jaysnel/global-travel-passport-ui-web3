import React, { useEffect, useState } from 'react'
import abi from '../utils/GlobalPassport.json';
import UltraInstictGoku from '../images/ultrainstinct-goku.jpeg';

export default function Search() {
  const ethers = require('ethers');
  const contractAddress = process.env.REACT_APP_GLOBAL_PASSPORT_CONTRACT_ADDRESS;
  const contractABI = abi.abi;
  const [fullList, setFullList] = useState([]);

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

  console.log(fullList);

  return (
    <div>
      {
        fullList.map((el, idx) => {
          return (
            <div key={idx} className='search-container'>

              <div className='inner-container'>
                <h3>{el.citizenBio.name}</h3>: 
                {el.citizenBio.id}
              </div>

              <div>
                <img src={el.citizenBio.photo || UltraInstictGoku} alt={el.citizenBio.name} className='headshot'/>
              </div>

            </div>
          )
        })
      }
    </div>
  )
}
