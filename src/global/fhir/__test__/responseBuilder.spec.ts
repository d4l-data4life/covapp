import {
  buildQuestionnaireResponse,
  FHIRQuestionnaire,
  FHIRQuestionnaireItem,
  FHIRQuestionnaireResponse,
  FHIRPublicationStatus,
  FHIRQuestionnaireResponseStatus,
  FHIRValueSet,
} from '../index';

import EXAMPLE_COVAPP_QUESTIONNAIRE from './data/example-covapp-questionnaire.json';
import EXAMPLE_COVAPP_RESPONSE_0 from './data/example-covapp-response-0.json';
import EXAMPLE_COVAPP_RESPONSE_1 from './data/example-covapp-response-1.json';

let exampleCovAppQuestionnaire: FHIRQuestionnaire = {
  ...EXAMPLE_COVAPP_QUESTIONNAIRE,
  status: EXAMPLE_COVAPP_QUESTIONNAIRE.status as FHIRPublicationStatus,
  item: EXAMPLE_COVAPP_QUESTIONNAIRE.item as FHIRQuestionnaireItem[],
  contained: (EXAMPLE_COVAPP_QUESTIONNAIRE.contained as unknown) as FHIRValueSet[],
};

let validCovAppResponse0: FHIRQuestionnaireResponse = {
  ...EXAMPLE_COVAPP_RESPONSE_0,
  status: EXAMPLE_COVAPP_RESPONSE_0.status as FHIRQuestionnaireResponseStatus,
};

let validCovAppResponse1: FHIRQuestionnaireResponse = {
  ...EXAMPLE_COVAPP_RESPONSE_1,
  status: EXAMPLE_COVAPP_RESPONSE_1.status as FHIRQuestionnaireResponseStatus,
};

const answers0: { [key: string]: string | string[] } = {
  P0: '4',
  P2: '0',
  P3: '1',
  P4: '2',
  P5: '1',
  P6: '1',
  C0: '1',
  S0: '1',
  S1: '1',
  X0: [],
  X2: [],
  SB: '1',
  D0: '1',
  D1: '1',
  D2: '1',
  D3: '1',
  M0: '1',
  M1: '1',
  M2: '1',
};
const answers1: { [key: string]: string | string[] } = {
  P0: '5',
  P2: '1',
  P3: '1',
  P4: '1',
  P5: '1',
  P6: '2',
  C0: '0',
  CZ: '2020.05.20',
  S0: '0',
  S2: '6',
  X0: ['0', '1'],
  X2: ['4', '3', '2', '5', '1'],
  SB: '0',
  SZ: '2020.05.22',
  D0: '0',
  D1: '0',
  D2: '2',
  D3: '2',
  M0: '1',
  M1: '0',
  M2: '1',
};

describe('Create FHIR questionnaire response', () => {
  it('should return a valid response', async () => {
    const response = buildQuestionnaireResponse(
      { ...answers0 },
      { ...exampleCovAppQuestionnaire }
    );

    delete response['authored'];
    delete validCovAppResponse0['authored'];

    expect(response).toStrictEqual(validCovAppResponse0);
  });

  it('should return a valid response with correctly formated dates', async () => {
    const response = buildQuestionnaireResponse(
      { ...answers1 },
      { ...exampleCovAppQuestionnaire }
    );

    delete response['authored'];
    delete validCovAppResponse1['authored'];

    expect(response).toStrictEqual(validCovAppResponse1);
  });
});
