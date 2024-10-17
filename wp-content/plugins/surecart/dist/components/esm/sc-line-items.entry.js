import { r as registerInstance, h } from './index-644f5478.js';
import { s as state } from './mutations-b8f9af9f.js';
import { h as hasSubscription } from './index-bc0c0045.js';
import { i as intervalString } from './price-178c2e2b.js';
import { g as getFeaturedProductMediaAttributes } from './media-8435dec0.js';
import { u as updateCheckoutLineItem, r as removeCheckoutLineItem } from './mutations-8c68bd4f.js';
import { f as formBusy } from './getters-2c9ecd8c.js';
import { g as getMaxStockQuantity } from './quantity-2718ee4f.js';
import './index-1046c77e.js';
import './utils-00526fde.js';
import './get-query-arg-cb6b8763.js';
import './add-query-args-f4c5962b.js';
import './index-c5a96d53.js';
import './google-357f4c4c.js';
import './currency-728311ef.js';
import './mutations-8871d02a.js';
import './store-dde63d4d.js';
import './mutations-0a628afa.js';
import './index-d7508e37.js';
import './fetch-2525e763.js';

const scLineItemsCss = ":host{display:block}:slotted(*~*){margin-top:20px}.line-items{display:grid;gap:var(--sc-form-row-spacing)}.line-item{display:grid;gap:var(--sc-spacing-small)}.fee__description{opacity:0.75}";

const ScLineItems = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.editable = undefined;
    this.removable = undefined;
  }
  /**
   * Is the line item editable?
   */
  isEditable(item) {
    var _a;
    // ad_hoc prices and bumps cannot have quantity.
    if (((_a = item === null || item === void 0 ? void 0 : item.price) === null || _a === void 0 ? void 0 : _a.ad_hoc) || (item === null || item === void 0 ? void 0 : item.bump_amount)) {
      return false;
    }
    return this.editable;
  }
  render() {
    var _a, _b, _c, _d, _e;
    if (!!formBusy() && !((_c = (_b = (_a = state === null || state === void 0 ? void 0 : state.checkout) === null || _a === void 0 ? void 0 : _a.line_items) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.length)) {
      return (h("sc-line-item", null, h("sc-skeleton", { style: { 'width': '50px', 'height': '50px', '--border-radius': '0' }, slot: "image" }), h("sc-skeleton", { slot: "title", style: { width: '120px', display: 'inline-block' } }), h("sc-skeleton", { slot: "description", style: { width: '60px', display: 'inline-block' } }), h("sc-skeleton", { style: { width: '120px', display: 'inline-block' }, slot: "price" }), h("sc-skeleton", { style: { width: '60px', display: 'inline-block' }, slot: "price-description" })));
    }
    return (h("div", { class: "line-items", part: "base", tabindex: "0" }, (((_e = (_d = state === null || state === void 0 ? void 0 : state.checkout) === null || _d === void 0 ? void 0 : _d.line_items) === null || _e === void 0 ? void 0 : _e.data) || []).map(item => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      const { url, title, alt } = getFeaturedProductMediaAttributes((_a = item === null || item === void 0 ? void 0 : item.price) === null || _a === void 0 ? void 0 : _a.product, item === null || item === void 0 ? void 0 : item.variant);
      const max = getMaxStockQuantity((_b = item === null || item === void 0 ? void 0 : item.price) === null || _b === void 0 ? void 0 : _b.product, item === null || item === void 0 ? void 0 : item.variant);
      return (h("div", { class: "line-item" }, h("sc-product-line-item", { key: item.id, imageUrl: url, imageTitle: title, imageAlt: alt, name: (_d = (_c = item === null || item === void 0 ? void 0 : item.price) === null || _c === void 0 ? void 0 : _c.product) === null || _d === void 0 ? void 0 : _d.name, priceName: (_e = item === null || item === void 0 ? void 0 : item.price) === null || _e === void 0 ? void 0 : _e.name, variantLabel: ((item === null || item === void 0 ? void 0 : item.variant_options) || []).filter(Boolean).join(' / ') || null, purchasableStatusDisplay: item === null || item === void 0 ? void 0 : item.purchasable_status_display, ...(max ? { max } : {}), editable: this.isEditable(item), removable: this.removable, quantity: item.quantity, fees: (_f = item === null || item === void 0 ? void 0 : item.fees) === null || _f === void 0 ? void 0 : _f.data, setupFeeTrialEnabled: (_g = item === null || item === void 0 ? void 0 : item.price) === null || _g === void 0 ? void 0 : _g.setup_fee_trial_enabled, amount: item.ad_hoc_amount !== null ? item.ad_hoc_amount : item.subtotal_amount, scratchAmount: item.ad_hoc_amount == null && (item === null || item === void 0 ? void 0 : item.scratch_amount), currency: (_h = state === null || state === void 0 ? void 0 : state.checkout) === null || _h === void 0 ? void 0 : _h.currency, trialDurationDays: (_j = item === null || item === void 0 ? void 0 : item.price) === null || _j === void 0 ? void 0 : _j.trial_duration_days, interval: !!(item === null || item === void 0 ? void 0 : item.price) && intervalString(item === null || item === void 0 ? void 0 : item.price, { showOnce: hasSubscription(state === null || state === void 0 ? void 0 : state.checkout) }), onScUpdateQuantity: e => updateCheckoutLineItem({ id: item.id, data: { quantity: e.detail } }), onScRemove: () => removeCheckoutLineItem(item === null || item === void 0 ? void 0 : item.id), exportparts: "base:line-item, product-line-item, image:line-item__image, text:line-item__text, title:line-item__title, suffix:line-item__suffix, price:line-item__price, price__amount:line-item__price-amount, price__description:line-item__price-description, price__scratch:line-item__price-scratch, static-quantity:line-item__static-quantity, remove-icon__base:line-item__remove-icon, quantity:line-item__quantity, quantity__minus:line-item__quantity-minus, quantity__minus-icon:line-item__quantity-minus-icon, quantity__plus:line-item__quantity-plus, quantity__plus-icon:line-item__quantity-plus-icon, quantity__input:line-item__quantity-input, line-item__price-description:line-item__price-description" })));
    })));
  }
};
ScLineItems.style = scLineItemsCss;

export { ScLineItems as sc_line_items };

//# sourceMappingURL=sc-line-items.entry.js.map