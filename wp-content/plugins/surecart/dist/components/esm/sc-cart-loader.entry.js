import { r as registerInstance, h } from './index-644f5478.js';
import { s as state } from './mutations-b8f9af9f.js';
import './index-1046c77e.js';
import './utils-00526fde.js';
import './get-query-arg-cb6b8763.js';
import './add-query-args-f4c5962b.js';
import './index-c5a96d53.js';
import './google-357f4c4c.js';
import './currency-728311ef.js';
import './price-178c2e2b.js';

const scCartLoaderCss = ":host{position:absolute;z-index:var(--sc-cart-z-index, 999999);font-family:var(--sc-font-sans)}";

const ScCartLoader = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.template = undefined;
  }
  render() {
    var _a;
    // check for forms.
    if (document.querySelector('sc-checkout')) {
      return;
    }
    // clear the order if it's already paid.
    if (((_a = state === null || state === void 0 ? void 0 : state.checkout) === null || _a === void 0 ? void 0 : _a.status) === 'paid') {
      state.checkout = null;
      return null;
    }
    // return the loader.
    return h("div", { innerHTML: this.template || '' });
  }
};
ScCartLoader.style = scCartLoaderCss;

export { ScCartLoader as sc_cart_loader };

//# sourceMappingURL=sc-cart-loader.entry.js.map