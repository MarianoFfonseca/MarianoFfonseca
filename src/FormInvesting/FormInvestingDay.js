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
import FormInvestingMoney from "./FormInvestingMoney"
//Firebase
import db from "../firebase";
import { useState, useEffect } from "react";

export default function FormInvestingDay(Coin) {
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
  const [error, setError] = React.useState(false);
  const [Doit, setDoit] = React.useState(false);
  const [helperText, setHelperText] = React.useState("Chose...");
  console.log(Doit);



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
      setValue(value)
      setHelperText("Perfect✅");
      setError(false);
      setDoit(true);
    } else {
      setHelperText("Please select an option.");
      setError(true);
    }
  };
  console.log(value)
  return (
    <div className="All">
      <div className="bg"></div>
      <motion.form
        animate={{ y: 0 }}
        initial={{ y: 200 }}
        transition={{ duration: 1 }}
        className="card"
        onSubmit={handleSubmit}
      >
        <FormControl sx={{ m: 3 }} error={error} variant="standard">
          <FormLabel style={{ color: "black" }} id="demo-error-radios">
            When do you want to invest?
          </FormLabel>
          <hr />

          <RadioGroup
            aria-labelledby="demo-error-radios"
            name="quiz"
            value={value}
            onChange={handleRadioChange}
          >
            {options &&
              options.map((option) => {
                if (option.Coin === Coin.Coin) {
                  return (
                    <div key={option.Key}>
                      <FormControlLabel
                        value={option.Day}
                        control={<Radio />}
                        label={option.Day}
                      />
                    </div>
                  );
                }
              })}
          </RadioGroup>
          {/* <FormHelperText style={{color:"green"}}>{helperText}</FormHelperText> */}
          <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
            Next question👉
          </Button>
        </FormControl>
      </motion.form>
      {Doit === true ? <FormInvestingMoney Day={value} Coin={Coin.Coin} ></FormInvestingMoney> : null}
    </div>
  );
}
