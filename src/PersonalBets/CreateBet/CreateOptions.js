import React from "react";
import InputsForOption from "./InputsForOption";
import ButtonCheckOut from "./ButtonCheckOut";
function CreateOptions({ socialOptions, setSocialOptions, socialBet, setUidPersonal, setCreatedBet }) {
  let numero = socialBet.NOptions;
  let Price = socialBet.Price;
const changeOption1 = (e) => {
    let Option1 = e.target.value
    setSocialOptions({...socialOptions, Option1})
}
const changeOption2 = (e) => {
    let Option2 = e.target.value
    setSocialOptions({...socialOptions, Option2})
}
const changeOption3 = (e) => {
    let Option3 = e.target.value
    setSocialOptions({...socialOptions, Option3})
}
const changeOption4 = (e) => {
    let Option4 = e.target.value
    setSocialOptions({...socialOptions, Option4})
}
  const createOption = () => {
  
    if (numero === '2') {
      return (
        <>
          <InputsForOption changeOption={changeOption1}  Texto='Opcion numero uno'/>
          <InputsForOption changeOption={changeOption2} Texto='Opcion numero dos'/>
        </>
      );
    }
    if (numero === '3') {
      return (
        <>
          <InputsForOption changeOption={changeOption1} Texto='Opcion numero uno'/>
          <InputsForOption changeOption={changeOption2} Texto='Opcion numero dos'/>
          <InputsForOption changeOption={changeOption3} Texto='Opcion numero tres'/>
        </>
      );
    }
    if (numero === '4') {
      return (
        <>
          <InputsForOption changeOption={changeOption1} Texto='Opcion numero uno'/>
          <InputsForOption changeOption={changeOption2} Texto='Opcion numero dos'/>
          <InputsForOption changeOption={changeOption3} Texto='Opcion numero tres'/>
          <InputsForOption changeOption={changeOption4} Texto='Opcion numero cuatro'/>
        </>
      );
    }
  };

  return (
    <div className="Total">
      <div className="cpersonal_container">
        <h1>Create the options</h1>
        <div className="cpersonal_div">
            {createOption()}
            <ButtonCheckOut setCreatedBet={setCreatedBet}  Price={Price} socialBet={socialBet} socialOptions={socialOptions} setUidPersonal={setUidPersonal}/>
            <p style={{marginTop:'2%', color:'gray'}}>You just need to pay what the value of your bet is!</p>
        </div>
      </div>
    </div>
  );
}

export default CreateOptions;
