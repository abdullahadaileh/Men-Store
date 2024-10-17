'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const index$1 = require('./index-fb76df07.js');
const pageAlign = require('./page-align-bf197eb4.js');
const price = require('./price-f1f1114d.js');
require('./currency-ba038e2f.js');

const scCouponFormCss = ":host {\n  display: block;\n}\n\nsc-button {\n  color: var(--sc-color-primary-500);\n}\n\n.coupon-form {\n  position: relative;\n  container-type: inline-size;\n}\n.coupon-form .coupon-button {\n  opacity: 0;\n  visibility: hidden;\n  transform: scale(0.9);\n  transition: all var(--sc-transition-fast) ease;\n  color: var(--sc-input-color);\n}\n.coupon-form .coupon-button-mobile {\n  margin-top: var(--sc-input-label-margin);\n  display: none;\n}\n.coupon-form--has-value .coupon-button {\n  opacity: 1;\n  visibility: visible;\n  transform: scale(1);\n}\n\n@container (max-width: 320px) {\n  .coupon-form .coupon-button {\n    display: none;\n  }\n  .coupon-form .coupon-button-mobile {\n    display: block;\n  }\n}\n.form {\n  opacity: 0;\n  visibility: hidden;\n  height: 0;\n  transform: translateY(5px);\n  transition: opacity var(--sc-transition-medium) ease, transform var(--sc-transition-medium) ease;\n  position: relative;\n  gap: var(--sc-spacing-small);\n}\n\n.coupon-form--is-open .form {\n  opacity: 1;\n  visibility: visible;\n  transform: translateY(0);\n  height: auto;\n  margin: var(--sc-spacing-small) 0;\n}\n.coupon-form--is-open .trigger {\n  display: none;\n}\n\n.trigger {\n  cursor: pointer;\n  font-size: var(--sc-font-size-small);\n  line-height: var(--sc-line-height-dense);\n  color: var(--sc-input-label-color);\n  user-select: none;\n}\n.trigger:hover {\n  text-decoration: underline;\n}\n\n.coupon-form--is-rtl .trigger {\n  text-align: right;\n}\n\n.coupon__status {\n  font-size: var(--sc-font-size-small);\n  line-height: var(--sc-line-height-dense);\n  color: var(--sc-color-warning-700);\n  display: inline-flex;\n  gap: var(--sc-spacing-x-small);\n  align-items: flex-start;\n  text-align: left;\n}\n.coupon__status sc-icon {\n  flex: 0 0 1em;\n  margin-top: 0.25em;\n}";

