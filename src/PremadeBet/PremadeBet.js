import React from "react";
import MenuHeader from "../MenuHeader";
import MenuList from "../MenuList";
import { motion } from "framer-motion";
import "./PremadeBet.css";
import undraw_split from "../images/undraw_split.svg";
import "./PremadeBet.css";
import undraw_augmented from "../images/undraw_augmented.svg";
import {Link} from 'react-router-dom'
import db from "../firebase";
import { useState, useEffect } from "react";

function PremadeBet({ setBet, bet, fPremadeBet}) {

  const ForSetCoin = () => {
    const Mine = fPremadeBet[0]
    console.log(Mine)
    const Day = Mine.Day
    const Money = Mine.Money
    const Coin = Mine.Coin
    setBet({...bet, Day, Coin, Money})
    
    
  }

  return (
    <div>
      <div className="menuScreen">
        <MenuHeader />
        <div className="menuScreen__container">
          <div className="menuScreen__left">
            <MenuList />
          </div>
          <div className="menuScreen__right">
            <h1>💣Pre-made Bet</h1>
            <div className="menuScreen__category">
              <motion.div
                initial={{ x: 1000 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 75 }}
                className="train_card3"
              >
                <div className="train_rigth4">
                  <h1>Every week a different recommendation</h1>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Distinctio, provident debitis, fuga amet quam id porro at
                    dolorem animi totam ab temporibus voluptatum odit quaerat
                    eaque. Perferendis eveniet a ab? Architecto, vel nam autem
                    laudantium enim ad assumenda reprehenderit ipsa veritatis
                    consequuntur laborum iusto, aliquam itaque at? Facere
                    laborum voluptates necessitatibus blanditiis a saepe vitae
                    qui sequi! Placeat, dolores commodi!
                  </p>
                </div>
                <div className="premade_left4">
                  <img className="premade_img" src={undraw_split} alt="" />
                </div>
              </motion.div>



              <motion.div
                initial={{ x: 1000 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.8, delay:0.4, type: "spring", stiffness: 75 }}
                className="train_card3"
                style={{display:'block'}}
              >
                <div style={{marginTop:'5%'}} >
                  <h1 className="premade_title">This week is recomendation👇</h1>
                </div>
                <div style={{display:'flex', marginLeft:'15%'}}>
                <div className="train_rigth4">
              <li>{fPremadeBet[0].Coin}</li>
                <li>{fPremadeBet[0].Day}</li>
                <li>${fPremadeBet[0].Money}</li>
                </div>
                <div className="premade_left4" style={{marginLeft:'15%', marginTop:'7%', marginBottom:'5%'}}>
                  <img className="premade_img" src={undraw_augmented} alt="" />
                </div>
                </div>

                <div className="premade_bottom">
                  <hr />
                  <h1>Why this recomendation</h1>
                    <p>The numbers of users</p>
                    <p>The amount of the award
</p>
                    <p style={{marginBottom:'2%'}}>The probably value of the coin </p>
                </div>
              </motion.div>
              <Link to='/formCoinBet' onClick={ForSetCoin}>
              <motion.button whileHover={{scale:1.05}}  className="premade_button">Select the price of the coin and check out!</motion.button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PremadeBet;
