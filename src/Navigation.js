import * as React from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { MenuLink } from "./MenuLink";
import SignInButton from "./SignInButton";
import SignUpButton from "./SignUpButton";
import FindAStore from "./FindAStore";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import LogoutButton from "./LogoutButton";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const variants2 = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};


export const Navigation = ({ toggle }) => {
  const user = useSelector(selectUser);
  const [showMenuCategories, setShowMenuCategories] = React.useState(false);
  const [showAccountCategories, setShowAccountCategories] = React.useState(false);
  const [show ,setShow] = React.useState(true)
useEffect(()=> {
  if(showAccountCategories === true || showMenuCategories === true) {
    setShow(false)
  }
  else if(showAccountCategories === false && showMenuCategories === false) {
    setShow(true)
  }
 
}, [showMenuCategories, showAccountCategories])


  return (
    <>
      {showAccountCategories ? <>    <motion.ul variants={variants}>
          <MenuLink
            link="Back"
            goBackIcon
            onClick={() => {
              setShowAccountCategories(false);
            }}
            width="60%"
          />
          <MenuLink
            link="My Bets"
            path='/about/MyBets'
            onClick={() => {
              setShowAccountCategories(false);
              toggle();
            }}
          />
          <MenuLink
            link="My account"
            path='/about/MyAccount'
            onClick={() => {
              setShowAccountCategories(false);
              toggle();
            }}
          />
        </motion.ul></> : <></>}
      
      {showMenuCategories ? (
        <motion.ul variants={variants}>
          <MenuLink
          
            link="Back"
            goBackIcon
            onClick={() => {
              setShowMenuCategories(false);
            }}
            width="60%"
          />
          <MenuLink
            link="Main menu"
            path='/menu'
            onClick={() => {
              setShowMenuCategories(false);
              toggle();
            }}
          
          />
          <MenuLink
            link="Fast Bet"
            path='/FormCoin'
            onClick={() => {
              setShowMenuCategories(false);
              toggle();
            }}
          />
          <MenuLink
            link="Premade bet"
            path='/PremadeBet'
            onClick={() => {
              setShowMenuCategories(false);
              toggle();
            }}
          />
          <MenuLink
            link="Pack of bets"
            path='/MonthlyBet'
            onClick={() => {
              setShowMenuCategories(false);
              toggle();
            }}
          />
        </motion.ul>
      ) : (
      <></>
      )}

      {show ? (  <motion.ul variants={variants}>
          <MenuLink
            link="Menu"
            icon
            onClick={() => setShowMenuCategories(true)}
          />
          <MenuLink
            link="Account"
            icon
            onClick={() => setShowAccountCategories(true)}
          />
         
          <MenuLink link="Information" path='/HowInvest'/>
          <motion.hr variants={variants2} />
          <motion.div className="navigation__buttons" variants={variants2}>
            {!user ? (
              <>
                <SignInButton />
                <SignUpButton />
              </>
            ) : (
              <LogoutButton />
            )}
          </motion.div>
        </motion.ul>) : <></>}
    </>
  );
};
