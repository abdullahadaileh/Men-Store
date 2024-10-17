'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const getters = require('./getters-1e382cac.js');
require('./store-96a02d63.js');
require('./index-00f0fc21.js');
require('./utils-a086ed6e.js');

const scCartSubmitCss = "sc-cart-submit{position:relative;width:100%}sc-cart-submit a.wp-block-button__link{position:relative;text-decoration:none;width:100%;display:block;box-sizing:border-box;text-align:center}sc-cart-submit sc-spinner::part(base){--indicator-color:currentColor;--spinner-size:12px;position:absolute;top:calc(50% - var(--spinner-size) + var(--spinner-size) / 4);left:calc(50% - var(--spinner-size) + var(--spinner-size) / 4)}sc-cart-submit [data-text],sc-cart-submit [data-loader]{transition:opacity var(--sc-transition-fast) ease-in-out, visibility var(--sc-transition-fast) ease-in-out}sc-cart-submit [data-loader]{opacity:0;visibility:hidden}sc-cart-submit.is-disabled{pointer-events:none}sc-cart-submit.is-busy [data-text]{opacity:0;visibility:hidden}sc-cart-submit.is-busy [data-loader]{opacity:1;visibility:visible}";

const ScCartSubmit = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.busy = undefined;
  }
  render() {
    return (index.h(index.Host, { class: { 'is-busy': getters.formBusy() || this.busy, 'is-disabled': getters.formBusy() || this.busy }, onClick: () => {
        this.busy = true;
        return true;
      } }, index.h("slot", null)));
  }
};
ScCartSubmit.style = scCartSubmitCss;

exports.sc_cart_submit = ScCartSubmit;

//# sourceMappingURL=sc-cart-submit.cjs.entry.js.map