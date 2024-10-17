'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const watchers = require('./watchers-5bc5ca20.js');
require('./index-00f0fc21.js');
require('./utils-a086ed6e.js');
require('./getters-8b2c88a6.js');
require('./mutations-164b66b1.js');
require('./get-query-arg-53bf21e2.js');
require('./add-query-args-17c551b6.js');
require('./index-fb76df07.js');
require('./google-62bdaeea.js');
require('./currency-ba038e2f.js');
require('./price-f1f1114d.js');
require('./address-07819c5b.js');
require('./util-efd68af1.js');
require('./mutations-8260a74b.js');
require('./mutations-7113e932.js');
require('./store-96a02d63.js');
require('./mutations-8d7c4499.js');
require('./index-a9c75016.js');
require('./fetch-2dba325c.js');

const scProductDonationCustomAmountCss = "sc-product-donation-custom-amount sc-price-input sc-button{margin-right:-10px !important}.sc-product-donation-custom-amount sc-button{opacity:0;visibility:hidden;transition:opacity var(--sc-transition-fast) ease-in-out, visibility var(--sc-transition-fast) ease-in-out}.sc-product-donation-custom-amount--has-value sc-button{opacity:1;visibility:visible}";

const ScProductDonationCustomAmount = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.productId = undefined;
    this.value = undefined;
  }
  state() {
    return watchers.state[this.productId];
  }
  updateState(data) {
    watchers.state[this.productId] = {
      ...watchers.state[this.productId],
      ...data,
    };
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const checked = !!((_a = this.state()) === null || _a === void 0 ? void 0 : _a.custom_amount);
    return (index.h(index.Host, { class: { 'sc-product-donation-custom-amount': true, 'sc-product-donation-custom-amount--has-value': !!this.value } }, index.h("sc-choice-container", { value: `${(_b = this.state()) === null || _b === void 0 ? void 0 : _b.custom_amount}`, "show-control": "false", checked: checked, onClick: () => this.priceInput.triggerFocus(), onKeyDown: () => {
        this.priceInput.triggerFocus();
      }, role: "button" }, index.h("sc-visually-hidden", null, wp.i18n.__('Enter a custom amount.', 'surecart')), index.h("sc-price-input", { ref: el => (this.priceInput = el), currencyCode: ((_d = (_c = this.state()) === null || _c === void 0 ? void 0 : _c.selectedPrice) === null || _d === void 0 ? void 0 : _d.currency) || ((_e = window === null || window === void 0 ? void 0 : window.scData) === null || _e === void 0 ? void 0 : _e.currency) || 'usd', showCode: false, showLabel: false, value: `${((_f = this.state()) === null || _f === void 0 ? void 0 : _f.custom_amount) || ''}`, onScChange: e => this.updateState({
        ad_hoc_amount: null,
        custom_amount: e.target.value,
      }), min: (_h = (_g = this.state()) === null || _g === void 0 ? void 0 : _g.selectedPrice) === null || _h === void 0 ? void 0 : _h.ad_hoc_min_amount, max: (_k = (_j = this.state()) === null || _j === void 0 ? void 0 : _j.selectedPrice) === null || _k === void 0 ? void 0 : _k.ad_hoc_max_amount, style: { '--sc-input-border-color-focus': 'var(--sc-input-border-color-hover)', '--sc-focus-ring-color-primary': 'transparent' } }))));
  }
  get el() { return index.getElement(this); }
};
ScProductDonationCustomAmount.style = scProductDonationCustomAmountCss;

exports.sc_product_donation_custom_amount = ScProductDonationCustomAmount;

//# sourceMappingURL=sc-product-donation-custom-amount.cjs.entry.js.map