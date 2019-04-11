import React, { useState, useRef } from 'react';
import cx from "classnames";
import { Label, Input } from 'reactstrap';
import { IconBtn } from "./IconBtn";
import PropTypes from "prop-types";

export function AddItemRow({ addItemHandler, label }) {

  const [value, setValue] = useState("");
  const [showBlink, setBlink] = useState(false);
  const [hadError, setError] = useState(false);
  const footerRef = useRef(null);

  function prepAdd(){
    if ( !value.trim() ){
      showValidationError();
    } else {
      addItemHandler(value.trim());
      setValue("");
      setError(false);
      footerRef.current.scrollIntoView();
    }
  }

  //prevents enter keypress from propagating
  function keyPress(e){
    if ( e.key === 'Enter' ) {
      prepAdd();
      footerRef.current.blur();
      e.preventDefault();
    }
  }

  function showValidationError(){
    setError(true);
    setBlink(true);
    setTimeout(() => setBlink(false), 1500);
  }

  return (
    <>
      <div className="d-flex flex-grow-1 pb-5">
        <IconBtn clickHandler={prepAdd} label="add" icon="plus" large/>
        <div className="flex-grow-1 ml-2">
          <Label for={label} className="sr-only">{label}</Label>
          <Input
            id={label}
            className={cx({ 'invalid-blink': showBlink })}
            onChange={e => setValue(e.target.value)}
            onKeyPress={keyPress}
            value={value}
            type="text"
            autoCapitalize="none"
            autoComplete="off"
            placeholder={label}/>
        </div>
      </div>
      { hadError &&
      <div role="alert"  className="sr-only">cannot be empty</div>
      }
      <div ref={footerRef}/>
    </>
  )
}

AddItemRow.propTypes = {
  addItemHandler: PropTypes.func,
  label: PropTypes.string
};