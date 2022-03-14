import React from "react";
import "./CreatePersonalBet.css";
import {motion} from 'framer-motion'
import {Link} from 'react-router-dom'

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
      <div className="cpersonal_container">
        <h1>Create your personal bet</h1>
        <div className="cpersonal_div">
          <div style={{ display: "flex" }}>
            <input
              onChange={changeTitle}
              type="text"
              placeholder="Bets title"
            />
            <input
              onChange={changeImgUrl}
              style={{ marginLeft: "5%" }}
              className="cpersonal_img"
              type="text"
              placeholder="Bets image url"
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
            className="cpersonal_button">
              Next page
            </motion.button></Link>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreatePersonalBet;
