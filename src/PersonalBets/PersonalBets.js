import React from "react";
import MenuList from "../MenuList";
import "./PersonalBets.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import undraw_make from "../images/undraw_make.svg";
import { Redirect } from "react-router-dom";

function PersonalBets() {
  const redirectCreate = <Redirect to="/CreatePersonalBet"></Redirect>;
  return (
    <div>
      <div className="menuScreen less">
        <div className="menuScreen__container less2">
          <div className="menuScreen__left">
            <MenuList />
          </div>
          <div className="menuScreen__right">
            <h1 style={{ color: "#fff" }}>😍 Personal Bets</h1>
            <div className="menuScreen__category">
              <div
                style={{ textAlign: "center", marginTop: "2%" }}
                className="upContainer"
              >
                <Link to="/SelectType" className="card1" style={{color:'#FFC0E1'}}>
                  {" "}
                  <motion.div
                    animate={{ x: 0, opacity:1 }}
                    initial={{ x: 20, opacity:0 }}
                    transition={{ type: "spring", duration: 1.5 }}
                  >
                    <motion.div whileHover={{ scale: 1.1, cursor: "pointer" }}>
                      <div className="rigth" style={{ marginLeft: "12%" }}>
                        <h1 style={{ marginBottom: "4%", marginTop: "-2%" }}>
                        🔨Create yor social bet
                        </h1>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Accusantium sint accusamus recusandae optio
                          voluptate alias blanditiis
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                </Link>
                <Link to="/FindBetPage" className="card1" style={{color:'#FFC0E1'}}>
                <motion.div
                  animate={{ x: 0, opacity:1 }}
                  initial={{ x: 20, opacity:0 }}
                  transition={{ type: "spring", duration: 1.2, delay: 0.5 }}
               
                >
                  <motion.div whileHover={{ scale: 1.1, cursor: "pointer" }}>
                    <div className="rigth2" style={{ marginLeft: "14%" }}>
                      <h1 style={{ marginBottom: "4%", marginTop: "-2%" }}>
                      🔎Find yor social bet
                      </h1>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                        Accusantium sint accusamus recusandae optio voluptate
                        alias blanditiis
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
                </Link>
              </div>
              <motion.div
                initial={{ x: 1000, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  type: "spring",
                  delay: 0.6,
                  stiffness: 75,
                }}
                className="train_card3 StyleCards"
              >
                <div className="train_rigth4">
                  <h1>Monthly lotery investing 🗓</h1>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Distinctio, provident debitis, fuga amet quam id porro at
                    dolorem animi totam ab temporibus voluptatum odit quaerat
                    eaque. Perferendis eveniet a ab? Architecto, vel nam autem
                    laudantium enim ad assumenda reprehenderit ipsa veritatis
                    consequuntur laborum iusto, aliquam itaque at? Facere
                    laborum voluptates necessitatibus blanditiis a saepe vitae
                    qui sequi! Placeat, dolores commodi!
                  </p>
                </div>
                <div className="left4">
                  <img src={undraw_make} className="monthly_img" alt="" />
                </div>
              </motion.div>

              {/* Aca es la parte de abajo */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalBets;
