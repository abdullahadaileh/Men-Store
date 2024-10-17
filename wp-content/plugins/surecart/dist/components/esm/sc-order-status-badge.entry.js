import { r as registerInstance, h } from './index-644f5478.js';

const scOrderStatusBadgeCss = ":host{display:inline-block}";

const ScOrderStatusBadge = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.status = undefined;
    this.size = 'medium';
    this.pill = false;
    this.clearable = false;
  }
  getType() {
    switch (this.status) {
      case 'processing':
        return 'warning';
      case 'paid':
        return 'success';
      case 'payment_failed':
        return 'danger';
      case 'canceled':
        return 'danger';
      case 'void':
        return 'danger';
      case 'canceled':
        return 'danger';
    }
  }
  getText() {
    switch (this.status) {
      case 'processing':
        return wp.i18n.__('Processing', 'surecart');
      case 'payment_failed':
        return wp.i18n.__('Payment Failed', 'surecart');
      case 'paid':
        return wp.i18n.__('Paid', 'surecart');
      case 'canceled':
        return wp.i18n.__('Canceled', 'surecart');
      case 'void':
        return wp.i18n.__('Canceled', 'surecart');
      default:
        return this.status;
    }
  }
  render() {
    return (h("sc-tag", { type: this.getType(), pill: this.pill }, this.getText()));
  }
};
ScOrderStatusBadge.style = scOrderStatusBadgeCss;

export { ScOrderStatusBadge as sc_order_status_badge };

//# sourceMappingURL=sc-order-status-badge.entry.js.map