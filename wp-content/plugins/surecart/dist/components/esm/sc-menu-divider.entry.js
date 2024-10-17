import { r as registerInstance, h } from './index-644f5478.js';

const scMenuDividerCss = ":host{display:block}.menu-divider{border-top:solid 1px var(--sc-panel-border-color);margin:var(--sc-spacing-x-small) 0}";

const ScMenuDivider = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return h("div", { part: "base", class: "menu-divider", role: "separator", "aria-hidden": "true" });
  }
};
ScMenuDivider.style = scMenuDividerCss;

export { ScMenuDivider as sc_menu_divider };

//# sourceMappingURL=sc-menu-divider.entry.js.map