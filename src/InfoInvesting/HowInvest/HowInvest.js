import React, { useState } from "react";
import MenuList from "../../MenuList";
import MenuHeader from "../../MenuHeader";
import {motion} from 'framer-motion'
import { useEffect } from "react";
import "./HowInvest.css";
import db from "../../firebase";
function HowInvest() {
  const [texts, setTexts] = useState([]);
  const GetText = () => {
    db.collection("WebText")
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
  console.log(texts);

  return (
    <div className="menuScreen">
      <MenuHeader />
      <div className="menuScreen__container">
        <div className="menuScreen__left">
          <MenuList></MenuList>
        </div>
        <div>
          <div className="menuScreen__right">
            <h1 style={{ fontSize: "50px"}}>📖How to invest</h1>
            <div className="menuScreen__category">
              <div className="howinvest_container">
                {texts &&
                  texts.map((t) => {
                    return (
                      <motion.div   style={{position:'relative', maxWidth:'1200px'}}>
                        <motion.h1  animate={{ x: 0 }}
                      initial={{ x: 1000 }}
                      transition={{ type: "spring", duration: 0.8, stiffness: 70 }} style={{ marginTop: "5%" }}>{t.Title}</motion.h1>
                        <motion.p  animate={{ x: 0 }}
                      initial={{ x: 1000 }}
                      transition={{ type: "spring", duration: 0.8, delay:0.2, stiffness: 70 }}>{t.text}</motion.p>
                     
                      </motion.div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowInvest;
