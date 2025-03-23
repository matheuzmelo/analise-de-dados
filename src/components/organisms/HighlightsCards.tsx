import { CalendarBlank, Magnify, MathCompass } from "mdi-material-ui"

interface HighlightsCardsProps {
    year_tri_init: string;
    year_tri_end: string;
    result: number;
    metric_unit: string;
}
export const HighlightsCards = ({year_tri_init, year_tri_end, result, metric_unit}: HighlightsCardsProps) => {
    return (
        <div className='w-full grid grid-cols-3 gap-4 my-8 text-xs sm:text-sm pt-3 sm:pt-0 max-w-screen-xl sm:-mb-8'>
            <div className='bg-white p-4 rounded-lg flex items-center gap-4'><div className='w-10 grid place-items-center'><CalendarBlank fontSize='small' className='text-3xl text-gray-800'/></div><p className='text-gray-800 text-base'>Dados de <span className='text-sky-900 font-extrabold'>{year_tri_init}</span> até <span className='text-sky-900 font-extrabold'>{year_tri_end}</span></p></div>
            <div className='bg-white p-4 rounded-lg flex items-center gap-4'><div className='w-10 grid place-items-center'><Magnify fontSize='small' className='text-3xl text-gray-800'/></div><p className='text-gray-800 text-base'>Números de resultados: <span className='text-sky-900 font-extrabold'>{result}</span></p></div>
            <div className='bg-white p-4 rounded-lg flex items-center gap-4'><div className='w-10 grid place-items-center'><MathCompass fontSize='small' className='text-3xl text-gray-800'/></div><p className='text-gray-800 text-base'>Unidade de medida: <span className='text-sky-900 font-extrabold'>{metric_unit}</span></p></div>
        </div>
    )
}
