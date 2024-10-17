'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const mutations = require('./mutations-164b66b1.js');
require('./index-00f0fc21.js');
require('./utils-a086ed6e.js');
require('./get-query-arg-53bf21e2.js');
require('./add-query-args-17c551b6.js');
require('./index-fb76df07.js');
require('./google-62bdaeea.js');
require('./currency-ba038e2f.js');
require('./price-f1f1114d.js');

const scLineItemBumpCss = ":host{display:block}";

const ScLineItemBump = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.label = undefined;
    this.loading = undefined;
  }
  render() {
    var _a, _b, _c;
    if (!((_a = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.bump_amount)) {
      return index.h(index.Host, { style: { display: 'none' } });
    }
    return (index.h("sc-line-item", null, index.h("span", { slot: "description" }, this.label || wp.i18n.__('Bundle Discount', 'surecart')), index.h("span", { slot: "price" }, index.h("sc-format-number", { type: "currency", currency: ((_b = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _b === void 0 ? void 0 : _b.currency) || 'usd', value: (_c = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _c === void 0 ? void 0 : _c.bump_amount }))));
  }
};
ScLineItemBump.style = scLineItemBumpCss;

exports.sc_line_item_bump = ScLineItemBump;

//# sourceMappingURL=sc-line-item-bump.cjs.entry.js.map