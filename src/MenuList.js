import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MenuList.css";
import menuList from "./menuList.json";
import { motion } from "framer-motion";
function MenuList() {
  const [open, setOpen] = useState("");
  return (
    <div className="menuList">
      <div className="menuList__container">
        <h4 onClick={() => setOpen("investing")}>~ For investing</h4>
        <div className="menuList__items">
         

              {menuList.map((menuListCategory) =>
                menuListCategory.drinks.map((menuListItem) => (
                  <motion.div
                      key={menuListItem.type}
                    whileHover={{
                      scale: 1.4,
                      originX: 0,
                    }}
                  >
                    <Link className="StyleLi" to={menuListItem.path}>
                      {menuListItem.type}
                    </Link>
                  </motion.div>
                ))
              )}
            
        </div>
      </div>
      <div className="menuList__container">
        <h4 onClick={() => setOpen("personal")} className="StyleLi">
          ~ Personal Bets
        </h4>
        <div className="menuList__items">
        
          {menuList.map((menuListCategory) =>
            menuListCategory.personalBets.map((menuListItem) => (
              <motion.div
                whileHover={{
                  scale: 1.4,

                  originX: 0,
                }}
              >
                <Link className="StyleLi" to={menuListItem.path}>
                  {menuListItem.type}
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </div>
      <div className="menuList__container">
        <h4 onClick={() => setOpen("info")}>~ Info for investing</h4>
        <div className="menuList__items">
          {menuList.map((menuListCategory) =>
            menuListCategory.food.map((menuListItem) => (
              <motion.div
                whileHover={{
                  scale: 1.4,
                  originX: 0,
                }}
              >
                <Link className="StyleLi" to={menuListItem.path}>
                  {menuListItem.type}
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </div>
      <div className="menuList__container">
        <h4 onClick={() => setOpen("about")} className="StyleLi">
          ~ About
        </h4>
        <div className="menuList__items">
          {menuList.map((menuListCategory) =>
            menuListCategory.atHomeCoffee.map((menuListItem) => (
              <motion.div
                whileHover={{
                  scale: 1.4,

                  originX: 0,
                }}
              >
                <Link className="StyleLi" to={menuListItem.path}>
                  {menuListItem.type}
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default MenuList;
