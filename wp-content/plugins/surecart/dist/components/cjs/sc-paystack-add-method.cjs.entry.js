'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const inline = require('./inline-a19db3f2.js');
const fetch = require('./fetch-2dba325c.js');
require('./add-query-args-17c551b6.js');

const scPaystackAddMethodCss = ":host{display:block}";

const ScPaystackAddMethod = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.liveMode = true;
    this.customerId = undefined;
    this.successUrl = undefined;
    this.currency = undefined;
    this.loading = undefined;
    this.loaded = undefined;
    this.error = undefined;
    this.paymentIntent = undefined;
  }
  async handlePaymentIntentCreate() {
    var _a, _b;
    const { public_key, access_code } = ((_b = (_a = this.paymentIntent) === null || _a === void 0 ? void 0 : _a.processor_data) === null || _b === void 0 ? void 0 : _b.paystack) || {};
    // we need this data.
    if (!public_key || !access_code)
      return;
    const paystack = new inline.se();
    await paystack.newTransaction({
      key: public_key,
      accessCode: access_code,
      onSuccess: async (transaction) => {
        if ((transaction === null || transaction === void 0 ? void 0 : transaction.status) !== 'success') {
          throw { message: wp.i18n.sprintf(wp.i18n.__('Paystack transaction could not be finished. Status: %s', 'surecart'), transaction === null || transaction === void 0 ? void 0 : transaction.status) };
        }
        window.location.assign(this.successUrl);
      },
      onClose: err => {
        console.error(err);
        alert((err === null || err === void 0 ? void 0 : err.message) || wp.i18n.__('The payment did not process. Please try again.', 'surecart'));
      },
    });
  }
  async createPaymentIntent() {
    var _a, _b;
    try {
      this.loading = true;
      this.error = '';
      this.paymentIntent = await fetch.apiFetch({
        method: 'POST',
        path: 'surecart/v1/payment_intents',
        data: {
          processor_type: 'paystack',
          reusable: true,
          live_mode: this.liveMode,
          customer_id: this.customerId,
          currency: this.currency,
          refresh_status: true,
        },
      });
    }
    catch (e) {
      this.error = ((_b = (_a = e === null || e === void 0 ? void 0 : e.additional_errors) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) || (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
    }
    finally {
      this.loading = false;
    }
  }
  render() {
    return (index.h(index.Host, null, this.error && (index.h("sc-alert", { open: !!this.error, type: "danger" }, index.h("span", { slot: "title" }, wp.i18n.__('Error', 'surecart')), this.error)), index.h("div", { class: "sc-paystack-button-container" }, index.h("sc-alert", { open: true, type: "warning" }, wp.i18n.__('In order to add a new card, we will need to make a small transaction to authenticate it. This is for authentication purposes and will be immediately refunded.', 'surecart'), index.h("div", null, index.h("sc-button", { loading: this.loading, type: "primary", onClick: () => this.createPaymentIntent(), style: { marginTop: 'var(--sc-spacing-medium)' } }, wp.i18n.__('Add New Card', 'surecart')))))));
  }
  static get watchers() { return {
    "paymentIntent": ["handlePaymentIntentCreate"]
  }; }
};
ScPaystackAddMethod.style = scPaystackAddMethodCss;

exports.sc_paystack_add_method = ScPaystackAddMethod;

//# sourceMappingURL=sc-paystack-add-method.cjs.entry.js.map