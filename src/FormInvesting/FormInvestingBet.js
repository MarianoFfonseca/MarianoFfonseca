import * as React from "react";
import "./FormInvestingBet.css";
import { motion } from "framer-motion";
import ReviewBet from "./ReviewBet";
import { Link } from "react-router-dom";
//Firebase
import { Redirect } from "react-router-dom";
import db from "../firebase";
import { useState, useEffect } from "react";

export default function FormInvestingBet({ bet, setCoinBet }) {
  const optionsLotery = () => {
    db.collection("bets")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var data = element.data();
          setOptions((options) => [...options, data]);
        });
      });
  };
  const [options, setOptions] = useState([]);
  console.log(options);
  const [error, setError] = useState(false);

  useEffect(() => {
    optionsLotery();
  }, []);

  const handleChange = (e) => {
    let txt = e.target.value;
    if (txt.length >= 5) {
      const h = options.some(
        (element) =>
          element.CoinBet === txt &&
          element.Day === bet.Day &&
          bet.Coin === element.Coin
      );

      if (h === true) {
        setError("This bet was already selected");
      } else if (h === false) {
        setError("");
        setCoinBet(e.target.value);
      }
    } else {
      setError("The bet need to have 5+ characters");
    }
  };

  const Check = () => {
    if (bet) {
      if (bet.Coin === "" || bet.Day === "" || bet.Money === "") {
        return <Redirect to="/FormCoin"></Redirect>;
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
          What is gonna be the price for you?{" "}
          <p style={{ display: "flex", fontSize: "15px", color: "gray" }}>
            - Info
          </p>
        </h3>
        <div style={{ marginTop: "5%" }}>
          <input
            style={{
              padding: "2%",
              borderRadius: "5px",
              outline: "none",
              border: "none",
              fontSize: "130%",
              marginBottom: "5%",
            }}
            type="number"
            onChange={handleChange}
            placeholder="Value of the coin"
            name=""
            id=""
          />
        </div>
        {error !== "" ? (
          <>{error}</>
        ) : (
          <>
            {bet.CoinBet && (
              <Link to="/ReviewBet">
                <motion.button
                  transition={{ type: "spring" }}
                  initial={{ x: "-1000px" }}
                  animate={{ x: 0 }}
                  whileHover={{
                    scale: 1.2,
                    originX: 0,
                  }}
                  style={{ color: "white" }}
                >
                  Next Question
                </motion.button>
              </Link>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}
