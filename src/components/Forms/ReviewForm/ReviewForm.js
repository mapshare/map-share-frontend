import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { reduxForm, Field } from "redux-form";

import "./ReviewForm.scss";

const validate = val => {
  const errors = {};

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

const ReviewForm = React.forwardRef((props, ref) => {
  const { handleSubmit } = props;

  return (
    <div className={classnames("ReviewForm", props.className)}>
      <form onSubmit={handleSubmit} className="form">
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

ReviewForm.propTypes = {
  className: PropTypes.string,
  handleSubmit: PropTypes.func
};

export default reduxForm({
  form: "reviewForm",
  validate
})(ReviewForm);
