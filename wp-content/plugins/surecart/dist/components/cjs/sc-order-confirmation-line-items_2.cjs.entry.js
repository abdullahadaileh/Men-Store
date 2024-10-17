'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const consumer = require('./consumer-21fdeb72.js');
const index$1 = require('./index-f9d999d6.js');
const price = require('./price-f1f1114d.js');
const tax = require('./tax-4f82e63a.js');
require('./currency-ba038e2f.js');

const scOrderConfirmationLineItemsCss = ":host{display:block}.line-items{display:grid;gap:var(--sc-spacing-small)}.line-item{display:grid;gap:var(--sc-spacing-small)}.fee__description{opacity:0.75}";

const ScOrderConfirmationLineItems = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.order = undefined;
    this.loading = undefined;
  }
  render() {
    var _a, _b;
    if (!!this.loading) {
      return (index.h("sc-line-item", null, index.h("sc-skeleton", { style: { 'width': '50px', 'height': '50px', '--border-radius': '0' }, slot: "image" }), index.h("sc-skeleton", { slot: "title", style: { width: '120px', display: 'inline-block' } }), index.h("sc-skeleton", { slot: "description", style: { width: '60px', display: 'inline-block' } }), index.h("sc-skeleton", { style: { width: '120px', display: 'inline-block' }, slot: "price" }), index.h("sc-skeleton", { style: { width: '60px', display: 'inline-block' }, slot: "price-description" })));
    }
    return (index.h("div", { class: { 'confirmation-summary': true } }, index.h("div", { class: "line-items", part: "line-items" }, (_b = (_a = this.order) === null || _a === void 0 ? void 0 : _a.line_items) === null || _b === void 0 ? void 0 : _b.data.map(item => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      return (index.h("div", { class: "line-item" }, index.h("sc-product-line-item", { key: item.id, imageUrl: (_b = (_a = item === null || item === void 0 ? void 0 : item.price) === null || _a === void 0 ? void 0 : _a.product) === null || _b === void 0 ? void 0 : _b.image_url, name: `${(_d = (_c = item === null || item === void 0 ? void 0 : item.price) === null || _c === void 0 ? void 0 : _c.product) === null || _d === void 0 ? void 0 : _d.name}`, priceName: (_e = item === null || item === void 0 ? void 0 : item.price) === null || _e === void 0 ? void 0 : _e.name, variantLabel: ((item === null || item === void 0 ? void 0 : item.variant_options) || []).filter(Boolean).join(' / ') || null, editable: false, removable: false, quantity: item.quantity, fees: (_f = item === null || item === void 0 ? void 0 : item.fees) === null || _f === void 0 ? void 0 : _f.data, amount: item.ad_hoc_amount !== null ? item.ad_hoc_amount : item.subtotal_amount, currency: (_g = this.order) === null || _g === void 0 ? void 0 : _g.currency, trialDurationDays: (_h = item === null || item === void 0 ? void 0 : item.price) === null || _h === void 0 ? void 0 : _h.trial_duration_days, interval: price.intervalString(item === null || item === void 0 ? void 0 : item.price, { showOnce: index$1.hasSubscription(this.order) }), purchasableStatusDisplay: item === null || item === void 0 ? void 0 : item.purchasable_status_display })));
    }))));
  }
};
consumer.openWormhole(ScOrderConfirmationLineItems, ['order', 'busy', 'loading', 'empty'], false);
ScOrderConfirmationLineItems.style = scOrderConfirmationLineItemsCss;

const scOrderConfirmationTotalsCss = ":host{display:block}";

