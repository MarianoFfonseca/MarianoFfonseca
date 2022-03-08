import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import "./FormInvestingDay.css";
import { motion } from "framer-motion";
import FormInvestingMoney from "./FormInvestingMoney";
import { Link } from "react-router-dom";
//Firebase
import db from "../firebase";
import { useState, useEffect } from "react";

export default function FormInvestingDay({ bet, setDay }) {
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
  const [options, setOptions] = useState([]);
  const [value, setValue] = React.useState("");
  const [Doit, setDoit] = React.useState(false);
  useEffect(() => {
    optionsLotery();
  }, []);
  console.log(bet);

  return (
    <div className="Total">
      <div className="FormInvesting_card">
        <h3>
          In what Day do you wanna make this bet{" "}
          <p style={{ display: "flex", fontSize: "15px", color: "gray" }}>
            - Info
          </p>
        </h3>
        <div style={{ marginTop: "5%" }}>
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
                onClick={() => setDay(Day.Day)}
              >
                <span className={spanClass}>{Day.Day}</span>
              </motion.li>
            );
          })}
        </div>
        {bet.Day && (
          <Link to="/formMoney">
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
