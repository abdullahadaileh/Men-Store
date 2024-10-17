'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');

const scDividerCss = ":host{display:block;min-height:1px}.divider{position:relative;padding:var(--spacing) 0}.line__container{position:absolute;top:0;right:0;bottom:0;left:0;display:flex;align-items:center}.line{width:100%;border-top:1px solid var(--sc-divider-border-top-color, var(--sc-color-gray-200))}.text__container{position:relative;display:flex;justify-content:center;font-size:var(--sc-font-size-small)}.text{padding:0 var(--sc-spacing-small);background:var(--sc-divider-text-background-color, var(--sc-color-white));color:var(--sc-color-gray-500)}";

const ScDivider = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return (index.h("div", { class: "divider", part: "base" }, index.h("div", { class: "line__container", "aria-hidden": "true", part: "line-container" }, index.h("div", { class: "line", part: "line" })), index.h("div", { class: "text__container", part: "text-container" }, index.h("span", { class: "text", part: "text" }, index.h("slot", null)))));
  }
};
ScDivider.style = scDividerCss;

exports.sc_divider = ScDivider;

//# sourceMappingURL=sc-divider.cjs.entry.js.map