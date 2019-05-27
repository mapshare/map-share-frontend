import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

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
        return <h1>testing</h1>;
    }
  }

  return (
    <div
      className={classnames("ModalWindow", props.className)}
      style={{ display: `${props.showModal ? "flex" : "none"}` }}
    >
      <div className="modal-container">
        <div className="modal-header">
          <div className="title">Add {props.contentType}</div>
          <div
            className="close-button"
            onClick={event => props.handleClose(event)}
          >
            +
          </div>
        </div>
        <div className="modal-content">{content(props.contentType)}</div>
      </div>
    </div>
  );
});

ModalWindow.propTypes = {
  className: PropTypes.string,
  contentType: PropTypes.oneOf(MODAL_WINDOW_TYPE).isRequired,
  showModal: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func
};

ModalWindow.defaultProps = {
  showModal: false
};

export default ModalWindow;
