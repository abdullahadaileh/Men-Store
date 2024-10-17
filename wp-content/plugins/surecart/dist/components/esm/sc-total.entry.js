import { r as registerInstance, h } from './index-644f5478.js';
import { o as openWormhole } from './consumer-32cc6385.js';

const scTotalCss = ":host{display:block}.total-amount{display:inline-block}";

const ScTotal = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.order_key = {
      total: 'total_amount',
      subtotal: 'subtotal_amount',
      amount_due: 'amount_due',
    };
    this.total = 'amount_due';
    this.order = undefined;
  }
  render() {
    var _a, _b, _c, _d, _e;
    if (!((_a = this.order) === null || _a === void 0 ? void 0 : _a.currency))
      return;
    if (!((_d = (_c = (_b = this.order) === null || _b === void 0 ? void 0 : _b.line_items) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.length))
      return;
    return h("sc-format-number", { type: "currency", currency: this.order.currency, value: (_e = this.order) === null || _e === void 0 ? void 0 : _e[this.order_key[this.total]] });
  }
};
openWormhole(ScTotal, ['order'], false);
ScTotal.style = scTotalCss;

export { ScTotal as sc_total };

//# sourceMappingURL=sc-total.entry.js.map