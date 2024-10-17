import { r as registerInstance, h, a as getElement } from './index-644f5478.js';

const scHeadingCss = ":host{display:block}.heading{font-family:var(--sc-font-sans);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between}.heading--small .heading__title{font-size:var(--sc-font-size-small);text-transform:uppercase}.heading__text{width:100%}.heading__title{font-size:var(--sc-font-size-x-large);font-weight:var(--sc-font-weight-bold);line-height:var(--sc-line-height-dense);white-space:normal}.heading__description{font-size:var(--sc-font-size-normal);line-height:var(--sc-line-height-dense);color:var(--sc-color-gray-500)}";

const ScHeading = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'medium';
  }
  render() {
    return (h("div", { part: "base", class: {
        'heading': true,
        'heading--small': this.size === 'small',
        'heading--medium': this.size === 'medium',
        'heading--large': this.size === 'large',
      } }, h("div", { class: { heading__text: true } }, h("div", { class: "heading__title", part: "title" }, h("slot", null)), h("div", { class: "heading__description", part: "description" }, h("slot", { name: "description" }))), h("slot", { name: "end" })));
  }
  get el() { return getElement(this); }
};
ScHeading.style = scHeadingCss;

const ScOrderConfirmComponentsValidator = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
    return h("slot", null);
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "checkout": ["handleOrderChange"]
  }; }
};

export { ScHeading as sc_heading, ScOrderConfirmComponentsValidator as sc_order_confirm_components_validator };

//# sourceMappingURL=sc-heading_2.entry.js.map