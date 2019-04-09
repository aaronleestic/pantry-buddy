import React, { useState } from 'react';
import cx from "classnames";
import { Label, Input } from 'reactstrap';
import { IconBtn } from "./IconBtn";
import PropTypes from "prop-types";

export function AddItemRow({ addItemHandler, label }) {

  const [value, setValue] = useState("");
  const [hasError, setError] = useState(false);
  const [ref, setRef] = useState(null);

  function prepAdd(){
    if ( !value.trim() ){
      showValidationError();
    } else {
      addItemHandler(value.trim());
      setValue("");
      ref.scrollIntoView();
    }
  }

  //prevents enter keypress from propagating
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
      <div className="d-flex flex-grow-1 pb-5">
        <IconBtn clickHandler={prepAdd} label="add" icon="plus" large/>
        <div className="flex-grow-1 ml-2">
          <Label for={label} className="sr-only">{label}</Label>
          <Input
            id={label}
            className={cx({ 'invalid-blink': hasError })}
            onChange={e => setValue(e.target.value)}
            onKeyPress={keyPress}
            value={value}
            type="text"
            autoCapitalize="none"
            autoComplete="off"
            placeholder={label}/>
        </div>
      </div>
      <div ref={ref => {setRef(ref)}}/>
    </>
  )
}

AddItemRow.propTypes = {
  addItemHandler: PropTypes.func,
  label: PropTypes.string
};