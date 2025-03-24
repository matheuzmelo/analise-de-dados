import { ChartProps } from "@/Types/ChartGeneral.type"
import { Scatter } from "react-chartjs-2"

export const ChartScatter = ({data, options}: ChartProps) => {
    <div className='flex justify-center items-center max-h-[432px]'>
        <Scatter data={data} options={options} />
    </div>
}
