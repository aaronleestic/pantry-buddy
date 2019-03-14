import React from 'react';
import {connect} from 'react-redux';

export const RecipesUI = () => (
  <div className="px-3">
    <p>
      Upcoming feature:
      <br></br>
      Add recipes and automatically see which dishes you can make based on ingredients availability.
    </p>
    Feature roadmap
    <ul>
      {["Offline persistence for your pantry list (Progressive Web App)",
      "Type ahead for popular ingredients",
      "Online persistence for usage across devices",
      "Import of common dishes",
      "Native mobile",
      "Share recipe with other users"
      ].map((feature, i)=> <li key={i}>{feature}</li>)}
    </ul>
  </div>
);

export const Recipes = connect()(RecipesUI);