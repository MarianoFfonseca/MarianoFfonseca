import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import db from "../../firebase";
import { useState, useEffect } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { injected } from "../../Wallet/Connectors";
import MenuList from "../../MenuList";
import "./MyAccount.css";
import { motion } from "framer-motion";
import MetaMask from "../../images/MetaMask.png";
import { useWeb3React } from "@web3-react/core";
import toast, { Toaster } from "react-hot-toast";
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
                toast.success("Name Changed!");
              })
              .catch(function (error) {
                console.error("Error writing Users ", error);
              });
          });
      }
    });
  };
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

  async function connect(e) {
    e.preventDefault();
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
      toast.error("Error!");
    }
  }
  async function disconnect(e) {
    e.preventDefault();
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  useEffect(() => {
    if (active === true) {
      toast.success("Successfully connected!");
    }
    
  }, [active]);

  useEffect(() => {
    FUsers();
    GetNBets();
  }, []);

  const [bets, setBets] = useState([]);
  const [numberBets, setNumberBets] = useState(0);
  const [collectionL, setCollectionL] = useState();

  const GetNBets = () => {
    db.collection("bets")
      .get()
      .then((querySnapshot) => {
        setCollectionL(querySnapshot.size);
        querySnapshot.forEach((element) => {
          var data = element.data();
          setBets((bets) => [...bets, data]);
        });
      });
  };
  useEffect(() => {
    if (bets.length > 0) {
      if (bets.length === collectionL) {
        MyBets();
      }
    }
  }, [bets]);
  const MyBets = () => {
    bets.map((element) => {
      if (element.userEmail === user.email && element.status === "none") {
        setNumberBets((numberBets) => numberBets + 1);
      }
    });
  };
  return (
    <div>
      {/* onClick={() => {navigator.clipboard.writeText(x.uid) alert("copied!")}} */}
      <div className="menuScreen">
        <Toaster />
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
                      return (
                        <div key={x.uid}>
                          <div className="account_card">
                            <div>Name: <p>{x.name}</p></div>
                            <div>
                              Uid: 
                              <p>
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
                              </p>
                            </div>
                            <div className="accountMargin" >Number of bets: <p>#{numberBets}</p></div>
                            <div className="accountMargin" >Email <p>{x.email}</p></div>
                          </div>
                          <div className="addMetamask">
                            <div className="account_1">
                              <h1>Connect Metamask With ModernLotery</h1>
                              <p>
                              Connect your metamask here, this will make the process easier and as for you, we only accept the main etherum network, if you can't connect try to switch to this network!
                              </p>

                              {active ? (
                                <div style={{ marginTop: "5%" }}>
                                  Connected with <b>{account}</b>
                                  <motion.button style={{
                                      display: "block",
                                      marginTop: "2%",
                                    }} onClick={disconnect} initial={{y:10, opacity:0}} animate={{y:0, opacity:1}} className="buttonForm">
                                <span className="spanForm"> Disconect </span>
                              </motion.button>
                                </div>
                              ) : (
                                <motion.button onClick={connect} initial={{y:10, opacity:0}} animate={{y:0, opacity:1}} className="buttonForm">
                                <span className="spanForm"> Connect with Metamask </span>
                              </motion.button>
                              )}
                            </div>
                            <div className="account_2">
                              <img src={MetaMask} alt="" />
                            </div>
                          </div>

                          {/* Aca es el segundo */}
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
