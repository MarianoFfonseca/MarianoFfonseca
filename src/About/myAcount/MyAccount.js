import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import db from "../../firebase";
import { useState, useEffect } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import MenuHeader from "../../MenuHeader";
import MenuList from "../../MenuList";
import "./MyAccount.css";
import { motion } from "framer-motion";
function MyAccount() {
  const HandleChangeName = (e) => {
    setName(e.target.value);
  };
  const setNewName = (e) => {
    e.preventDefault();
    Users.map((x) => {
      if (x.email === user.email) {
        db.collection("users")
          .doc(x.uid)
          .get()
          .then((snapshot) => {
            db.collection("users")
              .doc(x.uid)
              .update({
                name: Name,
              })
              .then(function () {
                console.log("succes Users");
                alert("Name Changed, refresh the page!");
              })
              .catch(function (error) {
                console.error("Error writing Users ", error);
              });
          });
      }
    });
  };
  const ariaLabel = { "aria-label": "description" };
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
  const [Users, setUsers] = useState([]);
  const user = useSelector(selectUser);
  const [Name, setName] = useState("");

  const ResetPassword = (e) => {
    e.preventDefault();
    const auth = getAuth();
    const email = user.email;
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Email Sended!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  useEffect(() => {
    FUsers();
  }, []);
  return (
    <div>
      {/* onClick={() => {navigator.clipboard.writeText(x.uid) alert("copied!")}} */}
      <div className="menuScreen">
        
        <div className="menuScreen__container">
          <div className="menuScreen__left">
            <MenuList />
          </div>
          <div className="menuScreen__right">
            <h1>😲 My Account</h1>
            <div className="menuScreen__category">
              <form>
                {Users &&
                  Users.map((x) => {
                    if (x.email === user.email) {
                      console.log(x);
                      return (
                        <div key={x.uid}>
                          <motion.div
                            animate={{ y: 0 }}
                            initial={{ y: 1000 }}
                            transition={{ type: "spring", duration: 1.5 }}
                            className="myaccount_card1 StyleCards"
                          >
                            <div className="myaccount_cardup  responsive">
                              <div style={{ width: "50%" }}>
                                <p>📜Name:</p>
                                <motion.h1
                                  onClick={() => {
                                    navigator.clipboard.writeText(x.name);
                                  }}
                                  whileHover={{ cursor: "pointer" }}
                                  style={{ marginTop: "5%" }}
                                >
                                  {x.name}
                                </motion.h1>
                              </div>
                              <div>
                                <p>📨Email:</p>
                                <motion.h1
                                  onClick={() => {
                                    navigator.clipboard.writeText(x.email);
                                  }}
                                  whileHover={{ cursor: "pointer" }}
                                  style={{ marginTop: "5%" }}
                                >
                                  {x.email}
                                </motion.h1>
                              </div>
                            </div>
                            <div>
                              <div className="myaccount_carddown responsive">
                                <div style={{ width: "50%" }}>
                                  <p>📌Uid:</p>
                                  <motion.h1
                                    whileHover={{ cursor: "pointer" }}
                                    style={{ marginTop: "1%" }}
                                    onClick={() => {
                                      navigator.clipboard.writeText(x.uid);
                                    }}
                                  >
                                    {x.uid[0]}
                                    {x.uid[1]}
                                    {x.uid[2]}
                                    {x.uid[3]}
                                    {x.uid[4]}
                                    {x.uid[5]}
                                    {x.uid[6]}
                                    {x.uid[7]}
                                    {x.uid[8]}
                                    {x.uid[9]}*****
                                  </motion.h1>
                                </div>
                                <div>
                                  <p>📂N*Bets:</p>
                                  <motion.h1
                                    whileHover={{ cursor: "pointer" }}
                                    style={{ marginTop: "5%" }}
                                    onClick={() => {
                                      navigator.clipboard.writeText(x.bets);
                                    }}
                                  >
                                    #{x.bets}
                                  </motion.h1>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                          {/* Aca es el segundo */}

                          <motion.h1
                            animate={{ x: 0 }}
                            initial={{ x: 1000 }}
                            transition={{
                              type: "spring",
                              delay: 1,
                              duration: 1.5,
                            }}
                            style={{ marginTop: "5%" }}
                          >
                            🔧Change
                          </motion.h1>
                          <div className="myaccount_card2 StyleCards">
                            <div>
                              <p>~ You can change your password</p>
                              <motion.button
                                onClick={ResetPassword}
                                style={{ marginTop: "2%" }}
                                whileHover={{ scale: 1.2, originX: 0 }}
                              >
                                👉change password
                              </motion.button>
                            </div>
                            <div style={{ marginTop: "5%" }}>
                              <p>~ You can change your email</p>
                              <motion.button
                                style={{ marginTop: "2%" }}
                                whileHover={{ scale: 1.2, originX: 0 }}
                              >
                                👉change email
                              </motion.button>
                            </div>
                            <div style={{ marginTop: "5%" }}>
                              <p>~You can change your Name</p>
                              <form style={{ marginTop: "2%" }} action="">
                                <input
                                  onChange={HandleChangeName}
                                  style={{
                                    borderRadius: "30px",
                                    width: "25%",
                                    height: "15px",
                                    padding: "2%",
                                    fontSize: "100%",
                                    borderWidth: "1px",
                                  }}
                                  type="text"
                                />
                                <motion.button
                                  onClick={setNewName}
                                  whileHover={{ scale: 1.2, originX: 0 }}
                                >
                                  set
                                </motion.button>
                              </form>
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
