import React from "react";
import { Link } from "react-router-dom";
import FooterSecondary from "../FooterSecondary";
import "./SignupScreen.css";
import SignupForm from "../SignupForm";
import {motion} from 'framer-motion'
import modernLoteryLogoBlanco from '../images/modernLoteryLogoBlanco.png'
function SignupScreen() {
  return (
    <div className="signupScreen">
      <div className="signupScreen__header">
        <Link to="/">
          <motion.img  animate={{ x: 0 }}
            initial={{ x: -100 }}
            transition={{ type: "spring", duration: 0.8, stiffness: 150 }}
            whileHover={{ rotate: 360 }}
            src={modernLoteryLogoBlanco}
            alt=""
          />
        </Link>
      </div>
      <motion.h1  animate={{ x: 0 }}
            initial={{ x: 1000 }}
            transition={{ type: "spring", duration: 1, stiffness: 75 }} className="signupScreen__heading">Create an account 🙌</motion.h1>
      <div className="signupScreen__rewards">
        <h4>MODERNLOTERY® REWARDS</h4>
        <p>
          Join modernLotery Rewards to earn Stars for free food and drinks, any way
          you pay. Get access to mobile ordering, a birthday Reward, and{" "}
          <Link>more</Link>.
        </p>
      </div>
      <motion.div animate={{ y: 0 }}
            initial={{ y: 1000 }}
            transition={{ type: "spring", duration: 1 }}>
      <SignupForm />
      </motion.div>
      <FooterSecondary alignItems="center" flexDirection="column" />
    </div>
  );
}

export default SignupScreen;
