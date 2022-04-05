import React from "react";
import { motion } from "framer-motion";

import "./Succes.css";
import db from "../../firebase";
import { useState, useEffect } from "react";

import {Link} from 'react-router-dom'
function Succes() {
  //User

  useEffect(() => {
    betLotery();
  }, []);
  return (
    <div className="Total">
    
    </div>
  );
}

export default Succes;
