import * as React from "react";
import "../../FormInvesting/FormInvestingCoin.css";
import { motion } from "framer-motion";
import {
  Link
} from "react-router-dom";

export default function SelectType({ setSocialBet, socialBet }) {
 console.log(socialBet)

  const coins = ["Private", "Public"];
  return (
    <div className="Total"> 
     
      <motion.div
        transition={{ type: "spring", duration: 2 }}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="FormInvesting_card"
      >
        <h3>
          How you want this bet?
          <h3 style={{ display: "flex", fontSize: "15px", color: "gray" }}>
            - Info
          </h3>
        </h3>
        <div style={{ marginTop: "10%" }}>
          {coins.map((coin) => {
            let spanClass = socialBet.State === coin ? "active" : "";
            let State = coin;
            return (
              <motion.li
                whileHover={{
                  scale: 1.4,
                  originX: 0,
                }}
                className="li"
                key={coin}
                onClick={()=>setSocialBet({...socialBet, State})}
              >
                <span className={spanClass}>{coin}</span>
              </motion.li>
            );
          })}
        </div>
      
          <Link to="/CreatePersonalBet">
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
      
      </motion.div>
    </div>
  );
}
