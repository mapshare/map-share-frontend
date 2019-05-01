import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

export class RenderMap extends Component {
  renderChildren() {
    const { children } = this.props.children;

    if (!children) return;

    return React.Children.map(children, c => {
      if (!c) return;
      return React.cloneElement(c, {
        map: this.props.map,
        google: this.props.google,
        mapcenter: this.props.mapcenter
      });
    });
  }

  render() {
    return (
      <div className={classnames("RenderMap", this.props.className)}>
        {this.renderChildren()}
      </div>
    );
  }
}

RenderMap.propTypes = {
  className: PropTypes.string
};

export default RenderMap;
