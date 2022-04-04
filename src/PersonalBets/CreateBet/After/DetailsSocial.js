import React from "react";
import MenuList from "../../../MenuList";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import db from "../../../firebase";
import "./DetailsSocial.css";
import { VscCopy } from "react-icons/vsc";
import { BsWhatsapp, BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import toast, { Toaster } from 'react-hot-toast';
function DetailsSocial() {
  const [socialBets, setSocialBets] = useState([]);
  const [socialOptions, setSocialOptions] = useState([]);
  const { id } = useParams();
  const ForFriends = '/ForPrivatesPassword/' + id;
  const betLotery = () => {
    db.collection("socialBets")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var data = element.data();
          var id = element.id;
          setSocialBets((socialBets) => [
            ...socialBets,
            { data: data, id: id },
          ]);
        });
      });
    db.collection("socialOptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var data = element.data();
          var id = element.id;
          setSocialOptions((socialOptions) => [
            ...socialOptions,
            { data: data, id: id },
          ]);
        });
      });
  };

  useEffect(() => {
    betLotery();
  }, []);

  const copied = () => {
    navigator.clipboard.writeText(ForFriends)
    toast.success('Successfully copied!')
  };

  const ForDetail = (x) => {
    if (x.id === id) {
      return (
        <div key={x.id}>
          <div className="details_card1">
            <h1>{x.data.Title}</h1>
            <p>{x.data.Description}</p>
            <p>Created by {x.data.userEmail}</p>
          </div>
          <div className="details_card2">
            <div className="details_subcard1">
              <h1>Users</h1>
              <p>Users in bet: {x.data.usersInBet.length}</p>
              <p>Max users: {x.data.MaxPeapol}</p>
            </div>
            <div className="details_subcard2">
              <h1>Day</h1>
              <p>Day of the bet: {x.data.FinalDay}</p>
              <p>Last day to join: undefined</p>
            </div>
          </div>
          <div className="details_card3">
            <div className="details_forShare">
              {" "}
              <h1>Share this with your friends</h1>
              <div style={{display:'none'}} className="details_icons">
                <button><BsTwitter /></button>
                <button><BsInstagram></BsInstagram></button>
                <button><BsFacebook></BsFacebook></button>
                <button><BsWhatsapp></BsWhatsapp></button>
              </div>
            </div>
            <div className="details_forLink">
              <button onClick={copied} className="ss">
                <VscCopy size={20} />
                <Toaster />
              </button>
              <input type="" disabled placeholder={ForFriends} />
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      {" "}
      <div className="menuScreen less">
        <div className="menuScreen__container less2">
          <div className="menuScreen__left">
            <MenuList />
          </div>
          <div className="menuScreen__right">
            <h1 style={{ color: "#fff", textAlign:'center' }}> Details </h1>
            <div className="menuScreen__category">
              {socialBets && socialBets.map((x) => ForDetail(x))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsSocial;
