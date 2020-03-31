import { Component, Prop, h } from '@stencil/core';
import i18n from '../../global/utils/i18n';

@Component({
  styleUrl: 'navigation-header.css',
  tag: 'ia-navigation-header',
})
export class NavigationHeader {
  @Prop() classes: string = '';
  @Prop() headline: string = '';
  @Prop() handleClick: EventListener;
  @Prop() hasBackButton: boolean = true;

  render() {
    const { headline, classes, handleClick, hasBackButton } = this;

    return (
      <div class={`navigation-header ${classes}`}>
        {handleClick && hasBackButton && (
          <button
            data-test="navBack"
            type="button"
            class="u-button-reset"
            onClick={handleClick}
          >
            <d4l-icon-arrow-back classes="icon--small" />
            <span class="u-visually-hidden">
              {i18n.t('navigation_header_back_button_label')}
            </span>
          </button>
        )}
        <h2>{headline}</h2>
      </div>
    );
  }
}
