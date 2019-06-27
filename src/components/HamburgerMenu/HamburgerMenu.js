import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import "./HamburgerMenu.scss";

class HamburgerMenu extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      onClick: false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.onClick)
  }

  handleOnClick = () => {
    this.setState({
      onClick: !this.state.onClick
    })
  }

  render() {
    return (
      <div className={classnames("HamburgerMenu", this.props.className)}>
        {
          this.state.onClick ? 
            <div className="menuListContainer">
              <div className="title">Group Menu</div>
              <div className="closeButton" onClick={this.handleOnClick}>
                <div className="closeButtonline"/>
                <div className="closeButtonline"/>
              </div>
              <div className="group-id">Group ID - {this.props.groupId}</div>
            </div>
        :
          <div className="menuContainer" onClick={this.handleOnClick}>
            <div className="line"/>
            <div className="line"/>
            <div className="line"/>  
          </div> 
        }
      </div>
    );
  }
}

HamburgerMenu.propTypes = {
  className: PropTypes.string,
};

HamburgerMenu.defaultProps = {};

export default HamburgerMenu;
