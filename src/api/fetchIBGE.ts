import axios from "axios";

export type DataPoint = {
    value: string;
    name: string;
};

export type DataResponse = {
    data: DataPoint[];
    name: string;
    unit: string;
};

const fetchIBGEData = async (url: string): Promise<DataResponse | null> => {
    try {
        const response = await axios.get(url);
        const data = response.data[0];

        return {
            data: Object.entries(data.resultados[0].series[0].serie).map(([key, value]) => ({
                name: key,
                value: value as string,
            })),
            name: data.variavel,
            unit: data.unidade,
        };
    } catch (error) {
        console.error("Error fetching IBGE data:", error);
        return null;
    }
};

export { fetchIBGEData };
