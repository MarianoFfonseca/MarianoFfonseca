import React from "react";
import MyBetsMain from "./MyBetsMain";
import MyLastsBets from "./MyLastsBets";
import MenuList from "../../MenuList";
import MenuHeader from "../../MenuHeader";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import {Link} from 'react-router-dom'
function MyBets() {
  return (
    <div className="menuScreen">
      <MenuHeader />
      <div className="menuScreen__container">
        <div className="menuScreen__left">
          <MenuList />
        </div>
        
        <div style={{ margin: "5%", marginLeft: "15%" }}>
        <Alert severity="info">Now you can analize your bets <strong> <Link to='/about/Analisis'>check it out !</Link></strong></Alert>
          <h1 style={{ fontSize: "50px", marginTop: '5%' }}>Your Bets</h1>
          <MyBetsMain></MyBetsMain>

          <hr style={{ fontSize: "50px", marginTop: "5%" }} />
          <h1 style={{ fontSize: "50px", marginTop: "5%" }}>Your Lasts Bets</h1>
          <MyLastsBets></MyLastsBets>
        </div>
      </div>
    </div>
  );
}

export default MyBets;
