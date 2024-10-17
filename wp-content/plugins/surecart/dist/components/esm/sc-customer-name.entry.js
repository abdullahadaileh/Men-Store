import { r as registerInstance, c as createEvent, h } from './index-644f5478.js';
import { c as createOrUpdateCheckout } from './index-d7508e37.js';
import { s as state$1 } from './store-e7eca601.js';
import { s as state, o as onChange } from './mutations-b8f9af9f.js';
import { a as getValueFromUrl } from './util-64ee5262.js';
import './fetch-2525e763.js';
import './add-query-args-f4c5962b.js';
import './get-query-arg-cb6b8763.js';
import './index-1046c77e.js';
import './utils-00526fde.js';
import './index-c5a96d53.js';
import './google-357f4c4c.js';
import './currency-728311ef.js';
import './price-178c2e2b.js';

const scCustomerNameCss = ":host{display:block}";

const ScCustomerName = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.scInput = createEvent(this, "scInput", 7);
    this.scFocus = createEvent(this, "scFocus", 7);
    this.scBlur = createEvent(this, "scBlur", 7);
    this.size = 'medium';
    this.value = null;
    this.pill = false;
    this.label = undefined;
    this.showLabel = true;
    this.help = '';
    this.placeholder = undefined;
    this.disabled = false;
    this.readonly = false;
    this.required = false;
    this.invalid = false;
    this.autofocus = undefined;
    this.hasFocus = undefined;
  }
  /** Don't allow a blank space as an input here. */
  async reportValidity() {
    return this.input.reportValidity();
  }
  /** Silently update the checkout when the input changes. */
  async handleChange() {
    this.value = this.input.value;
    try {
      state.checkout = (await createOrUpdateCheckout({ id: state.checkout.id, data: { name: this.input.value } }));
    }
    catch (error) {
      console.error(error);
    }
  }
  /** Sync customer email with session if it's updated by other means */
  handleSessionChange() {
    var _a, _b, _c, _d, _e, _f;
    // we already have a value.
    if (this.value)
      return;
    const fromUrl = getValueFromUrl('full_name');
    if (!state$1.loggedIn && !!fromUrl) {
      this.value = fromUrl;
      return;
    }
    // we want the customer name to be forced if the user is logged in.
    if (state$1.loggedIn) {
      this.value = ((_b = (_a = state === null || state === void 0 ? void 0 : state.checkout) === null || _a === void 0 ? void 0 : _a.customer) === null || _b === void 0 ? void 0 : _b.name) || ((_c = state === null || state === void 0 ? void 0 : state.checkout) === null || _c === void 0 ? void 0 : _c.name);
      // otherwise we use the checkout name first.
    }
    else {
      this.value = ((_d = state === null || state === void 0 ? void 0 : state.checkout) === null || _d === void 0 ? void 0 : _d.name) || ((_f = (_e = state === null || state === void 0 ? void 0 : state.checkout) === null || _e === void 0 ? void 0 : _e.customer) === null || _f === void 0 ? void 0 : _f.name);
    }
  }
  /** Listen to checkout. */
  componentWillLoad() {
    this.handleSessionChange();
    this.removeCheckoutListener = onChange('checkout', () => this.handleSessionChange());
  }
  /** Remove listener. */
  disconnectedCallback() {
    this.removeCheckoutListener();
  }
  render() {
    return (h("sc-input", { type: "text", name: "name", ref: el => (this.input = el), value: this.value, label: this.label, help: this.help, autocomplete: "name", placeholder: this.placeholder, readonly: this.readonly, required: this.required, invalid: this.invalid, autofocus: this.autofocus, hasFocus: this.hasFocus, onScChange: () => this.handleChange(), onScInput: () => this.scInput.emit(), onScFocus: () => this.scFocus.emit(), onScBlur: () => this.scBlur.emit() }));
  }
};
ScCustomerName.style = scCustomerNameCss;

export { ScCustomerName as sc_customer_name };

//# sourceMappingURL=sc-customer-name.entry.js.map