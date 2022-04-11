import * as React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
//Firebase
import db from "../firebase";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {FaEthereum} from 'react-icons/fa'
//Stripe js
import { loadStripe } from "@stripe/stripe-js";
import CheckOutMonthly from "../CheckOut/CheckOutMonthlyButton";
import {getAuth} from 'firebase/auth'

//StripePromise

export default function MonthlyBetCheckOut({ monthlyB, setSucces, succes }) {

  //For the user

  const user = getAuth();

  const price = monthlyB === 'fullYear' ? '0.12' : '0.06'



  return (
    <div className="Total">
     
      <div className="FormInvesting_card ">
        <h3>
          Review your bet before check out{" "}
          <p style={{ display: "flex", fontSize: "15px", color: "gray" }}>
            - Info
          </p>
        </h3>
        <div style={{ marginTop: "10%" }}>
          {monthlyB === "fullYear" ? (
            <div>
              <li >In total 12 bets of 50%</li>
              <li>Price x bet:  <a style={{textDecorationLine: 'line-through', margin:'0 10px'}}>0.015</a>   <FaEthereum/>0.010 </li>
              <li>Saving: <FaEthereum style={{marginLeft:'10px'}}/>0.06</li>
            </div>
          ) : (
            <div>
              {" "}
              <li style={{textDecorationLine: 'line-through'}}>In total 6 bets of 50%</li>
              <li>Price x bet:  <a style={{textDecorationLine: 'line-through', margin:'0 10px'}}>0.015</a>   <FaEthereum/>0.012</li>
              <li>Saving:<FaEthereum style={{marginLeft:'10px'}}/>0.018</li>
            </div>
          )}
        </div>

       <CheckOutMonthly price={price} user={user} type={monthlyB} setSucces={setSucces}/>
      </div>
    </div>
  );
}

// export default MonthlyBetCheckOut;
