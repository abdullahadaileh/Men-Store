import { r as registerInstance, h, H as Host } from './index-644f5478.js';
import { f as formBusy } from './getters-2c9ecd8c.js';
import './store-dde63d4d.js';
import './index-1046c77e.js';
import './utils-00526fde.js';

const scCartSubmitCss = "sc-cart-submit{position:relative;width:100%}sc-cart-submit a.wp-block-button__link{position:relative;text-decoration:none;width:100%;display:block;box-sizing:border-box;text-align:center}sc-cart-submit sc-spinner::part(base){--indicator-color:currentColor;--spinner-size:12px;position:absolute;top:calc(50% - var(--spinner-size) + var(--spinner-size) / 4);left:calc(50% - var(--spinner-size) + var(--spinner-size) / 4)}sc-cart-submit [data-text],sc-cart-submit [data-loader]{transition:opacity var(--sc-transition-fast) ease-in-out, visibility var(--sc-transition-fast) ease-in-out}sc-cart-submit [data-loader]{opacity:0;visibility:hidden}sc-cart-submit.is-disabled{pointer-events:none}sc-cart-submit.is-busy [data-text]{opacity:0;visibility:hidden}sc-cart-submit.is-busy [data-loader]{opacity:1;visibility:visible}";

const ScCartSubmit = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.busy = undefined;
  }
  render() {
    return (h(Host, { class: { 'is-busy': formBusy() || this.busy, 'is-disabled': formBusy() || this.busy }, onClick: () => {
        this.busy = true;
        return true;
      } }, h("slot", null)));
  }
};
ScCartSubmit.style = scCartSubmitCss;

export { ScCartSubmit as sc_cart_submit };

//# sourceMappingURL=sc-cart-submit.entry.js.map