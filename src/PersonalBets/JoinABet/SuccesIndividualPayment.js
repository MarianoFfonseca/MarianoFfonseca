import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import db from "../../firebase";
import { v4 as uuid } from "uuid";
import {useParams} from 'react-router'
import { getAuth } from "firebase/auth";
import { ConnectingAirportsOutlined } from "@mui/icons-material";
function SuccesIndivudualPayment({user, selectedCoinSocialBet, selectedSocialOption}) {
    const {id} = useParams();
    const unique_id = uuid();
    const selectedOption = selectedCoinSocialBet === '' ? selectedSocialOption : selectedCoinSocialBet;
    const FirebaseEasy = () => {
        db.collection("individualSocialBet")
          .doc(unique_id)
          .set({
          userUid:'user.id',
          // selectedOption: selectedOption,
          betId: id
          })
          .then(function () {
            console.log("Value successfully written!");
          })
          .catch(function (error) {
            console.error("Error writing Value: ", error);
          });
      db.collection("socialBets")
          .doc(id)
          .get()
          .then(
            (x)=> {
               const usersInBet =  x.data().usersInBet;
               const profile = getAuth()
               const email = profile.currentUser.email;
           
                console.log('hola')
                const newArray = usersInBet.push(email)
                db.collection("socialBets")
                .doc(id)
                .update({
                 usersInBet : usersInBet
                  })
                  .then(function () {
                    console.log("Value successfully written! 222");
                  })
                  .catch(function (error) {
                    console.error("Error writing Value: ", error);
                  });
               
               

            }
          )
      };
     useEffect(
       ()=> {
        FirebaseEasy();
       }, []
     ) 
  return (
    <div className="Total">
      <motion.div
        initial={{ y: -1000, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 75 }}
        className="succeso_container"
      >
        <h3 className="succeso_h3">😁 Thank you for the bet!</h3>
        <Link to="/MySocialBets">
          <button>Track your bet here!</button>
        </Link>
      </motion.div>
    </div>
  );
}

export default SuccesIndivudualPayment;