const ScOrderConfirmationTotals = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.order = undefined;
  }
  renderDiscountLine() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    if (!((_c = (_b = (_a = this.order) === null || _a === void 0 ? void 0 : _a.discount) === null || _b === void 0 ? void 0 : _b.promotion) === null || _c === void 0 ? void 0 : _c.code)) {
      return null;
    }
    let humanDiscount = '';
    if ((_e = (_d = this.order) === null || _d === void 0 ? void 0 : _d.discount) === null || _e === void 0 ? void 0 : _e.coupon) {
      humanDiscount = price.getHumanDiscount((_g = (_f = this.order) === null || _f === void 0 ? void 0 : _f.discount) === null || _g === void 0 ? void 0 : _g.coupon);
    }
    return (index.h("sc-line-item", { style: { marginTop: 'var(--sc-spacing-small)' } }, index.h("span", { slot: "description" }, wp.i18n.__('Discount', 'surecart'), index.h("br", null), ((_k = (_j = (_h = this.order) === null || _h === void 0 ? void 0 : _h.discount) === null || _j === void 0 ? void 0 : _j.promotion) === null || _k === void 0 ? void 0 : _k.code) && (index.h("sc-tag", { type: "success", size: "small" }, (_o = (_m = (_l = this.order) === null || _l === void 0 ? void 0 : _l.discount) === null || _m === void 0 ? void 0 : _m.promotion) === null || _o === void 0 ? void 0 : _o.code))), humanDiscount && (index.h("span", { class: "coupon-human-discount", slot: "price-description" }, "(", humanDiscount, ")")), index.h("sc-format-number", { slot: "price", type: "currency", currency: (_p = this.order) === null || _p === void 0 ? void 0 : _p.currency, value: -((_q = this.order) === null || _q === void 0 ? void 0 : _q.discount_amount) })));
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    return (index.h("div", { class: { 'line-item-totals': true } }, index.h("sc-line-item-total", { checkout: this.order, total: "subtotal" }, index.h("span", { slot: "description" }, wp.i18n.__('Subtotal', 'surecart'))), this.renderDiscountLine(), !!((_a = this.order) === null || _a === void 0 ? void 0 : _a.bump_amount) && (index.h("sc-line-item", { style: { marginTop: 'var(--sc-spacing-small)' } }, index.h("span", { slot: "description" }, wp.i18n.__('Bundle Discount', 'surecart')), index.h("sc-format-number", { slot: "price", type: "currency", currency: (_b = this.order) === null || _b === void 0 ? void 0 : _b.currency, value: (_c = this.order) === null || _c === void 0 ? void 0 : _c.bump_amount }))), !!((_d = this.order) === null || _d === void 0 ? void 0 : _d.shipping_amount) && (index.h("sc-line-item", { style: { marginTop: 'var(--sc-spacing-small)' } }, index.h("span", { slot: "description" }, wp.i18n.__('Shipping', 'surecart')), index.h("sc-format-number", { slot: "price", type: "currency", currency: (_e = this.order) === null || _e === void 0 ? void 0 : _e.currency, value: (_f = this.order) === null || _f === void 0 ? void 0 : _f.shipping_amount }))), !!((_g = this.order) === null || _g === void 0 ? void 0 : _g.tax_amount) && (index.h("sc-line-item", { style: { marginTop: 'var(--sc-spacing-small)' } }, index.h("span", { slot: "description" }, tax.formatTaxDisplay((_h = this.order) === null || _h === void 0 ? void 0 : _h.tax_label), " ", `(${this.order.tax_percent}%)`), index.h("sc-format-number", { slot: "price", type: "currency", currency: (_j = this.order) === null || _j === void 0 ? void 0 : _j.currency, value: (_k = this.order) === null || _k === void 0 ? void 0 : _k.tax_amount }))), index.h("sc-divider", { style: { '--spacing': 'var(--sc-spacing-small)' } }), index.h("sc-line-item-total", { checkout: this.order, size: "large", "show-currency": true }, index.h("span", { slot: "description" }, wp.i18n.__('Total', 'surecart')))));
  }
};
consumer.openWormhole(ScOrderConfirmationTotals, ['order', 'busy', 'loading', 'empty'], false);
ScOrderConfirmationTotals.style = scOrderConfirmationTotalsCss;

exports.sc_order_confirmation_line_items = ScOrderConfirmationLineItems;
exports.sc_order_confirmation_totals = ScOrderConfirmationTotals;

//# sourceMappingURL=sc-order-confirmation-line-items_2.cjs.entry.js.map