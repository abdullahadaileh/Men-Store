import { r as registerInstance, h, a as getElement, H as Host } from './index-644f5478.js';
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

const scProductDonationChoicesCss = ":host{display:block}.sc-product-donation-choices{display:grid;gap:2em;position:relative;--columns:4}.sc-product-donation-choices__form{display:grid;gap:var(--sc-spacing-small)}.sc-donation-recurring-choices{display:grid;gap:var(--sc-spacing-small);position:relative;--columns:2}";

const ScProductDonationChoice = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.productId = undefined;
    this.label = undefined;
    this.recurring = undefined;
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
    var _a, _b, _c, _d;
    const prices = (((_c = (_b = (_a = this.state()) === null || _a === void 0 ? void 0 : _a.product) === null || _b === void 0 ? void 0 : _b.prices) === null || _c === void 0 ? void 0 : _c.data) || [])
      .filter(price => (this.recurring ? (price === null || price === void 0 ? void 0 : price.recurring_interval) && (price === null || price === void 0 ? void 0 : price.ad_hoc) : !(price === null || price === void 0 ? void 0 : price.recurring_interval) && (price === null || price === void 0 ? void 0 : price.ad_hoc)))
      .filter(price => !(price === null || price === void 0 ? void 0 : price.archived));
    // no prices, or less than 2 prices, we have no choices.
    if (!(prices === null || prices === void 0 ? void 0 : prices.length)) {
      return h(Host, { style: { display: 'none' } });
    }
    // return price choice container.
    return (h("sc-recurring-price-choice-container", { prices: prices.sort((a, b) => (a === null || a === void 0 ? void 0 : a.position) - (b === null || b === void 0 ? void 0 : b.position)), product: (_d = this.state()) === null || _d === void 0 ? void 0 : _d.product, selectedPrice: this.state().selectedPrice, showDetails: false, showAmount: false, onScChange: e => {
        var _a, _b;
        const selectedPrice = (((_b = (_a = this.state().product) === null || _a === void 0 ? void 0 : _a.prices) === null || _b === void 0 ? void 0 : _b.data) || []).find(({ id }) => id == e.detail);
        this.updateState({ selectedPrice });
      }, "aria-label": this.recurring
        ? wp.i18n.__('If you want to make your donation recurring then Press Tab once & select the recurring interval from the dropdown. ', 'surecart')
        : wp.i18n.__('If you want to make your donation once then Press Enter. ', 'surecart'), style: { '--sc-recurring-price-choice-white-space': 'wrap', '--sc-recurring-price-choice-text-align': 'left' } }, h("slot", null, this.label)));
  }
  get el() { return getElement(this); }
};
ScProductDonationChoice.style = scProductDonationChoicesCss;

export { ScProductDonationChoice as sc_product_donation_choices };

//# sourceMappingURL=sc-product-donation-choices.entry.js.map