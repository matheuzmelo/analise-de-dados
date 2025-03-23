import { Line } from "react-chartjs-2"

interface ChartLineProps {
    data: any;
    options: any;
}

export const ChartLine = ({data, options}: ChartLineProps) => {
    return (
        <div className='flex justify-center items-center flex-col max-h-[432px]'>
            <Line data={data} options={options} />
        </div>
    )
}
