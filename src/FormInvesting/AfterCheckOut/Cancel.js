import React from 'react'
import { motion } from "framer-motion"
import Bitcoin_Outline from '../../images/Bitcoin _Outline.svg'
import { Fade } from "react-awesome-reveal";
import CancelImg from "../../images/cancelImg.svg"
import "./Cancel.css"
import db from "../../firebase";
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'

function Cancel() {

  const user = useSelector(selectUser);
 

  //Obtener las apuestas
  const betLotery = () => {
    db.collection("bets")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var data = element.data();
          var id = element.id;
          setBets((bets) => [...bets,  {
            data: data,
            id: id,
          }]);
        
        });
      });
  };

  const [bets, setBets] = useState([]);

  //Filtrar las que hiso el usuario y las que no estan pagadas

  function filterBets() {
    bets.map((bet) => {
      if (bet.data.userEmail === user.email && bet.data.payment === false) {
        db.collection("bets")
          .doc(bet.id)
          .delete()
          .then(function () {
          })
          .catch(function (error) {
            console.error("Error writing Value: ", error);
          });
      }
    });
  }
  filterBets();
  //Cambiar el false por un true

  useEffect(() => {
    betLotery();
  }, []);
  //Aca que se borre el documento de firebase
//   db.collection("bets").doc(user.email).delete().then(() => {
//     console.log("Document successfully deleted!");
// }).catch((error) => {
//     console.error("Error removing document: ", error);
// });


  return (
    <div>
        <Fade>
        <div className="homeScreen__bottomm">
          <motion.div
            className="homeScreen__bottomLeftt">
            <h1 style={{color:"firebrick"}}>You cancel the payment</h1>
            <p>
              The Starbucks Foundation awarded grants to over 400 nonprofits
              serving communities of color. Recipients were nominated by
              Starbucks partners (employees).
            </p>
            <p>Track your bet 👉 <a href=""> here</a> 👈</p>
            <button>Menu</button>
          </motion.div>
          <div className="homeScreen__bottomRight">

            <motion.img
              animate={{ y: 25}}
              initial={{ y: -30 }}
              transition={{ yoyo: Infinity, duration: 2 }}
             
              src={CancelImg}
              alt="Image of bitcoin"
            />

          </div>
        </div>
      </Fade>

    </div>
  )
}

export default Cancel;