'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const price = require('./price-f1f1114d.js');
const addQueryArgs = require('./add-query-args-17c551b6.js');
require('./currency-ba038e2f.js');

const scSubscriptionAdHocConfirmCss = ":host{display:block}";

const ScSubscriptionAdHocConfirm = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.heading = undefined;
    this.price = undefined;
    this.busy = false;
  }
  async handleSubmit(e) {
    const { ad_hoc_amount } = await e.target.getFormJson();
    this.busy = true;
    return window.location.assign(addQueryArgs.addQueryArgs(window.location.href, {
      action: 'confirm',
      ad_hoc_amount,
    }));
  }
  render() {
    return (index.h("sc-dashboard-module", { heading: this.heading || wp.i18n.__('Enter An Amount', 'surecart'), class: "subscription-switch" }, index.h("sc-card", null, index.h("sc-form", { onScSubmit: e => this.handleSubmit(e) }, index.h("sc-price-input", { label: "Amount", name: "ad_hoc_amount", autofocus: true, required: true }, index.h("span", { slot: "suffix", style: { opacity: '0.75' } }, price.intervalString(this.price))), index.h("sc-button", { type: "primary", full: true, submit: true, loading: this.busy }, wp.i18n.__('Next', 'surecart'), " ", index.h("sc-icon", { name: "arrow-right", slot: "suffix" })))), this.busy && index.h("sc-block-ui", { style: { zIndex: '9' } })));
  }
};
ScSubscriptionAdHocConfirm.style = scSubscriptionAdHocConfirmCss;

exports.sc_subscription_ad_hoc_confirm = ScSubscriptionAdHocConfirm;

//# sourceMappingURL=sc-subscription-ad-hoc-confirm.cjs.entry.js.map