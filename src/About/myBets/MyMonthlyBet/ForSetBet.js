import React from "react";
import "./ForSetBet.css";
import db from "../../../firebase";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom'
import { selectUser } from "../../../features/userSlice";
import { motion } from "framer-motion";
function ForSetBet({setCoinBet, setDay, bet, setBet, monthlyId}) {
    const user = useSelector(selectUser);
    console.log(monthlyId)
    const EasyFirebase = () => {
        db.collection("monthly_bet")
        .doc(monthlyId)
        .get()
        .then((snapshot) => {
          const UserBets =  snapshot.data().nBets
          db.collection("monthly_bet")
          .doc(monthlyId)
          .update({
            nBets: UserBets - 1,
          })
          .then(function () {
            console.log("succes Users");
          })
          .catch(function (error) {
            console.error("Error writing Users ", error);
          });
        });
        db.collection("bets")
          .doc()
          .set({
            Coin: bet.Coin,
            Day: bet.Day,
            Money: bet.Money,
            CoinBet: bet.CoinBet,
            payment: true,
            userEmail: user.email,
            status : 'Lose'
          })
          .then(function () {
            console.log("Value successfully written!");
          })
          .catch(function (error) {
            console.error("Error writing Value: ", error);
          });
      }
    const optionsLotery = () => {
        db.collection("optionsLotery")
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
    const monthlyBets = () => {
        db.collection("monthly_bet")
          .get()
          .then((querySnapshot) => {
            // Loop through the data and store
            // it in array to display
            querySnapshot.forEach((element) => {
              var data = element.data();
              setmonthlyBet((monthlyBet) => [...monthlyBet, data]);
            });
          });
      };
      const [options, setOptions] = useState([]);
      const [monthlyBet, setmonthlyBet] = useState([]);
      console.log(monthlyBet)
      useEffect(() => {
        optionsLotery();
        monthlyBets();
        const Coin = 'Bitcoin'
        const Money = '20' 
        setBet({...bet, Money, Coin})
      }, []);
      console.log(bet)
  return (
    <div className="forset_total">
      <div className="forset_container">
        <h1>Select details of the bet</h1>
       
        <div style={{ marginTop: "5%" }}>
            <h2>Select the day  of the bet</h2>
            <div style={{marginTop:'3%'}}>
          {options.map((Day) => {
            let spanClass = bet.Day === Day.Day ? "active" : "";
            return (
              <motion.li
                whileHover={{
                  scale: 1.4,
                  originX: 0,
                }}
                className="li"
                style={{marginTop:'-2%'}}
                key={Day.key}
                onClick={() => setDay(Day.Day)}
              >
                <span className={spanClass}>{Day.Day}</span>
              </motion.li>
            );
          })}</div>
        </div>
        <div>
        <h2>Select the day  of the bet</h2>
          <input placeholder="Select the coin value" style={{padding:'1%', borderRadius:'20px', fontSize:'130%', marginBottom:'5%'}} onChange={((e)=>{setCoinBet(e.target.value)})} type="number" />
        </div>
        <Link to='/about/MyBets'> <button style={{color:'white'}} onClick={EasyFirebase} >Create the bet</button></Link>
        <Link to='/about/MyBets'><button style={{color:'white', marginLeft:'5%'}}>Go back</button></Link>
       
      </div>
    </div>
  );
}

export default ForSetBet;
