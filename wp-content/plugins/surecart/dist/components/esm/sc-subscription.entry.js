import { r as registerInstance, h, F as Fragment, a as getElement } from './index-644f5478.js';
import { a as apiFetch } from './fetch-2525e763.js';
import { o as onFirstVisible } from './lazy-64c2bf3b.js';
import { p as productNameWithPrice } from './price-178c2e2b.js';
import { a as addQueryArgs } from './add-query-args-f4c5962b.js';
import './currency-728311ef.js';

const scSubscriptionCss = ":host{display:block}.subscription{display:grid;gap:0.5em}.subscription a{text-decoration:none;font-weight:var(--sc-font-weight-semibold);display:inline-flex;align-items:center;gap:0.25em;color:var(--sc-color-primary-500)}.subscription a.cancel{color:var(--sc-color-danger-500)}@media screen and (max-width: 720px){.subscription__action-buttons{--sc-flex-column-gap:var(--sc-spacing-xxx-small)}.subscription__action-buttons::part(base){flex-direction:column}.subscription__action-buttons sc-button::part(base){width:auto;height:2em}}";

const ScSubscription = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.subscriptionId = undefined;
    this.showCancel = undefined;
    this.heading = undefined;
    this.query = undefined;
    this.protocol = undefined;
    this.subscription = undefined;
    this.updatePaymentMethodUrl = undefined;
    this.loading = undefined;
    this.cancelModal = undefined;
    this.resubscribeModal = undefined;
    this.busy = undefined;
    this.error = undefined;
  }
  componentWillLoad() {
    onFirstVisible(this.el, () => {
      if (!this.subscription) {
        this.getSubscription();
      }
    });
  }
  async cancelPendingUpdate() {
    var _a;
    const r = confirm(wp.i18n.__('Are you sure you want to cancel the pending update to your plan?', 'surecart'));
    if (!r)
      return;
    try {
      this.busy = true;
      this.subscription = (await apiFetch({
        path: addQueryArgs(`surecart/v1/subscriptions/${(_a = this.subscription) === null || _a === void 0 ? void 0 : _a.id}/`, {
          expand: ['price', 'price.product', 'current_period', 'period.checkout', 'purchase', 'purchase.license', 'license.activations', 'discount', 'discount.coupon'],
        }),
        method: 'PATCH',
        data: {
          purge_pending_update: true,
        },
      }));
    }
    catch (e) {
      if (e === null || e === void 0 ? void 0 : e.message) {
        this.error = e.message;
      }
      else {
        this.error = wp.i18n.__('Something went wrong', 'surecart');
      }
      console.error(this.error);
    }
    finally {
      this.busy = false;
    }
  }
  async renewSubscription() {
    var _a;
    try {
      this.error = '';
      this.busy = true;
      this.subscription = (await apiFetch({
        path: addQueryArgs(`surecart/v1/subscriptions/${(_a = this.subscription) === null || _a === void 0 ? void 0 : _a.id}/renew`, {
          expand: ['price', 'price.product', 'current_period', 'period.checkout', 'purchase', 'purchase.license', 'license.activations', 'discount', 'discount.coupon'],
        }),
        method: 'PATCH',
      }));
    }
    catch (e) {
      this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
    }
    finally {
      this.busy = false;
    }
  }
  /** Get all subscriptions */
  async getSubscription() {
    var _a;
    try {
      this.loading = true;
      this.subscription = (await await apiFetch({
        path: addQueryArgs(`surecart/v1/subscriptions/${this.subscriptionId || ((_a = this.subscription) === null || _a === void 0 ? void 0 : _a.id)}`, {
          expand: ['price', 'price.product', 'current_period'],
          ...(this.query || {}),
        }),
      }));
    }
    catch (e) {
      if (e === null || e === void 0 ? void 0 : e.message) {
        this.error = e.message;
      }
      else {
        this.error = wp.i18n.__('Something went wrong', 'surecart');
      }
      console.error(this.error);
    }
    finally {
      this.loading = false;
    }
  }
  renderName(subscription) {
    var _a;
    if (typeof ((_a = subscription === null || subscription === void 0 ? void 0 : subscription.price) === null || _a === void 0 ? void 0 : _a.product) !== 'string') {
      return productNameWithPrice(subscription === null || subscription === void 0 ? void 0 : subscription.price);
    }
    return wp.i18n.__('Subscription', 'surecart');
  }
  renderRenewalText(subscription) {
    const tag = h("sc-subscription-status-badge", { subscription: subscription });
    if ((subscription === null || subscription === void 0 ? void 0 : subscription.cancel_at_period_end) && subscription.current_period_end_at) {
      return (h("span", null, tag, " ", wp.i18n.sprintf(wp.i18n.__('Your plan will be canceled on', 'surecart')), ' ', h("sc-format-date", { date: subscription.current_period_end_at * 1000, month: "long", day: "numeric", year: "numeric" })));
    }
    if (subscription.status === 'trialing' && subscription.trial_end_at) {
      return (h("span", null, tag, " ", wp.i18n.sprintf(wp.i18n.__('Your plan begins on', 'surecart')), " ", h("sc-format-date", { date: subscription.trial_end_at * 1000, month: "long", day: "numeric", year: "numeric" })));
    }
    if (subscription.status === 'active' && subscription.current_period_end_at) {
      return (h("span", null, tag, " ", wp.i18n.sprintf(wp.i18n.__('Your plan renews on', 'surecart')), ' ', h("sc-format-date", { date: subscription.current_period_end_at * 1000, month: "long", day: "numeric", year: "numeric" })));
    }
    return tag;
  }
  renderEmpty() {
    return h("slot", { name: "empty" }, wp.i18n.__('This subscription does not exist.', 'surecart'));
  }
  renderLoading() {
    return (h("sc-stacked-list-row", { style: { '--columns': '2' }, "mobile-size": 0 }, h("div", { style: { padding: '0.5em' } }, h("sc-skeleton", { style: { width: '30%', marginBottom: '0.75em' } }), h("sc-skeleton", { style: { width: '20%', marginBottom: '0.75em' } }), h("sc-skeleton", { style: { width: '40%' } }))));
  }
  renderContent() {
    if (this.loading) {
      return this.renderLoading();
    }
    if (!this.subscription) {
      return this.renderEmpty();
    }
    return (h(Fragment, null, h("sc-subscription-next-payment", { subscription: this.subscription, updatePaymentMethodUrl: this.updatePaymentMethodUrl }, h("sc-subscription-details", { subscription: this.subscription }))));
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g;
    const paymentMethodExists = (this === null || this === void 0 ? void 0 : this.subscription.payment_method) || (this === null || this === void 0 ? void 0 : this.subscription.manual_payment);
    return (h("sc-dashboard-module", { heading: this.heading || wp.i18n.__('Current Plan', 'surecart'), class: "subscription", error: this.error }, !!this.subscription && (h("sc-flex", { slot: "end", class: "subscription__action-buttons" }, this.updatePaymentMethodUrl && paymentMethodExists && (h("sc-button", { type: "link", href: this.updatePaymentMethodUrl }, h("sc-icon", { name: "credit-card", slot: "prefix" }), wp.i18n.__('Update Payment Method', 'surecart'))), !paymentMethodExists && (h("sc-button", { type: "link", href: addQueryArgs(window.location.href, {
        action: 'create',
        model: 'payment_method',
        id: this === null || this === void 0 ? void 0 : this.subscription.id,
        ...(((_a = this === null || this === void 0 ? void 0 : this.subscription) === null || _a === void 0 ? void 0 : _a.live_mode) === false ? { live_mode: false } : {}),
      }) }, h("sc-icon", { name: "credit-card", slot: "prefix" }), wp.i18n.__('Add Payment Method', 'surecart'))), !!Object.keys((_b = this.subscription) === null || _b === void 0 ? void 0 : _b.pending_update).length && (h("sc-button", { type: "link", onClick: () => this.cancelPendingUpdate() }, h("sc-icon", { name: "x-octagon", slot: "prefix" }), wp.i18n.__('Cancel Scheduled Update', 'surecart'))), ((_c = this === null || this === void 0 ? void 0 : this.subscription) === null || _c === void 0 ? void 0 : _c.cancel_at_period_end) ? (h("sc-button", { type: "link", onClick: () => this.renewSubscription() }, h("sc-icon", { name: "repeat", slot: "prefix" }), wp.i18n.__('Restore Plan', 'surecart'))) : (((_d = this.subscription) === null || _d === void 0 ? void 0 : _d.status) !== 'canceled' &&
      ((_e = this.subscription) === null || _e === void 0 ? void 0 : _e.current_period_end_at) &&
      this.showCancel && (h("sc-button", { type: "link", onClick: () => (this.cancelModal = true) }, h("sc-icon", { name: "x", slot: "prefix" }), wp.i18n.__('Cancel Plan', 'surecart')))), ((_f = this.subscription) === null || _f === void 0 ? void 0 : _f.status) === 'canceled' && (h("sc-button", { type: "link", ...(!!((_g = this.subscription) === null || _g === void 0 ? void 0 : _g.payment_method)
        ? {
          onClick: () => (this.resubscribeModal = true),
        }
        : {
          href: this === null || this === void 0 ? void 0 : this.updatePaymentMethodUrl,
        }) }, h("sc-icon", { name: "repeat", slot: "prefix" }), wp.i18n.__('Resubscribe', 'surecart'))))), h("sc-card", { style: { '--overflow': 'hidden' }, noPadding: true }, this.renderContent()), this.busy && h("sc-block-ui", { spinner: true }), h("sc-cancel-dialog", { subscription: this.subscription, protocol: this.protocol, open: this.cancelModal, onScRequestClose: () => (this.cancelModal = false), onScRefresh: () => this.getSubscription() }), h("sc-subscription-reactivate", { subscription: this.subscription, open: this.resubscribeModal, onScRequestClose: () => (this.resubscribeModal = false), onScRefresh: () => this.getSubscription() })));
  }
  get el() { return getElement(this); }
};
ScSubscription.style = scSubscriptionCss;

export { ScSubscription as sc_subscription };

//# sourceMappingURL=sc-subscription.entry.js.map