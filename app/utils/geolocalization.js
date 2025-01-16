'use client';
export const watchGeolocation = (onSuccess, onError, options = {}) => {
    if (!("geolocation" in navigator)) {
      onError("Geolokalizacja nie jest wspierana przez tę przeglądarkę.");
      return null;
    }
  
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        onSuccess({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => {
        onError(`Błąd geolokalizacji: ${err.message}`);
      },
      options
    );
  
    // Zwracamy funkcję do zatrzymania śledzenia
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  };
  
  