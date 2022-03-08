import * as React from "react";
import "./FormInvestingDay.css";
import { motion } from "framer-motion";
import FormInvestingBet from "./FormInvestingBet"
import { Link } from "react-router-dom";
//Firebase
import db from "../firebase";
import { useState, useEffect } from "react";

export default function FormInvestingMoney({bet, setMoney}) {
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
  const [Doit, setDoit] = React.useState(false);
  const [helperText, setHelperText] = React.useState("Chose...");
  

  // const optionsLotery = async () => {
  //   const response = db.collection("optionsLotery");
  //   const data = await response.get();
  //   data.docs.forEach((item) => {
  //     setOptions([...options, item.data()]);
  //   });
  // };

  useEffect(() => {
    optionsLotery();
  }, []);
  return (
    <div className="Total">
      <div className="FormInvesting_card">
        <h3>
          Of how much you wanna make this bet{" "}
          <p style={{ display: "flex", fontSize: "15px", color: "gray" }}>
            - Info
          </p>
        </h3>
        <div style={{ marginTop: "5%" }}>
          {options.map((Money) => {
            console.log(Money)
            let spanClass = bet.Money === Money.Money ? "active" : "";
            return (
              <motion.li
                whileHover={{
                  scale: 1.4,
                  originX: 0,
                }}
                className="li"
                key={Money.Key}
                onClick={() => setMoney(Money.Money)}
              >
                <span className={spanClass}>$ {Money.Money}</span>
              </motion.li>
            );
          })}
        </div>
        {bet.Money && (
          <Link to="/formCoinBet">
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
      </div>
    </div>
  );
}
