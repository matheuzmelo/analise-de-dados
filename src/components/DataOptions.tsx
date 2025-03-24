import { Checkbox, Tooltip as TooltipMUI } from '@mui/material';
import { PercentBox, DivisionBox, StarFourPointsBox, Cancel } from 'mdi-material-ui';
import { dataInfo } from '../utils/ibgeAPI';
import { checkData, checkMaxYears } from '../utils/helpers';

interface DataOptionsProps {
  dataOption: string;
  filteredData: any;
  isPercentage: boolean;
  setIsPercentage: (isPercentage: boolean) => void;
  isMaxYears: boolean;
  setIsMaxYears: (isMaxYears: boolean) => void;
  isContrast: boolean;
  setIsContrast: (isContrast: boolean) => void;
}

const DataOptions = ({ dataOption, filteredData, isPercentage, setIsPercentage, isMaxYears, setIsMaxYears, isContrast, setIsContrast }: DataOptionsProps) => {
  const handleChangeIsPercentage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPercentage(event.target.checked);
  };

  const handleChangeIsMaxYear = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsMaxYears(event.target.checked);
  };

  const handleChangeIsContrast = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsContrast(event.target.checked);
  };

  return (
    <div className='flex flex-col sm:flex-row'>
      <TooltipMUI enterTouchDelay={0} leaveTouchDelay={5000} title={
        <>
          <div className='text-center'>Percentual do total geral</div>
          <span className='text-[0.65rem] text-center'>{dataInfo[dataOption].percentage && checkData(filteredData) ? "" : <><Cancel className='white' fontSize='small' /> | esse tipo de dado não suporta</>}</span>
        </>
      } placement='top'>
        <div className='flex flex-row items-center justify-center w-full sm:w-auto sm:flex-col max-w-[340px] space-x-2 sm:space-x-0'>
          <PercentBox style={{ color: dataInfo[dataOption].percentage && checkData(filteredData) ? 'white' : 'rgba(120, 120, 160, 0.7)' }} fontSize='medium' />
          <Checkbox
            disabled={!(dataInfo[dataOption].percentage && checkData(filteredData))}
            checked={isPercentage}
            onChange={handleChangeIsPercentage}
          />
        </div>
      </TooltipMUI>
      <TooltipMUI enterTouchDelay={0} leaveTouchDelay={5000}
        title={
          <>
            <div className='text-center'>Mostrar 1/4  dos dado</div>
            <span className='text-[0.65rem] text-center'>{checkMaxYears(dataOption) && checkData(filteredData) ? "" : <><Cancel className='white' fontSize='small' /> | há poucos dados</>}</span>
          </>
        } placement='top'>
        <div className='flex flex-row items-center justify-center w-full sm:w-auto sm:flex-col max-w-[340px] space-x-2 sm:space-x-0'>
          <DivisionBox style={{ color: checkMaxYears(dataOption) && checkData(filteredData) ? 'white' : 'rgba(120, 120, 160, 0.7)' }} fontSize='medium' />
          <Checkbox
            disabled={!(checkMaxYears(dataOption) && checkData(filteredData))}
            checked={isMaxYears}
            onChange={handleChangeIsMaxYear}
          />
        </div>
      </TooltipMUI>
      <TooltipMUI enterTouchDelay={0} leaveTouchDelay={5000} title={`${isContrast ? 'Diminuir contraste' : 'Aumentar contraste'}`} placement='top'>
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
  );
}

export default DataOptions;
