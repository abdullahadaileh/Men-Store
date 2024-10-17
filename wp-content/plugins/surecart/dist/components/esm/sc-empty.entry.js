import { r as registerInstance, h } from './index-644f5478.js';

const scEmptyCss = ":host{display:block}.empty{display:flex;flex-direction:column;align-items:center;padding:var(--sc-spacing-large);text-align:center;gap:var(--sc-spacing-small);color:var(--sc-empty-color, var(--sc-color-gray-500))}.empty sc-icon{font-size:var(--sc-font-size-xx-large);color:var(--sc-empty-icon-color, var(--sc-color-gray-700))}";

const ScEmpty = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.icon = undefined;
  }
  render() {
    return (h("div", { part: "base", class: "empty" }, !!this.icon && h("sc-icon", { exportparts: "base:icon", name: this.icon }), h("slot", null)));
  }
};
ScEmpty.style = scEmptyCss;

export { ScEmpty as sc_empty };

//# sourceMappingURL=sc-empty.entry.js.map