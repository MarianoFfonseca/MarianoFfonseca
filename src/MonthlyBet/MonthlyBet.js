import React, { useState, useEffect } from "react";
import MenuHeader from "../MenuHeader";
import MenuList from "../MenuList";
import { motion } from "framer-motion";
import undraw_make from "../images/undraw_make.svg";
import db from "../firebase";
import "./MonthlyBet.css";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";

function MonthlyBet({ setmonthlyBB }) {
  const [texts, setTexts] = useState([]);
  const GetText = () => {
    db.collection("MonthlyInvest_text")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var data = element.data();
          setTexts((texts) => [...texts, data]);
        });
      });
  };
  useEffect(() => {
    GetText();
  }, []);

  const list = {
    while: {
      y: -10,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div>
      <div className="menuScreen">
        <div className="menuScreen__container">
          <div className="menuScreen__left">
            <MenuList />
          </div>
          <div className="menuScreen__right">
            <h1>💫Pack of Bet</h1>
            <div className="menuScreen__category">
              <div className="cardBig">
                <div>
                  <h3 className="h3center">Introduction to Pack of Bet</h3>
                  <p>
                    Basically here you can buy bets which will be saved in a
                    folder, let's say, where you can use them whenever you want,
                    when you use them it will ask you for the day and how much
                    the coin (the bet) will be worth, all bets are on bitcoin
                    and are worth 0.015 ( 50% profit)
                  </p>
                </div>
                <div>
                  <img src={undraw_make} alt="" />
                </div>
              </div>

              <div style={{ marginTop: "3vh" }} className="upContainer2">
                <Link to="/MonthlyBetCheckOut">
                  <motion.div
                    onClick={() => setmonthlyBB("halfYear")}
                    whileHover="while"
                    variants={list}
                    className="cardContainerMont"
                  >
                    <div>
                      <h3
                        style={{ justifyContent: "center" }}
                        className="h3center"
                      >
                        😆Medium Pack (6x)
                        <AiOutlineArrowRight></AiOutlineArrowRight>
                      </h3>
                      <p>
                      Buy the pack of 6 bets, these will be saved in a folder and you can use them whenever you want!  </p>
                    </div>
                  </motion.div>
                </Link>
                <Link to="/MonthlyBetCheckOut">
                  <motion.div
                    onClick={() => setmonthlyBB("fullYear")}
                    whileHover="while"
                    variants={list}
                    className="cardContainerMont"
                  >
                    <div>
                      <h3
                        style={{ justifyContent: "center" }}
                        className="h3center"
                      >
                        🤤Premium Pack (12x)
                        <AiOutlineArrowRight></AiOutlineArrowRight>
                      </h3>
                      <p>
                      Buy the pack of 12 bets and save more, these will be saved in a folder and you can use them whenever you want!
                      </p>
                    </div>
                  </motion.div>
                </Link>
              </div>
              {/* Aca es todo texto */}
              <div className="monthly_txt">
                <h1 style={{ textAlign: "center", fontSize: "5vw" }}>
                  More information
                </h1>
                {texts &&
                  texts.map((x) => {
                    return <p style={{color:'#F0EBE0'}}>{x.text}</p>;
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonthlyBet;
