import React from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {library} from '@fortawesome/fontawesome-svg-core'
import {faTrashAlt, faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
library.add(faTrashAlt, faPencilAlt)

function EditRecipe({ match }){

  console.log(match);

  return (
    <>

      <div className="">

        <Button close aria-label="edit">
          <FontAwesomeIcon role="button" icon="pencil-alt" className="text-muted"/>
        </Button>

        <div className="form-inline">
          <Label for="name" className="sr-only">Recipe Name</Label>
          <Input id="name" name="name" type="text" placeholder="Recipe name"/>
        </div>

        <Button close aria-label="delete">
          <FontAwesomeIcon role="button" icon="trash-alt" className="text-muted"/>
        </Button>

      </div>


    </>
  )
}

export default EditRecipe