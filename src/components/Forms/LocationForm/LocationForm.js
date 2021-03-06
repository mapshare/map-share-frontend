import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { reduxForm, Field, reset } from "redux-form";

import "./LocationForm.scss";

const validate = val => {
  const errors = {};

  if (!val.restaurantName) {
    errors.restaurantName = "*Required";
  }
  if (!val.address) {
    errors.address = "*Required";
  }
  if (!val.priceRange) {
    errors.priceRange = "*Required";
  }
  if (!val.review) {
    errors.review = "*You must write a review...";
  }
  if (!val.rating) {
    errors.rating = "*Please provide a rating";
  }

  return errors;
};

const renderField = ({
  input,
  label,
  type,
  setOptions,
  meta: { touched, error }
}) => (
  <div className="control row-12">
    <label className="title">{label}</label>
    {renderOnType(input, type, setOptions)}
    {touched && (error && <span className="text-danger">{error}</span>)}
  </div>
);

const renderOnType = (input, type, setOptions) => {
  switch (type) {
    case "text":
      return <input className="form-control" {...input} type={type} />;
    case "select":
      return (
        <select className="form-control" {...input}>
          <option />
          <option value="$">$</option>
          <option value="$$">$$</option>
          <option value="$$$">$$$</option>
        </select>
      );
    case "textarea":
      return <textarea className="form-control" {...input} rows="3" />;
    case "rate":
      return (
        <div className="rating-container">
          {renderRating(input, setOptions)}
        </div>
      );
    default:
      return <div />;
  }
};

const renderRating = (input, setOptions) => {
  return (
    <div className="rating">
      {setOptions.map((option, index) => {
        return (
          <div className="rating-content" key={`rating-content-${index}`}>
            <input type="radio" id={option} {...input} value={option} />
            <label className="stars" htmlFor={option} />
          </div>
        );
      })}
    </div>
  );
};

const clearUpForm = (result, dispatch) => {
  dispatch(reset("addLocationForm"));
};

const LocationForm = React.forwardRef((props, ref) => {
  const { handleSubmit } = props;

  return (
    <div className={classnames("LocationForm", props.className)}>
      <form onSubmit={handleSubmit} className="form">
        <div className="field">
          <Field
            name="restaurantName"
            component={renderField}
            type="text"
            label="Restaurant Name"
          />
        </div>

        <div className="field">
          <Field
            name="restaurantLocation"
            component={renderField}
            type="text"
            label="Address"
          />
        </div>

        <div className="field">
          <Field
            name="priceRange"
            component={renderField}
            label="Price Range"
            type="select"
          />
        </div>

        <div className="field-rating">
          <Field
            name="rating"
            component={renderField}
            label="Rating"
            type="rate"
            setOptions={[5, 4, 3, 2, 1]}
          />
        </div>

        <div className="field">
          <Field
            name="review"
            component={renderField}
            label="Review"
            type="textarea"
          />
        </div>

        <div className="field">
          <div className="btn-control">
            <button className="btn btn-primary btn-block">Save</button>
          </div>
        </div>
      </form>
    </div>
  );
});

LocationForm.propTypes = {
  className: PropTypes.string,
  handleSubmit: PropTypes.func
};

export default reduxForm({
  form: "addLocationForm",
  onSubmitSuccess: clearUpForm,
  validate
})(LocationForm);
