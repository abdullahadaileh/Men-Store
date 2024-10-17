import { r as registerInstance, h, H as Host, a as getElement } from './index-644f5478.js';
import './watchers-3d20392b.js';
import { s as state } from './store-77f83bce.js';
import { s as state$1 } from './mutations-0a628afa.js';
import { i as isProductOutOfStock, c as isSelectedVariantMissing } from './watchers-5af31452.js';
import { a as accept } from './mutations-fa2a01e9.js';
import { c as isBusy } from './getters-2e810784.js';
import './add-query-args-f4c5962b.js';
import './utils-00526fde.js';
import './index-1046c77e.js';
import './index-c5a96d53.js';
import './google-ee26bba4.js';
import './currency-728311ef.js';
import './google-357f4c4c.js';
import './util-64ee5262.js';
import './fetch-2525e763.js';

const scUpsellSubmitButtonCss = "sc-upsell-submit-button{position:relative;display:block}sc-upsell-submit-button .wp-block-button__link{position:relative;text-decoration:none}sc-upsell-submit-button .wp-block-button__link span sc-icon{padding-right:var(--sc-spacing-small)}sc-upsell-submit-button .wp-block-button__link [data-text],sc-upsell-submit-button .wp-block-button__link sc-spinner{display:flex;align-items:center;justify-content:center}sc-upsell-submit-button .sc-block-button--sold-out,sc-upsell-submit-button .sc-block-button--unavailable{display:none !important}sc-upsell-submit-button.is-unavailable .sc-block-button__link{display:none !important}sc-upsell-submit-button.is-unavailable .sc-block-button--unavailable{display:initial !important}sc-upsell-submit-button.is-sold-out .sc-block-button__link{display:none !important}sc-upsell-submit-button.is-sold-out .sc-block-button--sold-out{display:initial !important}sc-upsell-submit-button sc-spinner::part(base){--indicator-color:currentColor;--spinner-size:12px;position:absolute;top:calc(50% - var(--spinner-size) + var(--spinner-size) / 4);left:calc(50% - var(--spinner-size) + var(--spinner-size) / 4)}sc-upsell-submit-button [data-text],sc-upsell-submit-button [data-loader]{transition:opacity var(--sc-transition-fast) ease-in-out, visibility var(--sc-transition-fast) ease-in-out}sc-upsell-submit-button [data-loader]{opacity:0;visibility:hidden}sc-upsell-submit-button.is-disabled{pointer-events:none}sc-upsell-submit-button.is-busy [data-text]{opacity:0;visibility:hidden}sc-upsell-submit-button.is-busy [data-loader]{opacity:1;visibility:visible}sc-upsell-submit-button.is-out-of-stock [data-text]{opacity:0.6}";

const ScUpsellSubmitButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  getUpsellProductId() {
    var _a;
    return ((_a = state.product) === null || _a === void 0 ? void 0 : _a.id) || '';
  }
  async handleAddToOrderClick(e) {
    e.preventDefault();
    accept();
  }
  render() {
    return (h(Host, { class: {
        'is-busy': isBusy(),
        'is-disabled': state.disabled,
        // TODO: change this to out of stock error message.
        'is-sold-out': (isProductOutOfStock(this.getUpsellProductId()) && !isSelectedVariantMissing(this.getUpsellProductId())) || (state$1 === null || state$1 === void 0 ? void 0 : state$1.code) === 'out_of_stock',
        'is-unavailable': isSelectedVariantMissing(this.getUpsellProductId()) || (state$1 === null || state$1 === void 0 ? void 0 : state$1.code) === 'expired',
      }, onClick: e => this.handleAddToOrderClick(e) }, h("slot", null)));
  }
  get el() { return getElement(this); }
};
ScUpsellSubmitButton.style = scUpsellSubmitButtonCss;

export { ScUpsellSubmitButton as sc_upsell_submit_button };

//# sourceMappingURL=sc-upsell-submit-button.entry.js.map