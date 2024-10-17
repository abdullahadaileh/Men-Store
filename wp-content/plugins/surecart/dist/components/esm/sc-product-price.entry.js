import { r as registerInstance, h, H as Host } from './index-644f5478.js';
import { s as state } from './watchers-5af31452.js';
import { a as getDiscountedAmount, b as getScratchAmount } from './getters-2e810784.js';
import './index-1046c77e.js';
import './google-ee26bba4.js';
import './currency-728311ef.js';
import './google-357f4c4c.js';
import './utils-00526fde.js';
import './util-64ee5262.js';
import './index-c5a96d53.js';
import './store-77f83bce.js';

const scProductPriceCss = ":host{display:block}";

const ScProductPrice = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.prices = undefined;
    this.saleText = undefined;
    this.productId = undefined;
  }
  renderRange() {
    var _a, _b, _c, _d;
    if (((_b = (_a = state[this.productId]) === null || _a === void 0 ? void 0 : _a.prices) === null || _b === void 0 ? void 0 : _b.length) === 1) {
      return this.renderPrice((_c = state[this.productId]) === null || _c === void 0 ? void 0 : _c.prices[0]);
    }
    return h("sc-price-range", { prices: (_d = state[this.productId]) === null || _d === void 0 ? void 0 : _d.prices });
  }
  renderVariantPrice(selectedVariant) {
    var _a, _b;
    const variant = (_b = (_a = state[this.productId]) === null || _a === void 0 ? void 0 : _a.variants) === null || _b === void 0 ? void 0 : _b.find(variant => (variant === null || variant === void 0 ? void 0 : variant.id) === (selectedVariant === null || selectedVariant === void 0 ? void 0 : selectedVariant.id));
    return this.renderPrice(state[this.productId].selectedPrice, variant === null || variant === void 0 ? void 0 : variant.amount);
  }
  renderPrice(price, variantAmount) {
    var _a;
    const originalAmount = (_a = variantAmount !== null && variantAmount !== void 0 ? variantAmount : price === null || price === void 0 ? void 0 : price.amount) !== null && _a !== void 0 ? _a : 0;
    const amount = getDiscountedAmount(originalAmount);
    const scratch_amount = getScratchAmount(price === null || price === void 0 ? void 0 : price.scratch_amount);
    return (h("sc-price", { currency: price === null || price === void 0 ? void 0 : price.currency, amount: amount, scratchAmount: scratch_amount, saleText: this.saleText, adHoc: price === null || price === void 0 ? void 0 : price.ad_hoc, trialDurationDays: price === null || price === void 0 ? void 0 : price.trial_duration_days, setupFeeAmount: (price === null || price === void 0 ? void 0 : price.setup_fee_enabled) ? price === null || price === void 0 ? void 0 : price.setup_fee_amount : null, setupFeeName: (price === null || price === void 0 ? void 0 : price.setup_fee_enabled) ? price === null || price === void 0 ? void 0 : price.setup_fee_name : null, recurringPeriodCount: price === null || price === void 0 ? void 0 : price.recurring_period_count, recurringInterval: price === null || price === void 0 ? void 0 : price.recurring_interval, recurringIntervalCount: price === null || price === void 0 ? void 0 : price.recurring_interval_count }));
  }
  render() {
    return (h(Host, { role: "paragraph" }, (() => {
      var _a, _b, _c, _d, _e;
      if ((_a = state[this.productId]) === null || _a === void 0 ? void 0 : _a.selectedVariant) {
        return this.renderVariantPrice((_b = state[this.productId]) === null || _b === void 0 ? void 0 : _b.selectedVariant);
      }
      if ((_c = state[this.productId]) === null || _c === void 0 ? void 0 : _c.selectedPrice) {
        return this.renderPrice(state[this.productId].selectedPrice);
      }
      if ((_e = (_d = state[this.productId]) === null || _d === void 0 ? void 0 : _d.prices) === null || _e === void 0 ? void 0 : _e.length) {
        return this.renderRange();
      }
      return h("slot", null);
    })()));
  }
};
ScProductPrice.style = scProductPriceCss;

export { ScProductPrice as sc_product_price };

//# sourceMappingURL=sc-product-price.entry.js.map