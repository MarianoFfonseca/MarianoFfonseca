import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Button.css";
import { Redirect } from "react-router-dom";
function Button({ Text, To, Type, altype }) {
  const [R, setR] = useState(false);

  const Redirection = R === true ? <Redirect to={To}></Redirect> : null;

  return (
    <>
     {Redirection}
        <button class="learn-more" onClick={() => setR(true)} type={altype}>
         
          <span class="circle" aria-hidden="true">
            <span class="icon arrow"></span>
          </span>
          <span class="button-text">{Text} </span>
        </button>
     
    </>
  );
}

export default Button;
