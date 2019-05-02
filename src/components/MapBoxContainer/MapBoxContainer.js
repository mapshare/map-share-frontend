import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import mapboxgl from "mapbox-gl";

import "./MapBoxContainer.scss";

import { MAP_BOX_TOKEN } from "../../data/constants";

class MapBoxContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.map = null;
  }

  componentDidMount() {
    this.initializeMap();
  }

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {
    this.map.remove();
  }

  initializeMap = () => {
    mapboxgl.accessToken = MAP_BOX_TOKEN;

    this.map = new mapboxgl.Map({
      container: this.mapBoxContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-96, 37.8], // starting position
      zoom: 3, // starting zoom
      attributionControl: false
    });

    this.getUserGeolocation();
  };

  getUserGeolocation = () => {
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    });
    this.map.addControl(geolocate, "bottom-right");

    setTimeout(() => {
      geolocate.trigger();
    }, 1);
  };

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

MapBoxContainer.defaultProps = {
  geolocate: new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  })
};

export default MapBoxContainer;
