import React, {useEffect} from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import App from "./App";
import {fetchData} from "./actions/ingredient";

function AppLoader({isLoading, dispatch}){

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  if ( isLoading ) {
    return (
      <div className="container d-flex vh-100">
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

AppLoader.propTypes = {
  isLoading: PropTypes.bool
};

function mapStateToProp(state){
  return {
    isLoading: state.isLoading,
  }
}

export default withRouter(connect(mapStateToProp)(AppLoader));