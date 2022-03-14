import * as React from "react";
import "./FormInvestingBet.css";
import { motion } from "framer-motion";
import ReviewBet from "./ReviewBet"
import { Link } from "react-router-dom";
//Firebase
import db from "../firebase";
import { useState, useEffect } from "react";

export default function FormInvestingBet({bet, setCoinBet}) {
  const optionsLotery = () => {
    db.collection("optionsLoteryMoney")
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
  const [options, setOptions] = useState([]);
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [Doit, setDoit] = React.useState(false);
  const [helperText, setHelperText] = React.useState("Chose...");
  



  useEffect(() => {
    optionsLotery();
  }, []);

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(" ");
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (value) {
      setHelperText("Perfect✅");
      setError(false);
      setDoit(true);
    } else {
      setHelperText("Please select an option.");
      setError(true);
    }
  };

  return (
    <div className="Total">
      <motion.div  transition={{type:'spring', duration:2}}
            initial={{ x:100, opacity:0 }}
            animate={{ x: 0, opacity:1 }} className="FormInvesting_card">
        <h3>
          What is gonna be the price for you?{" "}
          <p style={{ display: "flex", fontSize: "15px", color: "gray" }}>
            - Info
          </p>
        </h3>
        <div style={{ marginTop: "5%" }}>
         <input style={{padding:'2%', borderRadius:'20px', fontSize:'130%', marginBottom:'5%'}} type="number" onChange={((e)=>{setCoinBet(e.target.value)})} name="" id="" />
        </div>
        {bet.CoinBet && (
          <Link to="/ReviewBet">
            <motion.button
              transition={{ type: "spring" }}
              initial={{ x: "-1000px" }}
              animate={{ x: 0 }}
              whileHover={{
                scale: 1.2,
                originX: 0,
                boxShadow: "0px 0px 8px #fff",
              }}
              style={{ color: "white" }}
            >
              Next Question
            </motion.button>
          </Link>
        )}
      </motion.div>
    </div>
  );
}
