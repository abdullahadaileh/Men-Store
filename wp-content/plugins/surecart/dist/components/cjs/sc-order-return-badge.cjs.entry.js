'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');

const scOrderReturnBadgeCss = ":host{display:inline-block}";

const status = {
  open: wp.i18n.__('Return in progress', 'surecart'),
  completed: wp.i18n.__('Returned', 'surecart'),
};
const type = {
  open: 'warning',
  completed: 'success',
};
const ScOrderReturnBadge = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.status = undefined;
    this.size = 'medium';
    this.pill = false;
    this.clearable = false;
  }
  render() {
    return (index.h("sc-tag", { type: type === null || type === void 0 ? void 0 : type[this === null || this === void 0 ? void 0 : this.status], pill: this.pill }, (status === null || status === void 0 ? void 0 : status[this.status]) || this.status));
  }
};
ScOrderReturnBadge.style = scOrderReturnBadgeCss;

exports.sc_order_return_badge = ScOrderReturnBadge;

//# sourceMappingURL=sc-order-return-badge.cjs.entry.js.map