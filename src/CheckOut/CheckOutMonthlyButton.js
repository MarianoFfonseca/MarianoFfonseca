import React, {useEffect, useState} from "react";
import { ethers } from "ethers";
import toast, { Toaster } from 'react-hot-toast';
import { Redirect } from "react-router-dom";
import { v4 as uuid } from "uuid";
import db from "../firebase";
const startPayment = async ({ setError, setTxs, setPay, ether, addr}) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    if(window.ethereum.chainId){
    // if(window.ethereum.chainId === '0x1'){
      await window.ethereum.send("eth_requestAccounts");
    
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      ethers.utils.getAddress(addr);
      const tx = await signer.sendTransaction({
        to: addr,
        value: ethers.utils.parseEther(ether)
      });

      setTxs(tx)
      setPay(true)
      

    }
    else if(window.ethereum.chainId !== '0x1'){setError('Select the principal etherum red');}
  

  } catch (err) {
    console.log(err.code)
    if(err.code === 'INSUFFICIENT_FUNDS' ) 
      {setError('Insuficient funds');}
    else {
      setError('Error to connect Metamask');
    }
  }
};


function CheckOutMonthly({ price, user, type , setSucces}) {

 
    
  const [pay, setPay] = useState();
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);
  const [finish, setId]= useState('')

  
  const Firebase = () => {
    const unique_id = uuid();
    const Nbets = price === '0.012' ? 12 : 6
    db.collection('monthly_bet')
    .doc(unique_id)
    .set({
        payment: true,
        userUid: user.lastNotifiedUid,
        nBets: Nbets,
        Money: type

    })
    .then(function () {
      setId(unique_id)
      setSucces(true)
    })
    .catch(function (error) {
      console.error("Error writing Value: ", error);
    });
  
  }
  const Redireccion = finish !== '' ? <Redirect to='/about/MyBets'></Redirect> : <></>

  const Myaddr = "0xa52Df09c4Ac4Df42E9abE8DbCc32d43F309E84e3";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError();
    await startPayment({
      setError,
      setTxs,
      setSucces,
      setPay,
      ether: '0.001',
      // ether: price,
      addr: Myaddr,

    });
  };

  useEffect(()=>{
    if(error !== undefined){
      toast.error('Error!')
    }

  },[error])
  useEffect(()=> {
    if(pay === true) {
      Firebase()
    }
  },[pay])

  return (
    <div>
     
      <button onClick={handleSubmit}>Pay</button>
      <Toaster></Toaster>
      {Redireccion}
      {error ? <b style={{display:'block', marginTop:'3%', color:'rgb(255, 133, 133)'}}>{error}</b>:<></>}
    </div>
  );
}

export default CheckOutMonthly;
