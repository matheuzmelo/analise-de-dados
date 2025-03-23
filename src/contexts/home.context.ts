import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';

interface WhitelabelContextProps {
  issPosition: { lat: number; lng: number };
  populationData: { region: string; population: number }[];
  loading: boolean;
  error: string;
  fetchIssPosition: () => void;
  fetchPopulationData: () => void;
}

const WhitelabelContext = createContext<WhitelabelContextProps | undefined>(undefined);

export const WhitelabelProvider = ({ children }: { children: ReactNode }) => {
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

    // Update ISS position every 5 seconds
    const interval = setInterval(fetchIssPosition, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <WhitelabelContext.Provider value={{ issPosition, populationData, loading, error, fetchIssPosition, fetchPopulationData }}>
      {children}
    </WhitelabelContext.Provider>
  );
};

export const useWhitelabel = (): WhitelabelContextProps => {
  const context = useContext(WhitelabelContext);
  if (!context) {
    throw new Error('useWhitelabel must be used within a WhitelabelProvider');
  }
  return context;
};
