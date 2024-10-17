import { r as registerInstance, c as createEvent, h, H as Host } from './index-644f5478.js';
import { a as apiFetch } from './fetch-2525e763.js';
import { b as translateRemainingPayments, i as intervalString } from './price-178c2e2b.js';
import { f as formatTaxDisplay } from './tax-79350864.js';
import { a as addQueryArgs } from './add-query-args-f4c5962b.js';
import './currency-728311ef.js';

const scCancelDialogCss = ":host{display:block;font-size:var(--sc-font-size-medium)}.close__button{position:absolute;top:0;right:0;font-size:22px}";

const ScCancelDialog = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.scRequestClose = createEvent(this, "scRequestClose", 7);
    this.scRefresh = createEvent(this, "scRefresh", 7);
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
    await apiFetch({
      method: 'PATCH',
      path: `surecart/v1/subscriptions/${(_b = this.subscription) === null || _b === void 0 ? void 0 : _b.id}/preserve`,
    });
  }
  componentWillLoad() {
    this.reset();
  }
  render() {
    return (h("sc-dialog", { style: {
        '--width': this.step === 'survey' ? '675px' : '500px',
        '--body-spacing': 'var(--sc-spacing-xxx-large)',
      }, noHeader: true, open: this.open, onScRequestClose: () => this.close() }, h("div", { class: {
        cancel: true,
      } }, h("sc-button", { class: "close__button", type: "text", circle: true, onClick: () => this.close() }, h("sc-icon", { name: "x" })), this.step === 'cancel' && (h("sc-subscription-cancel", { subscription: this.subscription, protocol: this.protocol, reason: this.reason, comment: this.comment, onScAbandon: () => this.close(), onScCancelled: () => {
        this.scRefresh.emit();
        this.reset();
        this.scRequestClose.emit('close-button');
      } })), this.step === 'survey' && (h("sc-cancel-survey", { protocol: this.protocol, onScAbandon: () => this.close(), onScSubmitReason: e => {
        const { comment, reason } = e.detail;
        this.reason = reason;
        this.comment = comment;
        this.step = (reason === null || reason === void 0 ? void 0 : reason.coupon_enabled) ? 'discount' : 'cancel';
      } })), this.step === 'discount' && (h("sc-cancel-discount", { protocol: this.protocol, subscription: this.subscription, reason: this.reason, comment: this.comment, onScCancel: () => (this.step = 'cancel'), onScPreserved: () => {
        this.scRefresh.emit();
        this.reset();
        this.scRequestClose.emit('close-button');
      } })))));
  }
};
ScCancelDialog.style = scCancelDialogCss;

