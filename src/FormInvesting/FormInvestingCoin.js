import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import "./FormInvestingCoin.css";
import { motion } from "framer-motion";

//Tryng
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../features/userSlice";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import FormInvestingDay from "./FormInvestingDay"
import { animate } from "popmotion";

export default function FormInvestingCoin() {



  const user = useSelector(selectUser);

 
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [Doit, setDoit] = React.useState(false);
  const [helperText, setHelperText] = React.useState("Chose...");

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(" ");
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value === "Etherum") {
      setHelperText("Perfect✅");
      setError(false);
      setDoit(true);
    } else if (value === "Bitcoin") {
      setHelperText("Perfect✅");
      setError(true);
      setDoit(true);
    } else {
      setHelperText("Please select an option.");
      setError(true);
    }
  };
  
 
  

  return (
    <div className="All">


{/*       Para comprobar si esta logueado
      {!user ? <Redirect to="/account/signin"/> : <></>} */}


      <div className="bg"></div>
      <motion.form
      
        animate={{y:0}}
        initial={{ y: 200 }}
        transition={{ duration: 1 }}
        className="card"
        onSubmit={handleSubmit}
      >
        <FormControl sx={{ m: 3 }} error={error} variant="standard">
          <FormLabel style={{ color: "black" }} id="demo-error-radios">
            In what do you want to invest?
          </FormLabel>
          <hr />

          
          <RadioGroup
            aria-labelledby="demo-error-radios"
            name="quiz"
            value={value}
            onChange={handleRadioChange}
          >
            <FormControlLabel
              value="Bitcoin"
              control={<Radio />}
              label="Bitcoin"
            />
            <FormControlLabel
              value="Etherum"
              control={<Radio />}
              label="Etherum"
            />
          </RadioGroup>
          {/* <FormHelperText style={{color:"green"}}>{helperText}</FormHelperText> */}
          <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
            Next question👉
          </Button>
   
        </FormControl>
      </motion.form>
       {Doit === true ? <FormInvestingDay Coin={value}></FormInvestingDay> : null}
    </div>
  );
}
