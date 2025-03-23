import { Autocomplete, Popper, TextField } from '@mui/material';
import { useTheme } from '@mui/material';
import { dataInfo } from '../utils/ibgeAPI';
import { getDadoTypeIcon, checkMaxYears } from '../utils/helpers';

interface DataOptionAutocompleteProps {
  dataOption: string;
  setDataOption: (dataOption: string) => void;
  setIsPercentage: (isPercentage: boolean) => void;
  setIsMaxYears: (isMaxYears: boolean) => void;
  setData: (data: any) => void;
}

const DataOptionAutocomplete = ({ dataOption, setDataOption, setIsPercentage, setIsMaxYears, setData }: DataOptionAutocompleteProps) => {
  const theme = useTheme();

  const handleChangeDataOption = (event: React.SyntheticEvent<Element, Event>, newValue: string | null) => {
    if (newValue !== null) {
      setDataOption(newValue);
      if (!dataInfo[newValue].percentage) {
        setIsPercentage(false);
      }
      if (!checkMaxYears(newValue)) {
        setIsMaxYears(false);
      }
      setData(undefined);
    }
  };

  return (
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
              borderRadius: '4px',
            },
            '& .MuiAutocomplete-listbox::-webkit-scrollbar-track': {
              backgroundColor: 'rgba(60, 60, 80)',
            },
          }}
        />)}
      renderGroup={(params) => {
        return (
          <li key={params.key}>
            <div className='sticky -top-2 py-2 px-10 font-semibold flex items-center' style={{ backgroundColor: 'rgba(60, 60, 80)' }}>{getDadoTypeIcon(params.group)} {params.group}</div>
            <ul>{params.children}</ul>
          </li>)
      }}
      disableClearable
      disablePortal
      value={dataOption}
      onChange={handleChangeDataOption}
      groupBy={(option) => dataInfo[option].type}
      options={Object.keys(dataInfo)}
      renderInput={(params) => <TextField {...params} label="Dados" />}
    />
  );
}

export default DataOptionAutocomplete;
