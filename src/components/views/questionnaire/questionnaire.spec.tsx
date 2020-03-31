import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { Questionnaire } from './questionnaire';
import { h } from '@stencil/core';
import version from '../../../global/utils/version';

describe('start view', () => {
  let page: SpecPage = null;

  beforeEach(async () => {
    jest.clearAllMocks();
    version.set();
    page = await newSpecPage({
      components: [Questionnaire],
      template: () => <ia-questionnaire />,
    });
  });

  it('builds', () => {
    expect(page.rootInstance).toBeTruthy();
  });
});
