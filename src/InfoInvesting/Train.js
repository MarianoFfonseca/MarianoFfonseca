import React from "react";
import MenuHeader from "../MenuHeader";
import MenuList from "../MenuList";
import { motion } from "framer-motion";
import undraw_online from "../images/undraw_online.svg";
import undraw_online_learning from '../images/undraw_online_learning.svg'
import undraw_education from '../images/undraw_education.svg'
import "./Train.css";
function Train() {
  return (
    <div>
      <div className="menuScreen">

        <div className="menuScreen__container">
          <div className="menuScreen__left">
            <MenuList />
          </div>
          <div className="menuScreen__right">





            
            <h1>🤓Train Yoursel</h1>
            <div>
              <motion.div initial={{x:500, opacity:0}} animate={{x:0, opacity:1}} transition={{ type:"spring", stiffness:75}} className="train_card3 StyleCards">
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
                  <motion.button whileHover={{ scale: 1.2, originX: 0 }}>
                    See plans
                  </motion.button>
                  <motion.button
                    style={{ marginLeft: 30 }}
                    whileHover={{ scale: 1.2, originX: 0 }}
                  >
                    More info
                  </motion.button>
                </div>
                <div className="left4">
                  <img className="trian_img" src={undraw_online} alt="" />
                </div>
              </motion.div>
              <motion.div initial={{x:500, opacity:0}} animate={{x:0, opacity:1}} transition={{ delay:0.5, type:"spring", stiffness:75}} className="train_card3 StyleCards" >
                <div className="left4 secondOne">
                  <img className="trian_img" src={undraw_online_learning} alt="" />
                </div>
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
                  <motion.button whileHover={{ scale: 1.2, originX: 0 }}>
                    See plans
                  </motion.button>
                  <motion.button
                    style={{ marginLeft: 30 }}
                    whileHover={{ scale: 1.2, originX: 0 }}
                  >
                    More info
                  </motion.button>
                </div>
              </motion.div>
              <motion.div style={{marginBottom:'7%'}} className="train_card3 StyleCards">
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
                  <motion.button whileHover={{ scale: 1.2, originX: 0 }}>
                    See plans
                  </motion.button>
                  <motion.button
                    style={{ marginLeft: 30 }}
                    whileHover={{ scale: 1.2, originX: 0 }}
                  >
                    More info
                  </motion.button>
                </div>
                <div className="left4">
                  <img className="trian_img" src={undraw_education} alt="" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Train;
