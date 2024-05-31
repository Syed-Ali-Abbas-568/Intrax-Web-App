import React, { createContext, useState, useEffect } from 'react';

const GoogleMapsContext = createContext();

export const GoogleMapsProvider = ({ children, googleMapsApiKey }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!isLoaded) {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initMap`;
            script.async = true;
            script.defer = true;
            window.initMap = () => setIsLoaded(true);
            document.head.appendChild(script);

            return () => {
                delete window.initMap;
            };
        }
    }, [isLoaded, googleMapsApiKey]);

    return (
        <GoogleMapsContext.Provider value={isLoaded}>
            {children}
        </GoogleMapsContext.Provider>
    );
};

export default GoogleMapsContext;