'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const getters = require('./getters-f0495158.js');
const getters$1 = require('./getters-1e382cac.js');
require('./util-efd68af1.js');
require('./index-00f0fc21.js');
require('./utils-a086ed6e.js');
require('./mutations-164b66b1.js');
require('./get-query-arg-53bf21e2.js');
require('./add-query-args-17c551b6.js');
require('./index-fb76df07.js');
require('./google-62bdaeea.js');
require('./currency-ba038e2f.js');
require('./price-f1f1114d.js');
require('./store-96a02d63.js');

const scExpressPaymentCss = "sc-express-payment{display:block}";

const ScExpressPayment = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.processor = undefined;
    this.dividerText = undefined;
    this.debug = undefined;
    this.hasPaymentOptions = undefined;
  }
  onPaymentRequestLoaded() {
    this.hasPaymentOptions = true;
  }
  renderStripePaymentRequest() {
    const { processor_data } = getters.getProcessorByType('stripe') || {};
    return index.h("sc-stripe-payment-request", { debug: this.debug, stripeAccountId: processor_data === null || processor_data === void 0 ? void 0 : processor_data.account_id, publishableKey: processor_data === null || processor_data === void 0 ? void 0 : processor_data.publishable_key });
  }
  render() {
    return (index.h(index.Host, { class: { 'is-empty': !this.hasPaymentOptions && !this.debug } }, this.renderStripePaymentRequest(), (this.hasPaymentOptions || this.debug) && index.h("sc-divider", { style: { '--spacing': 'calc(var(--sc-form-row-spacing)/2)' } }, this.dividerText), !!getters$1.formBusy() && index.h("sc-block-ui", null)));
  }
};
ScExpressPayment.style = scExpressPaymentCss;

exports.sc_express_payment = ScExpressPayment;

//# sourceMappingURL=sc-express-payment.cjs.entry.js.map