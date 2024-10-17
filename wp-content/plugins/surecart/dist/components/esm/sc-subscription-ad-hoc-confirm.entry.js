import { r as registerInstance, h } from './index-644f5478.js';
import { i as intervalString } from './price-178c2e2b.js';
import { a as addQueryArgs } from './add-query-args-f4c5962b.js';
import './currency-728311ef.js';

const scSubscriptionAdHocConfirmCss = ":host{display:block}";

const ScSubscriptionAdHocConfirm = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.heading = undefined;
    this.price = undefined;
    this.busy = false;
  }
  async handleSubmit(e) {
    const { ad_hoc_amount } = await e.target.getFormJson();
    this.busy = true;
    return window.location.assign(addQueryArgs(window.location.href, {
      action: 'confirm',
      ad_hoc_amount,
    }));
  }
  render() {
    return (h("sc-dashboard-module", { heading: this.heading || wp.i18n.__('Enter An Amount', 'surecart'), class: "subscription-switch" }, h("sc-card", null, h("sc-form", { onScSubmit: e => this.handleSubmit(e) }, h("sc-price-input", { label: "Amount", name: "ad_hoc_amount", autofocus: true, required: true }, h("span", { slot: "suffix", style: { opacity: '0.75' } }, intervalString(this.price))), h("sc-button", { type: "primary", full: true, submit: true, loading: this.busy }, wp.i18n.__('Next', 'surecart'), " ", h("sc-icon", { name: "arrow-right", slot: "suffix" })))), this.busy && h("sc-block-ui", { style: { zIndex: '9' } })));
  }
};
ScSubscriptionAdHocConfirm.style = scSubscriptionAdHocConfirmCss;

export { ScSubscriptionAdHocConfirm as sc_subscription_ad_hoc_confirm };

//# sourceMappingURL=sc-subscription-ad-hoc-confirm.entry.js.map