const ScSubscriptionNextPayment = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
      this.period = (await apiFetch({
        method: 'PATCH',
        path: addQueryArgs(`surecart/v1/subscriptions/${(_c = this.subscription) === null || _c === void 0 ? void 0 : _c.id}/upcoming_period`, {
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
      return (h("sc-toggle", { borderless: true, disabled: true }, h("sc-flex", { slot: "summary", flexDirection: "column" }, h("sc-skeleton", { style: { width: '200px' } }), h("sc-skeleton", { style: { width: '400px' } }), h("sc-skeleton", { style: { width: '300px' } }))));
    }
    const checkout = (_a = this === null || this === void 0 ? void 0 : this.period) === null || _a === void 0 ? void 0 : _a.checkout;
    if (!checkout)
      return (h("div", { style: { padding: 'var(--sc-spacing-medium)' } }, h("sc-subscription-details", { slot: "summary", subscription: this.subscription })));
    const manualPaymentMethod = (checkout === null || checkout === void 0 ? void 0 : checkout.manual_payment) ? checkout === null || checkout === void 0 ? void 0 : checkout.manual_payment_method : null;
    const paymentMethodExists = (this === null || this === void 0 ? void 0 : this.subscription.payment_method) || (this === null || this === void 0 ? void 0 : this.subscription.manual_payment);
    return (h(Host, null, h("sc-toggle", { borderless: true, shady: true }, h("span", { slot: "summary" }, h("sc-subscription-details", { subscription: this.subscription }, h("div", { style: { fontSize: 'var(--sc-font-size-small)' } }, wp.i18n.__('Your next payment is', 'surecart'), ' ', h("strong", null, h("sc-format-number", { type: "currency", currency: checkout === null || checkout === void 0 ? void 0 : checkout.currency, value: checkout === null || checkout === void 0 ? void 0 : checkout.amount_due })), ' ', !!((_b = this.subscription) === null || _b === void 0 ? void 0 : _b.finite) && ' — ' + translateRemainingPayments((_c = this.subscription) === null || _c === void 0 ? void 0 : _c.remaining_period_count)))), h("sc-card", { noPadding: true, borderless: true }, (_d = checkout === null || checkout === void 0 ? void 0 : checkout.line_items) === null || _d === void 0 ? void 0 :
      _d.data.map(item => {
        var _a, _b, _c, _d, _e, _f;
        return (h("sc-product-line-item", { imageUrl: (_b = (_a = item.price) === null || _a === void 0 ? void 0 : _a.product) === null || _b === void 0 ? void 0 : _b.image_url, name: (_d = (_c = item.price) === null || _c === void 0 ? void 0 : _c.product) === null || _d === void 0 ? void 0 : _d.name, priceName: (_e = item === null || item === void 0 ? void 0 : item.price) === null || _e === void 0 ? void 0 : _e.name, variantLabel: ((item === null || item === void 0 ? void 0 : item.variant_options) || []).filter(Boolean).join(' / ') || null, editable: false, removable: false, quantity: item === null || item === void 0 ? void 0 : item.quantity, amount: item === null || item === void 0 ? void 0 : item.total_amount, currency: (_f = item === null || item === void 0 ? void 0 : item.price) === null || _f === void 0 ? void 0 : _f.currency, interval: intervalString(item === null || item === void 0 ? void 0 : item.price), purchasableStatusDisplay: item === null || item === void 0 ? void 0 : item.purchasable_status_display }));
      }), h("sc-line-item", null, h("span", { slot: "description" }, wp.i18n.__('Subtotal', 'surecart')), h("sc-format-number", { slot: "price", type: "currency", currency: checkout === null || checkout === void 0 ? void 0 : checkout.currency, value: checkout === null || checkout === void 0 ? void 0 : checkout.subtotal_amount })), !!checkout.proration_amount && (h("sc-line-item", null, h("span", { slot: "description" }, wp.i18n.__('Proration Credit', 'surecart')), h("sc-format-number", { slot: "price", type: "currency", currency: checkout === null || checkout === void 0 ? void 0 : checkout.currency, value: -(checkout === null || checkout === void 0 ? void 0 : checkout.proration_amount) }))), !!checkout.applied_balance_amount && (h("sc-line-item", null, h("span", { slot: "description" }, wp.i18n.__('Applied Balance', 'surecart')), h("sc-format-number", { slot: "price", type: "currency", currency: checkout === null || checkout === void 0 ? void 0 : checkout.currency, value: -(checkout === null || checkout === void 0 ? void 0 : checkout.applied_balance_amount) }))), !!checkout.trial_amount && (h("sc-line-item", null, h("span", { slot: "description" }, wp.i18n.__('Trial', 'surecart')), h("sc-format-number", { slot: "price", type: "currency", currency: checkout === null || checkout === void 0 ? void 0 : checkout.currency, value: checkout === null || checkout === void 0 ? void 0 : checkout.trial_amount }))), !!(checkout === null || checkout === void 0 ? void 0 : checkout.discount_amount) && (h("sc-line-item", null, h("span", { slot: "description" }, wp.i18n.__('Discounts', 'surecart')), h("sc-format-number", { slot: "price", type: "currency", currency: checkout === null || checkout === void 0 ? void 0 : checkout.currency, value: checkout === null || checkout === void 0 ? void 0 : checkout.discount_amount }))), !!(checkout === null || checkout === void 0 ? void 0 : checkout.shipping_amount) && (h("sc-line-item", { style: { marginTop: 'var(--sc-spacing-small)' } }, h("span", { slot: "description" }, wp.i18n.__('Shipping', 'surecart')), h("sc-format-number", { slot: "price", type: "currency", currency: checkout === null || checkout === void 0 ? void 0 : checkout.currency, value: checkout === null || checkout === void 0 ? void 0 : checkout.shipping_amount }))), !!checkout.tax_amount && (h("sc-line-item", null, h("span", { slot: "description" }, formatTaxDisplay(checkout === null || checkout === void 0 ? void 0 : checkout.tax_label)), h("sc-format-number", { slot: "price", type: "currency", currency: checkout === null || checkout === void 0 ? void 0 : checkout.currency, value: checkout === null || checkout === void 0 ? void 0 : checkout.tax_amount }))), h("sc-divider", { style: { '--spacing': '0' } }), h("sc-line-item", null, h("span", { slot: "description" }, wp.i18n.__('Payment', 'surecart')), paymentMethodExists && (h("a", { href: this.updatePaymentMethodUrl, slot: "price-description" }, h("sc-flex", { "justify-content": "flex-start", "align-items": "center", style: { '--spacing': '0.5em' } }, manualPaymentMethod ? h("sc-manual-payment-method", { paymentMethod: manualPaymentMethod }) : h("sc-payment-method", { paymentMethod: checkout === null || checkout === void 0 ? void 0 : checkout.payment_method }), h("sc-icon", { name: "edit-3" })))), !paymentMethodExists && (h("a", { href: addQueryArgs(window.location.href, {
        action: 'create',
        model: 'payment_method',
        id: this === null || this === void 0 ? void 0 : this.subscription.id,
        ...(((_e = this === null || this === void 0 ? void 0 : this.subscription) === null || _e === void 0 ? void 0 : _e.live_mode) === false ? { live_mode: false } : {}),
      }), slot: "price-description" }, wp.i18n.__('Add Payment Method', 'surecart')))), h("sc-line-item", { style: { '--price-size': 'var(--sc-font-size-x-large)' } }, h("span", { slot: "title" }, wp.i18n.__('Total Due', 'surecart')), h("sc-format-number", { slot: "price", type: "currency", currency: checkout === null || checkout === void 0 ? void 0 : checkout.currency, value: checkout === null || checkout === void 0 ? void 0 : checkout.amount_due }), h("span", { slot: "currency" }, checkout.currency))))));
  }
  static get watchers() { return {
    "subscription": ["handleSubscriptionChange"]
  }; }
};

export { ScCancelDialog as sc_cancel_dialog, ScSubscriptionNextPayment as sc_subscription_next_payment };

//# sourceMappingURL=sc-cancel-dialog_2.entry.js.map