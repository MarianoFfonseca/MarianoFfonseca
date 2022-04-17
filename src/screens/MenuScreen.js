import React, { useState } from "react";
import "./MenuScreen.css";
import MenuHeader from "../MenuHeader";
import MenuList from "../MenuList";
import MenuItem from "../MenuItem";
import menuList from "../menuList.json";
import { Fade } from "react-awesome-reveal";
import BuyBitcoin from "../images/Designer _Flatline.svg";
import Featured from "../Featured";
import MainInvestingPage from "../ForInvesting/MainInvestingPage";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { Redirect } from "react-router-dom";
function MenuScreen() {
  const user = getAuth()
  const Name = user.currentUser.displayName
  return (
    <div className="menuScreen">
      <div className="menuScreen__container">
        <div className="menuScreen__left">
          <MenuList />
        </div>
        <div className="menuScreen__right">
          <h1>👋 Welcome {Name}!</h1>
          <div className="menuScreen__category">
    
            <MainInvestingPage></MainInvestingPage>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuScreen;
