import React, {useEffect, useState} from "react";
import { ethers } from "ethers";
import toast, { Toaster } from 'react-hot-toast';
import { Redirect } from "react-router-dom";
import { v4 as uuid } from "uuid";
import db from "../firebase";

const startPayment = async ({ setError, setTxs, setPay, ether, addr }) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether)
    });
    console.log({ ether, addr });
    console.log("tx", tx);
    setTxs(tx)
    setPay(true)
  } catch (err) {
    setError(err.message);
  }
};


function CheckOut({ price, bet, user }) {
  const [pay, setPay] = useState();
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);
  const [finish, setId]= useState('')

  
  const Firebase = () => {
    const unique_id = uuid();

    db.collection('bets')
    .doc(unique_id)
    .set({
      Coin: bet.Coin,
      Day: bet.Day,
      Money: bet.Money,
      CoinBet: bet.CoinBet,
      payment: true,
      userEmail: user.email,
      status: "none",
      id:unique_id ,
      hash: txs.hash,
      from: txs.from,
    })
    .then(function () {
      setId(unique_id)
      console.log("Value successfully written!");
    })
    .catch(function (error) {
      console.error("Error writing Value: ", error);
    });
  
  }

  const id = 'Succes/' + finish
  const Redireccion = finish !== '' ? <Redirect to={id}></Redirect> : <></>
  
  console.log(txs)

  const Myaddr = "0xa52Df09c4Ac4Df42E9abE8DbCc32d43F309E84e3";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError();
    await startPayment({
      setError,
      setTxs,
      setPay,
      ether: price,
      addr: Myaddr,
    });
  };

  useEffect(()=>{
    if(error !== undefined){
      toast.error('Error!')
      console.log(error, 'soy el error')
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
      {error ? <b style={{display:'block', marginTop:'3%', color:'rgb(255, 133, 133)'}}>Error to connect Metamask</b>:<></>}
    </div>
  );
}

export default CheckOut;
