import './App.css';
import abi from './utils/GlobalPassport.json';

function App() {
  const ethers = require('ethers');
  const contractAddress = process.env.REACT_APP_GLOBAL_PASSPORT_CONTRACT_ADDRESS;
  const contractABI = abi.abi;
  const date = new Date();
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();
  const timestamp = `${month}/${day}/${year}`
  const expired = `${month}/${day}/${year + 10}`
  const person =  {
    citizenBio: [
      {
        id: 1007, // passport/id number
        identityVerification: 123456,
        previousId: [ // assuming when you get new passport or renew, you get a different number
        1234, 7890
        ],
        name: 'Fred Flintston',
        issued: timestamp,
        expiration: expired,
        verifiyer: 'USA-USPS-12356abcd', // ID of entity that did original verification when signing up the first time
        dob: '1/24/1994',
        photo: 'asdfac.png', // maybe needs to be formated in a different way
        citizenship: [
          { country: 'United States', signature: 'USA-123456', date: 'timestamp' },
          { country: 'Colombia', signature: 'COL-123456', date: 'timestamp' },
            ]
      }
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
      const currentObject = item;
      const objectValues = Object.values(currentObject);

      objectValues.forEach((el) => {
        el.forEach((el2, idx) => {
          el[idx] = JSON.stringify(el2);
        })
      })
    }
    
  const checkIfWalletIsConnected = async () => {
    console.log(contractABI)
      try {
        const { ethereum } =  window;
        
        if(ethereum) {
          console.log('Ethereum object: ', ethereum);
        } else {
          console.log('Ethereum not found.');
        }
      } catch(err) {
      console.log(err);
    }
  }

  const createPassport = async () => {
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

        const citizens = await globalPassportContract.getCitizen();

        console.log('List of citizens: ', citizens);
      }

    } catch(err) {
      console.error(err);
    }
  }

  const getAllPassports = async () => {
    try {
      const { ethereum } =  window;

      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const globalPassportContract = new ethers.Contract(contractAddress, contractABI, signer);
        const citizens = await globalPassportContract.getCitizen();

        console.log(citizens);
      }
    } catch(err) {
      console.error(err)
    }
  }

    return (
      <div className="container">
        <h1>Global Passport</h1>
        <button onClick={() => {createPassport()}}>Create Passport</button>
        <button onClick={() => {getAllPassports()}}>Get All Passports</button>
      </div>
    );
  }


export default App;
