import * as React from "react";
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

export default function MonthlyBetCheckOut({ monthlyB }) {
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

  const halfYear = {
    price: "price_1KcDU2AUHkiFgFqf15p6004y",
    quantity: 1,
  };
  const fullYear = {
    price: "price_1KcDUnAUHkiFgFqfsxjePKB6",
    quantity: 1,
  };

  const checkoutOptions = {
    lineItems: [halfYear],
    mode: "payment",
    successUrl: `${window.location.origin}/SuccesMonthly`,
    cancelUrl: `${window.location.origin}/CancelMonthly`,
  };
  const checkoutOptions2 = {
    lineItems: [fullYear],
    mode: "payment",
    successUrl: `${window.location.origin}/SuccesMonthly`,
    cancelUrl: `${window.location.origin}/CancelMonthly`,
  };
  const [nBets, setnBets] = useState(0);

  const FirebaseEasy = () => {
    const Numero = monthlyB === 'halfYear' ? 6 : 12;
    db.collection("monthly_bet")
      .doc()
      .set({
        Day: new Date(),
        Money: monthlyB,
        payment: false,
        userUid: user.uid,
        nBets: Numero
      })
      .then(function () {
        console.log("Value successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing Value: ", error);
      });
  };

  const redirectToCheckOut = async (e) => {
    e.preventDefault();
    FirebaseEasy();
    console.log("redirect");
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    console.log("Stripe checkout error", error);
  };
  const redirectToCheckOut2 = async (e) => {
    e.preventDefault();
    FirebaseEasy();
    console.log("redirect");
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions2);
    console.log("Stripe checkout error", error);
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
          {monthlyB === "fullYear" ? (
            <div>
              <li>$10 dollars for 12 months</li>
              <li>12 bets in total</li>
              <li>Saving $120 dollars</li>
            </div>
          ) : (
            <div>
              {" "}
              <li>$15 dollars for 6 months</li>
              <li>6 bets total</li>
              <li>Saving $55 dollars</li>
            </div>
          )}
        </div>

        <motion.button
          transition={{ type: "spring" }}
          onClick={
            monthlyB === "halfYear" ? redirectToCheckOut : redirectToCheckOut2
          }
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

// export default MonthlyBetCheckOut;
