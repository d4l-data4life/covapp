import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { Start } from './start';
import version from '../../../global/utils/version';

describe('start view', () => {
  let page: SpecPage = null;

  beforeEach(async () => {
    jest.clearAllMocks();
    version.set()
    page = await newSpecPage({
      components: [Start],
      html: '<ia-start />',
    });
  });

  it('builds', () => {
    expect(page.rootInstance).toBeTruthy();
  });
});
