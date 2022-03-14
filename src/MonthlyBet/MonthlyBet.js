import React, { useState, useEffect } from "react";
import MenuHeader from "../MenuHeader";
import MenuList from "../MenuList";
import { motion } from "framer-motion";
import undraw_make from "../images/undraw_make.svg";
import db from "../firebase";
import "./MonthlyBet.css";
import {Link} from 'react-router-dom'
function MonthlyBet({setmonthlyBB}) {
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
  return (
    <div>
      <div className="menuScreen">
        
        <div className="menuScreen__container">
          <div className="menuScreen__left">
            <MenuList />
          </div>
          <div className="menuScreen__right">
            <h1>💫Monthly Bet</h1>
            <div className="menuScreen__category">
              <motion.div initial={{x:1000}} animate={{x:0}} transition={{duration:0.8, type:'spring', stiffness:75}} className="train_card3 StyleCards">
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
                  <img className="monthly_img" src={undraw_make} alt="" />
                </div>
              </motion.div>

                {/* Aca es la parte de abajo */}

              <div style={{textAlign:'center', marginTop:'2%'}} className="upContainer">
                <motion.div
                  animate={{ x: 0 }}
                  initial={{ x: 1000 }}
                  transition={{ type: "spring", duration: 1.5 }}
                  className="card1"
                  
                >
                  <div className="rigth" style={{marginLeft:'12%'}}>
                    <h1 style={{marginBottom:'4%'}}>😆Half of year $14/month</h1>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Accusantium sint accusamus recusandae optio voluptate
                      alias blanditiis
                    </p>
                    <Link to='/MonthlyBetCheckOut'>
                    <motion.button onClick={()=>setmonthlyBB('halfYear')} style={{marginBottom:'4%'}} whileHover={{ scale: 1.2}}>
                    subscription👈
                    </motion.button></Link>
                  </div>
                </motion.div>
                <motion.div
                  animate={{ x: 0 }}
                  initial={{ x: 1000 }}
                  transition={{ type: "spring", duration: 1.2, delay: 0.5 }}
                  className="card1"
                >
                  <div className="rigth2" style={{marginLeft:'14%'}}>
                    <h1 style={{marginBottom:'4%'}}>🤤Full year $10/month</h1>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit
                      Accusantium sint accusamus recusandae optio voluptate
                      alias blanditiis
                    </p>
                    <Link to='/MonthlyBetCheckOut'>
                    <motion.button onClick={()=>setmonthlyBB('fullYear')} whileHover={{ scale: 1.2}}>
                    subscription👈
                    </motion.button></Link>
                  </div>
                </motion.div>
              </div>
            {/* Aca es todo texto */}
                    <div style={{marginTop:'5%'}}>
                        <h1 style={{textAlign:'center', fontSize:'50px'}}>More information</h1>
                        {texts && texts.map((x) => {
                            return (<p style={{textAlign:'center', marginTop:'2%', maxWidth:'800px', fontSize:'20px', marginLeft:'20%'}}>{x.text}</p>)
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
