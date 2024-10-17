'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
require('./watchers-772d9166.js');
const store = require('./store-1aade79c.js');
require('./watchers-51b054bd.js');
require('./index-00f0fc21.js');
require('./google-55083ae7.js');
require('./currency-ba038e2f.js');
require('./google-62bdaeea.js');
require('./utils-a086ed6e.js');
require('./util-efd68af1.js');
require('./index-fb76df07.js');
require('./getters-3a50490a.js');
require('./mutations-2558dfa8.js');
require('./fetch-2dba325c.js');
require('./add-query-args-17c551b6.js');
require('./mutations-8d7c4499.js');

const scUpsellTotalsCss = ":host{display:block}";

const ScUpsellTotals = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  renderAmountDue() {
    var _a, _b, _c;
    return store.state.amount_due > 0 ? (index.h("sc-format-number", { type: "currency", value: store.state.amount_due, currency: ((_b = (_a = store.state === null || store.state === void 0 ? void 0 : store.state.line_item) === null || _a === void 0 ? void 0 : _a.price) === null || _b === void 0 ? void 0 : _b.currency) || 'usd' })) : !!((_c = store.state === null || store.state === void 0 ? void 0 : store.state.line_item) === null || _c === void 0 ? void 0 : _c.trial_amount) ? (wp.i18n.__('Trial', 'surecart')) : (wp.i18n.__('Free', 'surecart'));
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    return (index.h("sc-summary", { "open-text": "Total", "closed-text": "Total", collapsible: true, collapsed: true }, !!((_a = store.state.line_item) === null || _a === void 0 ? void 0 : _a.id) && index.h("span", { slot: "price" }, this.renderAmountDue()), index.h("sc-divider", null), index.h("sc-line-item", null, index.h("span", { slot: "description" }, wp.i18n.__('Subtotal', 'surecart')), index.h("sc-format-number", { slot: "price", type: "currency", value: (_b = store.state.line_item) === null || _b === void 0 ? void 0 : _b.subtotal_amount, currency: ((_d = (_c = store.state === null || store.state === void 0 ? void 0 : store.state.line_item) === null || _c === void 0 ? void 0 : _c.price) === null || _d === void 0 ? void 0 : _d.currency) || 'usd' })), (((_f = (_e = store.state === null || store.state === void 0 ? void 0 : store.state.line_item) === null || _e === void 0 ? void 0 : _e.fees) === null || _f === void 0 ? void 0 : _f.data) || [])
      .filter(fee => fee.fee_type === 'upsell') // only upsell fees.
      .map(fee => {
      var _a, _b;
      return (index.h("sc-line-item", null, index.h("span", { slot: "description" }, fee.description, " ", `(${wp.i18n.__('one time', 'surecart')})`), index.h("sc-format-number", { slot: "price", type: "currency", value: fee.amount, currency: ((_b = (_a = store.state === null || store.state === void 0 ? void 0 : store.state.line_item) === null || _a === void 0 ? void 0 : _a.price) === null || _b === void 0 ? void 0 : _b.currency) || 'usd' })));
    }), !!((_g = store.state.line_item) === null || _g === void 0 ? void 0 : _g.tax_amount) && (index.h("sc-line-item", null, index.h("span", { slot: "description" }, wp.i18n.__('Tax', 'surecart')), index.h("sc-format-number", { slot: "price", type: "currency", value: (_h = store.state.line_item) === null || _h === void 0 ? void 0 : _h.tax_amount, currency: ((_k = (_j = store.state === null || store.state === void 0 ? void 0 : store.state.line_item) === null || _j === void 0 ? void 0 : _j.price) === null || _k === void 0 ? void 0 : _k.currency) || 'usd' }))), index.h("sc-divider", null), index.h("sc-line-item", { style: { '--price-size': 'var(--sc-font-size-x-large)' } }, index.h("span", { slot: "title" }, wp.i18n.__('Total', 'surecart')), index.h("sc-format-number", { slot: "price", type: "currency", value: (_l = store.state.line_item) === null || _l === void 0 ? void 0 : _l.total_amount, currency: ((_o = (_m = store.state === null || store.state === void 0 ? void 0 : store.state.line_item) === null || _m === void 0 ? void 0 : _m.price) === null || _o === void 0 ? void 0 : _o.currency) || 'usd' })), store.state.amount_due !== ((_p = store.state.line_item) === null || _p === void 0 ? void 0 : _p.total_amount) && (index.h("sc-line-item", { style: { '--price-size': 'var(--sc-font-size-x-large)' } }, index.h("span", { slot: "title" }, wp.i18n.__('Amount Due', 'surecart')), index.h("span", { slot: "price" }, index.h("sc-format-number", { slot: "price", type: "currency", value: store.state.amount_due, currency: ((_r = (_q = store.state === null || store.state === void 0 ? void 0 : store.state.line_item) === null || _q === void 0 ? void 0 : _q.price) === null || _r === void 0 ? void 0 : _r.currency) || 'usd' }))))));
  }
};
ScUpsellTotals.style = scUpsellTotalsCss;

exports.sc_upsell_totals = ScUpsellTotals;

//# sourceMappingURL=sc-upsell-totals.cjs.entry.js.map