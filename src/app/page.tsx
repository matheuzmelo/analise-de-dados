'use client'
import { useState, useEffect } from 'react';
import { getDadoIbgeByFullURL, dataReturn, dataInfo, getAllLocalities } from '../utils/ibgeAPI';
import { useTheme, useMediaQuery } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { CalendarBlank, Magnify, MagnifyRemoveOutline, MathCompass, CursorDefaultOutline, GestureTap } from 'mdi-material-ui';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Filler, Title, Tooltip, Legend, RadialLinearScale, ArcElement } from 'chart.js';
import LocationAutocomplete from '@/components/LocationAutocomplete';
import DataOptionAutocomplete from '@/components/DataOptionAutocomplete';
import DataOptions from '@/components/DataOptions';
import Charts from '@/components/Charts';
import { checkData, checkMaxYears } from '../utils/helpers';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Title, Tooltip, Legend, BarElement, RadialLinearScale, ArcElement);

function IBGEDataPage() {
  const theme = useTheme();
  const [data, setData] = useState<dataReturn | null | undefined>();
  const [filteredData, setFilteredData] = useState<dataReturn | null | undefined>();
  const [dataOption, setDataOption] = useState<string>(Object.keys(dataInfo)[0]);
  const [locationOptions, setLocationOptions] = useState<{ [key: string]: string }>({});
  const [location, setLocation] = useState<string>("Brasil")
  const [isPercentage, setIsPercentage] = useState<boolean>(false);
  const [isMaxYears, setIsMaxYears] = useState<boolean>(false);
  const [isContrast, setIsContrast] = useState<boolean>(false);

  const isBiggerThanLg = useMediaQuery(theme.breakpoints.up('lg'))

  useEffect(() => {
    const fetchData = async () => {
      if (Object.keys(locationOptions).length > 0) {
        setData(await getDadoIbgeByFullURL(dataInfo[dataOption].link, location, locationOptions, isPercentage ? dataInfo[dataOption].percentage : undefined, dataInfo[dataOption].months));
      }
    }
    if (dataOption) {
      fetchData();
    }
  }, [dataOption, location, locationOptions, isPercentage]);

  useEffect(() => {
    if (data) {
      const cloneData = { ...data }
      cloneData.data = cloneData.data.filter((_, index) => index % (isMaxYears ? 4 : 1) === 0)
      setFilteredData(cloneData)
    } else {
      setFilteredData(data)
    }
  }, [isMaxYears, data])

  useEffect(() => {
    const fetchData = async () => {
      const localities = await getAllLocalities()
      setLocationOptions(localities);
    }
    fetchData()
  }, [])

  return (
    <div className='h-full flex flex-col items-center w-full px-3'>
      <h1 className='text-4xl text-white font-bold my-3 text-center'>Dados do IBGE</h1>
      <div className='flex flex-col space-y-2 w-full items-center justify-center sm:flex-row sm:space-x-4 sm:space-y-0 pb-2'>
        <LocationAutocomplete
          location={location}
          locationOptions={locationOptions}
          setLocation={setLocation}
          setData={setData}
        />
        <DataOptionAutocomplete
          dataOption={dataOption}
          setDataOption={setDataOption}
          setIsPercentage={setIsPercentage}
          setIsMaxYears={setIsMaxYears}
          setData={setData}
        />
        <DataOptions
          dataOption={dataOption}
          filteredData={filteredData}
          isPercentage={isPercentage}
          setIsPercentage={setIsPercentage}
          isMaxYears={isMaxYears}
          setIsMaxYears={setIsMaxYears}
          isContrast={isContrast}
          setIsContrast={setIsContrast}
        />
      </div>
      {filteredData && checkData(filteredData) && (
        <>
          <div className='w-full flex flex-col text-xs sm:text-sm pt-3 sm:pt-0 max-w-screen-xl sm:-mb-8'>
            <p><CalendarBlank fontSize='small' /> Dados de <span style={{ color: theme.palette.primary.light }} className='font-semibold'>{filteredData.data[0].name}</span> até <span style={{ color: theme.palette.primary.light }} className='font-semibold'>{filteredData.data[filteredData.data.length - 1].name}</span></p>
            <p><Magnify fontSize='small' /> Números de resultados: {filteredData.data.length}</p>
            <p><MathCompass fontSize='small' /> Unidade de medida: {filteredData.unit.toLocaleLowerCase()}</p>
          </div>
          <Charts filteredData={filteredData} isContrast={isContrast} />
          <div className='p-3 lg:p-0'>
            <p className='text-xs opacity-60 text-center'>{isBiggerThanLg
              ? <>Arraste o mouse por cima dos gráficos para mais informação <CursorDefaultOutline fontSize='small' /></>
              : <>Toque nos gráficos para mais informação <GestureTap fontSize='small' /></>} </p>
          </div>
        </>
      )}

      {filteredData === undefined && (
        <div className='fixed h-screen items-center flex'>
          <CircularProgress color='secondary' />
        </div>
      )}

      {(filteredData === null || filteredData && !checkData(filteredData)) && (
        <div className='h-[50vh] sm:h-[80vh] items-center justify-center flex flex-col space-y-4 text-center'>
          <p>{location === "" || location === null ? "Selecione uma localidade primeiro." : `Não foi encontrado esses dados do IBGE em ${location}`}</p>
          <MagnifyRemoveOutline fontSize='medium' />
        </div>
      )}
    </div>
  );
}

export default IBGEDataPage;
