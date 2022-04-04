import React from "react";
import { motion } from "framer-motion";
import Bitcoin_Outline from "../../images/Bitcoin _Outline.svg";
import { Fade } from "react-awesome-reveal";
import SuccesImg from "../../images/SuccesImg.svg";
import "./Succes.css";
import db from "../../firebase";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import {Link} from 'react-router-dom'
function Succes() {
  //User
  const user = useSelector(selectUser);
  
  //Obtener las apuestas
  const betLotery = () => {
    db.collection("bets")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var data = element.data();
          var id = element.id;
          setBets((bets) => [
            ...bets,
            {
              data: data,
              id: id,
            },
          ]);
        });
      });
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var data = element.data();
          var id = element.id;
          setUsers((users) => [
            ...users,
            {
              data: data,
              id: id,
            },
          ]);
        });
      });
  };

  const [bets, setBets] = useState([]);
  const [users, setUsers] = useState([]);
  const [userBets, setUserBets] = useState([]);


  //Filtrar las que hiso el usuario y las que no estan pagadas

  function filterBets() {
    bets.map((bet) => {
      if (bet.data.userEmail === user.email || bet.data.payment === false) {
        db.collection("bets")
          .doc(bet.id)
          .update({
            payment: true,
          })
          .then(function () {})
          .catch(function (error) {
            console.error("Error writing Value: ", error);
          });
      }
    });
  }
  function setBetUser() {
    users.map((fUser) => {
      if (fUser.data.email === user.email) {
        db.collection("users")
          .doc(fUser.data.uid)
          .get()
          .then((snapshot) => {
            const UserBets =  snapshot.data().bets
            db.collection("users")
            .doc(fUser.data.uid)
            .update({
              bets: UserBets + 1,
            })
            .then(function () {
              console.log("succes Users");
            })
            .catch(function (error) {
              console.error("Error writing Users ", error);
            });
          });
      }
    });
  }
  setBetUser();
  filterBets();
  //Cambiar el false por un true

  useEffect(() => {
    betLotery();
  }, []);
  return (
    <div className="Total">
      <Fade>
        <div  className="homeScreen__bottomm  ">
          <motion.div className="homeScreen__bottomLeftt">
            <h1>The payment was made successfully</h1>
            <p>
              The Starbucks Foundation awarded grants to over 400 nonprofits
              serving communities of color. Recipients were nominated by
              Starbucks partners (employees).
            </p>
            <p>
              Track your bet 👉 <Link to='/about/Mybets' style={{color:'white'}}> here</Link> 👈
            </p>
            <Link to='/menu' style={{color:'white'}}><button>Menu</button></Link>
          </motion.div>
          <div className="homeScreen__bottomRight">
            <motion.img
              animate={{ y: 25 }}
              initial={{ y: -30 }}
              transition={{ yoyo: Infinity, duration: 2 }}
              src={SuccesImg}
              alt="Image of bitcoin"
            />
          </div>
        </div>
      </Fade>
    </div>
  );
}

export default Succes;
