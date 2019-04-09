import PropTypes from 'prop-types';

export const ingredientShape = {
  name: PropTypes.string,
  isAvailable: PropTypes.bool,
  categoryId: PropTypes.number
};

export const categoryShape = {
  name: PropTypes.string,
  id: PropTypes.number,
  isOpen: PropTypes.bool
};

export const recipeShape = {
  name: PropTypes.string,
  id: PropTypes.number
};