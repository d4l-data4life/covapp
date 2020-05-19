import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { Start } from './start';
import version from '../../../global/utils/version';

describe('start view', () => {
  let page: SpecPage = null;

  beforeEach(async () => {
    jest.clearAllMocks();
    version.set();

    const history = {
      push: jest.fn(),
      location: {
        query: {
          source: '',
        },
      },
    } as any;

    page = await newSpecPage({
      components: [Start],
      template: () => <ia-start history={history} />,
    });
  });

  it('builds', () => {
    expect(page.rootInstance).toBeTruthy();
  });
});
