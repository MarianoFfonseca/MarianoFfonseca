import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import db from "../../../firebase";
import "./InfoBet.css";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
export default function InfoBet(props) {
  //Consegir todas las apuestas
  const betLotery = () => {
    props.AllBets &&
      props.AllBets.map((bet) => {
        if (
          props.SelectedBet.data.Coin === bet.data.Coin &&
          props.SelectedBet.data.Money === bet.data.Money &&
          props.SelectedBet.data.Day === bet.data.Day
        ) {
          let value = bet.data.CoinBet;
          let fValue = parseInt(value);
          setnUsersBet((nUsersBet) => [...nUsersBet, fValue]);
        }
      });
  };

  const [nUsersBet, setnUsersBet] = useState([]);
  let sum = 0;

  for (let i = 0; i < nUsersBet.length; i++) {
    sum += nUsersBet[i];
  }

  const nUsers = nUsersBet.length;
  let AverageBet = sum / nUsers;

  const FinalAward = props.SelectedBet.data.Money * nUsers;

  useEffect(() => {
    betLotery();
  }, []);

  return (
    <div>
      <div className="">
        <motion.div
        style={{textAlign:'center'}}
          animate={{ y: 0 }}
          initial={{ y: 1000 }}
          transition={{ type: "spring", duration: 1.5 }}
          className="myaccount_card1"
        >
          <div style={{marginLeft:'7%'}}>
          <div className="myaccount_cardup responsive">
            <div style={{ width: "50%" }}>
              <h3>🙍‍♂️Users:</h3>
              <motion.h1
                onClick={() => {
                  navigator.clipboard.writeText("x.name");
                }}
                whileHover={{ cursor: "pointer" }}
                style={{ marginTop: "5%" }}
              >
                {nUsers}
              </motion.h1>
            </div>
            <div style={{ marginLeft:'10%'}}>
              <h3>🏋️‍♀️Final Award:</h3>
              <motion.h1
                onClick={() => {
                  navigator.clipboard.writeText("x.email");
                }}
                whileHover={{ cursor: "pointer" }}
                style={{ marginTop: "5%" }}
              >
               ${FinalAward}
              </motion.h1>
            </div>
          </div>
          <div>
            <div className="myaccount_carddown responsive">
              <div style={{ width: "50%" }}>
                <h3>👀Average Bet:</h3>
                <motion.h1
                  whileHover={{ cursor: "pointer" }}
                  style={{ marginTop: "1%" }}
                  onClick={() => {
                    navigator.clipboard.writeText("x.uid");
                  }}
                >
                 {AverageBet}
                </motion.h1>
              </div>
              <div style={{ marginLeft:'10%'}}>
                <h3>💦Time Left:</h3>
                <motion.h1
                  whileHover={{ cursor: "pointer" }}
                  style={{ marginTop: "5%" }}
                  onClick={() => {
                    navigator.clipboard.writeText("x.bets");
                  }}
                >
                  14 days
                </motion.h1>
              </div>
            </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
