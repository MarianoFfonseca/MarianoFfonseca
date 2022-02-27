import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import "./FormInvestingBet.css";
import { motion } from "framer-motion";
import TextField from '@mui/material/TextField';
import ReviewBet from "./ReviewBet"
//Firebase
import db from "../firebase";
import { useState, useEffect } from "react";

export default function FormInvestingBet(props) {
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
    <div className="All">
      <div className="bg"></div>
      <motion.form
        animate={{ y: 0 }}
        initial={{ y: 200 }}
        transition={{ duration: 1 }}
        className="cardd"
        onSubmit={handleSubmit}
      >
        <FormControl sx={{ m: 3 }} error={error} variant="standard">
          <FormLabel style={{ color: "black" }} id="demo-error-radios">
       For you wich is going to be the price of <b>{props.Coin}</b> by <b>{props.day}</b> ?
          </FormLabel>
          <hr />

            {/* Poner para que cada valor sea unico */}
          <TextField
          id="outlined-number"
          label=""
          type="number"
          onChange={handleRadioChange}
          value={value}
          InputLabelProps={{
            shrink: true,
          }}
        />
         
          {/* <FormHelperText style={{color:"green"}}>{helperText}</FormHelperText> */}
          <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
            Next question👉
          </Button>
        </FormControl>
      </motion.form>
     {Doit === true ? <ReviewBet Coin={props.Coin} Day={props.day} Money={props.Money} CoinBet={value}></ReviewBet> : null} 
    </div>
  );
}
