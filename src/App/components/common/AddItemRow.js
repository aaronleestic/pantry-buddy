import React, { useState, useEffect } from 'react';
import classNames from "classnames/bind";
import IconBtn from "./IconBtn";

export default function AddItemRow({ addHandler, label }) {

  const [value, setValue] = useState("");
  const [hasError, setError] = useState(false);
  const [element, setElement] = useState(null);

  useEffect(() => {
    if ( element )
      element.scrollIntoView();
  }, [value]);

  function prepAdd(){
    const text = value.trim();
    if ( !text ){
      setError(true);
      setTimeout(() => setError(false), 1500);
    } else {
      addHandler(text);
      setValue("")
    }
  }

  return (
    <li className="list-group-item d-flex pl-3 mb-5" ref={(el) => {setElement(el)}}>
      <IconBtn clickHandler={prepAdd} label="add" icon="plus"/>
      <div className="flex-grow-1 ml-2">
        <label htmlFor={label} className="sr-only">{label}</label>
        <input
          id={label}
          className={classNames('form-control', { 'invalid-blink': hasError })}
          onChange={e => setValue(e.target.value)}
          onKeyPress={(e) => { if ( e.key === 'Enter') prepAdd() }}
          value={value}
          type="text"
          autoCapitalize="none"
          autoComplete="off"
          placeholder={label}/>
      </div>
    </li>
  )

}