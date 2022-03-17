import React from 'react'
import MenuList from "../../../MenuList";
import {useParams} from 'react-router'
import { useState, useEffect } from "react";
import db from "../../../firebase";
import Individual from './Individual';
function DetailsSocial({user}) {
    const [socialBets, setSocialBets] = useState([]);
    const [socialOptions, setSocialOptions] = useState([]);
    const { id } = useParams()
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


  const ForDetail = (x) => {
      if(x.id === id) {
          return <p>{x.data.Title}</p>
      }
  }

  return (
    <div> <div className="menuScreen less">
      
    <div className="menuScreen__container less2">
      <div className="menuScreen__left">
        <MenuList />
      </div>
      <div className="menuScreen__right">
        <h1 style={{color:'#fff'}}> Details of </h1>
        <div className="menuScreen__category">
            {socialBets && socialBets.map((x)=> ForDetail(x))}
    </div>
      </div>
    </div>
  </div></div>
  )
}

export default DetailsSocial