import { Popup } from 'react-leaflet';

const MapPopup = ({ children }) => {
  return <Popup>{children}</Popup>;
};

export { MapPopup };
