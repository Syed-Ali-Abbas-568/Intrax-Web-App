
import { GoogleAPIKey } from "../constants/map_constant";






import stationIcon from '../assets/station.png'
import busIcon from '../assets/bus.png'
import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, LoadScript, Polyline, InfoWindow } from "@react-google-maps/api";
import { getBuses } from "../services/BusRequests";




const Map = ({ stations, routes }) => {




  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [selectedBus, setSelectedBus] = useState(null);

  const [loading, setLoading] = useState(true)

  // Load directions from localStorage on component mount
  useEffect(() => {
    const storedDirections = JSON.parse(localStorage.getItem('directions'));
    if (storedDirections) {
      setDirections(storedDirections);
    }
  }, []);

  // Save directions to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('directions', JSON.stringify(directions));
  }, [directions]);

  const mapStyles = {
    width: '100vw',
    height: '88vh'
  };

  const defaultCenter = {
    lat: 31.47936357030096,
    lng: 74.30344520712744
  };



  const initialBounds = {
    northeast: {
      lat: 31.48,
      lng: 74.31
    },
    southwest: {
      lat: 31.46,
      lng: 74.29
    }
  };







  useEffect(() => {

    console.log("hallo")

    // Extracting the "directions" attribute from each JSON object
    let data = routes.map(obj => JSON.parse(obj.directions));
    console.log(data)
    setDirections(data)

    if (map && routes.length > 0) {
      setLoading(false)
    }

    // if (map && route && route.length > 0) {
    //   route.forEach(routeItem => {
    //     const bounds = new window.google.maps.LatLngBounds();
    //     routeItem.stations.forEach(station => {
    //       bounds.extend({ lat: station.Latitude, lng: station.Longitude });
    //     });
    //     map.fitBounds(bounds);

    //     const directionsService = new window.google.maps.DirectionsService();
    //     const waypoints = routeItem.stations.map(station => ({
    //       location: { lat: station.Latitude, lng: station.Longitude },
    //       stopover: true
    //     }));

    //     const request = {
    //       origin: waypoints.shift().location,
    //       destination: waypoints.pop().location,
    //       waypoints: waypoints,
    //       travelMode: 'DRIVING'
    //     };

    //     directionsService.route(request, (result, status) => {
    //       if (status === 'OK') {
    //         setDirections(prevDirections => [...prevDirections, result.routes[0]]);
    //       } else {
    //         console.error('Directions request failed due to ' + status);
    //       }
    //     });
    //   });
    // }
  }, [routes]);




  const [buses, setBuses] = useState({

    display: false,
    busData: null
  })


  async function getBusData() {

    try {

      const busData = await getBuses()
      setBuses({

        display: true,
        busData: busData
      })
    }

    catch (err) {

      console.log("error getting bus data", err)
    }

  }



  useEffect(() => {
    const intervalId = setInterval(() => {

      getBusData()

      console.log('Refereshing bus coordinated every 2 seconds');
    }, 500);

    // Clear the interval when the component unmounts or when the dependency array changes
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the effect runs only once on mount









  return (
    <LoadScript googleMapsApiKey={GoogleAPIKey}>
      <GoogleMap
        defaultBounds={initialBounds}
        mapContainerStyle={mapStyles}
        zoom={15}
        center={buses.display ? false : defaultCenter}
        onLoad={map => setMap(map)}


      >

        {!loading && directions.map((route, rIndex) => (
          <React.Fragment key={rIndex}>


            {console.log("Route Index:", route)}
            {route.legs.map((leg, lIndex) => (
              <React.Fragment key={lIndex}>
                {/* {console.log("Leg Index:", lIndex)} */}
                {leg.steps.map((step, sIndex) => (
                  <Polyline
                    key={sIndex}
                    path={step.path.map(point => ({
                      lat: point.lat,//
                      lng: point.lng
                    }))}
                    options={{
                      strokeColor: getColorForRoute(rIndex), // Use rIndex here
                      strokeOpacity: 2,
                      strokeWeight: 5 + rIndex
                    }}
                  />
                ))}
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}













        {stations.map((station) => (
          <Marker
            key={station.id}
            position={{ lat: station.latitude, lng: station.longitude }}
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
            position={{ lat: selectedStation.latitude, lng: selectedStation.longitude }}
            onCloseClick={() => {
              setSelectedStation(null);
            }}
          >
            <div>
              <h4>{selectedStation.name}</h4>
              <p>{selectedStation.description}</p>
            </div>
          </InfoWindow>
        )}





        {buses.display && buses.busData.map((bus) => (
          <Marker
            key={bus.id}
            position={{ lat: bus.latitude, lng: bus.longitude }}
            icon={{
              url: busIcon,
              scaledSize: new window.google.maps.Size(25, 25),
            }}
            onClick={() => {
              setSelectedBus(bus);
            }}
          />
        ))}




        {selectedBus && (
          <InfoWindow
            position={{ lat: selectedBus.latitude, lng: selectedBus.longitude }}
            onCloseClick={() => {
              setSelectedBus(null);
            }}
          >
            <div>
              <h4>{selectedBus.busNumber}</h4>
              <p>{selectedBus.licensePlateNumber}</p>
            </div>
          </InfoWindow>
        )}








      </GoogleMap>
    </LoadScript >
  );
};

const getColorForRoute = index => {

  const colors = [
    "#FF0000", // Red
    "#00FF00", // Green
    "#0000FF", // Blue

    "#FF00FF", // Magenta
    "#00FFFF", // Cyan
    "#FFA500", // Orange
    "#008000", // DarkGreen
    "#800080", // Purple
    "#808000", // Olive
    "#800000", // Maroon
    "#008080", // Teal
    "#000080", // Navy
    "#A52A2A", // Brown
    "#696969", // DimGray
    "#DC143C", // Crimson
    "#FFFF00", // Yellow
    "#FF1493", // DeepPink
    "#00CED1", // DarkTurquoise
    "#8B008B", // DarkMagenta
    "#2E8B57"  // SeaGreen
    // Add more colors as needed
  ];

  console.log("Choosen Color:", index % colors.length)
  return colors[index % colors.length];
};

export default Map;
