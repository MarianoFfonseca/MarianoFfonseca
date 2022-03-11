import * as React from "react";
import {motion } from 'framer-motion'
import Button from "@mui/material/Button";
import "./MainInvestingPage.css";
import { Link } from "react-router-dom";
import undraw_outer from "../images/undraw_outer.svg";
import undraw_astronaut from '../images/undraw_astronaut.svg'
import undraw_real from '../images/undraw_real.svg'
import undraw_calendar from '../images/undraw_calendar.svg'
export default function MainInvestingPage() {
  return (
    <div>
      <div className="upContainer">
        <motion.div   animate={{ x: 0 }}
            initial={{ x: 1000}}
            transition={{ type: "spring", duration: 1.5 }} className="card1">
          <div className="left">
            <img src={undraw_outer} alt="" />
          </div>
          <div className="rigth">
            <h3>Fast Bet 🔥</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Accusantium sint accusamus recusandae optio voluptate alias
              blanditiis 
            </p>
            <Link to='/formCoin'>
            <motion.button whileHover={{ scale: 1.2, originX:0 }}>
              Lets Start
            </motion.button></Link>
          </div>
        </motion.div>
        <motion.div animate={{ x: 0 }}
            initial={{ x: 1000}}
            transition={{ type: "spring", duration: 1.2, delay:0.5 }}  className="card1">
          <div className="left2">
            <img src={undraw_astronaut} alt="" />
          </div>
          <div className="rigth2">
            <h3>Pre Made Bet ♻</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit
              Accusantium sint accusamus recusandae optio voluptate alias
              blanditiis 
            </p>
            <Link to='/PremadeBet'>
            <motion.button whileHover={{ scale: 1.2, originX:0 }}>
              Learn more
            </motion.button></Link>
          </div>
        </motion.div>
        
      </div>
      <motion.div
      animate={{ y: 0 }}
      initial={{ y: 1000}}
      transition={{ type: "spring", delay:0.7, duration: 1.5 }} 
      
      className="card3">
          <div className="left3">
            <img  src={undraw_real} alt="" />
          </div>
          <div className="rigth3">
            <h3>Analize and track your bets 📊</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Accusantium sint accusamus recusandae optio voluptate alias
              blanditiis 
            </p>
            <Link to='/about/MyBets'>
            <motion.button whileHover={{ scale: 1.2, originX:0 }}>
              Track
            </motion.button>
            </Link>
            <Link to='/about/Analisis'>
            <motion.button style={{marginLeft:30}} whileHover={{ scale: 1.2, originX:0 }}>
              Analize
            </motion.button>
            </Link>
          </div>
        </motion.div>
      <motion.div className="card3">
          <div className="rigth4">
            <h1>Monthly lotery investing 🗓</h1>
            <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio, provident debitis, fuga amet quam id porro at dolorem animi totam ab temporibus voluptatum odit quaerat eaque. Perferendis eveniet a ab?
            Architecto, vel nam autem laudantium enim ad assumenda reprehenderit ipsa veritatis consequuntur laborum iusto, aliquam itaque at? Facere laborum voluptates necessitatibus blanditiis a saepe vitae qui sequi! Placeat, dolores commodi! 
            </p>
            <Link to='/MonthlyBet'>
            <motion.button whileHover={{ scale: 1.2, originX:0 }}>
              See plans
            </motion.button></Link>
            <Link to='/MonthlyBet'>
            <motion.button style={{marginLeft:30}} whileHover={{ scale: 1.2, originX:0 }}>
              More info
            </motion.button></Link>
          </div>
          <div className="left4">
            <img  src={undraw_calendar} alt="" />
          </div>
        </motion.div>
    </div>
  );
}
