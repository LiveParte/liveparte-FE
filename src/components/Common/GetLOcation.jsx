import React from 'react';
import { geolocated } from 'react-geolocated';

class MyComponent extends React.Component {
  render() {
    return !this.props.isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
    ) : !this.props.isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
    ) : this.props.coords ? (
      <div>
        Latitude: {this.props.coords.latitude}, Longitude: {this.props.coords.longitude}
      </div>
    ) : (
      <div>Getting the location data&hellip;</div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(MyComponent);
