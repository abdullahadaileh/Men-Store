import { r as registerInstance, h } from './index-644f5478.js';

const ScPremiumTag = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'small';
  }
  render() {
    return (h("sc-tag", { type: "success", size: this.size }, wp.i18n.__('Premium', 'surecart')));
  }
};

export { ScPremiumTag as sc_premium_tag };

//# sourceMappingURL=sc-premium-tag.entry.js.map