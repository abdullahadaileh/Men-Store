import { r as registerInstance, c as createEvent, h } from './index-644f5478.js';
import { o as onChange, s as state } from './mutations-b8f9af9f.js';
import './index-1046c77e.js';
import './utils-00526fde.js';
import './get-query-arg-cb6b8763.js';
import './add-query-args-f4c5962b.js';
import './index-c5a96d53.js';
import './google-357f4c4c.js';
import './currency-728311ef.js';
import './price-178c2e2b.js';

const scCustomerPhoneCss = ":host{display:block}";

const ScCustomerPhone = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.scChange = createEvent(this, "scChange", 7);
    this.scClear = createEvent(this, "scClear", 7);
    this.scInput = createEvent(this, "scInput", 7);
    this.scFocus = createEvent(this, "scFocus", 7);
    this.scBlur = createEvent(this, "scBlur", 7);
    this.size = 'medium';
    this.value = '';
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
    this.error = undefined;
  }
  async handleChange() {
    this.value = this.input.value;
    this.scChange.emit();
  }
  async reportValidity() {
    var _a, _b;
    return (_b = (_a = this.input) === null || _a === void 0 ? void 0 : _a.reportValidity) === null || _b === void 0 ? void 0 : _b.call(_a);
  }
  componentWillLoad() {
    this.handleCheckoutChange();
    this.removeChangeListener = onChange('checkout', () => this.handleCheckoutChange());
  }
  disconnectedCallback() {
    this.removeChangeListener();
  }
  handleCheckoutChange() {
    var _a, _b, _c, _d, _e, _f;
    // we only want to do this  if we don't have a value.
    if (this === null || this === void 0 ? void 0 : this.value)
      return;
    // if the checkout has a phone, use that.
    if ((_a = state.checkout) === null || _a === void 0 ? void 0 : _a.phone) {
      this.value = (_b = state.checkout) === null || _b === void 0 ? void 0 : _b.phone;
      return;
    }
    // if the customer has a phone, use that.
    if ((_d = (_c = state.checkout) === null || _c === void 0 ? void 0 : _c.customer) === null || _d === void 0 ? void 0 : _d.phone) {
      this.value = (_f = (_e = state.checkout) === null || _e === void 0 ? void 0 : _e.customer) === null || _f === void 0 ? void 0 : _f.phone;
      return;
    }
  }
  render() {
    return (h("sc-phone-input", { name: "phone", ref: el => (this.input = el), value: this.value, label: this.label, help: this.help, autocomplete: "phone", placeholder: this.placeholder, readonly: this.readonly, required: this.required, invalid: this.invalid, autofocus: this.autofocus, hasFocus: this.hasFocus, onScChange: () => this.handleChange(), onScInput: () => this.scInput.emit(), onScFocus: () => this.scFocus.emit(), onScBlur: () => this.scBlur.emit() }));
  }
};
ScCustomerPhone.style = scCustomerPhoneCss;

export { ScCustomerPhone as sc_customer_phone };

//# sourceMappingURL=sc-customer-phone.entry.js.map