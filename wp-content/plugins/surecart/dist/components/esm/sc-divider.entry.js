import { r as registerInstance, h } from './index-644f5478.js';

const scDividerCss = ":host{display:block;min-height:1px}.divider{position:relative;padding:var(--spacing) 0}.line__container{position:absolute;top:0;right:0;bottom:0;left:0;display:flex;align-items:center}.line{width:100%;border-top:1px solid var(--sc-divider-border-top-color, var(--sc-color-gray-200))}.text__container{position:relative;display:flex;justify-content:center;font-size:var(--sc-font-size-small)}.text{padding:0 var(--sc-spacing-small);background:var(--sc-divider-text-background-color, var(--sc-color-white));color:var(--sc-color-gray-500)}";

const ScDivider = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h("div", { class: "divider", part: "base" }, h("div", { class: "line__container", "aria-hidden": "true", part: "line-container" }, h("div", { class: "line", part: "line" })), h("div", { class: "text__container", part: "text-container" }, h("span", { class: "text", part: "text" }, h("slot", null)))));
  }
};
ScDivider.style = scDividerCss;

export { ScDivider as sc_divider };

//# sourceMappingURL=sc-divider.entry.js.map