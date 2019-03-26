import React, { useState } from 'react';
import classNames from "classnames/bind";
import IconBtn from "./IconBtn";

export default function AddItemRow({ addHandler, label }) {

  const [value, setValue] = useState("");
  const [hasError, setError] = useState(false);
  const [ref, setRef] = useState(null);

  function prepAdd(){
    if ( !value.trim() ){
      showValidationError();
    } else {
      addHandler(value.trim());
      setValue("");
      ref.scrollIntoView();
    }
  }

  function keyPress(e){
    if ( e.key === 'Enter' ) {
      prepAdd();
      ref.blur();
      e.preventDefault();
    }
  }

  function showValidationError(){
    setError(true);
    setTimeout(() => setError(false), 1500);
  }

  return (
    <>
      <li className="list-group-item d-flex pl-3 pb-5">
        <IconBtn clickHandler={prepAdd} label="add" icon="plus" large/>
        <div className="flex-grow-1 ml-2">
          <label htmlFor={label} className="sr-only">{label}</label>
          <input
            id={label}
            className={classNames('form-control', { 'invalid-blink': hasError })}
            onChange={e => setValue(e.target.value)}
            onKeyPress={keyPress}
            ref={ref => {setRef(ref)}}
            value={value}
            type="text"
            autoCapitalize="none"
            autoComplete="off"
            placeholder={label}/>
        </div>
      </li>
    </>
  )

}