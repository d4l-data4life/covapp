import { QUESTION } from '../questions';

export const DATE_ANSWERS = [QUESTION.CONTACT_DATE, QUESTION.SYMPTOM_DATE];

export const AGE_VALUESET = {
  '0': 'below-40',
  '1': '40-50',
  '2': '51-60',
  '3': '61-70',
  '4': '71-80',
  '5': 'above-80',
};

export const FEVER_VALUESET = {
  '0': 'below-38C',
  '1': '38C',
  '2': '39C',
  '3': '40C',
  '4': '41C',
  '5': '42C',
  '6': 'above-42C',
  '7': 'LA12688-0',
};

export const HOUSING_VALUESET = {
  '0': 'LA6255-9',
  '1': 'LA9996-5',
};

export const WORKSPACE_VALUESET = {
  '0': 'medical',
  '1': 'community',
  '2': 'LA46-8',
};

export const PREGNANCY_VALUESET = {
  '0': 'LA15173-0',
  '1': 'LA26683-5',
  '2': 'LA4489-6',
};

export const YES_NO_VALUESET = {
  '0': 'LA33-6',
  '1': 'LA32-8',
  '2': 'LA12688-0',
};

export const CATEGORIES_VALUESET = {
  P: 'Persöhnliche Informationen',
  C: 'Kontakte zu Covid-19-Fällen',
  S: 'Symptome',
  D: 'Chronische Erkrankungen',
  M: 'Medikation',
};
