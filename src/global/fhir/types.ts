export type FHIRStatus =
  | 'in-progress'
  | 'completed'
  | 'amended'
  | 'entered-in-error'
  | 'stopped';

export type FHIRReference = {
  reference: string;
};

export type FHIRCoding = {
  system: string;
  code: string;
  display?: string;
};

export type FHIRValueCoding = {
  valueCoding: FHIRCoding;
};

export type FHIRValueDate = {
  valueDate: string;
};

export type FHIRValue = FHIRValueCoding | FHIRValueDate;

export type FHIRQuestionnaireItem = {
  linkId: string;
  text?: string;
  answer?: FHIRValue[];
  item?: FHIRQuestionnaireItem[];
};

export type FHIRQuestionnaireResponse = {
  resourceType: string;
  contained?: any;
  language: string;
  questionnaire: string;
  status: FHIRStatus;
  authored: string;
  subject?: FHIRReference;
  author?: FHIRReference;
  source?: FHIRReference;
  item: FHIRQuestionnaireItem[];
};
