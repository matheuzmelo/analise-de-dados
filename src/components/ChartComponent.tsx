import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { createChartData, createOptions, getDadoIbgeByFullURL } from "../api/IBGE";


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const ChartComponent: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null);
  const [chartOptions, setChartOptions] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const location = "Brasil";
        const selectedItem = "Produção de Leite"; // Change for different datasets
        const dataItem = dataInfo[selectedItem];

        if (!dataItem) {
          console.error("Invalid data selection");
          return;
        }

        const data = await getDadoIbgeByFullURL(
          dataItem.link,
          location,
          { Brasil: "N1[1]" },
          dataItem.percentage,
          dataItem.months
        );

        if (data) {
          setChartData(createChartData(data));
          setChartOptions(createOptions(data, true, true));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>IBGE Data Chart</h2>
      {loading ? <p>Loading...</p> : chartData ? <Line data={chartData} options={chartOptions} /> : <p>No data available</p>}
    </div>
  );
};
