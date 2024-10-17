'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const util = require('./util-efd68af1.js');
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
require('./mutations-8260a74b.js');
require('./mutations-7113e932.js');
require('./store-96a02d63.js');
require('./mutations-8d7c4499.js');
require('./index-a9c75016.js');
require('./fetch-2dba325c.js');

const scProductDonationAmountChoiceCss = "";

const ScProductDonationAmountChoice = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.productId = undefined;
    this.value = undefined;
    this.label = undefined;
  }
  state() {
    return watchers.state[this.productId];
  }
  render() {
    var _a;
    const amounts = watchers.getInRangeAmounts(this.productId);
    const order = amounts.indexOf(this.value);
    if (!util.isInRange(this.value, this.state().selectedPrice) || order < 0)
      return index.h(index.Host, { style: { display: 'none' } });
    return (index.h("sc-choice-container", { "show-control": "false", checked: this.state().ad_hoc_amount === this.value, onScChange: () => watchers.updateDonationState(this.productId, { ad_hoc_amount: this.value, custom_amount: null }), "aria-label": wp.i18n.sprintf(wp.i18n.__('%s of %s', 'surecart'), order + 1, amounts.length), role: "button" }, this.label ? (this.label) : (index.h("sc-format-number", { type: "currency", currency: (_a = this.state().selectedPrice) === null || _a === void 0 ? void 0 : _a.currency, value: this.value, "minimum-fraction-digits": "0" }))));
  }
  get el() { return index.getElement(this); }
};
ScProductDonationAmountChoice.style = scProductDonationAmountChoiceCss;

exports.sc_product_donation_amount_choice = ScProductDonationAmountChoice;

//# sourceMappingURL=sc-product-donation-amount-choice.cjs.entry.js.map