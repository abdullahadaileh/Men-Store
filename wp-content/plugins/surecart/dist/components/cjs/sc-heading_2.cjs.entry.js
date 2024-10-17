'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');

const scHeadingCss = ":host{display:block}.heading{font-family:var(--sc-font-sans);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between}.heading--small .heading__title{font-size:var(--sc-font-size-small);text-transform:uppercase}.heading__text{width:100%}.heading__title{font-size:var(--sc-font-size-x-large);font-weight:var(--sc-font-weight-bold);line-height:var(--sc-line-height-dense);white-space:normal}.heading__description{font-size:var(--sc-font-size-normal);line-height:var(--sc-line-height-dense);color:var(--sc-color-gray-500)}";

const ScHeading = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'medium';
  }
  render() {
    return (index.h("div", { part: "base", class: {
        'heading': true,
        'heading--small': this.size === 'small',
        'heading--medium': this.size === 'medium',
        'heading--large': this.size === 'large',
      } }, index.h("div", { class: { heading__text: true } }, index.h("div", { class: "heading__title", part: "title" }, index.h("slot", null)), index.h("div", { class: "heading__description", part: "description" }, index.h("slot", { name: "description" }))), index.h("slot", { name: "end" })));
  }
  get el() { return index.getElement(this); }
};
ScHeading.style = scHeadingCss;

const ScOrderConfirmComponentsValidator = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.checkout = undefined;
    this.hasManualInstructions = undefined;
  }
  handleOrderChange() {
    var _a;
    if ((_a = this.checkout) === null || _a === void 0 ? void 0 : _a.manual_payment) {
      this.addManualPaymentInstructions();
    }
  }
  addManualPaymentInstructions() {
    var _a, _b;
    if (this.hasManualInstructions)
      return;
    const details = this.el.shadowRoot
      .querySelector('slot')
      .assignedElements({ flatten: true })
      .find(element => element.tagName === 'SC-ORDER-CONFIRMATION-DETAILS');
    const address = document.createElement('sc-order-manual-instructions');
    (_b = (_a = details === null || details === void 0 ? void 0 : details.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore) === null || _b === void 0 ? void 0 : _b.call(_a, address, details);
    this.hasManualInstructions = true;
  }
  componentWillLoad() {
    this.hasManualInstructions = !!this.el.querySelector('sc-order-manual-instructions');
  }
  render() {
    return index.h("slot", null);
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "checkout": ["handleOrderChange"]
  }; }
};

exports.sc_heading = ScHeading;
exports.sc_order_confirm_components_validator = ScOrderConfirmComponentsValidator;

//# sourceMappingURL=sc-heading_2.cjs.entry.js.map