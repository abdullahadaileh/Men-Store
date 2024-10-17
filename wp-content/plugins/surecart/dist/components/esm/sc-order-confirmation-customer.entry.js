import { r as registerInstance, h } from './index-644f5478.js';
import { o as openWormhole } from './consumer-32cc6385.js';

const scOrderConfirmationCustomerCss = ":host{display:block}";

const ScOrderConfirmationCustomer = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.order = undefined;
    this.heading = undefined;
    this.customer = undefined;
    this.error = undefined;
    this.loading = undefined;
  }
  render() {
    if (!this.customer) {
      return null;
    }
    return (h("sc-customer-details", { customer: this.customer, loading: this.loading, error: this.error }, h("span", { slot: "heading" }, h("slot", { name: "heading" }, this.heading || wp.i18n.__('Billing Details', 'surecart')))));
  }
};
openWormhole(ScOrderConfirmationCustomer, ['order', 'customer', 'loading'], false);
ScOrderConfirmationCustomer.style = scOrderConfirmationCustomerCss;

export { ScOrderConfirmationCustomer as sc_order_confirmation_customer };

//# sourceMappingURL=sc-order-confirmation-customer.entry.js.map