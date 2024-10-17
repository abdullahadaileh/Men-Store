'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const fetch = require('./fetch-2dba325c.js');
const lazy = require('./lazy-bc8baeab.js');
const price = require('./price-f1f1114d.js');
const tax = require('./tax-4f82e63a.js');
const media = require('./media-71bcf49e.js');
const addQueryArgs = require('./add-query-args-17c551b6.js');
require('./currency-ba038e2f.js');

const scOrderCss = ":host{display:block}.order__row{padding:var(--sc-spacing-large);display:grid;gap:var(--sc-spacing-small)}";

const ScOrder = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.orderId = undefined;
    this.customerIds = undefined;
    this.heading = undefined;
    this.order = undefined;
    this.purchases = undefined;
    this.loading = undefined;
    this.busy = undefined;
    this.error = undefined;
  }
  /** Only fetch if visible */
  componentDidLoad() {
    lazy.onFirstVisible(this.el, () => {
      this.fetchOrder();
      this.fetchDownloads();
    });
  }
  async fetchOrder() {
    try {
      this.loading = true;
      await this.getOrder();
    }
    catch (e) {
      console.error(this.error);
      this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
    }
    finally {
      this.loading = false;
    }
  }
  async fetchDownloads() {
    try {
      this.busy = true;
      this.purchases = (await fetch.apiFetch({
        path: addQueryArgs.addQueryArgs(`surecart/v1/purchases`, {
          expand: ['product', 'product.downloads', 'download.media'],
          order_ids: [this.orderId],
          customer_ids: this.customerIds,
          downloadable: true,
        }),
      }));
    }
    catch (e) {
      console.error(this.error);
      this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
    }
    finally {
      this.busy = false;
    }
  }
  /** Get order */
  async getOrder() {
    this.order = (await fetch.apiFetch({
      path: addQueryArgs.addQueryArgs(`surecart/v1/orders/${this.orderId}`, {
        expand: [
          'checkout',
          'checkout.line_items',
          'line_item.price',
          'line_item.fees',
          'line_item.variant',
          'variant.image',
          'price.product',
          'checkout.manual_payment_method',
          'checkout.payment_method',
          'checkout.selected_shipping_choice',
          'shipping_choice.shipping_method',
          'payment_method.card',
          'payment_method.payment_instrument',
          'payment_method.paypal_account',
          'payment_method.bank_account',
          'checkout.discount',
          'discount.promotion',
          'checkout.charge',
        ],
      }),
    }));
  }
  renderLoading() {
    return (index.h("sc-flex", { flexDirection: "column", style: { gap: '1em' } }, index.h("sc-skeleton", { style: { width: '20%', display: 'inline-block' } }), index.h("sc-skeleton", { style: { width: '60%', display: 'inline-block' } }), index.h("sc-skeleton", { style: { width: '40%', display: 'inline-block' } })));
  }
  renderEmpty() {
    return index.h("sc-empty", { icon: "shopping-bag" }, wp.i18n.__('Order not found.', 'surecart'));
  }
  renderContent() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    if (this.loading) {
      return this.renderLoading();
    }
    if (!((_a = this.order) === null || _a === void 0 ? void 0 : _a.id)) {
      return this.renderEmpty();
    }
    const checkout = (_b = this.order) === null || _b === void 0 ? void 0 : _b.checkout;
    const shippingMethod = (_c = checkout === null || checkout === void 0 ? void 0 : checkout.selected_shipping_choice) === null || _c === void 0 ? void 0 : _c.shipping_method;
    const shippingMethodName = shippingMethod === null || shippingMethod === void 0 ? void 0 : shippingMethod.name;
    return (index.h(index.Fragment, null, (((_d = checkout === null || checkout === void 0 ? void 0 : checkout.line_items) === null || _d === void 0 ? void 0 : _d.data) || []).map(item => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      const { url, title, alt } = media.getFeaturedProductMediaAttributes((_a = item === null || item === void 0 ? void 0 : item.price) === null || _a === void 0 ? void 0 : _a.product, item === null || item === void 0 ? void 0 : item.variant);
      return (index.h("sc-product-line-item", { key: item.id, imageUrl: url, imageAlt: alt, imageTitle: title, name: (_c = (_b = item === null || item === void 0 ? void 0 : item.price) === null || _b === void 0 ? void 0 : _b.product) === null || _c === void 0 ? void 0 : _c.name, priceName: (_d = item === null || item === void 0 ? void 0 : item.price) === null || _d === void 0 ? void 0 : _d.name, variantLabel: ((item === null || item === void 0 ? void 0 : item.variant_options) || []).filter(Boolean).join(' / ') || null, editable: false, removable: false, quantity: item.quantity, amount: item.subtotal_amount, currency: (_e = item === null || item === void 0 ? void 0 : item.price) === null || _e === void 0 ? void 0 : _e.currency, trialDurationDays: (_f = item === null || item === void 0 ? void 0 : item.price) === null || _f === void 0 ? void 0 : _f.trial_duration_days, interval: price.intervalString(item === null || item === void 0 ? void 0 : item.price), scratchAmount: item === null || item === void 0 ? void 0 : item.scratch_amount, setupFeeTrialEnabled: (_g = item === null || item === void 0 ? void 0 : item.price) === null || _g === void 0 ? void 0 : _g.setup_fee_trial_enabled, fees: (_h = item === null || item === void 0 ? void 0 : item.fees) === null || _h === void 0 ? void 0 : _h.data }));
    }), index.h("sc-divider", { style: { '--spacing': 'var(--sc-spacing-x-small)' } }), index.h("sc-line-item", null, index.h("span", { slot: "description" }, wp.i18n.__('Subtotal', 'surecart')), index.h("sc-format-number", { slot: "price", style: {
        'font-weight': 'var(--sc-font-weight-semibold)',
        'color': 'var(--sc-color-gray-800)',
      }, type: "currency", currency: checkout === null || checkout === void 0 ? void 0 : checkout.currency, value: checkout === null || checkout === void 0 ? void 0 : checkout.subtotal_amount })), !!(checkout === null || checkout === void 0 ? void 0 : checkout.proration_amount) && (index.h("sc-line-item", null, index.h("span", { slot: "description" }, wp.i18n.__('Proration', 'surecart')), index.h("sc-format-number", { slot: "price", style: {
        'font-weight': 'var(--sc-font-weight-semibold)',
        'color': 'var(--sc-color-gray-800)',
      }, type: "currency", currency: checkout === null || checkout === void 0 ? void 0 : checkout.currency, value: checkout === null || checkout === void 0 ? void 0 : checkout.proration_amount }))), !!(checkout === null || checkout === void 0 ? void 0 : checkout.applied_balance_amount) && (index.h("sc-line-item", null, index.h("span", { slot: "description" }, wp.i18n.__('Applied Balance', 'surecart')), index.h("sc-format-number", { slot: "price", style: {
        'font-weight': 'var(--sc-font-weight-semibold)',
        'color': 'var(--sc-color-gray-800)',
      }, type: "currency", currency: checkout === null || checkout === void 0 ? void 0 : checkout.currency, value: checkout === null || checkout === void 0 ? void 0 : checkout.applied_balance_amount }))), !!(checkout === null || checkout === void 0 ? void 0 : checkout.discounts) && (index.h("sc-line-item", null, index.h("span", { slot: "description" }, wp.i18n.__('Discount', 'surecart')), index.h("sc-format-number", { slot: "price", style: {
        'font-weight': 'var(--sc-font-weight-semibold)',
        'color': 'var(--sc-color-gray-800)',
      }, type: "currency", currency: checkout === null || checkout === void 0 ? void 0 : checkout.currency, value: checkout === null || checkout === void 0 ? void 0 : checkout.discounts }))), !!((_f = (_e = checkout === null || checkout === void 0 ? void 0 : checkout.discount) === null || _e === void 0 ? void 0 : _e.promotion) === null || _f === void 0 ? void 0 : _f.code) && (index.h("sc-line-item", null, index.h("span", { slot: "description" }, wp.i18n.__('Discount', 'surecart'), index.h("br", null), index.h("sc-tag", { type: "success" }, wp.i18n.__('Coupon:', 'surecart'), " ", (_h = (_g = checkout === null || checkout === void 0 ? void 0 : checkout.discount) === null || _g === void 0 ? void 0 : _g.promotion) === null || _h === void 0 ? void 0 :
      _h.code)), index.h("sc-format-number", { slot: "price", style: {
        'font-weight': 'var(--sc-font-weight-semibold)',
        'color': 'var(--sc-color-gray-800)',
      }, type: "currency", currency: checkout === null || checkout === void 0 ? void 0 : checkout.currency, value: checkout === null || checkout === void 0 ? void 0 : checkout.discount_amount }))), !!(checkout === null || checkout === void 0 ? void 0 : checkout.shipping_amount) && (index.h("sc-line-item", null, index.h("span", { slot: "description" }, `${wp.i18n.__('Shipping', 'surecart')} ${shippingMethodName ? `(${shippingMethodName})` : ''}`), index.h("sc-format-number", { slot: "price", style: {
        'font-weight': 'var(--sc-font-weight-semibold)',
        'color': 'var(--sc-color-gray-800)',
      }, type: "currency", currency: checkout === null || checkout === void 0 ? void 0 : checkout.currency, value: checkout === null || checkout === void 0 ? void 0 : checkout.shipping_amount }))), !!(checkout === null || checkout === void 0 ? void 0 : checkout.tax_amount) && (index.h("sc-line-item", null, index.h("span", { slot: "description" }, tax.formatTaxDisplay(checkout === null || checkout === void 0 ? void 0 : checkout.tax_label), " (", checkout === null || checkout === void 0 ? void 0 :
      checkout.tax_percent, "%)"), index.h("sc-format-number", { slot: "price", style: {
        'font-weight': 'var(--sc-font-weight-semibold)',
        'color': 'var(--sc-color-gray-800)',
      }, type: "currency", currency: checkout === null || checkout === void 0 ? void 0 : checkout.currency, value: checkout === null || checkout === void 0 ? void 0 : checkout.tax_amount }))), index.h("sc-divider", { style: { '--spacing': 'var(--sc-spacing-x-small)' } }), index.h("sc-line-item", { style: {
        'width': '100%',
        '--price-size': 'var(--sc-font-size-x-large)',
      } }, index.h("span", { slot: "title" }, wp.i18n.__('Total', 'surecart')), index.h("span", { slot: "price" }, index.h("sc-format-number", { type: "currency", currency: checkout === null || checkout === void 0 ? void 0 : checkout.currency, value: checkout === null || checkout === void 0 ? void 0 : checkout.total_amount })), index.h("span", { slot: "currency" }, checkout === null || checkout === void 0 ? void 0 : checkout.currency)), (checkout === null || checkout === void 0 ? void 0 : checkout.amount_due) !== (checkout === null || checkout === void 0 ? void 0 : checkout.total_amount) && (index.h("sc-line-item", { style: {
        'width': '100%',
        '--price-size': 'var(--sc-font-size-x-large)',
      } }, index.h("span", { slot: "title" }, wp.i18n.__('Amount Due', 'surecart')), index.h("span", { slot: "price" }, index.h("sc-format-number", { type: "currency", currency: checkout === null || checkout === void 0 ? void 0 : checkout.currency, value: checkout === null || checkout === void 0 ? void 0 : checkout.amount_due })), index.h("span", { slot: "currency" }, checkout === null || checkout === void 0 ? void 0 : checkout.currency))), !!(checkout === null || checkout === void 0 ? void 0 : checkout.charge) && (index.h("sc-line-item", { style: {
        'width': '100%',
        '--price-size': 'var(--sc-font-size-x-large)',
      } }, index.h("span", { slot: "title" }, wp.i18n.__('Amount Paid', 'surecart')), index.h("span", { slot: "price" }, index.h("sc-format-number", { type: "currency", currency: (_j = checkout === null || checkout === void 0 ? void 0 : checkout.charge) === null || _j === void 0 ? void 0 : _j.currency, value: ((_k = checkout === null || checkout === void 0 ? void 0 : checkout.charge) === null || _k === void 0 ? void 0 : _k.amount) ? ((_l = checkout === null || checkout === void 0 ? void 0 : checkout.charge) === null || _l === void 0 ? void 0 : _l.amount) - ((_m = checkout === null || checkout === void 0 ? void 0 : checkout.charge) === null || _m === void 0 ? void 0 : _m.refunded_amount) : 0 })), index.h("span", { slot: "currency" }, (_o = checkout === null || checkout === void 0 ? void 0 : checkout.charge) === null || _o === void 0 ? void 0 : _o.currency)))));
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g;
    const checkout = (_a = this === null || this === void 0 ? void 0 : this.order) === null || _a === void 0 ? void 0 : _a.checkout;
    const manualPaymentMethod = checkout === null || checkout === void 0 ? void 0 : checkout.manual_payment_method;
    return (index.h("sc-spacing", { style: { '--spacing': 'var(--sc-spacing-large)' } }, index.h("sc-dashboard-module", { error: this.error }, index.h("span", { slot: "heading" }, this.loading ? index.h("sc-skeleton", { style: { width: '120px' } }) : `#${(_b = this === null || this === void 0 ? void 0 : this.order) === null || _b === void 0 ? void 0 : _b.number}`), !this.loading && !(checkout === null || checkout === void 0 ? void 0 : checkout.live_mode) && (index.h("sc-tag", { type: "warning", slot: "end" }, wp.i18n.__('Test Mode', 'surecart'))), !!(manualPaymentMethod === null || manualPaymentMethod === void 0 ? void 0 : manualPaymentMethod.name) && !!(manualPaymentMethod === null || manualPaymentMethod === void 0 ? void 0 : manualPaymentMethod.instructions) && (index.h("sc-order-manual-instructions", { manualPaymentTitle: manualPaymentMethod === null || manualPaymentMethod === void 0 ? void 0 : manualPaymentMethod.name, manualPaymentInstructions: manualPaymentMethod === null || manualPaymentMethod === void 0 ? void 0 : manualPaymentMethod.instructions })), index.h("sc-card", { "no-padding": !this.loading }, this.loading ? (this.renderLoading()) : (index.h(index.Fragment, null, index.h("sc-stacked-list", null, index.h("sc-stacked-list-row", { style: { '--columns': '2' } }, index.h("div", null, wp.i18n.__('Order Status', 'surecart')), index.h("sc-order-status-badge", { status: (_c = this === null || this === void 0 ? void 0 : this.order) === null || _c === void 0 ? void 0 : _c.status })), index.h("sc-stacked-list-row", { style: { '--columns': '2' } }, index.h("div", null, wp.i18n.__('Date', 'surecart')), index.h("sc-format-date", { type: "timestamp", date: (_d = this.order) === null || _d === void 0 ? void 0 : _d.created_at, month: "short", day: "numeric", year: "numeric" })), index.h("sc-stacked-list-row", { style: { '--columns': '2' } }, index.h("div", null, wp.i18n.__('Payment Method', 'surecart')), index.h("sc-payment-method", { paymentMethod: checkout === null || checkout === void 0 ? void 0 : checkout.payment_method })), index.h("div", { class: "order__row" }, this.renderContent())))))), ((_e = this.order) === null || _e === void 0 ? void 0 : _e.statement_url) && (index.h("sc-button", { type: "primary", href: (_f = this.order) === null || _f === void 0 ? void 0 : _f.statement_url, target: "_blank" }, index.h("sc-icon", { name: "inbox", slot: "prefix" }), wp.i18n.__('Download Receipt/Invoice', 'surecart'))), !!((_g = this.purchases) === null || _g === void 0 ? void 0 : _g.length) && index.h("sc-purchase-downloads-list", { heading: wp.i18n.__('Downloads', 'surecart'), purchases: this.purchases })));
  }
  get el() { return index.getElement(this); }
};
ScOrder.style = scOrderCss;

exports.sc_order = ScOrder;

//# sourceMappingURL=sc-order.cjs.entry.js.map