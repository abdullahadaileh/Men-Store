import { r as registerInstance, h, F as Fragment } from './index-644f5478.js';
import { a as checkoutIsLocked } from './getters-c162c255.js';
import { a as availableProcessors } from './getters-a6a88dc4.js';
import { s as state$1 } from './watchers-7ddfd1b5.js';
import { s as state } from './mutations-b8f9af9f.js';
import { o as openWormhole } from './consumer-32cc6385.js';
import { f as formBusy } from './getters-2c9ecd8c.js';
import './address-8d75115e.js';
import './util-64ee5262.js';
import './index-1046c77e.js';
import './utils-00526fde.js';
import './get-query-arg-cb6b8763.js';
import './add-query-args-f4c5962b.js';
import './index-c5a96d53.js';
import './google-357f4c4c.js';
import './currency-728311ef.js';
import './price-178c2e2b.js';
import './store-dde63d4d.js';

const getProcessorData = (processors = [], type, mode) => {
  var _a;
  return ((_a = (processors || []).find(processor => (processor === null || processor === void 0 ? void 0 : processor.processor_type) === type && (processor === null || processor === void 0 ? void 0 : processor.live_mode) === !!(mode === 'live'))) === null || _a === void 0 ? void 0 : _a.processor_data) || {};
};

const scOrderSubmitCss = "sc-order-submit{display:block;width:auto;display:grid;gap:var(--sc-form-row-spacing)}.sc-secure-notice{display:flex;justify-content:center}";

const ScOrderSubmit = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.loading = undefined;
    this.paying = undefined;
    this.type = 'primary';
    this.size = 'medium';
    this.full = true;
    this.icon = undefined;
    this.showTotal = undefined;
    this.processors = undefined;
    this.order = undefined;
    this.currencyCode = 'usd';
    this.processor = undefined;
    this.secureNoticeText = undefined;
    this.secureNotice = true;
  }
  cannotShipToLocation() {
    var _a, _b;
    return ((_a = state === null || state === void 0 ? void 0 : state.checkout) === null || _a === void 0 ? void 0 : _a.selected_shipping_choice_required) && !((_b = state.checkout) === null || _b === void 0 ? void 0 : _b.selected_shipping_choice);
  }
  renderPayPalButton(buttons) {
    const { client_id, account_id, merchant_initiated_enabled } = getProcessorData(availableProcessors(), 'paypal', state.mode);
    if (!client_id && !account_id)
      return null;
    return (h("sc-paypal-buttons", { buttons: buttons, busy: formBusy() || checkoutIsLocked(), mode: state.mode, order: state.checkout, merchantInitiated: merchant_initiated_enabled, "currency-code": state.currencyCode, "client-id": client_id, "merchant-id": account_id, label: "checkout", color: "blue" }));
  }
  render() {
    if (this.cannotShipToLocation() || checkoutIsLocked('OUT_OF_STOCK')) {
      return (h("sc-button", { type: this.type, size: this.size, full: this.full, loading: this.loading || this.paying, disabled: true }, !!this.icon && h("sc-icon", { name: this.icon, slot: "prefix", "aria-hidden": "true" }), h("slot", null, wp.i18n.__('Purchase', 'surecart')), this.showTotal && (h("span", null, '\u00A0', h("sc-total", null))), h("sc-visually-hidden", null, " ", wp.i18n.__('Press enter to purchase', 'surecart'))));
    }
    return (h(Fragment, null, state$1.id === 'paypal' && !(state$1 === null || state$1 === void 0 ? void 0 : state$1.method) && this.renderPayPalButton(['paypal']), state$1.id === 'paypal' && (state$1 === null || state$1 === void 0 ? void 0 : state$1.method) === 'card' && this.renderPayPalButton(['card']), h("sc-button", { hidden: ['paypal', 'paypal-card'].includes(state$1.id), submit: true, type: this.type, size: this.size, full: this.full, loading: this.loading || this.paying, disabled: this.loading || this.paying || formBusy() || checkoutIsLocked() || this.cannotShipToLocation() }, !!this.icon && h("sc-icon", { name: this.icon, slot: "prefix", "aria-hidden": "true" }), h("slot", null, wp.i18n.__('Purchase', 'surecart')), this.showTotal && (h("span", null, '\u00A0', h("sc-total", null))), h("sc-visually-hidden", null, " ", wp.i18n.__('Press enter to purchase', 'surecart'))), this.secureNotice && location.protocol === 'https:' && (h("div", { class: "sc-secure-notice" }, h("sc-secure-notice", null, this.secureNoticeText || wp.i18n.__('This is a secure, encrypted payment.', 'surecart'))))));
  }
};
openWormhole(ScOrderSubmit, ['loading', 'paying', 'processors', 'processor', 'currencyCode', 'order'], false);
ScOrderSubmit.style = scOrderSubmitCss;

export { ScOrderSubmit as sc_order_submit };

//# sourceMappingURL=sc-order-submit.entry.js.map