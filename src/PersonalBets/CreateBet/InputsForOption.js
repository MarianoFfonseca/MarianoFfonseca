import React from 'react'

function InputsForOption({Texto, changeOption}) {
  return (
    <div>
        <input style={{marginTop:'2%'}} onChange={changeOption} type="text" placeholder={Texto}/>
    </div>
  )
}

export default InputsForOption