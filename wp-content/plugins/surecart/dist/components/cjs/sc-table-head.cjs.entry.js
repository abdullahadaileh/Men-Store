'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');

const scTableHeadCss = ":host{display:table-header-group}::slotted(*){display:table-row}";

const ScTable = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return (index.h(index.Host, null, index.h("slot", null)));
  }
};
ScTable.style = scTableHeadCss;

exports.sc_table_head = ScTable;

//# sourceMappingURL=sc-table-head.cjs.entry.js.map