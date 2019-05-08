import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import "./GroupLanding.scss";

import GroupForm from "../Forms/GroupForm/GroupForm";

const GroupLanding = React.forwardRef((props, ref) => {
  return (
    <div className={classnames("GroupLanding", props.className)}>
      <div className="container">
        <div className="card text-center rounded">
          <img className="card-img-top" src="" alt="" />
          <div className="card-body">
            <h4 className="card-title">You aren't in a group yet!</h4>
            <p className="card-text">Please join or create a group</p>

            <div>
              <p>
                <a
                  className="btn btn-primary group-option collapsed"
                  data-toggle="collapse"
                  href="#joinGroup"
                  role="button"
                  aria-expanded="false"
                  aria-controls="joinGroup"
                >
                  Join Group
                </a>
                <a
                  className="btn btn-primary group-option collapsed"
                  data-toggle="collapse"
                  href="#createGroup"
                  role="button"
                  aria-expanded="false"
                  aria-controls="createGroup"
                >
                  Create Group
                </a>
              </p>
              <div id="groupWrapper">
                <div
                  className="collapse"
                  id="createGroup"
                  data-parent="#groupWrapper"
                >
                  <div className="card-body">
                    <GroupForm text={"New Group Name"} action={"create"} />
                  </div>
                </div>
                <div
                  className="collapse"
                  id="joinGroup"
                  data-parent="#groupWrapper"
                >
                  <div className="card-body">
                    <GroupForm text={"Existing Group Id"} action={"join"} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

GroupLanding.propTypes = {
  className: PropTypes.string
};

GroupLanding.defaultProps = {};

export default GroupLanding;
