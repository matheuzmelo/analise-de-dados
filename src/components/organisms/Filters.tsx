import React, { ReactNode } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Popper from '@mui/material/Popper';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Checkbox from '@mui/material/Checkbox';
import TooltipMUI from '@mui/material/Tooltip';
import ListboxComponent from '../Listbox';
import { useTheme } from '@emotion/react';
import { Cancel, DivisionBox, PercentBox, StarFourPointsBox } from 'mdi-material-ui';

interface FiltersProps {
    location: string;
    locationOptions: LocationOptions;
    dataOption: string;
    dataInfo: DataInfo;
    filteredData: dataReturn | null | undefined;
    isPercentage: boolean;
    isMaxYears: boolean;
    isContrast: boolean;
    handleChangeLocation: (event: React.SyntheticEvent, value: string | null) => void;
    handleChangeDataOption: (event: React.SyntheticEvent, value: string | null) => void;
    handleChangeIsPercentage: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeIsMaxYear: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeIsContrast: (event: React.ChangeEvent<HTMLInputElement>) => void;
    getRegiaoByLevel: (level: number) => string;
    getDadoTypeIcon: (type: string) => ReactNode;
    checkData: (data: dataReturn | null | undefined) => boolean;
    checkMaxYears: (dataOption: string) => boolean;
}
export const Filters = ({
  location,
  locationOptions,
  dataOption,
  dataInfo,
  filteredData,
  isPercentage,
  isMaxYears,
  isContrast,
  handleChangeLocation,
  handleChangeDataOption,
  handleChangeIsPercentage,
  handleChangeIsMaxYear,
  handleChangeIsContrast,
  getRegiaoByLevel,
  getDadoTypeIcon,
  checkData,
  checkMaxYears,
}: FiltersProps) => {
    const theme = useTheme()

    return (
        <div className='flex justify-between w-full max-w-7xl items-center sm:flex-row sm:space-x-4 sm:space-y-0 pb-2'>
            <div className='grid grid-cols-2 gap-4'>
                <Autocomplete
                PopperComponent={(props) => (
                    <Popper
                    {...props}
                    sx={{
                        '& .MuiAutocomplete-listbox::-webkit-scrollbar': {
                        width: '8px',
                        },
                        '& .MuiAutocomplete-listbox::-webkit-scrollbar-thumb': {
                        backgroundColor: theme.palette.primary.light,
                        borderRadius: '2px',
                        },
                        '& .MuiAutocomplete-listbox::-webkit-scrollbar-track': {
                        backgroundColor: 'rgba(60, 60, 80)',
                        },
                    }}
                    />
                )}
                disableClearable
                disablePortal
                ListboxComponent={ListboxComponent}
                disableListWrap
                value={location}
                onChange={handleChangeLocation}
                loading={Object.keys(locationOptions).length === 0}
                groupBy={(option) => getRegiaoByLevel(parseInt(locationOptions[option].substring(1, 3)))}
                renderGroup={(params) => params as unknown as ReactNode}
                options={Object.keys(locationOptions)}
                renderOption={(props, option, state) =>
                    [props, option, state.index] as React.ReactNode
                }
                sx={{
                    width: { xs: "100%", md: 340 },
                    maxWidth: 340,
                }}
                renderInput={(params) => (
                    <TextField
                    {...params}
                    label="Localização"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                        <>
                            {Object.keys(locationOptions).length === 0 ? (
                            <CircularProgress color="secondary" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                        </>
                        ),
                    }}
                    />
                )}
                />
                <Autocomplete
                PopperComponent={(props) => (
                    <Popper
                    {...props}
                    sx={{
                        '& .MuiAutocomplete-listbox::-webkit-scrollbar': {
                        width: '8px',
                        },
                        '& .MuiAutocomplete-listbox::-webkit-scrollbar-thumb': {
                        backgroundColor: theme?.palette.primary.light,
                        borderRadius: '4px',
                        },
                        '& .MuiAutocomplete-listbox::-webkit-scrollbar-track': {
                        backgroundColor: 'rgba(60, 60, 80)',
                        },
                    }}
                    />
                )}
                renderGroup={(params) => {
                    return (
                    <li key={params.key}>
                        <div className='sticky -top-2 py-2 px-10 font-semibold flex items-center' style={{ backgroundColor: 'rgba(60, 60, 80)' }}>
                        {getDadoTypeIcon(params.group)} {params.group}
                        </div>
                        <ul>{params.children}</ul>
                    </li>
                    );
                }}
                disableClearable
                disablePortal
                value={dataOption}
                onChange={handleChangeDataOption}
                groupBy={(option) => dataInfo[option].type}
                options={Object.keys(dataInfo)}
                sx={{
                    width: { xs: "100%", md: 340 },
                    maxWidth: 340,
                }}
                renderInput={(params) => <TextField {...params} label="Dados" />}
                />
            </div>
            <div className='flex flex-col sm:flex-row'>
                <TooltipMUI
                enterTouchDelay={0}
                leaveTouchDelay={5000}
                title={
                    <>
                    <div className='text-center'>Percentual do total geral</div>
                    <span className='text-[0.65rem] text-center'>
                        {dataInfo[dataOption].percentage && checkData(filteredData) ? (
                        ""
                        ) : (
                        <>
                            <Cancel className='white' fontSize='small' /> | esse tipo de dado não suporta
                        </>
                        )}
                    </span>
                    </>
                }
                placement='top'
                >
                <div className='flex flex-row items-center justify-center w-full sm:w-auto sm:flex-col max-w-[340px] space-x-2 sm:space-x-0'>
                    <PercentBox
                    style={{
                        color: dataInfo[dataOption].percentage && checkData(filteredData)
                        ? 'white'
                        : 'rgba(120, 120, 160, 0.7)',
                    }}
                    fontSize='medium'
                    />
                    <Checkbox
                    disabled={!(dataInfo[dataOption].percentage && checkData(filteredData))}
                    checked={isPercentage}
                    onChange={handleChangeIsPercentage}
                    />
                </div>
                </TooltipMUI>
                <TooltipMUI
                enterTouchDelay={0}
                leaveTouchDelay={5000}
                title={
                    <>
                    <div className='text-center'>Mostrar 1/4 dos dado</div>
                    <span className='text-[0.65rem] text-center'>
                        {checkMaxYears(dataOption) && checkData(filteredData) ? (
                        ""
                        ) : (
                        <>
                            <Cancel className='white' fontSize='small' /> | há poucos dados
                        </>
                        )}
                    </span>
                    </>
                }
                placement='top'
                >
                <div className='flex flex-row items-center justify-center w-full sm:w-auto sm:flex-col max-w-[340px] space-x-2 sm:space-x-0'>
                    <DivisionBox
                    style={{
                        color: checkMaxYears(dataOption) && checkData(filteredData)
                        ? 'white'
                        : 'rgba(120, 120, 160, 0.7)',
                    }}
                    fontSize='medium'
                    />
                    <Checkbox
                    disabled={!(checkMaxYears(dataOption) && checkData(filteredData))}
                    checked={isMaxYears}
                    onChange={handleChangeIsMaxYear}
                    />
                </div>
                </TooltipMUI>
                <TooltipMUI
                enterTouchDelay={0}
                leaveTouchDelay={5000}
                title={`${isContrast ? 'Diminuir contraste' : 'Aumentar contraste'}`}
                placement='top'
                >
                <div className='flex flex-row items-center justify-center w-full sm:w-auto sm:flex-col max-w-[340px] space-x-2 sm:space-x-0'>
                    <StarFourPointsBox className='text-white' fontSize='medium' />
                    <Checkbox
                    className={`${isContrast ? 'bg-gradient-to-br from-green-300 via-purple-500 to-orange-600' : ''}`}
                    checked={isContrast}
                    onChange={handleChangeIsContrast}
                    />
                </div>
                </TooltipMUI>
            </div>
        </div>
    );
};
