'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');

const scEmptyCss = ":host{display:block}.empty{display:flex;flex-direction:column;align-items:center;padding:var(--sc-spacing-large);text-align:center;gap:var(--sc-spacing-small);color:var(--sc-empty-color, var(--sc-color-gray-500))}.empty sc-icon{font-size:var(--sc-font-size-xx-large);color:var(--sc-empty-icon-color, var(--sc-color-gray-700))}";

const ScEmpty = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.icon = undefined;
  }
  render() {
    return (index.h("div", { part: "base", class: "empty" }, !!this.icon && index.h("sc-icon", { exportparts: "base:icon", name: this.icon }), index.h("slot", null)));
  }
};
ScEmpty.style = scEmptyCss;

exports.sc_empty = ScEmpty;

//# sourceMappingURL=sc-empty.cjs.entry.js.map