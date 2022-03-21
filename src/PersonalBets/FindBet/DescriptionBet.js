import React, {useState, useEffect} from "react";
import "./DescriptionBet.css";
import { motion } from "framer-motion";
import {useParams} from 'react-router'
import {Redirect } from 'react-router-dom'
function DescriptionBet({allSocialBets, canJoin,canJoinBet}) {
    const {id} = useParams()

    function ifPrivate(){
      const f = allSocialBets.map(
            (x)=>{
                if(x.id === id) {
                    if(x.State === 'Private' && canJoin === false) {
                       var redireccion = '/ForPrivatesPassword/' + id
                        return <Redirect to={redireccion}></Redirect>
                    }
                    else if (x.State === 'Private' && canJoin === true && canJoinBet !== x.id ) {
                        var redireccion = '/ForPrivatesPassword/' + id
                        return <Redirect to={redireccion}></Redirect>
                    }
                    else if (x.State === 'Public') {
                        console.log('publica or can join')
                    }
                }
            }
        )
        return f;
    }
   

  return (
    <div className="bgg">
        {ifPrivate()}
      <div className="descriptionCard">
        <div className="descriptionContainer">
          <h1>Descipcion de mariano</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum
            nulla exercitationem asperiores, autem dicta quod non eum magni
            sapiente! Unde quis neque pariatur nisi asperiores, deleniti soluta
            vero reprehenderit ut?
          </p>
          <p>created by : marianofonseca</p>
          <motion.button
            whileHover={{
                color: "white",
                backgroundColor: "purple",
                boxShadow: "2px 6px #888888",
              }}
          >Select options for the bet
          </motion.button>
          <motion.button
          style={{marginLeft:'4%'}}
          whileHover={{
            color: "white",
            backgroundColor: "purple",
            boxShadow: "2px 6px #888888",
          }}
          >
            Contact the author
          </motion.button>
        </div>
        <hr style={{ marginTop: "2%" }} />
        <div className="descriptionContainer2">
          <h3>Extra information</h3>
          <p>Users in the bet: 5 </p>
          <p>Price of the bet: Free</p>
          <p>Last day to join: 10/10/2022 </p>
          <p>Day of the bet: 15/10/2022</p>
          <p>State of the bet: Private</p>
        </div>
      </div>
    </div>
  );
}

export default DescriptionBet;
