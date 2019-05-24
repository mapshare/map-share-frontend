import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import mapboxgl from "mapbox-gl";
import { connect } from "react-redux";

import "./MapBoxContainer.scss";

import { addMarker } from "../../actions/marksActions";
import { restaurantFetchData } from "../../actions/restaurantActions";

import AddRestaurant from "../RestaurantComponents/AddRestaurant";

import { MAP_BOX_TOKEN } from "../../data/constants";

class MapBoxContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      coordinates: {}
    };

    this.map = null;
    this.markerRefs = [];
  }

  componentDidMount() {
    this.initializeMap();
    this.loadMarker();
    this.getUserGeolocation();
  }

  componentDidUpdate(prevProps, prevState) {
    // when new mark is added needs to reload the marks
    if (prevProps.marks !== this.props.marks) {
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
      this.setState({
        coordinates: {
          lat: data.lngLat.lat,
          lng: data.lngLat.lng
        }
      });
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

    // TO DO: avoid using timeout making it async with the map
    setTimeout(() => {
      geolocate.trigger();
      // prevent layered onClick event to happen
      geolocate._geolocateButton.addEventListener("click", e => {
        e.stopPropagation();
      });
    }, 2000);
  };

  loadMarker = () => {
    this.props.marks.forEach((marker, index) => {
      // set coordinates from marker object
      const lngLat = [
        marker.geometry.coordinates[1],
        marker.geometry.coordinates[0]
      ];

      // call mapbox marker api passing a dom element to create marker and adding it to the map
      new mapboxgl.Marker(this.markerRefs[index])
        .setLngLat(lngLat)
        .addTo(this.map);
    });
  };

  onClickMarker = (marker, e) => {
    // prevent layered onClick event to happen
    e.stopPropagation();
    // passing the clicked marker data to get rendered
    this.props.restaurantFetchData(marker);
  };

  onClickMap = () => {
    this.props.addMarker(true);
  };

  render() {
    return (
      <div
        className={classnames("MapBoxContainer", this.props.className)}
        ref={r => (this.mapBoxContainer = r)}
        onClick={this.onClickMap}
      >
        <AddRestaurant position={this.state.coordinates} />
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

MapBoxContainer.propTypes = {
  className: PropTypes.string,
  marks: PropTypes.array.isRequired,
  addMarker: PropTypes.func.isRequired,
  restaurantFetchData: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    addMarker: bool => dispatch(addMarker(bool)),
    restaurantFetchData: data => dispatch(restaurantFetchData(data))
  };
};

const mapStateToProps = state => {
  return {
    marks: state.marksReducer.marks
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapBoxContainer);
