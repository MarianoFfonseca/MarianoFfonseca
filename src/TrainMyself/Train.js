import React from "react";
import MenuHeader from "../MenuHeader";
import MenuList from "../MenuList";
function Train() {
  return (
    <div>
      <div className="menuScreen">
        <MenuHeader />
        <div className="menuScreen__container">
          <div className="menuScreen__left">
            <MenuList />
          </div>
          <div className="menuScreen__right">
            <h1>TrainYoursel</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Train;
