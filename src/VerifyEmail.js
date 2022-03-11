import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { getAuth } from "firebase/auth";
import "./VerifyEmail.css";
import { motion } from "framer-motion";
function VerifyEmail() {
  useEffect(() => {
    setUser(getAuth());
    setLoad(true);
  });
  const [user, setUser] = useState([]);
  const [load, setLoad] = useState(false);
  console.log(user);
  if (load === true) {
    if (user.currentUser) {
      if (user.currentUser.emailVerified) {
        return <Redirect to="/menu"></Redirect>;
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ x: "90%", opacity: 1 }}
      className="verify_div"
    >
      We sent an email to your email! Verify this for continue!
      <p>Refresh the page when you are done!</p>
    </motion.div>
  );
}

export default VerifyEmail;
