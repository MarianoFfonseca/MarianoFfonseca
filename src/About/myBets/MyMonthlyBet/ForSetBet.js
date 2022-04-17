import React from "react";
import "./ForSetBet.css";
import db from "../../../firebase";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getAuth } from "firebase/auth";
import { Redirect } from "react-router-dom";
import { v4 as uuid } from "uuid";
function ForSetBet({ setCoinBet, setDay, bet, setBet, monthlyId }) {
  const user = getAuth();
  const EasyFirebase = () => {
//Verificar que no exista
    
const h = allBets.some(
      (element) =>                      
        element.CoinBet === bet.CoinBet &&
        bet.Coin === element.Coin && 
        bet.Day === element.Day
    );
  
    if(h === false){
      setError('Listo2') 
      db.collection("monthly_bet")
      .doc(monthlyId)
      .get()
      .then((snapshot) => {
        const UserBets = snapshot.data().nBets;
        db.collection("monthly_bet")
          .doc(monthlyId)
          .update({
            nBets: UserBets - 1,
          })
          .then(function () {
          })
          .catch(function (error) {
            console.error("Error writing Users ", error);
          });
      });
    const unique_id = uuid();
    db.collection("bets")
      .doc(unique_id)
      .set({
        Coin: bet.Coin,
        Day: bet.Day,
        Money: bet.Money,
        CoinBet: bet.CoinBet,
        payment: true,
        userEmail: user.currentUser.email,
        status: "none",
        id: unique_id,
      })
      .then(function () {
      })
      .catch(function (error) {
        console.error("Error writing Value: ", error);
      });
    }
    else if(h === true){
      setError('This bet was already selected')
    }
 

   
  };
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

  const [permision, setPermision] = useState();
  useEffect(() => {
    if (monthlyBet.length > 0) {
      const Chekear = monthlyBet.some(
        (element) => user.lastNotifiedUid === element.userUid
      );
      setPermision(Chekear);
    }
  }, [monthlyBet]);
  const Redirection =
    permision === false ? <Redirect to="/About/MyBets"></Redirect> : <></>;

  useEffect(() => {
    optionsLotery();
    monthlyBets();
    betsTotal()
    const Coin = "Bitcoin";
    const Money = "0.015";
    setBet({ ...bet, Money, Coin });
  }, []);

  const betsTotal = () => {
    db.collection("bets")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var data = element.data();
          setAllBets((allBets) => [...allBets, data]);
        });
      });
  };
  const [allBets, setAllBets] = useState([])
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    let txt = e.target.value;
    if (txt.length >= 5) {
      setError('Listo1')
      setCoinBet(e.target.value);
    } else {
      setError("The bet need to have 5+ characters");
    }
  };

 


  return (
    <div className="forset_total">
      {Redirection}
      <div className="forset_container StyleCards">
        <h1>Select details of the bet</h1>
        <hr />
        <div style={{ marginTop: "5%" }}>
          <h2>Select the day of the bet:</h2>

          <div style={{ marginTop: "3%" }}>
            {options.map((Day) => {
              let spanClass = bet.Day === Day.Day ? "active" : "";
              return (
                <motion.li
                  whileHover={{
                    scale: 1.4,
                    originX: 0,
                  }}
                  className="li"
                  key={Day.key}
                  onClick={() => {
                    setDay(Day.Day)}
                  }
                >
                  <span className={spanClass}>{Day.Day}</span>
                </motion.li>
              );
            })}
          </div>
        </div>
        <div>
          <h2>Select the price of the coin:</h2>
          <input
            placeholder="Select the coin value"
            style={{
              padding: "1%",
              fontSize: "20px",
              borderRadius: "5px",
              marginBottom: "5%",
            }}
            onChange={handleChange}
            type="number"
          />
        </div>
        {error === 'The bet need to have 5+ characters' ? <p style={{display:'block', color:'#c6c6c6'}}>{error}</p> : <></>}
        {error === 'This bet was already selected' ? <p style={{display:'block', color:'#c6c6c6'}}>{error}</p> : <></>}

        {error === 'Listo1' ?          <motion.button style={{ marginRight: "5%" }} onClick={EasyFirebase} initial={{y:10, opacity:0}} animate={{y:0, opacity:1}} className="buttonForm">
  <span className="spanForm"> Create bet </span> </motion.button>: <></>}

            {error === 'Listo2' ? <Redirect to='/About/MyBets'></Redirect> : <></>}
        
      
      </div>
    </div>
  );
}

export default ForSetBet;
