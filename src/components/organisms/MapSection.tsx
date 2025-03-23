import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Map } from '@/components/molecules/Map';
import { MapMarker } from '@/components/atoms/MapMarker';
import { MapPopup } from '@/components/atoms/MapPopup';
import 'leaflet/dist/leaflet.css';

const MapSection = ({ issPosition }) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>ISS Position and Population Data</CardTitle>
        <CardDescription>
          Track the International Space Station (ISS) and compare it with population data from Brazil.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[500px] w-full">
          <Map center={[-15, -55]} zoom={4}>
            <MapMarker position={[issPosition.lat, issPosition.lng]}>
              <MapPopup>
                <strong>ISS Position</strong>
                <br />
                Latitude: {issPosition.lat.toFixed(4)}
                <br />
                Longitude: {issPosition.lng.toFixed(4)}
              </MapPopup>
            </MapMarker>
          </Map>
        </div>
      </CardContent>
    </Card>
  );
};

export { MapSection };
