import React from 'react';
import {Modal, ModalBody} from "reactstrap";

export default function DeleteRecipeModal({ isOpen, onCancel, recipe, onDelete }){
  return (
    <Modal isOpen={isOpen}>
      <ModalBody className="text-center mt-3">
        Are you sure you want to delete "{recipe.name}"?
      </ModalBody>
      <div className="d-flex justify-content-around p-3">
        <button className="btn btn-light border w-50 mr-2" onClick={onCancel}>Cancel</button>
        <button className="btn btn-primary w-50 ml-2" onClick={onDelete}>Delete</button>
      </div>
    </Modal>
  )
}