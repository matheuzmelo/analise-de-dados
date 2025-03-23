import { Marker } from 'react-leaflet';
import L from 'leaflet';

const MapMarker = ({ position, children }) => {
  // Custom ISS Icon
  const issIcon = L.icon({
    iconUrl: 'https://img.icons8.com/color/48/iss.png', // ISS icon from icons8
    iconSize: [48, 48],
    iconAnchor: [24, 24],
  });

  return (
    <Marker position={position} icon={issIcon}>
      {children}
    </Marker>
  );
};

export { MapMarker };
