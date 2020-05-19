import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'ia-covapp-to-data4life',
  styleUrl: 'logo-covapp-to-data4life.css',
  shadow: true,
})
export class ChariteToData4Life {
  @Prop() success: boolean = false;

  render() {
    const { success } = this;
    return (
      <div class="charite-to-data4life">
        <img
          src="/assets/images/charite-covapp-logo.svg"
          class="charite-to-data4life__charite"
        />
        {success ? (
          <d4l-icon-check class="charite-to-data4life__icon" />
        ) : (
          <d4l-icon-arrow-forward class="charite-to-data4life__icon" />
        )}
        <ia-logo-d4l-bordered size="small" />
      </div>
    );
  }
}
