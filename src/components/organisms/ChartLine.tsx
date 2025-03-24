import { ChartProps } from "@/Types/ChartGeneral.type"
import { Line } from "react-chartjs-2"



export const ChartLine = ({data, options}: ChartProps) => {
    return (
        <div className='flex justify-center items-center flex-col max-h-[432px]'>
            <Line data={data} options={options} />
        </div>
    )
}
