import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
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

//StripePromise

export default function ReviewBet({bet}) {
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
  const [Mybets, setMyBets] = useState([]);
  const user = useSelector(selectUser);
  console.log(bet)
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

  const item2 = {
    price: "price_1KW5nqAUHkiFgFqfJQrI1j7V",
    quantity: 1,
  };
  const item5 = {
    price: "price_1KZyKWAUHkiFgFqfJYgtXSSs",
    quantity: 1,
  };
  const item20 = {
    price: "price_1KZyNMAUHkiFgFqfjlzPzgZY",
    quantity: 1,
  };

  const checkoutOptions = {
    lineItems: [item2],
    mode: "payment",
    successUrl: `${window.location.origin}/succes`,
    cancelUrl: `${window.location.origin}/cancel`,
  };

  const redirectToCheckOut = async (e) => {
    e.preventDefault();
    db.collection("bets")
      .doc()
      .set({
        Coin: bet.Coin,
        Day: bet.Day,
        Money: bet.Money,
        CoinBet: bet.CoinBet,
        payment: false,
        userEmail: user.email,
        status : 'Lose'
      })
      .then(function () {
        console.log("Value successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing Value: ", error);
      });
    console.log("redirect");
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    console.log("Stripe checkout error", error);

    //Aca subir a firebase
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



  return (
    <div className="Total">
      <div className="FormInvesting_card">
        <h3>
          Review your bet before check out{" "}
          <p style={{ display: "flex", fontSize: "15px", color: "gray" }}>
            - Info
          </p>
        </h3>
        <div style={{ marginTop: "5%" }}>
          <li>- {bet.Coin}</li>
          <li>- ${bet.Money}</li>
          <li>- {bet.Day}</li>
          <li>- {bet.CoinBet}</li>
        </div>
       
         
            <motion.button
              transition={{ type: "spring" }}
              onClick={redirectToCheckOut}
              initial={{ x: "-1000px" }}
              animate={{ x: 0 }}
              whileHover={{
                scale: 1.2,
                originX: 0,
                boxShadow: "0px 0px 8px #fff",
              }}
              style={{ color: "white" }}
            >
              Go Check Out
            </motion.button>
          
        
      </div>
    </div>
  );
}
