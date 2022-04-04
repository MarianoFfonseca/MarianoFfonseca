import React, { useEffect } from "react";
import db from "../../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
//Stripe js
import { loadStripe } from "@stripe/stripe-js";
import { ConnectingAirportsOutlined } from "@mui/icons-material";
function ButtonCheckOutOptions({ Price, documentId, selectedOption }) {
  const unique_id = uuid();
  const user = useSelector(selectUser);
  const PaymentRedirection = '/SuccesIndivudualPayment/' + documentId;
  const fPaymentRedireccion = window.location.origin + PaymentRedirection
  let stripePromise;
  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(
        "pk_test_51KW5j3AUHkiFgFqfneVIj0l1wIhb8nIjVlCyeZeXa5weBFuiV4CdH0IwIHKOM01gZNIgwmqKV4RpMqPNnSBWTriI00SrgBIJbE"
      );
    }
    return stripePromise;
  };
  const price5 = {
    price: "price_1Ke7eFAUHkiFgFqfzkzRc9yR",
    quantity: 1,
  };
  const price10 = {
    price: "price_1Ke7eFAUHkiFgFqfouoRBmhS",
    quantity: 1,
  };
  const price50 = {
    price: "price_1Ke7eFAUHkiFgFqfsSkQq6ut",
    quantity: 1,
  };
  const price100 = {
    price: "price_1Ke7eFAUHkiFgFqfSHG953eW",
    quantity: 1,
  };
  const price250 = {
    price: "price_1Ke7eFAUHkiFgFqfmzQpPyoi",
    quantity: 1,
  };
  const checkoutOptions5 = {
    lineItems: [price5],
    mode: "payment",
    successUrl: `${fPaymentRedireccion}`,
    cancelUrl: `${window.location.origin}/personalBets`,
  };
  const checkoutOptions10 = {
    lineItems: [price10],
    mode: "payment",
    successUrl: `${fPaymentRedireccion}`,
    cancelUrl: `${window.location.origin}/personalBets`,
  };
  const checkoutOptions50 = {
    lineItems: [price50],
    mode: "payment",
    successUrl: `${fPaymentRedireccion}`,
    cancelUrl: `${window.location.origin}/personalBets`,
  };
  const checkoutOptions100 = {
    lineItems: [price100],
    mode: "payment",
    successUrl: `${fPaymentRedireccion}`,
    cancelUrl: `${window.location.origin}/personalBets`,
  };
  const checkoutOptions250 = {
    lineItems: [price250],
    mode: "payment",
    successUrl: `${fPaymentRedireccion}`,
    cancelUrl: `${window.location.origin}/personalBets`,
  };
  const redirectToCheckOut5 = async (e) => {
    e.preventDefault();
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions5);
    console.log("Stripe checkout error", error);
  };
  const redirectToCheckOut10 = async (e) => {
    e.preventDefault();
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions10);
    console.log("Stripe checkout error", error);
  };
  const redirectToCheckOut50 = async (e) => {
    e.preventDefault();
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions50);
    console.log("Stripe checkout error", error);
  };
  const redirectToCheckOut100 = async (e) => {
    e.preventDefault();
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions100);
    console.log("Stripe checkout error", error);
  };
  const redirectToCheckOut250 = async (e) => {
    e.preventDefault();
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions250);
    console.log("Stripe checkout error", error);
  };

  const FirebaseEasy = () => {
    db.collection("individualSocialBet")
      .doc(unique_id)
      .set({
      userUid:user.uid,
      selectedOption: selectedOption,
      betId: documentId
      })
      .then(function () {
        console.log("Value successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing Value: ", error);
      });
   db.collection("socialBets")
      .doc(documentId)
      .get()
      .then(
        (x)=> {
          const usersInBet =  x.data().usersInBet;
          const email = user.email
          const newArray = usersInBet.push(email)

          db.collection("socialBets")
          .doc(documentId)
          .update({
           usersInBet : usersInBet
            })
          
        }
      )
  };

  const ButtonForCheckOut = () => {
    console.log(Price)
    if (Price === "Free") {
      return (
        <Link to='/SuccesIndividual'>
          <motion.button
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="button"
            onClick={FirebaseEasy}
          >
            Make bet !
          </motion.button>
        </Link>
      );
    } else {
      if (Price === "5") {
       
        return (
          <button onClick={redirectToCheckOut5} style={{ marginTop: "4%" }}>
            Check out
          </button>
        );
      }
      if (Price === "10") {
        return (
          <button onClick={redirectToCheckOut10} style={{ marginTop: "4%" }}>
            Check out
          </button>
        );
      }
      if (Price === "50") {
        return (
          <button onClick={redirectToCheckOut50} style={{ marginTop: "4%" }}>
            Check out
          </button>
        );
      }
      if (Price === "100") {
        return (
          <button onClick={redirectToCheckOut100} style={{ marginTop: "4%" }}>
            Check out
          </button>
        );
      }
      if (Price === "250") {
        return (
          <button onClick={redirectToCheckOut250} style={{ marginTop: "4%" }}>
            Check out
          </button>
        );
      }
    }
  };
  return <div>{ButtonForCheckOut()}</div>;
}

export default ButtonCheckOutOptions;
