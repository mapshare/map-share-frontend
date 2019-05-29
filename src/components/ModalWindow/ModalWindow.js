import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { reset } from "redux-form";

import "./ModalWindow.scss";

import LocationForm from "../Forms/LocationForm/LocationForm";
import ReviewForm from "../Forms/ReviewForm/ReviewForm";

import { MODAL_WINDOW_TYPE } from "../../data/constants";

const ModalWindow = React.forwardRef((props, ref) => {
  function content(type) {
    switch (type) {
      case "location":
        return <LocationForm onSubmit={props.handleSubmit} />;
      case "review":
        return <ReviewForm onSubmit={props.handleSubmit} />;
      default:
        return console.error("pass an existing modalWindowType");
    }
  }

  function handleClose(event) {
    const currentForm = Object.keys(props.forms)[0];
    props.reset(currentForm);
    event.stopPropagation();
    props.handleCloseByType();
  }

  return (
    <div
      className={classnames("ModalWindow", props.className)}
      style={{ display: `${props.showModal ? "flex" : "none"}` }}
    >
      <div className="modal-container">
        <div className="modal-header">
          <div className="title">
            {props.modalIdentifier} {props.contentType}
          </div>
          <div className="close-button" onClick={event => handleClose(event)}>
            +
          </div>
        </div>
        <div className="modal-content">{content(props.modalWindowType)}</div>
      </div>
    </div>
  );
});

const mapDispatchToProps = dispatch => {
  return {
    reset: form => dispatch(reset(form))
  };
};

const mapStateToProps = state => {
  return {
    forms: state.form
  };
};

ModalWindow.propTypes = {
  className: PropTypes.string,
  modalWindowType: PropTypes.oneOf(MODAL_WINDOW_TYPE).isRequired,
  showModal: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func,
  handleCloseByType: PropTypes.func
};

ModalWindow.defaultProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalWindow);
