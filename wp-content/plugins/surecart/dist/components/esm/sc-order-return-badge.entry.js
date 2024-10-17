import { r as registerInstance, h } from './index-644f5478.js';

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
    registerInstance(this, hostRef);
    this.status = undefined;
    this.size = 'medium';
    this.pill = false;
    this.clearable = false;
  }
  render() {
    return (h("sc-tag", { type: type === null || type === void 0 ? void 0 : type[this === null || this === void 0 ? void 0 : this.status], pill: this.pill }, (status === null || status === void 0 ? void 0 : status[this.status]) || this.status));
  }
};
ScOrderReturnBadge.style = scOrderReturnBadgeCss;

export { ScOrderReturnBadge as sc_order_return_badge };

//# sourceMappingURL=sc-order-return-badge.entry.js.map