import { r as registerInstance, h } from './index-644f5478.js';
import './watchers-3d20392b.js';
import { s as state } from './store-77f83bce.js';
import './watchers-5af31452.js';
import './index-1046c77e.js';
import './google-ee26bba4.js';
import './currency-728311ef.js';
import './google-357f4c4c.js';
import './utils-00526fde.js';
import './util-64ee5262.js';
import './index-c5a96d53.js';
import './getters-2e810784.js';
import './mutations-fa2a01e9.js';
import './fetch-2525e763.js';
import './add-query-args-f4c5962b.js';
import './mutations-0a628afa.js';

const scUpsellTotalsCss = ":host{display:block}";

const ScUpsellTotals = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  renderAmountDue() {
    var _a, _b, _c;
    return state.amount_due > 0 ? (h("sc-format-number", { type: "currency", value: state.amount_due, currency: ((_b = (_a = state === null || state === void 0 ? void 0 : state.line_item) === null || _a === void 0 ? void 0 : _a.price) === null || _b === void 0 ? void 0 : _b.currency) || 'usd' })) : !!((_c = state === null || state === void 0 ? void 0 : state.line_item) === null || _c === void 0 ? void 0 : _c.trial_amount) ? (wp.i18n.__('Trial', 'surecart')) : (wp.i18n.__('Free', 'surecart'));
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    return (h("sc-summary", { "open-text": "Total", "closed-text": "Total", collapsible: true, collapsed: true }, !!((_a = state.line_item) === null || _a === void 0 ? void 0 : _a.id) && h("span", { slot: "price" }, this.renderAmountDue()), h("sc-divider", null), h("sc-line-item", null, h("span", { slot: "description" }, wp.i18n.__('Subtotal', 'surecart')), h("sc-format-number", { slot: "price", type: "currency", value: (_b = state.line_item) === null || _b === void 0 ? void 0 : _b.subtotal_amount, currency: ((_d = (_c = state === null || state === void 0 ? void 0 : state.line_item) === null || _c === void 0 ? void 0 : _c.price) === null || _d === void 0 ? void 0 : _d.currency) || 'usd' })), (((_f = (_e = state === null || state === void 0 ? void 0 : state.line_item) === null || _e === void 0 ? void 0 : _e.fees) === null || _f === void 0 ? void 0 : _f.data) || [])
      .filter(fee => fee.fee_type === 'upsell') // only upsell fees.
      .map(fee => {
      var _a, _b;
      return (h("sc-line-item", null, h("span", { slot: "description" }, fee.description, " ", `(${wp.i18n.__('one time', 'surecart')})`), h("sc-format-number", { slot: "price", type: "currency", value: fee.amount, currency: ((_b = (_a = state === null || state === void 0 ? void 0 : state.line_item) === null || _a === void 0 ? void 0 : _a.price) === null || _b === void 0 ? void 0 : _b.currency) || 'usd' })));
    }), !!((_g = state.line_item) === null || _g === void 0 ? void 0 : _g.tax_amount) && (h("sc-line-item", null, h("span", { slot: "description" }, wp.i18n.__('Tax', 'surecart')), h("sc-format-number", { slot: "price", type: "currency", value: (_h = state.line_item) === null || _h === void 0 ? void 0 : _h.tax_amount, currency: ((_k = (_j = state === null || state === void 0 ? void 0 : state.line_item) === null || _j === void 0 ? void 0 : _j.price) === null || _k === void 0 ? void 0 : _k.currency) || 'usd' }))), h("sc-divider", null), h("sc-line-item", { style: { '--price-size': 'var(--sc-font-size-x-large)' } }, h("span", { slot: "title" }, wp.i18n.__('Total', 'surecart')), h("sc-format-number", { slot: "price", type: "currency", value: (_l = state.line_item) === null || _l === void 0 ? void 0 : _l.total_amount, currency: ((_o = (_m = state === null || state === void 0 ? void 0 : state.line_item) === null || _m === void 0 ? void 0 : _m.price) === null || _o === void 0 ? void 0 : _o.currency) || 'usd' })), state.amount_due !== ((_p = state.line_item) === null || _p === void 0 ? void 0 : _p.total_amount) && (h("sc-line-item", { style: { '--price-size': 'var(--sc-font-size-x-large)' } }, h("span", { slot: "title" }, wp.i18n.__('Amount Due', 'surecart')), h("span", { slot: "price" }, h("sc-format-number", { slot: "price", type: "currency", value: state.amount_due, currency: ((_r = (_q = state === null || state === void 0 ? void 0 : state.line_item) === null || _q === void 0 ? void 0 : _q.price) === null || _r === void 0 ? void 0 : _r.currency) || 'usd' }))))));
  }
};
ScUpsellTotals.style = scUpsellTotalsCss;

export { ScUpsellTotals as sc_upsell_totals };

//# sourceMappingURL=sc-upsell-totals.entry.js.map