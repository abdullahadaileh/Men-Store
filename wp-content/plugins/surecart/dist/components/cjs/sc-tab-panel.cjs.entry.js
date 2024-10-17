'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');

const scTabPanelCss = ":host{--padding:0;--spacing:var(--sc-spacing-large);display:block}::slotted(*~*){margin-top:var(--spacing)}.tab-panel{border:solid 1px transparent;padding:var(--padding);font-family:var(--sc-font-sans);font-size:var(--sc-font-size-medium)}";

let id = 0;
const ScTabPanel = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.componentId = `tab-panel-${++id}`;
    this.name = '';
    this.active = false;
  }
  render() {
    // If the user didn't provide an ID, we'll set one so we can link tabs and tab panels with aria labels
    this.el.id = this.el.id || this.componentId;
    return (index.h(index.Host, { style: { display: this.active ? 'block' : 'none' } }, index.h("div", { part: "base", class: "tab-panel", role: "tabpanel", "aria-hidden": this.active ? 'false' : 'true' }, index.h("slot", null))));
  }
  get el() { return index.getElement(this); }
};
ScTabPanel.style = scTabPanelCss;

exports.sc_tab_panel = ScTabPanel;

//# sourceMappingURL=sc-tab-panel.cjs.entry.js.map