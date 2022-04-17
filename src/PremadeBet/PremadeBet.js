import React from "react";
import MenuHeader from "../MenuHeader";
import MenuList from "../MenuList";
import { motion } from "framer-motion";
import "./PremadeBet.css";
import undraw_split from "../images/undraw_split.svg";
import "./PremadeBet.css";
import undraw_augmented from "../images/undraw_augmented.svg";
import { Link } from "react-router-dom";
import db from "../firebase";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";

function PremadeBet({ setBet, bet, fPremadeBet }) {
  if (!setBet || !bet || !fPremadeBet[0]) {
    return <Redirect to="/menu" />;
  }

  const ForSetCoin = () => {
    const Mine = fPremadeBet[0];
    console.log(Mine);
    const Day = Mine.Day;
    const Money = Mine.Money;
    const Coin = Mine.Coin;
    setBet({ ...bet, Day, Coin, Money });
  };

  const list = {
    while: {
      y: -10,
      transition: {
        duration: 0.3,
      },
    },
  };
  return (
    <div>
      <div className="menuScreen">
        <div className="menuScreen__container">
          <div className="menuScreen__left">
            <MenuList />
          </div>
          <div className="menuScreen__right">
            <h1 className="StyleTitle">💣Pre-made Bet</h1>
            <div className="menuScreen__category">
              <Link to="/formCoinBet" onClick={ForSetCoin}>
                <motion.div
                  whileHover="while"
                  variants={list}
                  className="cardLarge"
                >
                  <div>
                    <h3 className="h3center">
                      Pre made bet of this week
                      <AiOutlineArrowRight></AiOutlineArrowRight>
                    </h3>
                    <p>
                      Start with our pre-made bets, in this way we guarantee the
                      highest profit with the lowest investment, start right
                      away!
                    </p>
                  </div>
                  <div>
                    {" "}
                    <img src={undraw_split} alt="" />
                  </div>
                </motion.div>
              </Link>

              <div className="cardPremade">
                <div>
                  <h1>Information </h1>
                  <p>
                    This week the recommended bet is based on the currency of{" "}
                    <b>{fPremadeBet[0].Coin}</b> betting{" "}
                    <b>{fPremadeBet[0].Money}</b> on the day{" "}
                    <b>{fPremadeBet[0].Day} </b>, in this bet we can assure you
                    a great prize with even the smallest of bets. This choice,
                    recommendation is based on many of the information that we
                    obtain such as how many people are in the bet and other
                    data! We highly recommend this option!
                  </p>
                </div>
                <div>
                  {" "}
                  <img src={undraw_augmented} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PremadeBet;
