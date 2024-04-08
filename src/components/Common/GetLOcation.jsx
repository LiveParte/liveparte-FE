import React from 'react';
import { useGeolocated } from 'react-geolocated';

const MyLocationComponent = () => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled, positionError } = useGeolocated({
      // Optional configuration options (see details below)
  });

  // Handle different location states
  if (!isGeolocationAvailable) {
      return <div>Geolocation is not supported by your browser.</div>;
  }

  if (!isGeolocationEnabled) {
      return <div>Geolocation is disabled. Please enable it to use this feature.</div>;
  }

  if (positionError) {
      return <div>Error retrieving location: {positionError.message}</div>;
  }

  if (coords) {
      const { latitude, longitude } = coords;
      // Use the latitude and longitude for your application logic
      return (
          <div>
              Your location: Latitude: {latitude}, Longitude: {longitude}
          </div>
      );
  }

  return <div>Loading location...</div>;
};

export default MyLocationComponent;

