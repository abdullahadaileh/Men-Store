import { r as registerInstance, h, F as Fragment, a as getElement } from './index-644f5478.js';

const scBreadcrumbsCss = ":host{display:block}.breadcrumb{display:flex;align-items:center;flex-wrap:wrap}";

const ScBreadcrumbs = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.label = 'Breadcrumb';
  }
  // Generates a clone of the separator element to use for each breadcrumb item
  getSeparator() {
    const slotted = this.el.shadowRoot.querySelector('slot[name=separator]');
    const separator = slotted.assignedElements({ flatten: true })[0];
    // Clone it, remove ids, and slot it
    const clone = separator.cloneNode(true);
    [clone, ...clone.querySelectorAll('[id]')].forEach(el => el.removeAttribute('id'));
    clone.slot = 'separator';
    return clone;
  }
  handleSlotChange() {
    const slotted = this.el.shadowRoot.querySelector('.breadcrumb slot');
    const items = slotted.assignedElements().filter(node => {
      return node.nodeName === 'CE-BREADCRUMB';
    });
    items.forEach((item, index) => {
      // Append separators to each item if they don't already have one
      const separator = item.querySelector('[slot="separator"]');
      if (separator === null) {
        item.append(this.getSeparator());
      }
      // The last breadcrumb item is the "current page"
      if (index === items.length - 1) {
        item.setAttribute('aria-current', 'page');
      }
      else {
        item.removeAttribute('aria-current');
      }
    });
  }
  render() {
    return (h(Fragment, null, h("nav", { part: "base", class: "breadcrumb", "aria-label": this.label }, h("slot", { onSlotchange: () => this.handleSlotChange() })), h("div", { part: "separator", hidden: true, "aria-hidden": "true" }, h("slot", { name: "separator" }, h("sc-icon", { name: "chevron-right" })))));
  }
  get el() { return getElement(this); }
};
ScBreadcrumbs.style = scBreadcrumbsCss;

export { ScBreadcrumbs as sc_breadcrumbs };

//# sourceMappingURL=sc-breadcrumbs.entry.js.map