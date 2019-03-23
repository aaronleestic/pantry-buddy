import React from 'react';
import { Link } from "react-router-dom";

function Recipes({match}){
  return (
    <div className="px-3 row justify-content-center">
      <Link to={`${match.url}/new`} className="btn btn-primary px-5 text-white">Add New Dish</Link>
    </div>
  );
}

export default Recipes;