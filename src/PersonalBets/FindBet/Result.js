import React, { useEffect } from "react";
import "./GlobalSerch.css";
import { BsFillPersonFill } from "react-icons/bs";
import { FaMoneyBillAlt } from "react-icons/fa";
import { FaCalendarDay } from "react-icons/fa";
import { RiGitRepositoryPrivateLine } from "react-icons/ri";
import { Link } from "react-router-dom";
function Result({ element, setFirst }) {
  useEffect(() => {
    setFirst(true);
  }, []);
  const redireccion = "/DescriptionBet/" + element.id;
  return (
    <div className="result_card">
      <div style={{ marginTop: "0%" }} className="upPart">
        <h1>{element.Title}</h1>
        <p>by: {element.userEmail}</p>
      </div>
      <p>{element.Description}</p>
      <div className="result_short" style={{ display: "flex" }}>
        <div style={{ display: "flex", marginLeft: "0%" }}>
          <BsFillPersonFill size={20} />
          <span>{element.usersInBet.length}</span>
        </div>
        <div style={{ display: "flex" }}>
          <FaMoneyBillAlt size={20} />
          <span> ${element.Price}</span>
        </div>
        <div style={{ display: "flex" }}>
          <FaCalendarDay size={20} />
          <span> {element.FinalDay}</span>
        </div>
        <div style={{ display: "flex" }}>
          <RiGitRepositoryPrivateLine size={20} />
          <span> {element.State}</span>
        </div>
      </div>
      <Link className="result_button" to={redireccion}>
        <button className="result_button" style={{color:'black'}}>Join</button>
      </Link>
    </div>
  );
}

export default Result;
