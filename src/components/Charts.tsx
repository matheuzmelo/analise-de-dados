import { Bar, Line, PolarArea, Scatter } from 'react-chartjs-2';
import { createChartData, createOptions } from '../utils/ibgeAPI';

interface ChartsProps {
  filteredData: any;
  isContrast: boolean;
}

const Charts = ({ filteredData, isContrast }: ChartsProps) => {
  return (
    <div className='max-w-[1300px] grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-center items-center w-full sm:h-auto gap-4 grid-rows-2'>
      <div className='flex justify-center items-center flex-col max-h-[432px]'>
        <Line data={createChartData(filteredData, isContrast)} options={createOptions(filteredData, true, true)} />
      </div>
      <div className='flex justify-center items-center max-h-[432px]'>
        <Scatter data={createChartData(filteredData, isContrast, true)} options={createOptions(filteredData, true, true)} />
      </div>
      <div className='lg:col-span-2 lg:row-span-2 flex justify-center items-center max-h-[564px]'>
        <PolarArea data={createChartData(filteredData, isContrast)} options={createOptions(filteredData)} />
      </div>
      <div className='flex justify-center items-center col-span-1 lg:col-span-2 max-h-[432px]'>
        <Bar data={createChartData(filteredData, isContrast)} options={createOptions(filteredData, true, true)} />
      </div>
    </div>
  );
}

export default Charts;
