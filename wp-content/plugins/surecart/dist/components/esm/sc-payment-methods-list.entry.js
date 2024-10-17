import { r as registerInstance, h, a as getElement } from './index-644f5478.js';
import { a as apiFetch } from './fetch-2525e763.js';
import { o as onFirstVisible } from './lazy-64c2bf3b.js';
import { a as addQueryArgs } from './add-query-args-f4c5962b.js';

const scPaymentMethodsListCss = ":host{display:block;position:relative}.payment-methods-list{display:grid;gap:0.5em}.payment-methods-list sc-heading a{text-decoration:none;font-weight:var(--sc-font-weight-semibold);display:inline-flex;align-items:center;gap:0.25em;color:var(--sc-color-primary-500)}.payment-id{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}";

const ScPaymentMethodsList = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.query = undefined;
    this.heading = undefined;
    this.isCustomer = undefined;
    this.canDetachDefaultPaymentMethod = false;
    this.paymentMethods = [];
    this.loading = undefined;
    this.busy = undefined;
    this.error = undefined;
    this.hasTitleSlot = undefined;
    this.editPaymentMethod = false;
    this.deletePaymentMethod = false;
    this.cascadeDefaultPaymentMethod = false;
  }
  /** Only fetch if visible */
  componentWillLoad() {
    onFirstVisible(this.el, () => this.getPaymentMethods());
    this.handleSlotChange();
  }
  handleSlotChange() {
    this.hasTitleSlot = !!this.el.querySelector('[slot="title"]');
  }
  /**
   * Delete the payment method.
   */
  async deleteMethod() {
    var _a;
    if (!this.deletePaymentMethod)
      return;
    try {
      this.busy = true;
      (await apiFetch({
        path: `surecart/v1/payment_methods/${(_a = this.deletePaymentMethod) === null || _a === void 0 ? void 0 : _a.id}/detach`,
        method: 'PATCH',
      }));
      // remove from view.
      this.paymentMethods = this.paymentMethods.filter(m => { var _a; return m.id !== ((_a = this.deletePaymentMethod) === null || _a === void 0 ? void 0 : _a.id); });
      this.deletePaymentMethod = false;
    }
    catch (e) {
      alert((e === null || e === void 0 ? void 0 : e.messsage) || wp.i18n.__('Something went wrong', 'surecart'));
    }
    finally {
      this.busy = false;
    }
  }
  /**
   * Set the default payment method.
   */
  async setDefault() {
    var _a, _b, _c;
    if (!this.editPaymentMethod)
      return;
    try {
      this.error = '';
      this.busy = true;
      (await apiFetch({
        path: `surecart/v1/customers/${(_b = (_a = this.editPaymentMethod) === null || _a === void 0 ? void 0 : _a.customer) === null || _b === void 0 ? void 0 : _b.id}`,
        method: 'PATCH',
        data: {
          default_payment_method: (_c = this.editPaymentMethod) === null || _c === void 0 ? void 0 : _c.id,
          cascade_default_payment_method: this.cascadeDefaultPaymentMethod,
        },
      }));
      this.editPaymentMethod = false;
    }
    catch (e) {
      this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
    }
    finally {
      this.busy = false;
    }
    try {
      this.busy = true;
      this.paymentMethods = (await apiFetch({
        path: addQueryArgs(`surecart/v1/payment_methods/`, {
          expand: ['card', 'customer', 'billing_agreement', 'paypal_account', 'payment_instrument', 'bank_account'],
          ...this.query,
        }),
      }));
    }
    catch (e) {
      this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
    }
    finally {
      this.busy = false;
    }
  }
  /** Get all paymentMethods */
  async getPaymentMethods() {
    if (!this.isCustomer) {
      return;
    }
    try {
      this.loading = true;
      this.paymentMethods = (await apiFetch({
        path: addQueryArgs(`surecart/v1/payment_methods/`, {
          expand: ['card', 'customer', 'billing_agreement', 'paypal_account', 'payment_instrument', 'bank_account'],
          ...this.query,
          per_page: 100,
        }),
      }));
    }
    catch (e) {
      console.error(this.error);
      this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
    }
    finally {
      this.loading = false;
    }
  }
  renderLoading() {
    return (h("sc-card", { noPadding: true }, h("sc-stacked-list", null, h("sc-stacked-list-row", { style: { '--columns': '4' }, "mobile-size": 500 }, [...Array(4)].map(() => (h("sc-skeleton", { style: { width: '100px', display: 'inline-block' } })))))));
  }
  renderEmpty() {
    return (h("div", null, h("sc-divider", { style: { '--spacing': '0' } }), h("slot", { name: "empty" }, h("sc-empty", { icon: "credit-card" }, wp.i18n.__("You don't have any saved payment methods.", 'surecart')))));
  }
  renderPaymentMethodActions(paymentMethod) {
    const { id, customer } = paymentMethod;
    // If this is a string, don't show the actions.
    if (typeof customer === 'string')
      return;
    // If this is the default payment method and it cannot be detached, don't show the actions.
    if (customer.default_payment_method === id && !this.canDetachDefaultPaymentMethod)
      return;
    return (h("sc-dropdown", { placement: "bottom-end", slot: "suffix" }, h("sc-icon", { role: "button", tabIndex: 0, name: "more-horizontal", slot: "trigger" }), h("sc-menu", null, customer.default_payment_method !== id && h("sc-menu-item", { onClick: () => (this.editPaymentMethod = paymentMethod) }, wp.i18n.__('Make Default', 'surecart')), h("sc-menu-item", { onClick: () => (this.deletePaymentMethod = paymentMethod) }, wp.i18n.__('Delete', 'surecart')))));
  }
  renderList() {
    return this.paymentMethods.map(paymentMethod => {
      const { id, card, customer, live_mode, billing_agreement, paypal_account } = paymentMethod;
      return (h("sc-stacked-list-row", { style: { '--columns': billing_agreement ? '2' : '3' } }, h("sc-payment-method", { paymentMethod: paymentMethod }), h("div", { class: "payment-id" }, !!(card === null || card === void 0 ? void 0 : card.exp_month) && (h("span", null, wp.i18n.__('Exp.', 'surecart'), card === null || card === void 0 ? void 0 :
        card.exp_month, "/", card === null || card === void 0 ? void 0 :
        card.exp_year)), !!paypal_account && (paypal_account === null || paypal_account === void 0 ? void 0 : paypal_account.email)), h("sc-flex", { "justify-content": "flex-start", "align-items": "center", style: { '--spacing': '0.5em', 'marginLeft': 'auto' } }, typeof customer !== 'string' && (customer === null || customer === void 0 ? void 0 : customer.default_payment_method) === id && h("sc-tag", { type: "info" }, wp.i18n.__('Default', 'surecart')), !live_mode && h("sc-tag", { type: "warning" }, wp.i18n.__('Test', 'surecart'))), this.renderPaymentMethodActions(paymentMethod)));
    });
  }
  renderContent() {
    var _a;
    if (!this.isCustomer) {
      return this.renderEmpty();
    }
    if (this.loading) {
      return this.renderLoading();
    }
    if (((_a = this.paymentMethods) === null || _a === void 0 ? void 0 : _a.length) === 0) {
      return this.renderEmpty();
    }
    return (h("sc-card", { "no-padding": true }, h("sc-stacked-list", null, this.renderList())));
  }
  handleEditPaymentMethodChange() {
    // reset when payment method edit changes
    this.cascadeDefaultPaymentMethod = false;
  }
  render() {
    return (h("sc-dashboard-module", { class: "payment-methods-list", error: this.error }, h("span", { slot: "heading" }, h("slot", { name: "heading" }, this.heading || wp.i18n.__('Payment Methods', 'surecart'))), this.isCustomer && (h("sc-flex", { slot: "end" }, h("sc-button", { type: "link", href: addQueryArgs(window.location.href, {
        action: 'index',
        model: 'charge',
      }) }, h("sc-icon", { name: "clock", slot: "prefix" }), wp.i18n.__('Payment History', 'surecart')), h("sc-button", { type: "link", href: addQueryArgs(window.location.href, {
        action: 'create',
        model: 'payment_method',
      }) }, h("sc-icon", { name: "plus", slot: "prefix" }), wp.i18n.__('Add', 'surecart')))), this.renderContent(), h("sc-dialog", { open: !!this.editPaymentMethod, label: wp.i18n.__('Update Default Payment Method', 'surecart'), onScRequestClose: () => (this.editPaymentMethod = false) }, h("sc-alert", { type: "danger", open: !!this.error }, this.error), h("sc-flex", { flexDirection: "column", style: { '--sc-flex-column-gap': 'var(--sc-spacing-small)' } }, h("sc-alert", { type: "info", open: true }, wp.i18n.__('A default payment method will be used as a fallback in case other payment methods get removed from a subscription.', 'surecart')), h("sc-switch", { checked: this.cascadeDefaultPaymentMethod, onScChange: e => (this.cascadeDefaultPaymentMethod = e.target.checked) }, wp.i18n.__('Update All Subscriptions', 'surecart'), h("span", { slot: "description" }, wp.i18n.__('Update all existing subscriptions to use this payment method', 'surecart')))), h("div", { slot: "footer" }, h("sc-button", { type: "text", onClick: () => (this.editPaymentMethod = false) }, wp.i18n.__('Cancel', 'surecart')), h("sc-button", { type: "primary", onClick: () => this.setDefault() }, wp.i18n.__('Make Default', 'surecart'))), this.busy && h("sc-block-ui", { spinner: true })), h("sc-dialog", { open: !!this.deletePaymentMethod, label: wp.i18n.__('Delete Payment Method', 'surecart'), onScRequestClose: () => (this.deletePaymentMethod = false) }, h("sc-alert", { type: "danger", open: !!this.error }, this.error), h("sc-text", null, wp.i18n.__('Are you sure you want to remove this payment method?', 'surecart')), h("div", { slot: "footer" }, h("sc-button", { type: "text", onClick: () => (this.deletePaymentMethod = false) }, wp.i18n.__('Cancel', 'surecart')), h("sc-button", { type: "primary", onClick: () => this.deleteMethod() }, wp.i18n.__('Delete', 'surecart'))), this.busy && h("sc-block-ui", { spinner: true })), this.busy && h("sc-block-ui", { spinner: true })));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "editPaymentMethod": ["handleEditPaymentMethodChange"]
  }; }
};
ScPaymentMethodsList.style = scPaymentMethodsListCss;

export { ScPaymentMethodsList as sc_payment_methods_list };

//# sourceMappingURL=sc-payment-methods-list.entry.js.map