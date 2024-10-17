import { r as registerInstance, h, H as Host, a as getElement } from './index-644f5478.js';
import { s as state } from './watchers-93b91fa4.js';
import './index-1046c77e.js';
import './utils-00526fde.js';
import './getters-c162c255.js';
import './mutations-b8f9af9f.js';
import './get-query-arg-cb6b8763.js';
import './add-query-args-f4c5962b.js';
import './index-c5a96d53.js';
import './google-357f4c4c.js';
import './currency-728311ef.js';
import './price-178c2e2b.js';
import './address-8d75115e.js';
import './util-64ee5262.js';
import './mutations-8c68bd4f.js';
import './mutations-8871d02a.js';
import './store-dde63d4d.js';
import './mutations-0a628afa.js';
import './index-d7508e37.js';
import './fetch-2525e763.js';

const scProductDonationCustomAmountCss = "sc-product-donation-custom-amount sc-price-input sc-button{margin-right:-10px !important}.sc-product-donation-custom-amount sc-button{opacity:0;visibility:hidden;transition:opacity var(--sc-transition-fast) ease-in-out, visibility var(--sc-transition-fast) ease-in-out}.sc-product-donation-custom-amount--has-value sc-button{opacity:1;visibility:visible}";

const ScProductDonationCustomAmount = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.productId = undefined;
    this.value = undefined;
  }
  state() {
    return state[this.productId];
  }
  updateState(data) {
    state[this.productId] = {
      ...state[this.productId],
      ...data,
    };
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const checked = !!((_a = this.state()) === null || _a === void 0 ? void 0 : _a.custom_amount);
    return (h(Host, { class: { 'sc-product-donation-custom-amount': true, 'sc-product-donation-custom-amount--has-value': !!this.value } }, h("sc-choice-container", { value: `${(_b = this.state()) === null || _b === void 0 ? void 0 : _b.custom_amount}`, "show-control": "false", checked: checked, onClick: () => this.priceInput.triggerFocus(), onKeyDown: () => {
        this.priceInput.triggerFocus();
      }, role: "button" }, h("sc-visually-hidden", null, wp.i18n.__('Enter a custom amount.', 'surecart')), h("sc-price-input", { ref: el => (this.priceInput = el), currencyCode: ((_d = (_c = this.state()) === null || _c === void 0 ? void 0 : _c.selectedPrice) === null || _d === void 0 ? void 0 : _d.currency) || ((_e = window === null || window === void 0 ? void 0 : window.scData) === null || _e === void 0 ? void 0 : _e.currency) || 'usd', showCode: false, showLabel: false, value: `${((_f = this.state()) === null || _f === void 0 ? void 0 : _f.custom_amount) || ''}`, onScChange: e => this.updateState({
        ad_hoc_amount: null,
        custom_amount: e.target.value,
      }), min: (_h = (_g = this.state()) === null || _g === void 0 ? void 0 : _g.selectedPrice) === null || _h === void 0 ? void 0 : _h.ad_hoc_min_amount, max: (_k = (_j = this.state()) === null || _j === void 0 ? void 0 : _j.selectedPrice) === null || _k === void 0 ? void 0 : _k.ad_hoc_max_amount, style: { '--sc-input-border-color-focus': 'var(--sc-input-border-color-hover)', '--sc-focus-ring-color-primary': 'transparent' } }))));
  }
  get el() { return getElement(this); }
};
ScProductDonationCustomAmount.style = scProductDonationCustomAmountCss;

export { ScProductDonationCustomAmount as sc_product_donation_custom_amount };

//# sourceMappingURL=sc-product-donation-custom-amount.entry.js.map