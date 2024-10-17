'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const getters$2 = require('./getters-8b2c88a6.js');
const getters = require('./getters-f0495158.js');
const watchers = require('./watchers-fecceee2.js');
const mutations = require('./mutations-164b66b1.js');
const consumer = require('./consumer-21fdeb72.js');
const getters$1 = require('./getters-1e382cac.js');
require('./address-07819c5b.js');
require('./util-efd68af1.js');
require('./index-00f0fc21.js');
require('./utils-a086ed6e.js');
require('./get-query-arg-53bf21e2.js');
require('./add-query-args-17c551b6.js');
require('./index-fb76df07.js');
require('./google-62bdaeea.js');
require('./currency-ba038e2f.js');
require('./price-f1f1114d.js');
require('./store-96a02d63.js');

const getProcessorData = (processors = [], type, mode) => {
  var _a;
  return ((_a = (processors || []).find(processor => (processor === null || processor === void 0 ? void 0 : processor.processor_type) === type && (processor === null || processor === void 0 ? void 0 : processor.live_mode) === !!(mode === 'live'))) === null || _a === void 0 ? void 0 : _a.processor_data) || {};
};

const scOrderSubmitCss = "sc-order-submit{display:block;width:auto;display:grid;gap:var(--sc-form-row-spacing)}.sc-secure-notice{display:flex;justify-content:center}";

const ScOrderSubmit = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
    return ((_a = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.selected_shipping_choice_required) && !((_b = mutations.state.checkout) === null || _b === void 0 ? void 0 : _b.selected_shipping_choice);
  }
  renderPayPalButton(buttons) {
    const { client_id, account_id, merchant_initiated_enabled } = getProcessorData(getters.availableProcessors(), 'paypal', mutations.state.mode);
    if (!client_id && !account_id)
      return null;
    return (index.h("sc-paypal-buttons", { buttons: buttons, busy: getters$1.formBusy() || getters$2.checkoutIsLocked(), mode: mutations.state.mode, order: mutations.state.checkout, merchantInitiated: merchant_initiated_enabled, "currency-code": mutations.state.currencyCode, "client-id": client_id, "merchant-id": account_id, label: "checkout", color: "blue" }));
  }
  render() {
    if (this.cannotShipToLocation() || getters$2.checkoutIsLocked('OUT_OF_STOCK')) {
      return (index.h("sc-button", { type: this.type, size: this.size, full: this.full, loading: this.loading || this.paying, disabled: true }, !!this.icon && index.h("sc-icon", { name: this.icon, slot: "prefix", "aria-hidden": "true" }), index.h("slot", null, wp.i18n.__('Purchase', 'surecart')), this.showTotal && (index.h("span", null, '\u00A0', index.h("sc-total", null))), index.h("sc-visually-hidden", null, " ", wp.i18n.__('Press enter to purchase', 'surecart'))));
    }
    return (index.h(index.Fragment, null, watchers.state.id === 'paypal' && !(watchers.state === null || watchers.state === void 0 ? void 0 : watchers.state.method) && this.renderPayPalButton(['paypal']), watchers.state.id === 'paypal' && (watchers.state === null || watchers.state === void 0 ? void 0 : watchers.state.method) === 'card' && this.renderPayPalButton(['card']), index.h("sc-button", { hidden: ['paypal', 'paypal-card'].includes(watchers.state.id), submit: true, type: this.type, size: this.size, full: this.full, loading: this.loading || this.paying, disabled: this.loading || this.paying || getters$1.formBusy() || getters$2.checkoutIsLocked() || this.cannotShipToLocation() }, !!this.icon && index.h("sc-icon", { name: this.icon, slot: "prefix", "aria-hidden": "true" }), index.h("slot", null, wp.i18n.__('Purchase', 'surecart')), this.showTotal && (index.h("span", null, '\u00A0', index.h("sc-total", null))), index.h("sc-visually-hidden", null, " ", wp.i18n.__('Press enter to purchase', 'surecart'))), this.secureNotice && location.protocol === 'https:' && (index.h("div", { class: "sc-secure-notice" }, index.h("sc-secure-notice", null, this.secureNoticeText || wp.i18n.__('This is a secure, encrypted payment.', 'surecart'))))));
  }
};
consumer.openWormhole(ScOrderSubmit, ['loading', 'paying', 'processors', 'processor', 'currencyCode', 'order'], false);
ScOrderSubmit.style = scOrderSubmitCss;

exports.sc_order_submit = ScOrderSubmit;

//# sourceMappingURL=sc-order-submit.cjs.entry.js.map