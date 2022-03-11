import React from "react";
import MyBetsMain from "./MyBetsMain";
import MyLastsBets from "./MyLastsBets";
import MenuList from "../../MenuList";
import MenuHeader from "../../MenuHeader";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import {motion } from 'framer-motion'
import db from "../../firebase";
import { useState, useEffect } from "react";
import MyMonthlyBets from "./MyMonthlyBets";
function MyBets({setmonthlyId}) {
  //for the user
  const user = useSelector(selectUser);
  const [Users, setUsers] = useState([]);
  console.log(Users);

  const FUsers = () => {
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var data = element.data();
          setUsers((Users) => [...Users, data]);
        });
      });
  };

  useEffect(() => {
    FUsers();
  }, []);

  return (
    <div className="menuScreen">
      <MenuHeader />
      <div className="menuScreen__container">
        <div className="menuScreen__left">
          <MenuList />
        </div>
        <div style={{}}>
          {Users &&
            Users.map((fUsers) => {
              console.log(fUsers)
              console.log(user)
              console.log('here')
              if (fUsers.email === user.email) {
                if (fUsers.bets === 0) {
                  return <div>
                    <h1>You dont have any bet yet, let start!</h1>
                  </div>;
                } else {
                  return (
                    <div>
                      <div>
                      <h1 style={{ fontSize: "50px" }}>
                      📂Your Active Bets
                      </h1>
                      <motion.div initial={{x:1500}} animate={{x:0}} transition={{type:'spring', stiffness:75, duration:1.5}} >
                      <MyBetsMain></MyBetsMain>
                      </motion.div>
                      </div>
                      <div style={{marginBottom:'15%'}}>
                      <h1 style={{ fontSize: "50px", marginTop: "15%" }}>
                      📑Your Lasts Bets
                      </h1>
                      <motion.div initial={{x:1500}} animate={{x:0}} transition={{type:'spring', delay:0.2, stiffness:75, duration:1.5}}>
                      <MyLastsBets></MyLastsBets>
                      </motion.div>
                      </div>
                      <div style={{marginBottom:'15%'}}>
                      <h1 style={{ fontSize: "50px", marginTop: "15%" }}>
                      📑Your Monthly Bets
                      </h1>
                      <motion.div initial={{x:1500}} animate={{x:0}} transition={{type:'spring', delay:0.2, stiffness:75, duration:1.5}}>
                      <MyMonthlyBets  setmonthlyId={setmonthlyId}></MyMonthlyBets>
                      </motion.div>
                      </div>
                    </div>
                  );
                }
              }
            })}
        </div>
      </div>
    </div>
  );
}

export default MyBets;
