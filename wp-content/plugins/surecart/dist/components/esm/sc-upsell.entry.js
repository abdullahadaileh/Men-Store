import { r as registerInstance, h, H as Host } from './index-644f5478.js';
import './watchers-3d20392b.js';
import { s as state } from './store-77f83bce.js';
import { c as isBusy } from './getters-2e810784.js';
import { t as trackOffer, p as preview } from './mutations-fa2a01e9.js';
import './watchers-5af31452.js';
import './index-1046c77e.js';
import './google-ee26bba4.js';
import './currency-728311ef.js';
import './google-357f4c4c.js';
import './utils-00526fde.js';
import './util-64ee5262.js';
import './index-c5a96d53.js';
import './add-query-args-f4c5962b.js';
import './fetch-2525e763.js';
import './mutations-0a628afa.js';

const scUpsellCss = ":host{display:block}.confirm__icon{margin-bottom:var(--sc-spacing-medium);display:flex;justify-content:center}.confirm__icon-container{background:var(--sc-color-primary-500);width:55px;height:55px;border-radius:999999px;display:flex;align-items:center;justify-content:center;font-size:26px;line-height:1;color:white}";

const ScUpsell = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  componentWillLoad() {
    trackOffer();
    preview();
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const manualPaymentMethod = (_a = state.checkout) === null || _a === void 0 ? void 0 : _a.manual_payment_method;
    return (h(Host, null, h("slot", null), isBusy() && h("sc-block-ui", { style: { 'z-index': '30', '--sc-block-ui-position': 'fixed' } }), h("sc-dialog", { open: state.loading === 'complete', style: { '--body-spacing': 'var(--sc-spacing-xxx-large)' }, noHeader: true, onScRequestClose: e => e.preventDefault() }, h("div", { class: "confirm__icon" }, h("div", { class: "confirm__icon-container" }, h("sc-icon", { name: "check" }))), h("sc-dashboard-module", { heading: ((_c = (_b = state === null || state === void 0 ? void 0 : state.text) === null || _b === void 0 ? void 0 : _b.success) === null || _c === void 0 ? void 0 : _c.title) || wp.i18n.__('Thank you!', 'surecart'), style: { '--sc-dashboard-module-spacing': 'var(--sc-spacing-x-large)', 'textAlign': 'center' } }, h("span", { slot: "description" }, ((_e = (_d = state === null || state === void 0 ? void 0 : state.text) === null || _d === void 0 ? void 0 : _d.success) === null || _e === void 0 ? void 0 : _e.description) || wp.i18n.__('Your purchase was successful. A receipt is on its way to your inbox.', 'surecart')), !!(manualPaymentMethod === null || manualPaymentMethod === void 0 ? void 0 : manualPaymentMethod.name) && !!(manualPaymentMethod === null || manualPaymentMethod === void 0 ? void 0 : manualPaymentMethod.instructions) && (h("sc-alert", { type: "info", open: true, style: { 'text-align': 'left' } }, h("span", { slot: "title" }, manualPaymentMethod === null || manualPaymentMethod === void 0 ? void 0 : manualPaymentMethod.name), h("div", { innerHTML: manualPaymentMethod === null || manualPaymentMethod === void 0 ? void 0 : manualPaymentMethod.instructions }))), h("sc-button", { href: (_g = (_f = window === null || window === void 0 ? void 0 : window.scData) === null || _f === void 0 ? void 0 : _f.pages) === null || _g === void 0 ? void 0 : _g.dashboard, size: "large", type: "primary", autofocus: true }, ((_j = (_h = state === null || state === void 0 ? void 0 : state.text) === null || _h === void 0 ? void 0 : _h.success) === null || _j === void 0 ? void 0 : _j.button) || wp.i18n.__('Continue', 'surecart'), h("sc-icon", { name: "arrow-right", slot: "suffix" }))))));
  }
};
ScUpsell.style = scUpsellCss;

export { ScUpsell as sc_upsell };

//# sourceMappingURL=sc-upsell.entry.js.map