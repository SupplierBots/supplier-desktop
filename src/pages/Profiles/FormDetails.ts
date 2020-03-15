import * as Yup from 'yup';
import { Option } from 'main/types/Option';
import { Profile } from 'main/types/Profile';

const coutriesWithRegions = ['USA', 'Canada'];

export const profileValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string()
    .email('Incorrect Format')
    .required('Required'),
  telephone: Yup.string().required('Required'),
  country: Yup.object().required('Required'),
  region: Yup.object().when('country', {
    is: (country: Option) => isCountryWithRegions(country?.value),
    then: Yup.object().required(),
    otherwise: Yup.object().nullable(),
  }),
  address1: Yup.string().required('Required'),
  address2: Yup.string(),
  city: Yup.string().required('Required'),
  postcode: Yup.string().required('Required'),
  creditCardType: Yup.object().required('Required'),
  creditCardNumber: Yup.string().required('Required'),
  month: Yup.object().required('Required'),
  year: Yup.object().required('Required'),
  cvv: Yup.string().required('Required'),
  name: Yup.string().required('Required'),
  site: Yup.object().required('Required'),
});

export const initialValues: Profile = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  telephone: '',
  country: null,
  region: null,
  address1: '',
  address2: '',
  city: '',
  postcode: '',
  creditCardType: null,
  creditCardNumber: '',
  month: null,
  year: null,
  cvv: '',
  name: '',
  site: null,
};

export const countryOptions: Option[] = [
  { value: 'USA', label: 'USA' },
  { value: 'Canada', label: 'Canada' },
  { value: 'Poland', label: 'Poland' },
  { value: 'UK', label: 'UK' },
  { value: 'Germany', label: 'Germany' },
  { value: 'France', label: 'France' },
];

const usStates: Option[] = [
  { value: 'Ustate1', label: 'Ustate1' },
  { value: 'Ustate2', label: 'Ustate2' },
  { value: 'Ustate3', label: 'Ustate3' },
];

const canadaStates: Option[] = [
  { value: 'cstate1', label: 'cstate1' },
  { value: 'cstate2', label: 'cstate2' },
  { value: 'cstate3', label: 'cstate3' },
];

export const isCountryWithRegions = (country: string | undefined) =>
  country && coutriesWithRegions.includes(country);

export const getRegions = (country: string | undefined): Option[] => {
  if (!country) return [];
  switch (country) {
    case 'Canada':
      return canadaStates;
    case 'USA':
      return usStates;
    default:
      return [];
  }
};

export const creditCardTypeOptions: Option[] = [
  { value: 'visa', label: 'Visa' },
  { value: 'master', label: 'Mastercard' },
  { value: 'american', label: 'American Express' },
  { value: 'solo', label: 'Solo' },
];

export const monthOptions: Option[] = [
  { value: '01', label: '01' },
  { value: '02', label: '02' },
  { value: '03', label: '03' },
  { value: '04', label: '04' },
  { value: '05', label: '05' },
  { value: '06', label: '06' },
  { value: '07', label: '07' },
  { value: '08', label: '08' },
  { value: '09', label: '09' },
  { value: '10', label: '10' },
  { value: '11', label: '11' },
  { value: '12', label: '12' },
];

export const yearOptions: Option[] = [
  { value: '2020', label: '2020' },
  { value: '2021', label: '2021' },
  { value: '2022', label: '2022' },
  { value: '2023', label: '2023' },
  { value: '2024', label: '2024' },
  { value: '2025', label: '2025' },
  { value: '2026', label: '2026' },
  { value: '2027', label: '2027' },
  { value: '2028', label: '2028' },
];

export const siteOptions: Option[] = [
  { value: 'supreme', label: 'Supreme' },
  { value: 'palace', label: 'Palace' },
  { value: 'both', label: 'Both' },
];
