import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import mapboxgl from "mapbox-gl";
import { connect } from "react-redux";

import "./MapBoxContainer.scss";

import { addMarker, marksFetchData } from "../../actions/marksActions";
import {
  restaurantFetchData,
  toggleMarker
} from "../../actions/restaurantActions";

import AddRestaurant from "../RestaurantComponents/AddRestaurant";

import { MAP_BOX_TOKEN } from "../../data/constants";
import { MARKERS } from "../../data/markers";

class MapBoxContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.map = null;
    this.markerRefs = [];
    this.coordinates = null;
  }

  componentDidMount() {
    this.initializeMap();
    this.loadMarker();
    this.getUserGeolocation();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.marks !== this.props.marks) {
      console.log("didupdate");
      this.loadMarker();
    }
  }

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

    // add onClick event into the map when its initialize
    this.map.on("click", data => {
      this.coordinates = {
        lat: data.lngLat.lat,
        lng: data.lngLat.lng
      };
    });
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

  loadMarker = () => {
    this.props.marks.forEach((marker, index) => {
      let lngLat = [
        marker.geometry.coordinates[1],
        marker.geometry.coordinates[0]
      ];

      new mapboxgl.Marker(this.markerRefs[index])
        .setLngLat(lngLat)
        .addTo(this.map);
    });
  };

  onClickMarker = (marker, e) => {
    e.stopPropagation();
    console.log("click on marker");
    this.props.restaurantFetchData(marker);
  };

  onClickMap = () => {
    this.props.addMarker(true);
    console.log("click on map");
  };

  render() {
    return (
      <div
        className={classnames("MapBoxContainer", this.props.className)}
        ref={r => (this.mapBoxContainer = r)}
        onClick={this.onClickMap}
      >
        <AddRestaurant position={this.coordinates} />
        {this.props.marks.map((marker, index) => (
          <div
            className="marker"
            ref={r => (this.markerRefs[index] = r)}
            key={`marker-${index}`}
            onClick={e => this.onClickMarker(marker, e)}
          />
        ))}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    marksFetchData: url => dispatch(marksFetchData(url)),
    addMarker: bool => dispatch(addMarker(bool)),
    toggleMarker: bool => dispatch(toggleMarker(bool)),
    restaurantFetchData: data => dispatch(restaurantFetchData(data))
  };
};

const mapStateToProps = state => {
  return {
    marks: state.marksFetchReducer,
    addMark: state.addMarkerReducer,
    markOnClick: state.marksToggleReducer,
    signInStatus: state.signInStatusReducer
  };
};

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapBoxContainer);
