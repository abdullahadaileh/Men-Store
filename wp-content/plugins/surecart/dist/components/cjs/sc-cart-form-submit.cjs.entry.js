'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const getters = require('./getters-1e382cac.js');
require('./store-96a02d63.js');
require('./index-00f0fc21.js');
require('./utils-a086ed6e.js');

const scCartFormSubmitCss = "sc-order-submit{display:block;width:auto}";

const ScCartFormSubmit = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.type = 'primary';
    this.size = 'medium';
    this.full = true;
    this.icon = undefined;
  }
  render() {
    return (index.h("sc-button", { submit: true, type: this.type, size: this.size, full: this.full, loading: getters.formBusy(), disabled: getters.formBusy() }, !!this.icon && index.h("sc-icon", { name: this.icon, slot: "prefix" }), index.h("slot", null)));
  }
};
ScCartFormSubmit.style = scCartFormSubmitCss;

exports.sc_cart_form_submit = ScCartFormSubmit;

//# sourceMappingURL=sc-cart-form-submit.cjs.entry.js.map