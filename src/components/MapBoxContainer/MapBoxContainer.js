import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import mapboxgl from "mapbox-gl";

import "./MapBoxContainer.scss";

class MapBoxContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.map = null;
  }

  componentDidMount() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiY2hpdWxldW5nIiwiYSI6ImNqdjVuY2tpZjAwcWkzenBvZm9jMGh1cDEifQ.tqSql4tEW2Md_1s3Gunvdg";

    this.map = new mapboxgl.Map({
      container: this.mapBoxContainer,
      style: "mapbox://styles/mapbox/streets-v9"
    });
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return (
      <div
        className={classnames("MapBoxContainer", this.props.className)}
        ref={r => (this.mapBoxContainer = r)}
      />
    );
  }
}

MapBoxContainer.propTypes = {
  className: PropTypes.string
};

MapBoxContainer.defaultProps = {};

export default MapBoxContainer;
