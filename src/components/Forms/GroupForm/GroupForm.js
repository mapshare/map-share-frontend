import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";

//import dispatch actions for create/join group
import { createGroup, joinGroup } from "../../../actions/groupActions";

import "./GroupForm.scss";

class GroupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      input: ""
    };
  }
  validate = val => {
    if (!val) {
      this.setState({ errorMessage: "You didn't enter anything!" });
    } else {
      let { action, getUserData } = this.props;
      if (this.props.action === "join") {
        this.props.joinGroup(val, getUserData._id);
      } else if (action === "create") {
        this.props.createGroup(val, this.props.getUserData._id);
      } else console.log("invalid action!!!!!!!!");
    }
  };
  handleChange = e => {
    this.setState({ input: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.validate(this.state.input);
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props && this.props.action === "join") {
      this.setState({ errorMessage: this.props.joinGroupError });
    }
  }
  render() {
    return (
      <div className={classnames("GroupForm", this.props.className)}>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>{this.props.text}</label>
            <input
              type="text"
              className="form-control"
              value={this.state.input}
              onChange={this.handleChange}
            />
          </div>
          <button
            className="btn btn-secondary"
            type="submit"
            id="submit-button"
          >
            Submit
          </button>

          {this.state.errorMessage ? (
            <div className="error-message">
              {this.state.errorMessage}
              <br />
              You must be in a group to use Map-Share
            </div>
          ) : null}
        </form>
      </div>
    );
  }
}

GroupForm.propTypes = {
  className: PropTypes.string,
  action: PropTypes.bool.isRequired,
  getUserData: PropTypes.object.isRequired,
  joinGroup: PropTypes.func.isRequired,
  createGroup: PropTypes.func.isRequired,
  joinGroupError: PropTypes.string,
  text: PropTypes.string
};

const mapStateToProps = state => {
  return {
    getUserData: state.signInReducer.userData,
    joinGroupError: state.signInReducer.groupError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createGroup: (a, b) => dispatch(createGroup(a, b)),
    joinGroup: (a, b) => dispatch(joinGroup(a, b))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupForm);