const ScCouponForm = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.scApplyCoupon = index.createEvent(this, "scApplyCoupon", 7);
    this.label = undefined;
    this.loading = undefined;
    this.busy = undefined;
    this.placeholder = undefined;
    this.error = undefined;
    this.forceOpen = undefined;
    this.discount = undefined;
    this.currency = undefined;
    this.discountAmount = undefined;
    this.showInterval = undefined;
    this.open = undefined;
    this.collapsed = undefined;
    this.value = undefined;
    this.buttonText = undefined;
  }
  /** Auto focus the input when opened. */
  handleOpenChange(val) {
    if (val) {
      setTimeout(() => this.input.triggerFocus(), 50);
    }
  }
  // Focus the coupon tag when a coupon is applied & Focus the trigger when coupon is removed.
  handleDiscountChange(newValue, oldValue) {
    var _a, _b;
    if (((_a = newValue === null || newValue === void 0 ? void 0 : newValue.promotion) === null || _a === void 0 ? void 0 : _a.code) === ((_b = oldValue === null || oldValue === void 0 ? void 0 : oldValue.promotion) === null || _b === void 0 ? void 0 : _b.code))
      return;
    setTimeout(() => {
      var _a, _b;
      if ((_b = (_a = this === null || this === void 0 ? void 0 : this.discount) === null || _a === void 0 ? void 0 : _a.promotion) === null || _b === void 0 ? void 0 : _b.code) {
        this.couponTag.shadowRoot.querySelector('*').focus();
      }
      else {
        this.addCouponTrigger.focus();
      }
    }, 50);
  }
  /** Close it when blurred and no value. */
  handleBlur() {
    if (!this.value) {
      this.open = false;
      this.error = '';
    }
  }
  getHumanReadableDiscount() {
    var _a, _b, _c;
    if (((_a = this === null || this === void 0 ? void 0 : this.discount) === null || _a === void 0 ? void 0 : _a.coupon) && ((_b = this === null || this === void 0 ? void 0 : this.discount) === null || _b === void 0 ? void 0 : _b.coupon.percent_off)) {
      return price.getHumanDiscount((_c = this === null || this === void 0 ? void 0 : this.discount) === null || _c === void 0 ? void 0 : _c.coupon);
    }
    return '';
  }
  /** Apply the coupon. */
  applyCoupon() {
    this.scApplyCoupon.emit(this.input.value.toUpperCase());
  }
  handleKeyDown(e) {
    if ((e === null || e === void 0 ? void 0 : e.code) === 'Enter') {
      this.applyCoupon();
    }
    else if ((e === null || e === void 0 ? void 0 : e.code) === 'Escape') {
      this.scApplyCoupon.emit(null);
      this.open = false;
      index$1.speak(wp.i18n.__('Coupon code field closed.', 'surecart'), 'assertive');
    }
  }
  translateHumanDiscountWithDuration(humanDiscount) {
    var _a;
    if (!this.showInterval)
      return humanDiscount;
    const { duration, duration_in_months } = (_a = this.discount) === null || _a === void 0 ? void 0 : _a.coupon;
    switch (duration) {
      case 'once':
        return `${humanDiscount} ${wp.i18n.__('once', 'surecart')}`;
      case 'repeating':
        const monthsLabel = wp.i18n.sprintf(wp.i18n._n('%d month', '%d months', duration_in_months, 'surecart'), duration_in_months);
        // translators: %s is the discount amount, %s is the duration (e.g. 3 months)
        return wp.i18n.sprintf(wp.i18n.__('%s for %s', 'surecart'), humanDiscount, monthsLabel);
      default:
        return humanDiscount;
    }
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    if (this.loading) {
      return index.h("sc-skeleton", { style: { width: '120px', display: 'inline-block' } });
    }
    if ((_b = (_a = this === null || this === void 0 ? void 0 : this.discount) === null || _a === void 0 ? void 0 : _a.promotion) === null || _b === void 0 ? void 0 : _b.code) {
      let humanDiscount = this.getHumanReadableDiscount();
      return (index.h("sc-line-item", { exportparts: "description:info, price-description:discount, price:amount" }, index.h("span", { slot: "description" }, index.h("div", { part: "discount-label" }, wp.i18n.__('Discount', 'surecart')), index.h("sc-tag", { exportparts: "base:coupon-tag", type: 'redeemable' === ((_c = this.discount) === null || _c === void 0 ? void 0 : _c.redeemable_status) ? 'success' : 'warning', class: "coupon-tag", clearable: true, onScClear: () => {
          this.scApplyCoupon.emit(null);
          this.open = false;
        }, onKeyDown: e => {
          if (e.key === 'Enter' || e.key === 'Escape') {
            index$1.speak(wp.i18n.__('Coupon was removed.', 'surecart'), 'assertive');
            this.scApplyCoupon.emit(null);
            this.open = false;
          }
        }, ref: el => (this.couponTag = el), role: "button", "aria-label": wp.i18n.sprintf(wp.i18n.__('Press enter to remove coupon code %s.', 'surecart'), ((_e = (_d = this === null || this === void 0 ? void 0 : this.discount) === null || _d === void 0 ? void 0 : _d.promotion) === null || _e === void 0 ? void 0 : _e.code) || this.input.value || '') }, (_g = (_f = this === null || this === void 0 ? void 0 : this.discount) === null || _f === void 0 ? void 0 : _f.promotion) === null || _g === void 0 ? void 0 : _g.code)), 'redeemable' === ((_h = this.discount) === null || _h === void 0 ? void 0 : _h.redeemable_status) ? (index.h(index.Fragment, null, humanDiscount && (index.h("span", { class: "coupon-human-discount", slot: "price-description" }, this.translateHumanDiscountWithDuration(humanDiscount))), index.h("span", { slot: "price" }, index.h("sc-format-number", { type: "currency", currency: this === null || this === void 0 ? void 0 : this.currency, value: this === null || this === void 0 ? void 0 : this.discountAmount })))) : (index.h("div", { class: "coupon__status", slot: "price-description" }, index.h("sc-icon", { name: "alert-triangle" }), price.getHumanDiscountRedeemableStatus((_j = this.discount) === null || _j === void 0 ? void 0 : _j.redeemable_status)))));
    }
    return this.collapsed ? (index.h("div", { part: "base", class: {
        'coupon-form': true,
        'coupon-form--is-open': this.open || this.forceOpen,
        'coupon-form--has-value': !!this.value,
        'coupon-form--is-rtl': pageAlign.isRtl(),
      } }, index.h("div", { part: "label", class: "trigger", onMouseDown: () => {
        if (this.open) {
          return;
        }
        this.open = true;
      }, onKeyDown: e => {
        if (e.key !== 'Enter' && e.key !== ' ') {
          return true;
        }
        if (this.open) {
          return;
        }
        this.open = true;
        index$1.speak(wp.i18n.__('Coupon code field opened. Press Escape button to close it.', 'surecart'), 'assertive');
      }, tabindex: "0", ref: el => (this.addCouponTrigger = el), role: "button" }, index.h("slot", { name: "label" }, this.label)), index.h("div", { class: "form", part: "form" }, index.h("sc-input", { exportparts: "base:input__base, input, form-control:input__form-control", value: this.value, onScInput: (e) => (this.value = e.target.value), placeholder: this.placeholder, onScBlur: () => this.handleBlur(), onKeyDown: e => this.handleKeyDown(e), ref: el => (this.input = el), "aria-label": wp.i18n.__('Add coupon code.', 'surecart') }, index.h("sc-button", { exportparts: "base:button__base, label:button_label", slot: "suffix", type: "text", loading: this.busy, size: "medium", class: "coupon-button", onClick: () => this.applyCoupon() }, index.h("slot", null, this.buttonText))), index.h("sc-button", { exportparts: "base:button__base, label:button_label", type: "primary", outline: true, loading: this.busy, size: "medium", class: "coupon-button-mobile", onClick: () => this.applyCoupon() }, index.h("slot", null, this.buttonText)), !!this.error && (index.h("sc-alert", { exportparts: "base:error__base, icon:error__icon, text:error__text, title:error_title, message:error__message", type: "danger", open: true }, index.h("span", { slot: "title" }, this.error)))), this.loading && index.h("sc-block-ui", { exportparts: "base:block-ui, content:block-ui__content" }))) : (index.h("div", { class: {
        'coupon-form': true,
        'coupon-form--has-value': !!this.value,
        'coupon-form--is-rtl': pageAlign.isRtl(),
      } }, index.h("sc-input", { label: this.label, exportparts: "base:input__base, input, form-control:input__form-control", value: this.value, onScInput: (e) => (this.value = e.target.value), placeholder: this.placeholder, onScBlur: () => this.handleBlur(), onKeyDown: e => this.handleKeyDown(e), ref: el => (this.input = el) }, index.h("sc-button", { exportparts: "base:button__base, label:button_label", slot: "suffix", type: "text", loading: this.busy, size: "medium", class: "coupon-button", onClick: () => this.applyCoupon() }, index.h("slot", null, this.buttonText))), index.h("sc-button", { exportparts: "base:button__base, label:button_label", type: "primary", outline: true, loading: this.busy, size: "medium", class: "coupon-button-mobile", onClick: () => this.applyCoupon() }, index.h("slot", null, this.buttonText)), !!this.error && (index.h("sc-alert", { exportparts: "base:error__base, icon:error__icon, text:error__text, title:error_title, message:error__message", type: "danger", open: true }, index.h("span", { slot: "title" }, this.error)))));
  }
  static get watchers() { return {
    "open": ["handleOpenChange"],
    "discount": ["handleDiscountChange"]
  }; }
};
ScCouponForm.style = scCouponFormCss;

exports.sc_coupon_form = ScCouponForm;

//# sourceMappingURL=sc-coupon-form.cjs.entry.js.map