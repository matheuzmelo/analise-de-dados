import { useEffect } from 'react';
import { useWhitelabel } from '@/contexts/home.context';
import { MapSection } from '@/components/organisms/MapSection';
import { PopulationDataSection } from '@/components/organisms/PopulationDataSection';

const Home = () => {
  const { issPosition, populationData, loading, error, fetchIssPosition, fetchPopulationData } = useWhitelabel();

  useEffect(() => {
    fetchIssPosition();
    fetchPopulationData();

    // Update ISS position every 5 seconds
    const interval = setInterval(fetchIssPosition, 5000);
    return () => clearInterval(interval);
  }, [fetchIssPosition, fetchPopulationData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Dados de espaço e população</h1>
      <MapSection issPosition={issPosition} />
      <PopulationDataSection populationData={populationData} />
    </div>
  );
};

export default Home;
