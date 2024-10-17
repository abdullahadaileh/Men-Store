import { r as registerInstance, c as createEvent, h } from './index-644f5478.js';
import { s as state } from './mutations-b8f9af9f.js';
import { i as isRtl } from './page-align-8602c4c7.js';
import { f as formBusy } from './getters-2c9ecd8c.js';
import './index-1046c77e.js';
import './utils-00526fde.js';
import './get-query-arg-cb6b8763.js';
import './add-query-args-f4c5962b.js';
import './index-c5a96d53.js';
import './google-357f4c4c.js';
import './currency-728311ef.js';
import './price-178c2e2b.js';
import './store-dde63d4d.js';

const scOrderCouponFormCss = ":host{display:block}.coupon-form{position:relative}.form{opacity:0;visibility:hidden;height:0;transition:opacity var(--sc-transition-fast) ease-in-out}.coupon-form--is-open .form{opacity:1;visibility:visible;height:auto;margin-top:var(--sc-spacing-small);display:grid;gap:var(--sc-spacing-small)}.coupon-form--is-open .trigger{color:var(--sc-input-label-color)}.coupon-form--is-open .trigger:hover{text-decoration:none}.trigger{cursor:pointer;font-size:var(--sc-font-size-small);color:var(--sc-color-gray-500);user-select:none}.trigger:hover{text-decoration:underline}.order-coupon-form--is-rtl .trigger,.order-coupon-form--is-rtl .trigger:hover{text-align:right}";

const ScOrderCouponForm = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.scApplyCoupon = createEvent(this, "scApplyCoupon", 7);
    this.label = undefined;
    this.loading = undefined;
    this.collapsed = undefined;
    this.placeholder = undefined;
    this.buttonText = undefined;
    this.open = undefined;
    this.value = undefined;
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    // Do any line items have a recurring price?
    const hasRecurring = (_c = (_b = (_a = state === null || state === void 0 ? void 0 : state.checkout) === null || _a === void 0 ? void 0 : _a.line_items) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.some(item => { var _a; return (_a = item === null || item === void 0 ? void 0 : item.price) === null || _a === void 0 ? void 0 : _a.recurring_interval; });
    return (h("sc-coupon-form", { label: this.label || wp.i18n.__('Add Coupon Code', 'surecart'), collapsed: this.collapsed, placeholder: this.placeholder, loading: formBusy() && !((_f = (_e = (_d = state.checkout) === null || _d === void 0 ? void 0 : _d.line_items) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.length), busy: formBusy(), discount: (_g = state.checkout) === null || _g === void 0 ? void 0 : _g.discount, currency: (_h = state.checkout) === null || _h === void 0 ? void 0 : _h.currency, "discount-amount": (_j = state.checkout) === null || _j === void 0 ? void 0 : _j.discount_amount, class: {
        'order-coupon-form--is-rtl': isRtl(),
      }, "button-text": this.buttonText || wp.i18n.__('Apply', 'surecart'), "show-interval": hasRecurring }));
  }
};
ScOrderCouponForm.style = scOrderCouponFormCss;

export { ScOrderCouponForm as sc_order_coupon_form };

//# sourceMappingURL=sc-order-coupon-form.entry.js.map