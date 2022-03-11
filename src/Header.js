import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { Example } from "./Example.js";
import SignInButton from "./SignInButton";
import SignUpButton from "./SignUpButton";
import FindAStore from "./FindAStore";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { motion } from "framer-motion";
import LogoutButton from "./LogoutButton";
import modernLoteryLogo from './images/modernLoteryLogo.png'
function Header({ menuPage }) {
  const user = useSelector(selectUser);

  return (
    <div className={`header ${menuPage && "header__menuPage"}`}>
      <div className="header__left">
        <Link className="header__logo" to="/">
          <motion.div
            animate={{ x: 0 }}
            initial={{ x:-100}}
            transition={{ type: "spring", duration: 0.8, stiffness: 150 }}
            whileHover={{ rotate:360, duration:5}}
          >
            <img
            src={modernLoteryLogo}
              // src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png"
               alt=""
            />
          </motion.div>
        </Link>

        <Link to="/menu" className="header__link">
          <motion.div    animate={{ y: 0 }}
            initial={{ y:-100}}
            transition={{duration: 0.3, type: "spring", stiffness: 150 }} whileHover={{ scale: 1.2 }}> Menu</motion.div>
        </Link>
        <Link className="header__link">
          <motion.div animate={{ y: 0 }}
            initial={{ y:-100}}
            transition={{ type: "spring", duration: 0.5, stiffness: 150 }} whileHover={{ scale: 1.2 }}> Rewards</motion.div>
        </Link>
        <Link className="header__link">
          <motion.div animate={{ y: 0 }}
            initial={{ y:-100}}
            transition={{ type: "spring", duration: 0.8, stiffness: 150 }} whileHover={{ scale: 1.2 }}> Gift Cards</motion.div>
        </Link>
      </div>
      <div className="header__right">
        <Example />
        {!user ? (
          <>
            <Link to="/account/signin">
              <motion.div animate={{ x: 0 }} initial={{ x:200}}
            transition={{ type: "spring" , stiffness: 50 }} whileHover={{ scale: 1.5 }}>
              <SignInButton />
              </motion.div>
            </Link>
            <Link to="/account/create">
              <motion.div animate={{ x: 0 }} initial={{ x:200}}
            transition={{ type: "spring", duration: 0.8, stiffness: 50 }} whileHover={{ scale: 1.5 }}>
              <SignUpButton /></motion.div>
            </Link>
          </>
        ) : (
          <div className="header__logout">
            {menuPage ? <motion.div animate={{ x: 0 }} initial={{ x:200}}
            transition={{ type: "spring", duration: 0.8, stiffness: 50 }} whileHover={{scale:1.2}}><LogoutButton /></motion.div>:<motion.div whileHover={{scale:1.2}}><Link to="/menu">Main Page</Link> </motion.div>}
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
