import { Autocomplete, CircularProgress, Popper, TextField } from '@mui/material';
import { useTheme } from '@mui/material';
import ListboxComponent from '@/components/Listbox';
import { getRegiaoByLevel } from '../utils/helpers';

interface LocationAutocompleteProps {
  location: string;
  locationOptions: { [key: string]: string };
  setLocation: (location: string) => void;
  setData: (data: any) => void;
}

const LocationAutocomplete = ({ location, locationOptions, setLocation, setData }: LocationAutocompleteProps) => {
  const theme = useTheme();

  const handleChangeLocation = (event: React.SyntheticEvent<Element, Event>, newValue: string | null) => {
    if (newValue !== null) {
      setLocation(newValue);
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
              borderRadius: '2px',
            },
            '& .MuiAutocomplete-listbox::-webkit-scrollbar-track': {
              backgroundColor: 'rgba(60, 60, 80)',
            },
          }}
        />)}
      disableClearable
      disablePortal
      ListboxComponent={ListboxComponent}
      disableListWrap
      value={location}
      onChange={handleChangeLocation}
      loading={Object.keys(locationOptions).length === 0}
      groupBy={(option) => getRegiaoByLevel(parseInt(locationOptions[option].substring(1, 3)))}
      options={Object.keys(locationOptions)}
      renderInput={(params) => <TextField {...params} label="Localização"
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <>
              {Object.keys(locationOptions).length === 0 ? <CircularProgress color="secondary" size={20} /> : null}
              {params.InputProps.endAdornment}
            </>
          ),
        }} />}
    />
  );
}

export default LocationAutocomplete;
