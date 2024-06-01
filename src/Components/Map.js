
import { GoogleAPIKey } from "../constants/map_constant";






import stationIcon from '../assets/station.png'
import busIcon from '../assets/bus.png'
import React, { useState, useEffect, useContext } from "react";
import { Marker, LoadScript, Polyline, InfoWindow } from "@react-google-maps/api";
import { GoogleMap } from "@react-google-maps/api";
import { getBuses } from "../services/BusRequests";

import GoogleMapsContext from "../context/GoogleMapContext";


const Map = ({ stations, routes }) => {


  const isLoaded = useContext(GoogleMapsContext);

  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [selectedBus, setSelectedBus] = useState(null);

  const [loading, setLoading] = useState(true)



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


    // Extracting the "directions" attribute from each JSON object
    let data = routes.map(obj => JSON.parse(obj.directions));

    setDirections(data)




    if (routes.length > 0) {
      setLoading(false)
    }

    setLoading(false);




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



  const [selectedPosition, setSelectedPosition] = useState(null);

  //Display the route information when a certain route is clicked
  const handlePolylineClick = (rIndex) => (event) => {
    setSelectedPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      rIndex: rIndex
    });
  };





  if (!isLoaded) {
    return <div>Loading...</div>; // Show a loading message until the API is loaded
  }




  return (

    <GoogleMap
      defaultBounds={initialBounds}
      mapContainerStyle={mapStyles}
      zoom={15}
      center={buses.display ? false : defaultCenter}

    // onLoad={map => setMap(map)}


    >

      {!loading && directions.map((route, rIndex) => (
        <React.Fragment key={rIndex}>


          {console.log("Route Index:", route)}
          {route.legs.map((leg, lIndex) => (

            <React.Fragment key={lIndex}>




              <>
                {leg.steps.map((step, sIndex) => (

                  <Polyline
                    onClick={handlePolylineClick(rIndex)}
                    key={sIndex}
                    path={step.path.map(point => ({
                      lat: point.lat,//
                      lng: point.lng
                    }))}
                    options={{
                      strokeColor: getColorForRoute(rIndex), // Use rIndex here
                      strokeOpacity: 0.2,
                      strokeWeight: 5 + rIndex
                    }}
                  />








                ))}




              </>
            </React.Fragment>
          ))}


          {selectedPosition && (<InfoWindow
            position={selectedPosition}
            onCloseClick={() => setSelectedPosition(null)}
          >
            <div>
              <h4>Route Info</h4>
              <p>Route Name: {routes[selectedPosition.rIndex].name}</p>

            </div>
          </InfoWindow>
          )
          }

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
