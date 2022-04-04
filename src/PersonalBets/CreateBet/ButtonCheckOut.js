import React, { useEffect } from "react";
import db from "../../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
//Stripe js
import { loadStripe } from "@stripe/stripe-js";
function ButtonCheckOut({ Price, socialBet, socialOptions, setUidPersonal, setCreatedBet }) {
  const unique_id = uuid();
  const user = useSelector(selectUser);
  const Redireccion = '/SuccesOver/' + unique_id
  const fRedireccion = window.location.origin + Redireccion
  const FirebaseEasy = () => {
    setUidPersonal(unique_id)
    console.log('here')
    const d = new Date(socialBet.FinalDay);
    const f = d.toDateString();
    db.collection("socialBets")
      .doc(unique_id)
      .set({
        Title: socialBet.Title,
        Description: socialBet.Description,
        ImgUrl: socialBet.ImgUrl,
        MaxPeapol: socialBet.MaxPeapol,
        Topic: socialBet.Topic,
        State: socialBet.State,
        Coin: socialBet.Coin,
        Price: socialBet.Price,
        NOptions: socialBet.NOptions,
        Password: socialBet.Password,
        userUid: user.uid,
        userEmail:user.email,
        usersInBet: [user.email],
        FinalDay: f,
        id: unique_id,
        LastDay: socialBet.LastDay,
        payment: false
      })
      .then(function () {
        console.log("Value successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing Value: ", error);
      });
    db.collection("socialOptions")
      .doc(unique_id)
      .set({
        NOptions: socialBet.NOptions,
        Option1: socialOptions.Option1,
        Option2: socialOptions.Option2,
        Option3: socialOptions.Option3,
        Option4: socialOptions.Option4,
        State: socialBet.State,
        Price: socialBet.Price,
        userUid: user.uid,
        id: unique_id,
      })
      .then(function () {
        console.log("Value successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing Value: ", error);
      });
  };
  const FirebaseEasy2 = () => {
    setCreatedBet(true)
    setUidPersonal(unique_id)
    console.log('here')
    const d = new Date(socialBet.FinalDay);
    const f = d.toDateString();
    db.collection("socialBets")
      .doc(unique_id)
      .set({
        Title: socialBet.Title,
        Description: socialBet.Description,
        ImgUrl: socialBet.ImgUrl,
        MaxPeapol: socialBet.MaxPeapol,
        Topic: socialBet.Topic,
        State: socialBet.State,
        Coin: socialBet.Coin,
        Price: socialBet.Price,
        NOptions: socialBet.NOptions,
        Password: socialBet.Password,
        userUid: user.uid,
        userEmail:user.email,
        usersInBet: [user.email],
        FinalDay: f,
        id: unique_id,
        LastDay: socialBet.LastDay,
        payment: true
      })
      .then(function () {
        console.log("Value successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing Value: ", error);
      });
    db.collection("socialOptions")
      .doc(unique_id)
      .set({
        NOptions: socialBet.NOptions,
        Option1: socialOptions.Option1,
        Option2: socialOptions.Option2,
        Option3: socialOptions.Option3,
        Option4: socialOptions.Option4,
        State: socialBet.State,
        Price: socialBet.Price,
        userUid: user.uid,
        id: unique_id,
      })
      .then(function () {
        console.log("Value successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing Value: ", error);
      });
  };

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
    successUrl:`${fRedireccion}`,
    cancelUrl: `${window.location.origin}/personalBets`,
  };
  const checkoutOptions10 = {
    lineItems: [price10],
    mode: "payment",
    successUrl: `${fRedireccion}`,
    cancelUrl: `${window.location.origin}/personalBets`,
  };
  const checkoutOptions50 = {
    lineItems: [price50],
    mode: "payment",
    successUrl: `${fRedireccion}`,
    cancelUrl: `${window.location.origin}/personalBets`,
  };
  const checkoutOptions100 = {
    lineItems: [price100],
    mode: "payment",
    successUrl: `${fRedireccion}`,
    cancelUrl: `${window.location.origin}/personalBets`,
  };
  const checkoutOptions250 = {
    lineItems: [price250],
    mode: "payment",
    successUrl: `${fRedireccion}`,
    cancelUrl: `${window.location.origin}/personalBets`,
  };
  const redirectToCheckOut5 = async (e) => {
    e.preventDefault();
    FirebaseEasy();
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions5);
    console.log("Stripe checkout error", error);
  };
  const redirectToCheckOut10 = async (e) => {
    e.preventDefault();
    FirebaseEasy();
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions10);
    console.log("Stripe checkout error", error);
  };
  const redirectToCheckOut50 = async (e) => {
    e.preventDefault();
    FirebaseEasy();
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions50);
    console.log("Stripe checkout error", error);
  };
  const redirectToCheckOut100 = async (e) => {
    e.preventDefault();
    FirebaseEasy();
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions100);
    console.log("Stripe checkout error", error);
  };
  const redirectToCheckOut250 = async (e) => {
    e.preventDefault();
    FirebaseEasy();
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions250);
    console.log("Stripe checkout error", error);
  };
  const ButtonForCheckOut = () => {
    if (Price === "Free") {
      return (
        <Link to="/MySocialBets">
          <motion.button
            whileHover={{
              scale: 1.2,
              originX: 0,
              boxShadow: "0px 0px 8px #fff",
            }}
            onClick={FirebaseEasy2}
            style={{ marginTop: "4%" }}
          >
            Create bet !
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

export default ButtonCheckOut;
