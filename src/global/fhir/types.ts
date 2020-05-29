export type FHIRQuestionnaire = {
  status: FHIRPublicationStatus;
  resourceType: string;
  language?: string;
  contained?: FHIRValueSet[];
  url?: string;
  version?: string;
  name?: string;
  title?: string;
  experimental?: boolean;
  date?: string;
  publisher?: string;
  description?: string;
  contact?: FHIRContact[];
  copyright?: string;
  subjectType?: string[];
  item?: FHIRQuestionnaireItem[];
};

export type FHIRValueSet = {
  status: FHIRPublicationStatus;
  resourceType?: string;
  id?: string;
  language?: string;
  url?: string;
  name?: string;
  publisher?: string;
  contact?: FHIRContact[];
  description?: string;
  immutable?: boolean;
  compose?: { include: { system: string; concept: { code: string }[] } }[];
  expansion?: {
    identifier: string;
    timestamp: string;
    contains: FHIRCoding[];
  };
};

export type FHIRQuestionnaireItem = {
  linkId: string;
  type: FHIRQuestionnaireItemType;
  text: string;
  item?: FHIRQuestionnaireItem[];
  answerValueSet?: string;
  required?: boolean;
  options?: { reference: string };
  initialCoding?: FHIRCoding;
  enableWhen?: FHIREnableCondition[];
  enableBehavior?: 'any' | 'all';
};

export type FHIREnableCondition = {
  question: string;
  operator: '=';
  answerCoding: FHIRCoding;
};

export type FHIRQuestionnaireItemType =
  | 'group'
  | 'display'
  | 'question'
  | 'boolean'
  | 'decimal'
  | 'integer'
  | 'date'
  | 'dateTime'
  | 'time'
  | 'string'
  | 'text'
  | 'url'
  | 'choice'
  | 'open-choice'
  | 'attachment'
  | 'reference'
  | 'quantity';

export type FHIRContact = {
  name: string;
  telecom: { system: string; value: string }[];
};

export type FHIRPublicationStatus = 'draft' | 'active' | 'retired' | 'unknown';

export type FHIRQuestionnaireResponseStatus =
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

export type FHIRAnswerValueCoding = {
  valueCoding: FHIRCoding;
};

export type FHIRAnswerValueDate = {
  valueDate: string;
};

export type FHIRAnswerValueString = {
  valueString: string;
};

export type FHIRQuestionnaireResponse = {
  id?: string;
  resourceType?: string;
  language?: string;
  questionnaire?: string;
  status: FHIRQuestionnaireResponseStatus;
  authored?: string;
  item?: FHIRResponseItem[];
  contained?: any[];
  subject?: FHIRReference;
  author?: FHIRReference;
  source?: FHIRReference;
};

export type FHIRAnswerValue =
  | FHIRAnswerValueCoding
  | FHIRAnswerValueDate
  | FHIRAnswerValueString;

export type FHIRResponseItem = {
  linkId: string;
  text?: string;
  answer?: FHIRAnswerValue[];
  item?: FHIRResponseItem[];
};
