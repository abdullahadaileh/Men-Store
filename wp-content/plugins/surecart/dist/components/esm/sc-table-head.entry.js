import { r as registerInstance, h, H as Host } from './index-644f5478.js';

const scTableHeadCss = ":host{display:table-header-group}::slotted(*){display:table-row}";

const ScTable = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, null, h("slot", null)));
  }
};
ScTable.style = scTableHeadCss;

export { ScTable as sc_table_head };

//# sourceMappingURL=sc-table-head.entry.js.map