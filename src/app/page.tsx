'use client'
import { ChartLine } from '@/components/organisms/ChartLine';
import { Filters } from '@/components/organisms/Filters';
import { HighlightsCards } from '@/components/organisms/HighlightsCards';
import { CircularProgress, useMediaQuery, useTheme } from '@mui/material';
import { ArcElement, BarElement, CategoryScale, Chart, Filler, Legend, LinearScale, LineElement, PointElement, RadialLinearScale, Title, Tooltip } from 'chart.js';
import AccountMultipleOutline from 'mdi-material-ui/AccountMultipleOutline';
import Cow from 'mdi-material-ui/Cow';
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd';
import MagnifyRemoveOutline from 'mdi-material-ui/MagnifyRemoveOutline';
import { useEffect, useState } from 'react';
import { Bar, PolarArea, Scatter } from 'react-chartjs-2';
import { createChartData, createOptions, dataInfo, dataReturn, getAllLocalities, getDadoIbgeByFullURL, getYearsFromUrl } from '../utils/ibgeAPI';
import { ChartScatter } from '@/components/organisms/ChartScatter';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Title, Tooltip, Legend, BarElement, RadialLinearScale, ArcElement);

interface LocationOptions {
  [key: string]: string;
}

const checkData = (data: dataReturn | null | undefined): boolean => (
  !!(data && data.data && data.data[0] && data.data[0].value)
)

const checkMaxYears = (dataOption: string): boolean => (
  getYearsFromUrl(dataInfo[dataOption].link).length > 40
)

const getDadoTypeIcon = (type: string) => {
  switch (type) {
    case 'Dados Agropecuários':
      return <Cow className='mr-2' fontSize='small' />
    case 'Dados Demográficos':
      return <AccountMultipleOutline className='mr-2' fontSize='small' />
    case 'Dados Econômicos':
      return <CurrencyUsd className='mr-2' fontSize='small' />
    default: return <></>
  }
}

const getRegiaoByLevel = (level: number): string => {
  switch (level) {
    case 1:
      return 'País'
    case 3:
      return 'Estados'
    case 6:
      return 'Cidades'
  }
  return 'Outras Localidades'
}

export default function IBGEDataPage() {
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
      <div className='w-full p-3'>
        <h1 className='text-4xl text-white font-bold my-3 text-center'>Relatório geral de dados IBGE</h1>
      </div>
      <Filters
        location={location}
        locationOptions={locationOptions}
        dataOption={dataOption}
        dataInfo={dataInfo}
        filteredData={filteredData}
        isPercentage={isPercentage}
        isMaxYears={isMaxYears}
        isContrast={isContrast}
        handleChangeLocation={handleChangeLocation}
        handleChangeDataOption={handleChangeDataOption}
        handleChangeIsPercentage={handleChangeIsPercentage}
        handleChangeIsMaxYear={handleChangeIsMaxYear}
        handleChangeIsContrast={handleChangeIsContrast}
        getRegiaoByLevel={getRegiaoByLevel}
        getDadoTypeIcon={getDadoTypeIcon}
        checkData={checkData}
        checkMaxYears={checkMaxYears}
      />
      {filteredData && checkData(filteredData) && (
        <>
          <HighlightsCards year_tri_init={filteredData.data[0].name} year_tri_end={filteredData.data[filteredData.data.length - 1].name} result={filteredData.data.length} metric_unit={filteredData.unit.toLocaleLowerCase()} />

          <div className='max-w-[1300px] grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-center items-center w-full sm:h-auto gap-4 grid-rows-2'>

            <ChartLine data={createChartData(filteredData, isContrast)} options={createOptions(filteredData, true, true)} />

            <ChartScatter data={createChartData(filteredData, isContrast, true)} options={createOptions(filteredData, true, true)} />

            <div className='lg:col-span-2 lg:row-span-2 flex justify-center items-center max-h-[564px]'>
              <PolarArea data={createChartData(filteredData, isContrast)} options={createOptions(filteredData)} />
            </div>
            <div className='flex justify-center items-center col-span-1 lg:col-span-2 max-h-[432px]'>
              <Bar data={createChartData(filteredData, isContrast)} options={createOptions(filteredData, true, true)} />
            </div>
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
