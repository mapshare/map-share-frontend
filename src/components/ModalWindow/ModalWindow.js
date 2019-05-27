import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { reset } from "redux-form";

import "./ModalWindow.scss";

import LocationForm from "../Forms/LocationForm/LocationForm";
import ReviewForm from "../Forms/ReviewForm/ReviewForm";
import { addMarker } from "../../actions/marksActions";

import { MODAL_WINDOW_TYPE } from "../../data/constants";

const ModalWindow = React.forwardRef((props, ref) => {
  function content(type) {
    switch (type) {
      case "location":
        return <LocationForm onSubmit={props.handleSubmit} />;
      case "review":
        return <ReviewForm onSubmit={props.handleSubmit} />;
      default:
        return <h1>testing</h1>;
    }
  }

  function handleClose(event) {
    props.reset("addLocationForm");
    event.stopPropagation();
    props.addMarker(false);
  }

  return (
    <div
      className={classnames("ModalWindow", props.className)}
      style={{ display: `${props.addMark ? "flex" : "none"}` }}
    >
      <div className="modal-container">
        <div className="modal-header">
          <div className="title">Add {props.contentType}</div>
          <div className="close-button" onClick={event => handleClose(event)}>
            +
          </div>
        </div>
        <div className="modal-content">{content(props.contentType)}</div>
      </div>
    </div>
  );
});

const mapDispatchToProps = dispatch => {
  return {
    addMarker: bool => dispatch(addMarker(bool)),
    reset: form => dispatch(reset(form))
  };
};

const mapStateToProps = state => {
  return {
    addMark: state.marksReducer.showModal,
    forms: state.form
  };
};

ModalWindow.propTypes = {
  className: PropTypes.string,
  contentType: PropTypes.oneOf(MODAL_WINDOW_TYPE).isRequired,
  addMark: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func
};

ModalWindow.defaultProps = {
  addMark: false
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalWindow);
