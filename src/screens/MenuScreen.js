import React from "react";
import "./MenuScreen.css";
import MenuHeader from "../MenuHeader";
import MenuList from "../MenuList";
import MenuItem from "../MenuItem";
import menuList from "../menuList.json";
import { Fade } from "react-awesome-reveal";
import BuyBitcoin from '../images/Designer _Flatline.svg'
import Featured from "../Featured";
import MainInvestingPage from "../ForInvesting/MainInvestingPage"
function MenuScreen() {
  return (
    <div className="menuScreen">
      <MenuHeader />
      <div className="menuScreen__container">
        <div className="menuScreen__left">
          <MenuList />
        </div>
        <div className="menuScreen__right">
          <h1>Main page</h1>
          <div className="menuScreen__category">
            <h2>Start investing😁</h2>
            
              <MainInvestingPage></MainInvestingPage>
            
         
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuScreen;
