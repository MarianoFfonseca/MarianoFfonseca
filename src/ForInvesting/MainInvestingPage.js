import * as React from "react";
import { motion } from "framer-motion";
import Button from "@mui/material/Button";
import "./MainInvestingPage.css";
import { Link } from "react-router-dom";
import undraw_outer from "../images/undraw_outer.svg";
import undraw_astronaut from "../images/undraw_astronaut.svg";
import undraw_real from "../images/undraw_real.svg";
import undraw_calendar from "../images/undraw_calendar.svg";
import {AiOutlineArrowRight} from 'react-icons/ai'
import "./MainInvest.css";

export default function MainInvestingPage() {
  const list = {
    while: { y:-10, transition: {
    duration:0.3,  
    }
  }
}
  return (
    <div>
      <div className="upContainer2">
       <Link to='/formCoin'>
        <motion.div whileHover='while' variants={list} className="cardContainer">
          <div > <img src={undraw_outer} alt="" /></div>
          <div>
            <h3 className="h3center titleCard">Fast Bet<AiOutlineArrowRight></AiOutlineArrowRight></h3>
            <p className="textCard">
            Start by making a quick, simple, safe and profitable bet, it is a simple form that will guide you step by step
            </p>
          </div>
        </motion.div>
        </Link>
        <Link to='/PremadeBet'>
        <motion.div whileHover='while' variants={list} className="cardContainer"> 
            <div>  <img src={undraw_astronaut} alt="" /></div>
            <div>
              <h3 className="h3center titleCard">Pre made bet<AiOutlineArrowRight></AiOutlineArrowRight></h3>
              <p className="textCard">
              Pre-made bets ready based on the data we have to guarantee a higher profit with less risk
              </p>
            
           </div>
          
        </motion.div>
        </Link>
      </div>

      <Link to='/About/MyBets'>
      <motion.div whileHover='while' variants={list} className="cardLarge">
     
            <div>  <img src={undraw_real} alt="" /></div>
            <div>
              <h3 className="h3center titleCard">Track your bets<AiOutlineArrowRight></AiOutlineArrowRight></h3>
              <p className="textCard">
              See and analyze your active bets, you will only be able to see your bets in case you have them, you will be able to manage your amount of bets per month and others
              </p>
            
           </div>
       
      </motion.div>
     </Link>


     <Link to='/MonthlyBet'>
      <motion.div whileHover='while' variants={list} className="cardBig">
      
            <div>
              <h3 className="h3center titleCard">Pack of bets! <AiOutlineArrowRight></AiOutlineArrowRight></h3>
              <p className="textCard">
              This is the method that we recommend here, you can compare betting packs that will be worth much less than normal, it is more for less, the minimum number of bets that can be purchased is 6 and they are always bitcoin bets! What are you waiting for!
                  </p>
            
           </div>
           <div> <img src={undraw_calendar} alt="" /></div>
      </motion.div>
     </Link>
      {/* Second one  /////////////////////////////////////////////////////////*/}
    </div>
  );
}
