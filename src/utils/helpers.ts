import { Icon } from 'next/dist/lib/metadata/types/metadata-types';
import { dataReturn, dataInfo, getYearsFromUrl } from './ibgeAPI';

export const checkData = (data: dataReturn | null | undefined): boolean => (
  !!(data && data.data && data.data[0] && data.data[0].value)
)

export const checkMaxYears = (dataOption: string): boolean => (
  getYearsFromUrl(dataInfo[dataOption].link).length > 40
)

export const getDadoTypeIcon = (type: string): Icon => {
  switch (type) {
    case 'Demográfico':
      return 'Demographic'
    case 'Econômico':
      return 'Economic'
    case 'Social':
      return 'Social'
    case 'Ambiental':
      return 'Environmental'
    case 'Educação':
      return 'Education'
    case 'Saúde':
      return 'Health'
    case 'Segurança':
      return 'Security'
    case 'Trabalho':
      return 'Work'
    case 'Habitação':
      return 'Housing'
    case 'Cultura':
      return 'Culture'
    case 'Turismo':
      return 'Tourism'
    case 'Transporte':
      return 'Transport'
    case 'Agricultura':
      return 'Agriculture'
    case 'Indústria':
      return 'Industry'
    case 'Comércio':
      return 'Commerce'
    case 'Serviços':
      return 'Services'
    case 'Finanças':
      return 'Finance'
    case 'Administração':
      return 'Administration'
    case 'Justiça':
      return 'Justice'
    case 'Comunicação':
      return 'Communication'
    case 'Ciência':
      return 'Science'
    case 'Tecnologia':
      return 'Technology'
    case 'Religião':
      return 'Religion'
    case 'Esporte':
      return 'Sport'
    case 'Lazer':
      return 'Leisure'
    default:
        return 'Other'
    }
}

export const getRegiaoByLevel = (level: number): string => {
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
