import React, { useState, useEffect } from "react";
import "./FindPrivateBet.css";
import db from "../../firebase";
import { Redirect } from "react-router-dom";
import { motion } from "framer-motion";
function FindPrivateBet({setCanJoin, setCanJoinBet}) {
  const [uid, setUid] = useState();
  const [password, setPassword] = useState();
  const [fuid, setfUid] = useState();
  const [fpassword, setfPassword] = useState();
  const [submit, setSubmit] = useState(false);
  //Todas las apuestas, todas las opciones
  const [apuestas, setApuestas] = useState([]);
  const [opciones, setOpciones] = useState([]);
  const apuestasLotery = () => {
    db.collection("socialBets")
      .get()
      .then((querySnapshot) => {
        // Loop through the data and store
        // it in array to display
        querySnapshot.forEach((element) => {
          var data = element.data();
          setApuestas((apuestas) => [...apuestas, data]);
        });
      });
  };

  const opcionesLotery = () => {
    db.collection("socialOptions")
      .get()
      .then((querySnapshot) => {
        // Loop through the data and store
        // it in array to display
        querySnapshot.forEach((element) => {
          var data = element.data();
          setOpciones((opciones) => [...opciones, data]);
        });
      });
  };
  useEffect(() => {
    apuestasLotery();
    opcionesLotery();
  }, []);
  const Verify = () => {
    if (submit === true) {
      const redireccionar =
        apuestas &&
        apuestas.map((x) => {
          if (x.State === "Private") {
            if (x.id === fuid && fpassword === x.Password) {
              setCanJoin(true);
              setCanJoinBet(x.id)
              const Redireccion = '/DescriptionBet/' + x.id;
              return <Redirect to={Redireccion}></Redirect>;
            }
          }
        });
      return redireccionar;
    }
  };
  const Submiting = () => {
    setSubmit(true)
    setfUid(uid)
    setfPassword(password) 
  }
  return (
    <div>
      <div className="Total">
        <motion.div initial={{y:-1000}} animate={{y:0}} transition={{type:'spring', stiffness:80}} className="findprivateCard">
          <h1>Join to a private bet</h1>
          <input
            type="text"
            onChange={(e) => setUid(e.target.value)}
            placeholder="Uid of the bet"
          />
          <input
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password of the bet"
          />
          {submit === true ? <p style={{display:'block'}}>Uid or password is incorrect</p> : <></>}
          <motion.button
            whileHover={{
              color: "white",
              backgroundColor: "purple",
              boxShadow: "2px 6px #888888",
            }}
            onClick={Submiting}
          >
            Join!
          </motion.button>
          {Verify()}
        </motion.div>
      </div>
    </div>
  );
}

export default FindPrivateBet;
