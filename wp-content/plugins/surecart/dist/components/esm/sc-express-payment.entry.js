import { r as registerInstance, h, H as Host } from './index-644f5478.js';
import { g as getProcessorByType } from './getters-a6a88dc4.js';
import { f as formBusy } from './getters-2c9ecd8c.js';
import './util-64ee5262.js';
import './index-1046c77e.js';
import './utils-00526fde.js';
import './mutations-b8f9af9f.js';
import './get-query-arg-cb6b8763.js';
import './add-query-args-f4c5962b.js';
import './index-c5a96d53.js';
import './google-357f4c4c.js';
import './currency-728311ef.js';
import './price-178c2e2b.js';
import './store-dde63d4d.js';

const scExpressPaymentCss = "sc-express-payment{display:block}";

const ScExpressPayment = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.processor = undefined;
    this.dividerText = undefined;
    this.debug = undefined;
    this.hasPaymentOptions = undefined;
  }
  onPaymentRequestLoaded() {
    this.hasPaymentOptions = true;
  }
  renderStripePaymentRequest() {
    const { processor_data } = getProcessorByType('stripe') || {};
    return h("sc-stripe-payment-request", { debug: this.debug, stripeAccountId: processor_data === null || processor_data === void 0 ? void 0 : processor_data.account_id, publishableKey: processor_data === null || processor_data === void 0 ? void 0 : processor_data.publishable_key });
  }
  render() {
    return (h(Host, { class: { 'is-empty': !this.hasPaymentOptions && !this.debug } }, this.renderStripePaymentRequest(), (this.hasPaymentOptions || this.debug) && h("sc-divider", { style: { '--spacing': 'calc(var(--sc-form-row-spacing)/2)' } }, this.dividerText), !!formBusy() && h("sc-block-ui", null)));
  }
};
ScExpressPayment.style = scExpressPaymentCss;

export { ScExpressPayment as sc_express_payment };

//# sourceMappingURL=sc-express-payment.entry.js.map