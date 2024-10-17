import { r as registerInstance, h } from './index-644f5478.js';
import { a as apiFetch } from './fetch-2525e763.js';
import { U as Universe } from './universe-0f7e3f08.js';
import { g as getQueryArg } from './get-query-arg-cb6b8763.js';
import { a as addQueryArgs } from './add-query-args-f4c5962b.js';

const scOrderConfirmationCss = ":host{display:block;max-width:800px;margin:auto}::slotted(*:not(:last-child)),sc-form form>*:not(:last-child){margin-bottom:var(--sc-form-row-spacing-large)}.order-confirmation__content{color:var(--sc-order-confirmation-color, var(--sc-color-gray-500))}.order-confirmation__content.hidden{display:none}::part(line-items){display:grid;gap:0.5em}";

const ScOrderConfirmation = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.order = undefined;
    this.loading = false;
    this.error = undefined;
  }
  componentWillLoad() {
    // @ts-ignore
    Universe.create(this, this.state());
    // get teh session
    this.getSession();
  }
  /** Get session id from url. */
  getSessionId() {
    var _a;
    if ((_a = this.order) === null || _a === void 0 ? void 0 : _a.id)
      return this.order.id;
    return getQueryArg(window.location.href, 'sc_order');
  }
  /** Update a session */
  async getSession() {
    var _a;
    if (!this.getSessionId())
      return;
    if ((_a = this.order) === null || _a === void 0 ? void 0 : _a.id)
      return;
    try {
      this.loading = true;
      this.order = (await await apiFetch({
        path: addQueryArgs(`surecart/v1/checkouts/${this.getSessionId()}`, {
          expand: [
            'line_items',
            'line_item.price',
            'line_item.fees',
            'price.product',
            'customer',
            'customer.shipping_address',
            'payment_intent',
            'discount',
            'manual_payment_method',
            'discount.promotion',
            'billing_address',
            'shipping_address',
          ],
          refresh_status: true,
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
    }
    finally {
      this.loading = false;
    }
  }
  state() {
    var _a, _b;
    const manualPaymentMethod = (_a = this.order) === null || _a === void 0 ? void 0 : _a.manual_payment_method;
    return {
      processor: 'stripe',
      loading: this.loading,
      orderId: this.getSessionId(),
      order: this.order,
      customer: (_b = this.order) === null || _b === void 0 ? void 0 : _b.customer,
      manualPaymentTitle: manualPaymentMethod === null || manualPaymentMethod === void 0 ? void 0 : manualPaymentMethod.name,
      manualPaymentInstructions: manualPaymentMethod === null || manualPaymentMethod === void 0 ? void 0 : manualPaymentMethod.instructions,
    };
  }
  renderOnHold() {
    var _a, _b, _c;
    if (((_a = this.order) === null || _a === void 0 ? void 0 : _a.status) !== 'processing')
      return null;
    if (((_c = (_b = this === null || this === void 0 ? void 0 : this.order) === null || _b === void 0 ? void 0 : _b.payment_intent) === null || _c === void 0 ? void 0 : _c.processor_type) === 'paypal') {
      return (h("sc-alert", { type: "warning", open: true }, wp.i18n.__('Paypal is taking a closer look at this payment. It’s required for some payments and normally takes up to 3 business days.', 'surecart')));
    }
  }
  renderManualInstructions() {
    var _a;
    const paymentMethod = (_a = this.order) === null || _a === void 0 ? void 0 : _a.manual_payment_method;
    if (!(paymentMethod === null || paymentMethod === void 0 ? void 0 : paymentMethod.instructions))
      return;
    return (h("sc-alert", { type: "info", open: true }, h("span", { slot: "title" }, paymentMethod === null || paymentMethod === void 0 ? void 0 : paymentMethod.name), h("div", { innerHTML: paymentMethod === null || paymentMethod === void 0 ? void 0 : paymentMethod.instructions })));
  }
  render() {
    var _a, _b;
    return (h(Universe.Provider, { state: this.state() }, h("div", { class: { 'order-confirmation': true } }, h("div", { class: {
        'order-confirmation__content': true,
        'hidden': !((_a = this.order) === null || _a === void 0 ? void 0 : _a.id) && !this.loading,
      } }, h("sc-order-confirm-components-validator", { checkout: this.order }, h("slot", null))), !((_b = this.order) === null || _b === void 0 ? void 0 : _b.id) && !this.loading && (h("sc-heading", null, wp.i18n.__('Order not found.', 'surecart'), h("span", { slot: "description" }, wp.i18n.__('This order could not be found. Please try again.', 'surecart')))))));
  }
};
ScOrderConfirmation.style = scOrderConfirmationCss;

export { ScOrderConfirmation as sc_order_confirmation };

//# sourceMappingURL=sc-order-confirmation.entry.js.map