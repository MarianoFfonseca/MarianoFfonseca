import React, { useState, useEffect } from "react";
import "./DescriptionBet.css";
import { motion } from "framer-motion";
import { useParams } from "react-router";
import { Redirect, Link } from "react-router-dom";
import db from "../../firebase";

function DescriptionBet({ allSocialBets, canJoin, canJoinBet, user }) {
  const { id } = useParams();
  const redirecionOpciones = "/SelectOptionsBet/" + id;
 
 /// Check if it is private
  function ifPrivate() {
    const f = allSocialBets.map((x) => {
      if (x.id === id) {
        if (x.State === "Private" && canJoin === false ) {
          var redireccion = "/ForPrivatesPassword/" + id;
          return <Redirect to={redireccion}></Redirect>;
        }else if (x.State === "Private" && canJoin === true && canJoinBet === x.id){ 
          const IfIDid = x.usersInBet.map((y) => {
            if (y === user.email) {
              const Reddireccion = '/MySocialBets/details/' + id
              return <Redirect to={Reddireccion}></Redirect>
            }
          });
          return IfIDid;
        } else if (x.State === "Public") {
          
          const IfIDid = x.usersInBet.map((y) => {
            if (y === user.email) {
              const Reddireccion = '/MySocialBets/details/' + id
              return <Redirect to={Reddireccion}></Redirect>
            }
          });
          return IfIDid;
        }
        
      }
    });
    return f;
  }

  // For get the bet
  const [thisBet, setThisBet] = useState([])

  function Get() {
    db.collection('socialBets')
    .doc(id)
    .get()
    .then(
   (x)=>{
        const data = x.data()
        setThisBet(data)
      }
    )
  }
  useEffect(
    ()=> {
      Get()
    }, []
  )
    //Numero de usuarios
  const Nuser = thisBet.usersInBet ?  thisBet.usersInBet.length : null;

  return (
    <div className="bgg">
      {ifPrivate()}
      <motion.div
        initial={{ x: 1000 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 50, duration: 1 }}
        className="descriptionCard"
      >
        <div className="descriptionContainer">
          <h1>{thisBet.Title}</h1>
          <p>
          {thisBet.Description}
          </p>
          <p>created by : {thisBet.userEmail}</p>
          <Link to={redirecionOpciones}>
            {" "}
            <motion.button
              className="descriptionButton"
              whileHover={{
                boxShadow: "2px 6px #888888",
              }}
            >
              Select options for the bet
            </motion.button>
          </Link>
          <motion.button
            style={{ marginLeft: "4%" }}
            className="descriptionButton"
            whileHover={{
              boxShadow: "2px 6px #888888",
            }}
          >
            Contact the author
          </motion.button>
        </div>
        <hr style={{ marginTop: "2%" }} />
        <div className="descriptionContainer2">
          <h3>Extra information</h3>
          <p>Users in the bet:  {Nuser}</p>
          <p>Price of the bet: ${thisBet.Price}</p>
          <p>Last day to join: 10/10/2022 </p>
          <p>Day of the bet: {thisBet.FinalDay}</p>
          <p>State of the bet: {thisBet.State}</p>
          {thisBet.State === 'Public' ?
           <>
           <p>Coin of the bet:  {thisBet.Coin}</p>
          </> : <>
          <p>Topic of the bet: {thisBet.Topic}</p>
          </>}
        </div>
      </motion.div>
    </div>
  );
}

export default DescriptionBet;
