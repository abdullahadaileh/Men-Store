import { r as registerInstance, h, a as getElement } from './index-644f5478.js';

const scBreadcrumbCss = ":host{display:inline-flex}.breadcrumb-item{display:inline-flex;align-items:center;font-family:var(--sc-font-sans);font-size:var(--sc-font-size-small);font-weight:var(--sc-font-weight-semibold);color:var(--sc-breadcrumb-color, var(--sc-color-gray-600));line-height:var(--sc-line-height-normal);white-space:nowrap}.breadcrumb-item__label{display:inline-block;font-family:inherit;font-size:inherit;font-weight:inherit;line-height:inherit;text-decoration:none;color:inherit;background:none;border:none;border-radius:var(--sc-border-radius-medium);padding:0;margin:0;cursor:pointer;transition:color var(--sc-transition-fast) ease}:host(:not(:last-of-type)) .breadcrumb-item__label{color:var(--sc-breadcrumb-item-label-color, var(--sc-color-gray-900))}:host(:not(:last-of-type)) .breadcrumb-item__label:hover{color:var(--sc-breadcrumb-item-label-hover-color, var(--sc-color-primary-500))}:host(:not(:last-of-type)) .breadcrumb-item__label:active{color:var(--sc-breadcrumb-item-label-active-color, var(--sc-color-gray-900))}.breadcrumb-item__label:focus{box-shadow:var(--sc-focus-ring)}.breadcrumb-item__prefix,.breadcrumb-item__suffix{display:none;flex:0 0 auto;display:flex;align-items:center}.breadcrumb-item--has-prefix .breadcrumb-item__prefix{display:inline-flex;margin-right:var(--sc-spacing-x-small)}.breadcrumb-item--has-suffix .breadcrumb-item__suffix{display:inline-flex;margin-left:var(--sc-spacing-x-small)}:host(:last-of-type) .breadcrumb-item__separator{display:none}.breadcrumb-item__separator{display:inline-flex;align-items:center;margin:0 var(--sc-spacing-x-small);user-select:none}";

const ScBreadcrumb = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.href = undefined;
    this.target = undefined;
    this.rel = 'noreferrer noopener';
    this.hasPrefix = undefined;
    this.hasSuffix = undefined;
  }
  handleSlotChange() {
    this.hasPrefix = !!this.el.querySelector('[slot="prefix"]');
    this.hasSuffix = !!this.el.querySelector('[slot="suffix"]');
  }
  render() {
    const Tag = this.href ? 'a' : 'div';
    return (h("div", { part: "base", class: {
        'breadcrumb-item': true,
        'breadcrumb-item--has-prefix': this.hasPrefix,
        'breadcrumb-item--has-suffix': this.hasSuffix,
      } }, h("span", { part: "prefix", class: "breadcrumb-item__prefix" }, h("slot", { name: "prefix" })), h(Tag, { part: "label", class: "breadcrumb-item__label breadcrumb-item__label--link", href: this.href, target: this.target, rel: this.rel }, h("slot", null)), h("span", { part: "suffix", class: "breadcrumb-item__suffix" }, h("slot", { name: "suffix", onSlotchange: () => this.handleSlotChange() })), h("span", { part: "separator", class: "breadcrumb-item__separator", "aria-hidden": "true" }, h("slot", { name: "separator", onSlotchange: () => this.handleSlotChange() }, h("sc-icon", { name: "chevron-right" })))));
  }
  get el() { return getElement(this); }
};
ScBreadcrumb.style = scBreadcrumbCss;

export { ScBreadcrumb as sc_breadcrumb };

//# sourceMappingURL=sc-breadcrumb.entry.js.map