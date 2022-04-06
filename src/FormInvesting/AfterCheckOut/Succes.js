import React from "react";
import { motion } from "framer-motion";
import toast, {Toaster} from 'react-hot-toast'
import "./Succes.css";
import db from "../../firebase";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import {Link} from 'react-router-dom'
function Succes() {
let {id} = useParams()
const [bet, setBet] = useState([])
  const getInfo = () => {
    db.collection('bets')
    .doc(id)
    .get()
    .then((x)=>{
      const data = x.data()
      setBet(data)
    })
  }

  useEffect(
    ()=>{
      getInfo()
      toast.success('All perfect!')
  },[])
  if(!bet) return null
  return (
    <div className="">
      <Toaster></Toaster>
      <div className="succes_container">
        
        <div className="succes_header">{bet.hash}</div>
        <div className="succes_body">
          <h1>Info</h1>
        
          <div>From : {bet.from}</div>
          <div>User : {bet.userEmail}</div>
          <div>Bet Day : {bet.Day}</div>
          <div>Bet : {bet.CoinBet}</div>
          <div>Price : {bet.Money}</div>
          <div>Coin : {bet.Coin}</div>
          <Link to='/menu'><button style={{marginTop:'5%'}}>Go back to the menu</button></Link>
       
          </div>        
      </div>
    </div>
  );
}

export default Succes;
