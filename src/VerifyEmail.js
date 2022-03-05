import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { getAuth } from "firebase/auth";

function VerifyEmail() {
  useEffect(() => {
    setUser(getAuth());
    setLoad(true);
  });
  const [user, setUser] = useState([]);
  const [load, setLoad] = useState(false);
  if (load === true) {
    if (user.currentUser) {
      if (user.currentUser.emailVerified) {
        return <Redirect to="/menu"></Redirect>;
      }
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "5%" }}>
      We sent an email to you!, verify this for continue!
      <p>Refresh the page when you are done</p>
    </div>
  );
}

export default VerifyEmail;
