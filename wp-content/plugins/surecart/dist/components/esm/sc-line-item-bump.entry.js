import { r as registerInstance, h, H as Host } from './index-644f5478.js';
import { s as state } from './mutations-b8f9af9f.js';
import './index-1046c77e.js';
import './utils-00526fde.js';
import './get-query-arg-cb6b8763.js';
import './add-query-args-f4c5962b.js';
import './index-c5a96d53.js';
import './google-357f4c4c.js';
import './currency-728311ef.js';
import './price-178c2e2b.js';

const scLineItemBumpCss = ":host{display:block}";

const ScLineItemBump = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.label = undefined;
    this.loading = undefined;
  }
  render() {
    var _a, _b, _c;
    if (!((_a = state === null || state === void 0 ? void 0 : state.checkout) === null || _a === void 0 ? void 0 : _a.bump_amount)) {
      return h(Host, { style: { display: 'none' } });
    }
    return (h("sc-line-item", null, h("span", { slot: "description" }, this.label || wp.i18n.__('Bundle Discount', 'surecart')), h("span", { slot: "price" }, h("sc-format-number", { type: "currency", currency: ((_b = state === null || state === void 0 ? void 0 : state.checkout) === null || _b === void 0 ? void 0 : _b.currency) || 'usd', value: (_c = state === null || state === void 0 ? void 0 : state.checkout) === null || _c === void 0 ? void 0 : _c.bump_amount }))));
  }
};
ScLineItemBump.style = scLineItemBumpCss;

export { ScLineItemBump as sc_line_item_bump };

//# sourceMappingURL=sc-line-item-bump.entry.js.map