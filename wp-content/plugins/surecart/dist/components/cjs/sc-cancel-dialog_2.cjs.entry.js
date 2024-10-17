'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const fetch = require('./fetch-2dba325c.js');
const price = require('./price-f1f1114d.js');
const tax = require('./tax-4f82e63a.js');
const addQueryArgs = require('./add-query-args-17c551b6.js');
require('./currency-ba038e2f.js');

const scCancelDialogCss = ":host{display:block;font-size:var(--sc-font-size-medium)}.close__button{position:absolute;top:0;right:0;font-size:22px}";

const ScCancelDialog = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.scRequestClose = index.createEvent(this, "scRequestClose", 7);
    this.scRefresh = index.createEvent(this, "scRefresh", 7);
    this.open = undefined;
    this.protocol = undefined;
    this.subscription = undefined;
    this.reasons = undefined;
    this.reason = undefined;
    this.step = 'cancel';
    this.comment = undefined;
  }
  close() {
    this.reset();
    this.trackAttempt();
    this.scRequestClose.emit('close-button');
  }
  reset() {
    var _a;
    this.reason = null;
    this.step = ((_a = this.protocol) === null || _a === void 0 ? void 0 : _a.preservation_enabled) ? 'survey' : 'cancel';
  }
  async trackAttempt() {
    var _a, _b;
    if (!((_a = this.protocol) === null || _a === void 0 ? void 0 : _a.preservation_enabled))
      return;
    await fetch.apiFetch({
      method: 'PATCH',
      path: `surecart/v1/subscriptions/${(_b = this.subscription) === null || _b === void 0 ? void 0 : _b.id}/preserve`,
    });
  }
  componentWillLoad() {
    this.reset();
  }
  render() {
    return (index.h("sc-dialog", { style: {
        '--width': this.step === 'survey' ? '675px' : '500px',
        '--body-spacing': 'var(--sc-spacing-xxx-large)',
      }, noHeader: true, open: this.open, onScRequestClose: () => this.close() }, index.h("div", { class: {
        cancel: true,
      } }, index.h("sc-button", { class: "close__button", type: "text", circle: true, onClick: () => this.close() }, index.h("sc-icon", { name: "x" })), this.step === 'cancel' && (index.h("sc-subscription-cancel", { subscription: this.subscription, protocol: this.protocol, reason: this.reason, comment: this.comment, onScAbandon: () => this.close(), onScCancelled: () => {
        this.scRefresh.emit();
        this.reset();
        this.scRequestClose.emit('close-button');
      } })), this.step === 'survey' && (index.h("sc-cancel-survey", { protocol: this.protocol, onScAbandon: () => this.close(), onScSubmitReason: e => {
        const { comment, reason } = e.detail;
        this.reason = reason;
        this.comment = comment;
        this.step = (reason === null || reason === void 0 ? void 0 : reason.coupon_enabled) ? 'discount' : 'cancel';
      } })), this.step === 'discount' && (index.h("sc-cancel-discount", { protocol: this.protocol, subscription: this.subscription, reason: this.reason, comment: this.comment, onScCancel: () => (this.step = 'cancel'), onScPreserved: () => {
        this.scRefresh.emit();
        this.reset();
        this.scRequestClose.emit('close-button');
      } })))));
  }
};
ScCancelDialog.style = scCancelDialogCss;

