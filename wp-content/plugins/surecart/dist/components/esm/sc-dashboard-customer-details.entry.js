import { r as registerInstance, h, a as getElement } from './index-644f5478.js';
import { a as apiFetch } from './fetch-2525e763.js';
import { o as onFirstVisible } from './lazy-64c2bf3b.js';
import { a as addQueryArgs } from './add-query-args-f4c5962b.js';

const scDashboardCustomerDetailsCss = ":host{display:block;position:relative}.customer-details{display:grid;gap:0.75em}";

const ScDashboardCustomerDetails = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.customerId = undefined;
    this.heading = undefined;
    this.customer = undefined;
    this.loading = undefined;
    this.error = undefined;
  }
  componentWillLoad() {
    onFirstVisible(this.el, () => {
      this.fetch();
    });
  }
  async fetch() {
    if ('' === this.customerId) {
      return;
    }
    try {
      this.loading = true;
      this.customer = (await await apiFetch({
        path: addQueryArgs(`surecart/v1/customers/${this.customerId}`, {
          expand: ['shipping_address', 'billing_address', 'tax_identifier'],
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
  render() {
    return (h("sc-customer-details", { customer: this.customer, loading: this.loading, error: this.error, heading: this.heading, "edit-link": addQueryArgs(window.location.href, {
        action: 'edit',
        model: 'customer',
        id: this.customerId,
      }) }));
  }
  get el() { return getElement(this); }
};
ScDashboardCustomerDetails.style = scDashboardCustomerDetailsCss;

export { ScDashboardCustomerDetails as sc_dashboard_customer_details };

//# sourceMappingURL=sc-dashboard-customer-details.entry.js.map