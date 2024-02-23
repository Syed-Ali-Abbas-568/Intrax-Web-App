import React from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import stationIcon from '../assets/station.png'
const containerStyle = {
  width: '100vw',
  height: '88vh'
};

const center = {
  lat: 31.481640119526258,
  lng: 74.30300336728763
};

function Map({stations}) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyA7T9I0EHBQ8jG9pjTAofdTlI52EGdSt4c"
  })

  const [map, setMap] = React.useState(null)
  const [selectedStation, setSelectedStation] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {stations.map((station) => (
          <Marker
          key={station.id}
          position={{ lat: station.lat, lng: station.lng }}
          icon={{
            url: stationIcon,
            scaledSize: new window.google.maps.Size(50, 50),
          }}
          onClick={() => {
            setSelectedStation(station);
          }}
        />
      ))}
      {selectedStation && (
        <InfoWindow
          position={{ lat: selectedStation.lat, lng: selectedStation.lng }}
          onCloseClick={() => {
            setSelectedStation(null);
          }}
        >
          <div>
            <h4>{selectedStation.name}</h4>
            <p>{selectedStation.desc}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
    ) : <></>;
  }

export default React.memo(Map)