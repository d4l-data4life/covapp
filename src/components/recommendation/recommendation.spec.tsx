import { newSpecPage } from '@stencil/core/testing';
import { Recommendation } from './recommendation';
import { h } from '@stencil/core';

describe('recommendation', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [Recommendation],
      template: () => (
        <ia-recommendation/>
      ),
    });
    expect(page.rootInstance).toBeTruthy();
  });
});
