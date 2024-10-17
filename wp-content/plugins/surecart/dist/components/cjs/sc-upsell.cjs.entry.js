'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
require('./watchers-772d9166.js');
const store = require('./store-1aade79c.js');
const getters = require('./getters-3a50490a.js');
const mutations = require('./mutations-2558dfa8.js');
require('./watchers-51b054bd.js');
require('./index-00f0fc21.js');
require('./google-55083ae7.js');
require('./currency-ba038e2f.js');
require('./google-62bdaeea.js');
require('./utils-a086ed6e.js');
require('./util-efd68af1.js');
require('./index-fb76df07.js');
require('./add-query-args-17c551b6.js');
require('./fetch-2dba325c.js');
require('./mutations-8d7c4499.js');

const scUpsellCss = ":host{display:block}.confirm__icon{margin-bottom:var(--sc-spacing-medium);display:flex;justify-content:center}.confirm__icon-container{background:var(--sc-color-primary-500);width:55px;height:55px;border-radius:999999px;display:flex;align-items:center;justify-content:center;font-size:26px;line-height:1;color:white}";

const ScUpsell = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  componentWillLoad() {
    mutations.trackOffer();
    mutations.preview();
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const manualPaymentMethod = (_a = store.state.checkout) === null || _a === void 0 ? void 0 : _a.manual_payment_method;
    return (index.h(index.Host, null, index.h("slot", null), getters.isBusy() && index.h("sc-block-ui", { style: { 'z-index': '30', '--sc-block-ui-position': 'fixed' } }), index.h("sc-dialog", { open: store.state.loading === 'complete', style: { '--body-spacing': 'var(--sc-spacing-xxx-large)' }, noHeader: true, onScRequestClose: e => e.preventDefault() }, index.h("div", { class: "confirm__icon" }, index.h("div", { class: "confirm__icon-container" }, index.h("sc-icon", { name: "check" }))), index.h("sc-dashboard-module", { heading: ((_c = (_b = store.state === null || store.state === void 0 ? void 0 : store.state.text) === null || _b === void 0 ? void 0 : _b.success) === null || _c === void 0 ? void 0 : _c.title) || wp.i18n.__('Thank you!', 'surecart'), style: { '--sc-dashboard-module-spacing': 'var(--sc-spacing-x-large)', 'textAlign': 'center' } }, index.h("span", { slot: "description" }, ((_e = (_d = store.state === null || store.state === void 0 ? void 0 : store.state.text) === null || _d === void 0 ? void 0 : _d.success) === null || _e === void 0 ? void 0 : _e.description) || wp.i18n.__('Your purchase was successful. A receipt is on its way to your inbox.', 'surecart')), !!(manualPaymentMethod === null || manualPaymentMethod === void 0 ? void 0 : manualPaymentMethod.name) && !!(manualPaymentMethod === null || manualPaymentMethod === void 0 ? void 0 : manualPaymentMethod.instructions) && (index.h("sc-alert", { type: "info", open: true, style: { 'text-align': 'left' } }, index.h("span", { slot: "title" }, manualPaymentMethod === null || manualPaymentMethod === void 0 ? void 0 : manualPaymentMethod.name), index.h("div", { innerHTML: manualPaymentMethod === null || manualPaymentMethod === void 0 ? void 0 : manualPaymentMethod.instructions }))), index.h("sc-button", { href: (_g = (_f = window === null || window === void 0 ? void 0 : window.scData) === null || _f === void 0 ? void 0 : _f.pages) === null || _g === void 0 ? void 0 : _g.dashboard, size: "large", type: "primary", autofocus: true }, ((_j = (_h = store.state === null || store.state === void 0 ? void 0 : store.state.text) === null || _h === void 0 ? void 0 : _h.success) === null || _j === void 0 ? void 0 : _j.button) || wp.i18n.__('Continue', 'surecart'), index.h("sc-icon", { name: "arrow-right", slot: "suffix" }))))));
  }
};
ScUpsell.style = scUpsellCss;

exports.sc_upsell = ScUpsell;

//# sourceMappingURL=sc-upsell.cjs.entry.js.map