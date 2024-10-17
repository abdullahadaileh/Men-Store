import { r as registerInstance, h } from './index-644f5478.js';
import { f as formBusy } from './getters-2c9ecd8c.js';
import './store-dde63d4d.js';
import './index-1046c77e.js';
import './utils-00526fde.js';

const scCartFormSubmitCss = "sc-order-submit{display:block;width:auto}";

const ScCartFormSubmit = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.type = 'primary';
    this.size = 'medium';
    this.full = true;
    this.icon = undefined;
  }
  render() {
    return (h("sc-button", { submit: true, type: this.type, size: this.size, full: this.full, loading: formBusy(), disabled: formBusy() }, !!this.icon && h("sc-icon", { name: this.icon, slot: "prefix" }), h("slot", null)));
  }
};
ScCartFormSubmit.style = scCartFormSubmitCss;

export { ScCartFormSubmit as sc_cart_form_submit };

//# sourceMappingURL=sc-cart-form-submit.entry.js.map