import React from "react";
import "./CreatePersonalBet.css";
import {motion} from 'framer-motion'
import {Link} from 'react-router-dom'
import { duration } from "@material-ui/core";

function CreatePersonalBet({ setSocialBet, socialBet }) {

    const changeTitle = (e) => {
    const Title = e.target.value;
    setSocialBet({ ...socialBet, Title });
    console.log(socialBet);
  };
  const changeImgUrl = (e) => {
    const ImgUrl = e.target.value;
    setSocialBet({ ...socialBet, ImgUrl });
    console.log(socialBet);
  };
  const changeDescription = (e) => {
    const Description = e.target.value;
    setSocialBet({ ...socialBet, Description });
  };
  const changeMaxPeapol = (e) => {
    const MaxPeapol = e.target.value;
    setSocialBet({ ...socialBet, MaxPeapol });
  };
  const changeTopic = (e) => {
    const Topic = e.target.value;
    setSocialBet({ ...socialBet, Topic });
  };
  return (
    <div className="Total">
      <motion.div
      initial={{x:1000, scale:0}}
      animate={{x:0, scale:1}}
      transition={{duration:1, type:'spring', stiffness:100}}
      className="cpersonal_container">
        <h1>Basic information of the bet!</h1>
        <div className="cpersonal_div">
          <div style={{ display: "flex" }}>
            <input
              onChange={changeTitle}
              type="text"
              placeholder="Bets title"
            />
            
          </div>
          <textarea
            onChange={changeDescription}
            className="cpersonal_description"
            type="text-area"
            placeholder="Bets description"
          />
          <div style={{ display: "flex" }}>
            {" "}
            <input
              onChange={changeMaxPeapol}
              className="cpersonal_small"
              type="number"
              placeholder="Max peapol"
            />
            <input
              onChange={changeTopic}
              style={{ marginLeft: "5%" }}
              className="cpersonal_small"
              type="text"
              placeholder="Topic"
            />
          </div>
          {socialBet.Title &&
          socialBet.Description &&
          socialBet.MaxPeapol &&
          socialBet.Topic ? (
              <Link to='/CreatePersonalBetFinal'>
            <motion.button 
            initial={{x:-10, opacity:0}}
            animate={{x:0, opacity:1}}
            whileHover={{
              scale: 1.2,
              originX: 0,
              boxShadow: "0px 0px 8px #fff",
            }}
            className="cpersonal_button">
              Next page
            </motion.button></Link>
          ) : (
            <></>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default CreatePersonalBet;
