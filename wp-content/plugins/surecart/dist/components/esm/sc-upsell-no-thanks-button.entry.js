import { r as registerInstance, h, H as Host } from './index-644f5478.js';
import { d as decline } from './mutations-fa2a01e9.js';
import './fetch-2525e763.js';
import './add-query-args-f4c5962b.js';
import './store-77f83bce.js';
import './utils-00526fde.js';
import './index-1046c77e.js';
import './watchers-5af31452.js';
import './google-ee26bba4.js';
import './currency-728311ef.js';
import './google-357f4c4c.js';
import './util-64ee5262.js';
import './index-c5a96d53.js';
import './mutations-0a628afa.js';

const scUpsellNoThanksButtonCss = "sc-upsell-no-thanks-button{display:block}sc-upsell-no-thanks-button p{margin-block-start:0;margin-block-end:1em}sc-upsell-no-thanks-button .wp-block-button__link{position:relative;text-decoration:none}";

const ScUpsellNoThanksButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, { onClick: () => decline() }, h("slot", null)));
  }
};
ScUpsellNoThanksButton.style = scUpsellNoThanksButtonCss;

export { ScUpsellNoThanksButton as sc_upsell_no_thanks_button };

//# sourceMappingURL=sc-upsell-no-thanks-button.entry.js.map