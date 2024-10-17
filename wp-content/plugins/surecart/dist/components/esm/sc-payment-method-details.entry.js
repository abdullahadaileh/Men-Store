import { r as registerInstance, h } from './index-644f5478.js';

const ScPaymentMethodDetails = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.paymentMethod = undefined;
    this.editHandler = undefined;
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    return (h("sc-card", null, h("sc-flex", { alignItems: "center", justifyContent: "flex-start", style: { gap: '0.5em' } }, h("sc-payment-method", { paymentMethod: this.paymentMethod }), h("div", null, !!((_b = (_a = this.paymentMethod) === null || _a === void 0 ? void 0 : _a.card) === null || _b === void 0 ? void 0 : _b.exp_month) && (h("span", null, 
    // Translators: %d/%d is month and year of expiration.
    wp.i18n.sprintf(wp.i18n.__('Exp. %d/%d', 'surecart'), (_d = (_c = this.paymentMethod) === null || _c === void 0 ? void 0 : _c.card) === null || _d === void 0 ? void 0 : _d.exp_month, (_f = (_e = this.paymentMethod) === null || _e === void 0 ? void 0 : _e.card) === null || _f === void 0 ? void 0 : _f.exp_year))), !!((_h = (_g = this.paymentMethod) === null || _g === void 0 ? void 0 : _g.paypal_account) === null || _h === void 0 ? void 0 : _h.email) && ((_k = (_j = this.paymentMethod) === null || _j === void 0 ? void 0 : _j.paypal_account) === null || _k === void 0 ? void 0 : _k.email)), h("sc-button", { type: "text", circle: true, onClick: this.editHandler }, h("sc-icon", { name: "edit-2" })))));
  }
};

export { ScPaymentMethodDetails as sc_payment_method_details };

//# sourceMappingURL=sc-payment-method-details.entry.js.map