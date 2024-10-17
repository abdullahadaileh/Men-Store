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

const scProductDonationChoicesCss = ":host{display:block}.sc-product-donation-choices{display:grid;gap:2em;position:relative;--columns:4}.sc-product-donation-choices__form{display:grid;gap:var(--sc-spacing-small)}.sc-donation-recurring-choices{display:grid;gap:var(--sc-spacing-small);position:relative;--columns:2}";

const ScProductDonationChoice = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.productId = undefined;
    this.label = undefined;
    this.recurring = undefined;
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
    var _a, _b, _c, _d;
    const prices = (((_c = (_b = (_a = this.state()) === null || _a === void 0 ? void 0 : _a.product) === null || _b === void 0 ? void 0 : _b.prices) === null || _c === void 0 ? void 0 : _c.data) || [])
      .filter(price => (this.recurring ? (price === null || price === void 0 ? void 0 : price.recurring_interval) && (price === null || price === void 0 ? void 0 : price.ad_hoc) : !(price === null || price === void 0 ? void 0 : price.recurring_interval) && (price === null || price === void 0 ? void 0 : price.ad_hoc)))
      .filter(price => !(price === null || price === void 0 ? void 0 : price.archived));
    // no prices, or less than 2 prices, we have no choices.
    if (!(prices === null || prices === void 0 ? void 0 : prices.length)) {
      return index.h(index.Host, { style: { display: 'none' } });
    }
    // return price choice container.
    return (index.h("sc-recurring-price-choice-container", { prices: prices.sort((a, b) => (a === null || a === void 0 ? void 0 : a.position) - (b === null || b === void 0 ? void 0 : b.position)), product: (_d = this.state()) === null || _d === void 0 ? void 0 : _d.product, selectedPrice: this.state().selectedPrice, showDetails: false, showAmount: false, onScChange: e => {
        var _a, _b;
        const selectedPrice = (((_b = (_a = this.state().product) === null || _a === void 0 ? void 0 : _a.prices) === null || _b === void 0 ? void 0 : _b.data) || []).find(({ id }) => id == e.detail);
        this.updateState({ selectedPrice });
      }, "aria-label": this.recurring
        ? wp.i18n.__('If you want to make your donation recurring then Press Tab once & select the recurring interval from the dropdown. ', 'surecart')
        : wp.i18n.__('If you want to make your donation once then Press Enter. ', 'surecart'), style: { '--sc-recurring-price-choice-white-space': 'wrap', '--sc-recurring-price-choice-text-align': 'left' } }, index.h("slot", null, this.label)));
  }
  get el() { return index.getElement(this); }
};
ScProductDonationChoice.style = scProductDonationChoicesCss;

exports.sc_product_donation_choices = ScProductDonationChoice;

//# sourceMappingURL=sc-product-donation-choices.cjs.entry.js.map