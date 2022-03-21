import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router";
import { Redirect } from "react-router-dom";
function ForPrivatesPassword({ allSocialBets, setCanJoin, canJoin, setCanJoinBet }) {
  const [password, setPassword] = useState("");
  const [fpassword, setfPassword] = useState("");
  const [submit, setSubmit] = useState(false);
  const { id } = useParams();
  const Submiting = () => {
    setSubmit(true);
    setfPassword(password);
  };
  if (submit === true) {
    allSocialBets.map((x) => {
      console.log(fpassword);
      if (x.id === id && x.Password === fpassword) {
        setCanJoin(true);
        setCanJoinBet(id);
      }
    });
  }
  const MovePage = () => {
    const redireccion = "/DescriptionBet/" + id;
    return <Redirect to={redireccion}></Redirect>;
  };

  return (
    <div>
      {canJoin === true && submit === true ? <>{MovePage()}</> : <></>}
      <div  className="Total">
        <motion.div initial={{y:-1000}} animate={{y:0}} transition={{type:'spring', stiffness:80}} className="findprivateCard">
          <h1>Join to a private bet</h1>
          <input
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password of the bet"
          />
          {submit === true && canJoin === false ? (
            <p style={{ display: "block" }}>Uid or password is incorrect</p>
          ) : (
            <></>
          )}
          {submit === true && canJoin === true ? (
            <p style={{ display: "block" }}>Click again to join</p>
          ) : (
            <></>
          )}
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
        </motion.div>
      </div>
    </div>
  );
}

export default ForPrivatesPassword;
