import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import "./ModalWindow.scss";
import LocationForm from "../Forms/LocationForm/LocationForm";

const ModalWindow = React.forwardRef((props, ref) => {
  return (
    <div className={classnames("ModalWindow", props.className)}>
      <div className="modal-content">
        <LocationForm />
      </div>
    </div>
  );
});

ModalWindow.propTypes = {
  className: PropTypes.string
};

ModalWindow.defaultProps = {};

export default ModalWindow;
