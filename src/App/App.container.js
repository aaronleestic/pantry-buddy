import React, {useEffect} from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import App from "./App";
import {loadIngredients} from "./Pantry/actions";

function AppContainer({isLoading, dispatch}){

  useEffect(() => {
    dispatch(loadIngredients());
  }, []);

  if ( isLoading ) {
    return (
      <div className="container d-flex mh-100">
        <div className="w-100  align-self-center text-center">
          <div className="spinner-border mt-3" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    )
  } else {
    return <App/>
  }
}

AppContainer.propTypes = {
  isLoading: PropTypes.bool
};

function mapStateToProp(state){
  return {
    isLoading: state.isLoading,
  }
}

export default withRouter(connect(mapStateToProp)(AppContainer));