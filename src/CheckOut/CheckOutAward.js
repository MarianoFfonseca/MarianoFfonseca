import React, { useEffect, useState } from "react";
import "./CheckOutAward.css";
import { motion } from "framer-motion";
import db from "../firebase";
import { useParams } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { Redirect } from "react-router-dom";

function CheckOutAward() {
  const { id } = useParams();
  const [bet, setBet] = useState([]);
  const [all, setAll] = useState([]);
  const [inThis, setInThis] = useState(0);
  const getThisBet = () => {
    db.collection("bets")
      .doc(id)
      .get()
      .then((x) => {
        const data = x.data();
        setBet(data);
      });
  };
  const getOtherBets = () => {
    db.collection("bets")
      .get()
      .then((querySnapshot) => {
        // Loop through the data and store
        // it in array to display
        querySnapshot.forEach((element) => {
          var data = element.data();
          setAll((options) => [...options, data]);
        });
      });
  };

  useEffect(() => {
    getOtherBets();
    getThisBet();
  }, []);

  useEffect(() => {
    if (all.length > 0) {
      all.map((element) => {
        const int = parseFloat(element.Money);
        if (element.Day === bet.Day) {
          setInThis((inThis) => inThis + int);
        }
      });
    }
  }, [bet]);

  const [adrrs, setAdrrs] = useState("");
  const [error, setError] = useState("");
  const [ready, setReady] = useState('false');

  const handleChange = (e) => {
    setAdrrs(e.target.value);
  };

  const handleSubmit = () => {
    if (adrrs.length !== 42) {
      setError("Invalid Adress");
    } else if (adrrs.length === 42) {
      db.collection("winnersReward")
        .doc()
        .set({
          award: inThis,
          adrrs: adrrs,
          stat: "noYet",
        })
        .then(() => setReady('true'))
        .catch((err) => console.log(err));
    db.collection('bets')
    .doc(bet.id)
    .update({
        status:'reclamed'
    })
    }

  };

  useEffect(() => {
    if (ready === 'true') {
      toast((t) => (
        <span>
          <p style={{marginTop:'5%'}}>
            {" "}
            Aprroved!, normaly it take from 2 to 10 hours to send te money to
            yours Metamask accont,
          </p>{" "}
       
          <p style={{marginTop:'2%'}}>
            {" "}
           Thanks you so much for participate in the bet!
          </p>{" "}
          <p style={{marginTop:'2%'}}>Congratulations!</p>
          <p><b>ModernLotery</b></p>
          <button style={{marginTop:'2%'}} onClick={() => {
              toast.dismiss(t.id)
              setReady('ready2')
              }}>Dismiss</button>
        </span>
      ));
    }
  }, [ready]);

  const ForR = ready === 'ready2' ? <Redirect to='/about/MyBets'/> : <></>;

  return (
    <div style={{ minHeight: "90vh" }}>
    {ForR}
      <Toaster position="top-center" reverseOrder={false} />
    {ready === 'false' ? <> <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="Award_container"
      >
        <div className="Award_card">
          <h1>Recive your award</h1>
          <hr style={{ marginTop: "2%" }} />
          <p style={{ marginBottom: "2%" }}>
            Select the wallet where u want to recibe the money
          </p>
          <input
            onChange={handleChange}
            name="addr"
            placeholder="Matmask id..."
            type="text"
          />
          <p>
            Complete award: <b style={{ color: "#c6c6c6" }}>{inThis}</b> eth
          </p>
          <button onClick={handleSubmit} type="submit">
            Get Award!
          </button>
          {error === "Invalid Adress" ? (
            <b style={{ display: "block", marginTop: "2%", color: "#ff6666" }}>
              Invalid Adress
            </b>
          ) : (
            <></>
          )}
        </div>
      </motion.div></> : <></>}
    
    </div>
  );
}

export default CheckOutAward;
