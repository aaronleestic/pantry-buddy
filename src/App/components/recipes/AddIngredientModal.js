import React, { useState, useEffect } from 'react';
import {Modal, ModalBody} from "reactstrap";

export default function AddIngredientModal({ isOpen, ingredient, close, onAdd, categories }){

  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    setTimeout(() => setCategoryId(""), 500);
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen}>
      <ModalBody className="text-center">
        <h3 className="p-2">Add "{ingredient && ingredient.name}" to Pantry</h3>
        <select
          onChange={(e) => setCategoryId(Number(e.target.value))}
          value={categoryId}
          className="form-control mt-3">
          <option disabled value="">select type</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </ModalBody>
      <div className="d-flex justify-content-around p-3">
        <button className="btn btn-light border w-50 mr-2" onClick={close}>Cancel</button>
        <button
          disabled={categoryId === ""}
          className="btn btn-primary w-50 ml-2"
          onClick={() => onAdd(ingredient, categoryId)}>
          Add
        </button>
      </div>
    </Modal>
  )
}

AddIngredientModal.defaultProps = { onAdd: () => console.warn("onAdd not provided") };