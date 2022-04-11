import * as React from "react";
import "./ReviewBet.css";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
//Firebase
import db from "../firebase";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//Stripe js
import { loadStripe } from "@stripe/stripe-js";
import {FaEthereum} from 'react-icons/fa'
//StripePromise

import CheckOutButton from "../CheckOut/CheckOutButton";
import { Redirect } from "react-router-dom";

export default function ReviewBet({ bet }) {
  let stripePromise;
  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(
        "pk_test_51KW5j3AUHkiFgFqfneVIj0l1wIhb8nIjVlCyeZeXa5weBFuiV4CdH0IwIHKOM01gZNIgwmqKV4RpMqPNnSBWTriI00SrgBIJbE"
      );
    }
    return stripePromise;
  };
  //For the user
  const [bets, setBets] = useState([]);
  const user = useSelector(selectUser);
  
  //Obtener las apuestas
  const betLotery = () => {
    db.collection("bets")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var data = element.data();
          setBets((bets) => [...bets, data]);
        });
      });
  };
  //Filtrar las que hiso el usuario y las que no estan pagadas

  useEffect(() => {
    betLotery();
  }, []);

  //for get how many bets the user has

 
  const EasyFirebase = () => {
    db.collection("bets")
      .doc()
      .set({
        Coin: bet.Coin,
        Day: bet.Day,
        Money: bet.Money,
        CoinBet: bet.CoinBet,
        payment: false,
        userEmail: user.email,
        status: "none",
      })
      .then(function () {
        console.log("Value successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing Value: ", error);
      });
  };



  const optionsLotery = () => {
    db.collection("optionsLoteryMoney")
      .get()
      .then((querySnapshot) => {
        // Loop through the data and store
        // it in array to display
        querySnapshot.forEach((element) => {
          var data = element.data();
          setOptions((options) => [...options, data]);
        });
      });
  };
  const [options, setOptions] = useState([]);

  useEffect(() => {
    optionsLotery();
  }, []);
  const Check = () => {
    if (bet) {
    if(bet.Coin === '' || bet.Day === '' || bet.Money === '' || bet.CoinBet === ''){
      return <Redirect to='/FormCoin'></Redirect>
    }
    }
  };
  return (
    <div className="Total">
  {Check()}
      <motion.div
        transition={{ type: "spring", duration: 2 }}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="FormInvesting_card"
      >
        <h3>
          Review your bet before check out{" "}
          <p style={{ display: "flex", fontSize: "15px", color: "gray" }}>
            - Info
          </p>
        </h3>
        <div style={{ marginTop: "5%" }}>
          <li> - {bet.Coin}</li>
          <li> -{bet.Money}</li>
          <li> - {bet.Day}</li>
          <li> - {bet.CoinBet}</li>
        </div>
        <CheckOutButton
          price={bet.Money}
          bet={bet}
          user={user}
        ></CheckOutButton>
      </motion.div>
    </div>
  );
}
