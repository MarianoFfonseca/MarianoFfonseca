import React from "react";
import { Link } from "react-router-dom";
import "./MenuList.css";
import menuList from "./menuList.json";
import { motion } from "framer-motion";
function MenuList() {
  return (
    <div className="menuList">
      <div className="menuList__container">
        <h4>~ For investing</h4>
        <div className="menuList__items">
          {menuList.map((menuListCategory) =>
            menuListCategory.drinks.map((menuListItem) => (
              <motion.div
                whileHover={{
                  scale: 1.4,
                  originX: 0,
                }}
              >
                <Link to={menuListItem.path}>{menuListItem.type}</Link>
              </motion.div>
            ))
          )}
        </div>
      </div>
      <div className="menuList__container">
        <h4>~ Info for investing</h4>
        <div className="menuList__items">
          {menuList.map((menuListCategory) =>
            menuListCategory.food.map((menuListItem) => (
              <motion.div
                whileHover={{
                  scale: 1.4,
                  originX: 0,
                }}
              >
                <Link to={menuListItem.path}>{menuListItem.type}</Link>
              </motion.div>
            ))
          )}
        </div>
      </div>
      <div className="menuList__container">
        <h4>~ About</h4>
        <div className="menuList__items">
          {menuList.map((menuListCategory) =>
            menuListCategory.atHomeCoffee.map((menuListItem) => (
              <motion.div
                whileHover={{
                  scale: 1.4,
                  
                  originX: 0,
                }}
              >
                <Link to={menuListItem.path}>{menuListItem.type}</Link>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default MenuList;