const ScSubscriptionNextPayment = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.subscription = undefined;
    this.updatePaymentMethodUrl = undefined;
    this.period = undefined;
    this.loading = true;
    this.error = undefined;
    this.details = undefined;
  }
  componentWillLoad() {
    this.fetch();
  }
  handleSubscriptionChange() {
    this.fetch();
  }
  async fetch() {
    var _a, _b, _c;
    if (((_a = this.subscription) === null || _a === void 0 ? void 0 : _a.cancel_at_period_end) && this.subscription.current_period_end_at) {
      this.loading = false;
      return;
    }
    if (((_b = this.subscription) === null || _b === void 0 ? void 0 : _b.status) === 'canceled') {
      this.loading = false;
      return;
    }
    try {
      this.loading = true;
      this.period = (await fetch.apiFetch({
        method: 'PATCH',
        path: addQueryArgs.addQueryArgs(`surecart/v1/subscriptions/${(_c = this.subscription) === null || _c === void 0 ? void 0 : _c.id}/upcoming_period`, {
          skip_product_group_validation: true,
          expand: [
            'period.checkout',
            'checkout.line_items',
            'checkout.payment_method',
            'checkout.manual_payment_method',
            'payment_method.card',
            'payment_method.payment_instrument',
            'payment_method.paypal_account',
            'payment_method.bank_account',
            'line_item.price',
            'price.product',
            'period.subscription',
          ],
        }),
        data: {
          purge_pending_update: false,
        },
      }));
    }
    catch (e) {
      console.error(e);
      this.error = e;
    }
    finally {
      this.loading = false;
    }
  }
  render() {
    var _a, _b, _c, _d, _e;
    if (this.loading) {
      return (index.h("sc-toggle", { borderless: true, disabled: true }, index.h("sc-flex", { slot: "summary", flexDirection: "column" }, index.h("sc-skeleton", { style: { width: '200px' } }), index.h("sc-skeleton", { style: { width: '400px' } }), index.h("sc-skeleton", { style: { width: '300px' } }))));
    }
    const checkout = (_a = this === null || this === void 0 ? void 0 : this.period) === null || _a === void 0 ? void 0 : _a.checkout;
    if (!checkout)
      return (index.h("div", { style: { padding: 'var(--sc-spacing-medium)' } }, index.h("sc-subscription-details", { slot: "summary", subscription: this.subscription })));
    const manualPaymentMethod = (checkout === null || checkout === void 0 ? void 0 : checkout.manual_payment) ? checkout === null || checkout === void 0 ? void 0 : checkout.manual_payment_method : null;
    const paymentMethodExists = (this === null || this === void 0 ? void 0 : this.subscription.payment_method) || (this === null || this === void 0 ? void 0 : this.subscription.manual_payment);
    return (index.h(index.Host, null, index.h("sc-toggle", { borderless: true, shady: true }, index.h("span", { slot: "summary" }, index.h("sc-subscription-details", { subscription: this.subscription }, index.h("div", { style: { fontSize: 'var(--sc-font-size-small)' } }, wp.i18n.__('Your next payment is', 'surecart'), ' ', index.h("strong", null, index.h("sc-format-number", { type: "currency", currency: checkout === null || checkout === void 0 ? void 0 : checkout.currency, value: checkout === null || checkout === void 0 ? void 0 : checkout.amount_due })), ' ', !!((_b = this.subscription) === null || _b === void 0 ? void 0 : _b.finite) && ' — ' + price.translateRemainingPayments((_c = this.subscription) === null || _c === void 0 ? void 0 : _c.remaining_period_count)))), index.h("sc-card", { noPadding: true, borderless: true }, (_d = checkout === null || checkout === void 0 ? void 0 : checkout.line_items) === null || _d === void 0 ? void 0 :
      _d.data.map(item => {
        var _a, _b, _c, _d, _e, _f;
        return (index.h("sc-product-line-item", { imageUrl: (_b = (_a = item.price) === null || _a === void 0 ? void 0 : _a.product) === null || _b === void 0 ? void 0 : _b.image_url, name: (_d = (_c = item.price) === null || _c === void 0 ? void 0 : _c.product) === null || _d === void 0 ? void 0 : _d.name, priceName: (_e = item === null || item === void 0 ? void 0 : item.price) === null || _e === void 0 ? void 0 : _e.name, variantLabel: ((item === null || item === void 0 ? void 0 : item.variant_options) || []).filter(Boolean).join(' / ') || null, editable: false, removable: false, quantity: item === null || item === void 0 ? void 0 : item.quantity, amount: item === null || item === void 0 ? void 0 : item.total_amount, currency: (_f = item === null || item === void 0 ? void 0 : item.price) === null || _f === void 0 ? void 0 : _f.currency, interval: price.intervalString(item === null || item === void 0 ? void 0 : item.price), purchasableStatusDisplay: item === null || item === void 0 ? void 0 : item.purchasable_status_display }));
      }), index.h("sc-line-item", null, index.h("span", { slot: "description" }, wp.i18n.__('Subtotal', 'surecart')), index.h("sc-format-number", { slot: "price", type: "currency", currency: checkout === null || checkout === void 0 ? void 0 : checkout.currency, value: checkout === null || checkout === void 0 ? void 0 : checkout.subtotal_amount })), !!checkout.proration_amount && (index.h("sc-line-item", null, index.h("span", { slot: "description" }, wp.i18n.__('Proration Credit', 'surecart')), index.h("sc-format-number", { slot: "price", type: "currency", currency: checkout === null || checkout === void 0 ? void 0 : checkout.currency, value: -(checkout === null || checkout === void 0 ? void 0 : checkout.proration_amount) }))), !!checkout.applied_balance_amount && (index.h("sc-line-item", null, index.h("span", { slot: "description" }, wp.i18n.__('Applied Balance', 'surecart')), index.h("sc-format-number", { slot: "price", type: "currency", currency: checkout === null || checkout === void 0 ? void 0 : checkout.currency, value: -(checkout === null || checkout === void 0 ? void 0 : checkout.applied_balance_amount) }))), !!checkout.trial_amount && (index.h("sc-line-item", null, index.h("span", { slot: "description" }, wp.i18n.__('Trial', 'surecart')), index.h("sc-format-number", { slot: "price", type: "currency", currency: checkout === null || checkout === void 0 ? void 0 : checkout.currency, value: checkout === null || checkout === void 0 ? void 0 : checkout.trial_amount }))), !!(checkout === null || checkout === void 0 ? void 0 : checkout.discount_amount) && (index.h("sc-line-item", null, index.h("span", { slot: "description" }, wp.i18n.__('Discounts', 'surecart')), index.h("sc-format-number", { slot: "price", type: "currency", currency: checkout === null || checkout === void 0 ? void 0 : checkout.currency, value: checkout === null || checkout === void 0 ? void 0 : checkout.discount_amount }))), !!(checkout === null || checkout === void 0 ? void 0 : checkout.shipping_amount) && (index.h("sc-line-item", { style: { marginTop: 'var(--sc-spacing-small)' } }, index.h("span", { slot: "description" }, wp.i18n.__('Shipping', 'surecart')), index.h("sc-format-number", { slot: "price", type: "currency", currency: checkout === null || checkout === void 0 ? void 0 : checkout.currency, value: checkout === null || checkout === void 0 ? void 0 : checkout.shipping_amount }))), !!checkout.tax_amount && (index.h("sc-line-item", null, index.h("span", { slot: "description" }, tax.formatTaxDisplay(checkout === null || checkout === void 0 ? void 0 : checkout.tax_label)), index.h("sc-format-number", { slot: "price", type: "currency", currency: checkout === null || checkout === void 0 ? void 0 : checkout.currency, value: checkout === null || checkout === void 0 ? void 0 : checkout.tax_amount }))), index.h("sc-divider", { style: { '--spacing': '0' } }), index.h("sc-line-item", null, index.h("span", { slot: "description" }, wp.i18n.__('Payment', 'surecart')), paymentMethodExists && (index.h("a", { href: this.updatePaymentMethodUrl, slot: "price-description" }, index.h("sc-flex", { "justify-content": "flex-start", "align-items": "center", style: { '--spacing': '0.5em' } }, manualPaymentMethod ? index.h("sc-manual-payment-method", { paymentMethod: manualPaymentMethod }) : index.h("sc-payment-method", { paymentMethod: checkout === null || checkout === void 0 ? void 0 : checkout.payment_method }), index.h("sc-icon", { name: "edit-3" })))), !paymentMethodExists && (index.h("a", { href: addQueryArgs.addQueryArgs(window.location.href, {
        action: 'create',
        model: 'payment_method',
        id: this === null || this === void 0 ? void 0 : this.subscription.id,
        ...(((_e = this === null || this === void 0 ? void 0 : this.subscription) === null || _e === void 0 ? void 0 : _e.live_mode) === false ? { live_mode: false } : {}),
      }), slot: "price-description" }, wp.i18n.__('Add Payment Method', 'surecart')))), index.h("sc-line-item", { style: { '--price-size': 'var(--sc-font-size-x-large)' } }, index.h("span", { slot: "title" }, wp.i18n.__('Total Due', 'surecart')), index.h("sc-format-number", { slot: "price", type: "currency", currency: checkout === null || checkout === void 0 ? void 0 : checkout.currency, value: checkout === null || checkout === void 0 ? void 0 : checkout.amount_due }), index.h("span", { slot: "currency" }, checkout.currency))))));
  }
  static get watchers() { return {
    "subscription": ["handleSubscriptionChange"]
  }; }
};

exports.sc_cancel_dialog = ScCancelDialog;
exports.sc_subscription_next_payment = ScSubscriptionNextPayment;

//# sourceMappingURL=sc-cancel-dialog_2.cjs.entry.js.map