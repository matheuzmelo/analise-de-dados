import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Home = () => {
  const [issPosition, setIssPosition] = useState({ lat: 0, lng: 0 });
  const [populationData, setPopulationData] = useState<{ region: string; population: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch ISS Position from Open Notify API
  const fetchIssPosition = async () => {

    try {
      const response = await axios.get('http://api.open-notify.org/iss-now.json');
      const { latitude, longitude } = response.data.iss_position;
      setIssPosition({
        lat: latitude,
        lng: longitude,
      });
    } catch (err) {
      setError('Failed to fetch ISS position.');
    }
  };

  // Fetch Population Data from IBGE API
  const fetchPopulationData = async () => {
    try {
      const response = await axios.get(
        'https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/-6/variaveis/9324?localidades=N1[all]'
      );
      const formattedData = response.data[0].resultados[0].series.map((serie: any) => ({
        region: serie.localidade.nome,
        population: serie.serie['2020']
      }));
      setPopulationData(formattedData);
    } catch (err) {
      setError('Failed to fetch population data.');
    }
  };

  useEffect(() => {
    fetchIssPosition();
    fetchPopulationData();
    setLoading(false);

    // Atualiza a posição da ISS a cada 5 segundos
    const interval = setInterval(fetchIssPosition, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Custom ISS Icon
  const issIcon = L.icon({
    iconUrl: 'https://img.icons8.com/color/48/iss.png', // ISS icon from icons8
    iconSize: [48, 48],
    iconAnchor: [24, 24],
  });

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Space and Population Dashboard</h1>

      {/* Map Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>ISS Position and Population Data</CardTitle>
          <CardDescription>
            Track the International Space Station (ISS) and compare it with population data from Brazil.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[500px] w-full">
            <MapContainer
              center={[-15, -55]} // Center on Brazil
              zoom={4}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[issPosition.lat, issPosition.lng]} icon={issIcon}>
                <Popup>
                  <strong>ISS Position</strong>
                  <br />
                  Latitude: {issPosition.lat.toFixed(4)}
                  <br />
                  Longitude: {issPosition.lng.toFixed(4)}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </CardContent>
      </Card>

      {/* Population Data Section */}
      <Card>
        <CardHeader>
          <CardTitle>Population Data by Region (Brazil)</CardTitle>
          <CardDescription>
            Latest population projections for Brazilian regions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Region
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Population (2023)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {populationData.map((data, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.region}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.population.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
