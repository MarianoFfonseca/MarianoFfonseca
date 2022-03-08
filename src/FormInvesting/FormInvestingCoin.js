import * as React from "react";
import "./FormInvestingCoin.css";
import { motion } from "framer-motion";
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";

import FormInvestingDay from "./FormInvestingDay";

export default function FormInvestingCoin({ setCoin, bet }) {

  const [value, setValue] = React.useState("Etherum");
  const [Doit, setDoit] = React.useState(false);
  const coins = ["Etherum", "Bitcoin"];
  return (
    <div className="Total">
      {/*       Para comprobar si esta logueado
      {!user ? <Redirect to="/account/signin"/> : <></>} */}
      <div className="FormInvesting_card">
        <h3>In what Coin do you wanna make this bet <h3 style={{display:'flex', fontSize:'15px', color:'gray'}}>- Info</h3></h3>
        <div style={{ marginTop: "5%" }}>
          {coins.map((coin) => {
            let spanClass = bet.Coin === coin ? "active" : "";
            return (
              <motion.li  whileHover={{
                scale: 1.4,
                originX: 0
              }} className="li" key={coin} onClick={() => setCoin(coin)}>
                <span className={spanClass}>{coin}</span>
              </motion.li>
            );
          })}
        </div>
        {bet.Coin && (
          <Link to='/formDay'>
          <motion.button
            transition={{type:'spring'}}
            initial={{ x:'-1000px' }}
            animate={{ x: 0 }}
            whileHover={{
              scale: 1.2,
              originX: 0,
              boxShadow: "0px 0px 8px #fff",
            }}
            style={{color:'white'}}
          >
            Next Question
          </motion.button>
          </Link>
        )}
      </div>
     
    </div>
  );
}
