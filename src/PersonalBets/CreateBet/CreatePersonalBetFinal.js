import React from "react";
import "./CreatePersonalBet.css";
import { motion } from "framer-motion";
import "./CreatePersonalBetFinal.css";
function CreatePersonalBetFinal({ setSocialBet, socialBet }) {
  const changeState = (e) => {
    const State = e.target.value;
    setSocialBet({ ...socialBet, State });
  };
  console.log(socialBet)
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
        <h1>One more step</h1>
        <div className="cpersonal_div">
          <form className="cpersonal_form" action="" method="post">
           <div> <input
              type="radio"
              name="joke"
              id="pri"
              onChange={changeState}
              value="private"
            />{" "}
            <label htmlFor="pri"> Private</label></div>
            <div>
            <input
              type="radio"
              name="joke"
              onChange={changeState}
              value="public"
              id="Public"
            />{" "}
            <label htmlFor="Public"> Public</label></div>
          </form>
          {socialBet.Title &&
          socialBet.Description &&
          socialBet.MaxPeapol &&
          socialBet.Topic ? (
            <motion.button
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="cpersonal_button"
            >
              Next page
            </motion.button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreatePersonalBetFinal;
