import { GoogleMap, Marker, LoadScript, Polyline, InfoWindow } from "@react-google-maps/api";

export function getDirections(routeItem, apiKey) {


    const directionsService = new window.google.maps.DirectionsService();
    const waypoints = routeItem.stations.map(station => ({
        location: { lat: station.latitude, lng: station.longitude },
        stopover: true
    }));

    const request = {
        origin: waypoints.shift().location,
        destination: waypoints.pop().location,
        waypoints: waypoints,
        travelMode: 'DRIVING'
    };

    return new Promise((resolve, reject) => {
        directionsService.route(request, (result, status) => {
            if (status === 'OK') {
                resolve(result.routes[0]);
            } else {
                reject(new Error('Directions request failed due to ' + status));
            }
        });
    });
}
