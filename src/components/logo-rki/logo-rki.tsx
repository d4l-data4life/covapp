import { Component, h, Prop } from '@stencil/core';

@Component({
  styleUrl: 'logo-rki.css',
  tag: 'ia-logo-rki',
  shadow: true,
})
export class LogoRKI {
  @Prop() big?: boolean;

  get styleClass() {
    return this.big ? 'logo-rki--big' : 'logo-rki';
  }

  render() {
    return (
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0"
        y="0"
        viewBox="0 24 227 56"
        class={this.styleClass}
      >
        <path
          d="M28.3 33.1h-.5c-.4 0-.6-.2-.9-.7l-2-3.1c1.3-.2 2.1-1.1 2.1-2.4 0-.4-.1-.9-.3-1.2-.4-.9-1.2-1.2-2.5-1.2h-3.9v.5h1v8.2h-1v.5h3.3v-.5h-1v-3.6h1.1l2.1 3.3c.5.7.6.8 1.4.8h1.2v-.6zm-5.8-8h1.3c1.2 0 1.8.7 1.8 1.9 0 1.1-.7 1.9-1.8 1.9h-1.3v-3.8zm12.8 8.7c2.4 0 4.5-2.2 4.5-4.8 0-2.6-2-4.8-4.5-4.8s-4.5 2.2-4.5 4.8c0 2.6 2 4.8 4.5 4.8zm0-8.8c1.8 0 3.1 1.7 3.1 4s-1.3 4-3.1 4-3.1-1.7-3.1-4 1.3-4 3.1-4zm12.2 8.6c1.4 0 2.5-1 2.5-2.4 0-.9-.5-1.8-1.4-2.2-.3-.2-.5-.2-1.1-.3 1.1-.1 2-1 2-2.1 0-1.3-1-2.3-2.3-2.3H43v.5h1V33h-1v.5h4.5zm-2.2-4.4h1.6c1.1 0 1.9.8 1.9 2 0 1.1-.7 1.8-1.9 1.8h-1.6v-3.8zm0-4.1h1.5c.8 0 1.4.7 1.4 1.7s-.6 1.8-1.5 1.8h-1.4v-3.5zm14.6 6.7h-.6V33h-3.4v-3.7h2.6v1.1h.6v-2.7h-.6v1h-2.6v-3.6h3.3v1.2h.6V24h-.6v.4h-5.6v.5h1v8.2h-1v.5h6.3v-1.8zm11.5 1.3h-.5c-.3 0-.6-.2-.9-.7l-2-3.1c1.3-.2 2.1-1.1 2.1-2.4 0-.4-.1-.9-.3-1.2-.4-.9-1.2-1.2-2.5-1.2h-3.9v.5h1v8.2h-1v.5h3.3v-.5h-1v-3.6h1.1l2.1 3.3c.5.7.6.8 1.4.8h1.2v-.6zm-5.8-8h1.3c1.2 0 1.8.7 1.8 1.9 0 1.1-.7 1.9-1.8 1.9h-1.3v-3.8zm13.8 8H78v-8h2.8v1.1h.7V24h-.7v.4H74V24h-.7v2.2h.7v-1.1h2.8v8h-1.4v.5h4v-.5zm18.1 0h-.7L93 28.6l3.1-3.7h.9v-.5h-2.9v.5h1l-3.4 4 3.9 4.6h1.9v-.4zm-4.9 0h-1v-8.2h1v-.5h-3.3v.5h1V33h-1v.5h3.3v-.4zm11.8.7c2.4 0 4.5-2.2 4.5-4.8 0-2.6-2-4.8-4.5-4.8s-4.5 2.2-4.5 4.8c0 2.6 2 4.8 4.5 4.8zm0-8.8c1.8 0 3.1 1.7 3.1 4s-1.3 4-3.1 4-3.1-1.7-3.1-4c-.1-2.3 1.2-4 3.1-4zm15.4 6.4h-.7v1c-.9.5-1.5.7-2.2.7-2.1 0-3.7-1.8-3.7-4.1 0-2.4 1.4-4 3.5-4 .9 0 1.5.2 2.4.9v.7h.7v-2.4h-.7v.6c-.8-.4-1.5-.5-2.4-.5-2.7 0-4.8 2.1-4.8 4.8 0 2.7 2.1 4.7 5 4.7 1 0 1.8-.2 2.9-.6v-1.8zm13.1 1.7h-1.1v-8.2h1.1v-.5h-3.3v.5h1v3.7h-5.2v-3.7h1v-.5h-3.3v.5h1v8.2h-1v.5h3.3v-.5h-1v-3.8h5.2v3.8h-1v.5h3.3v-.5zm9.3.5v-9.2h1.1v9.2h-1.1zm13.3.1v-9.3h-1.1v7.7c-.1-.3-.1-.3-.2-.4 0-.1-.1-.2-.1-.2l-4.6-7H148v9.2h1.1v-8c.1.2.1.2.1.3 0 .1.1.1.1.2.1.1.1.3.2.3l4.6 7.2h1.4zm9.9-8.7c-.5-.3-.7-.4-1.1-.5-.5-.2-1-.2-1.5-.2-1.8 0-3 1-3 2.4 0 .9.6 1.7 2 2.4.9.5 1.4.7 1.5.8.4.2.6.5.8.8.1.2.1.4.1.7 0 .9-.7 1.4-1.7 1.4-.5 0-.9-.1-1.3-.2-.3-.1-.5-.2-1.1-.6l-.6.9c.6.4.8.5 1.2.7.5.2 1.1.3 1.7.3 1.9 0 3-1 3-2.6 0-.7-.3-1.3-.7-1.7-.3-.3-.8-.6-1.4-.9-1.9-1-2.3-1.3-2.3-2 0-.8.7-1.3 1.7-1.3.4 0 .9.1 1.3.2.3.1.5.2 1 .5l.4-1.1zm9.8.4v-1H168v1h3.1v8.2h1.1v-8.2h3zm4.5 8.2v-9.2h-1.2v9.2h1.2zm10.6-8.2v-1H183v1h3.1v8.2h1.1v-8.2h3.1zm10.3 5.1v-6h-1.1v5.7c0 1.1-.1 1.5-.5 2-.5.5-1.1.8-1.9.8-.8 0-1.5-.3-1.9-.8-.5-.5-.5-.8-.5-2v-5.7h-1.1v6c0 1.2.3 1.9 1.1 2.6.7.6 1.6.8 2.5.8 1 0 1.8-.3 2.5-.8.6-.7.9-1.4.9-2.6zm10.3-5.1v-1h-7.3v1h3.1v8.2h1.1v-8.2h3.1"
          fill="#005cb9"
        />
        <linearGradient
          id="SVGID_1_"
          gradientUnits="userSpaceOnUse"
          x1="200.631"
          y1="39.181"
          x2="177.675"
          y2="58.443"
        >
          <stop offset=".018" stop-color="#d8e3f4" stop-opacity="0.053" />
          <stop offset=".192" stop-color="#d8e3f4" stop-opacity="0.563" />
          <stop offset=".341" stop-color="#d8e3f4" stop-opacity="1" />
        </linearGradient>
        <path
          d="M179.6 52.3l1.5 2s14.6-13.6 22.5-13.1c0 0-16.4 10.5-20.9 15.7l-2.4 1.7-.8.6v-6.9z"
          fill="url(#SVGID_1_)"
        />
        <linearGradient
          id="SVGID_2_"
          gradientUnits="userSpaceOnUse"
          x1="192.421"
          y1="71.866"
          x2="182.891"
          y2="55.359"
        >
          <stop offset=".018" stop-color="#d8e3f4" stop-opacity="0.042" />
          <stop offset=".239" stop-color="#d8e3f4" stop-opacity="0.558" />
          <stop offset=".428" stop-color="#d8e3f4" stop-opacity="1" />
        </linearGradient>
        <path
          d="M180.4 58.6s10 13.7 14.8 11.6l.5-.3s-6.7-3.7-13-13l-1-.9-1.3 2.6z"
          fill="url(#SVGID_2_)"
        />
        <linearGradient
          id="SVGID_3_"
          gradientUnits="userSpaceOnUse"
          x1="124.677"
          y1="47.77"
          x2="133.074"
          y2="57.777"
        >
          <stop offset="0" stop-color="#d8e3f4" stop-opacity="0" />
          <stop offset=".246" stop-color="#d8e3f4" stop-opacity="0.609" />
          <stop offset=".404" stop-color="#d8e3f4" stop-opacity="1" />
        </linearGradient>
        <path
          d="M130.4 58.1s.6-.6.2-1l-4.9-5.3s-2.3-3-1.2-3.8c0 0 .8-.7 3.2 2.3 2.4 3 5.1 5.5 5.1 5.5s.5.7 1.7 0L134 57l-3.6 1.1z"
          fill="url(#SVGID_3_)"
        />
        <path
          fill="#d8e3f4"
          d="M141.9 53.5v-2.6L134 56l-3.6 2.1-2 1.2s-1.2.6-.8 1.5c0 0 .5.8 2 .2l2.2-1.3.8-.3.1.2.3.2c3.6 3.4 4.5 3.5 4.5 3.5 1.4.8 2.5 0 2.5 0 .5-.7-.7-1.6-.7-1.6l-1.6-1.1-2.8-2.2c-.3-.3 0-.6 0-.6l.6-.4 6.4-3.9z"
        />
        <path
          d="M178.9 42.7h-.2V47l-4.2 3.1c-5.7-5.8-10.9-5.9-10.9-5.9-9.6-.8-19.7 5.4-21 6.2v-7.6h-.8V67.5h.8v-1.1c2.4 1.4 5.2 1.6 6.8 1.7 1.7.1 2 .1 3.7-.1 9.9-1.4 20.8-12.9 20.8-12.9l4.9 7.2v5.1h.8V42.7h-.7zm-18.8 19.1c-8.2 6.3-11.2 5-11.2 5-3.7-.5-5.8-4-6.2-4.8v-6.3c8.3-7.8 16.8-10.3 16.8-10.3 6.8-1.8 12.7 6.9 12.7 6.9l-12.1 9.5zm18.7-5.5l-2.4-3.6 2.4-2v5.6z"
          fill="#0062bb"
        />
        <linearGradient
          id="SVGID_4_"
          gradientUnits="userSpaceOnUse"
          x1="155.78"
          y1="48.415"
          x2="154.85"
          y2="47.159"
        >
          <stop offset=".276" stop-color="#d2dff2" stop-opacity="0.305" />
          <stop offset=".904" stop-color="#d2dff2" stop-opacity="1" />
        </linearGradient>
        <path
          d="M150.9 49.5c4.2-2.5 7.4-3.7 8.3-4-.8.2-4.1 1.4-8.3 4z"
          fill="url(#SVGID_4_)"
        />
        <linearGradient
          id="SVGID_5_"
          gradientUnits="userSpaceOnUse"
          x1="149.254"
          y1="62.497"
          x2="146.697"
          y2="53.58"
        >
          <stop offset="0" stop-color="#d2dff2" stop-opacity="0" />
          <stop offset=".57" stop-color="#d2dff2" stop-opacity="0.63" />
          <stop offset=".904" stop-color="#d2dff2" stop-opacity="1" />
        </linearGradient>
        <path
          d="M150.2 58.9c-1.5-.4-2.7-3.3 1.7-6.3l-2-2.4c.3-.2.6-.4 1-.6-2.5 1.5-5.3 3.6-8.2 6.2v2.9s2.9 3 7.5 1.7c0-.1 2.2-.9 0-1.5z"
          fill="url(#SVGID_5_)"
        />
        <linearGradient
          id="SVGID_6_"
          gradientUnits="userSpaceOnUse"
          x1="164.888"
          y1="43.236"
          x2="153.892"
          y2="49.585"
        >
          <stop offset=".106" stop-color="#d2dff2" stop-opacity="0.117" />
          <stop offset=".904" stop-color="#d2dff2" stop-opacity="1" />
        </linearGradient>
        <path
          d="M159.5 45.4s-4.2 1.3-9.6 4.8l2 2.4c4.4-3.6 11.2-7.3 11.3-7.3-1.2-.2-2.5-.3-3.7.1z"
          fill="url(#SVGID_6_)"
        />
        <path
          fill="#d8e3f4"
          d="M160.4 44.2h-.2.2zM142.7 49.4v.9c1.1-.7 8.9-5.4 17.2-6.2-9.9.9-16.2 4.6-17.2 5.3z"
        />
        <path fill="none" d="M0 0h227v96H0z" />
      </svg>
    );
  }
}
