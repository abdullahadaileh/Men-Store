'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');

const scMenuDividerCss = ":host{display:block}.menu-divider{border-top:solid 1px var(--sc-panel-border-color);margin:var(--sc-spacing-x-small) 0}";

const ScMenuDivider = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return index.h("div", { part: "base", class: "menu-divider", role: "separator", "aria-hidden": "true" });
  }
};
ScMenuDivider.style = scMenuDividerCss;

exports.sc_menu_divider = ScMenuDivider;

//# sourceMappingURL=sc-menu-divider.cjs.entry.js.map