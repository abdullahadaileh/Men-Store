'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
require('./watchers-772d9166.js');
const store = require('./store-1aade79c.js');
const mutations$1 = require('./mutations-8d7c4499.js');
const watchers = require('./watchers-51b054bd.js');
const mutations = require('./mutations-2558dfa8.js');
const getters = require('./getters-3a50490a.js');
require('./add-query-args-17c551b6.js');
require('./utils-a086ed6e.js');
require('./index-00f0fc21.js');
require('./index-fb76df07.js');
require('./google-55083ae7.js');
require('./currency-ba038e2f.js');
require('./google-62bdaeea.js');
require('./util-efd68af1.js');
require('./fetch-2dba325c.js');

const scUpsellSubmitButtonCss = "sc-upsell-submit-button{position:relative;display:block}sc-upsell-submit-button .wp-block-button__link{position:relative;text-decoration:none}sc-upsell-submit-button .wp-block-button__link span sc-icon{padding-right:var(--sc-spacing-small)}sc-upsell-submit-button .wp-block-button__link [data-text],sc-upsell-submit-button .wp-block-button__link sc-spinner{display:flex;align-items:center;justify-content:center}sc-upsell-submit-button .sc-block-button--sold-out,sc-upsell-submit-button .sc-block-button--unavailable{display:none !important}sc-upsell-submit-button.is-unavailable .sc-block-button__link{display:none !important}sc-upsell-submit-button.is-unavailable .sc-block-button--unavailable{display:initial !important}sc-upsell-submit-button.is-sold-out .sc-block-button__link{display:none !important}sc-upsell-submit-button.is-sold-out .sc-block-button--sold-out{display:initial !important}sc-upsell-submit-button sc-spinner::part(base){--indicator-color:currentColor;--spinner-size:12px;position:absolute;top:calc(50% - var(--spinner-size) + var(--spinner-size) / 4);left:calc(50% - var(--spinner-size) + var(--spinner-size) / 4)}sc-upsell-submit-button [data-text],sc-upsell-submit-button [data-loader]{transition:opacity var(--sc-transition-fast) ease-in-out, visibility var(--sc-transition-fast) ease-in-out}sc-upsell-submit-button [data-loader]{opacity:0;visibility:hidden}sc-upsell-submit-button.is-disabled{pointer-events:none}sc-upsell-submit-button.is-busy [data-text]{opacity:0;visibility:hidden}sc-upsell-submit-button.is-busy [data-loader]{opacity:1;visibility:visible}sc-upsell-submit-button.is-out-of-stock [data-text]{opacity:0.6}";

const ScUpsellSubmitButton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  getUpsellProductId() {
    var _a;
    return ((_a = store.state.product) === null || _a === void 0 ? void 0 : _a.id) || '';
  }
  async handleAddToOrderClick(e) {
    e.preventDefault();
    mutations.accept();
  }
  render() {
    return (index.h(index.Host, { class: {
        'is-busy': getters.isBusy(),
        'is-disabled': store.state.disabled,
        // TODO: change this to out of stock error message.
        'is-sold-out': (watchers.isProductOutOfStock(this.getUpsellProductId()) && !watchers.isSelectedVariantMissing(this.getUpsellProductId())) || (mutations$1.state === null || mutations$1.state === void 0 ? void 0 : mutations$1.state.code) === 'out_of_stock',
        'is-unavailable': watchers.isSelectedVariantMissing(this.getUpsellProductId()) || (mutations$1.state === null || mutations$1.state === void 0 ? void 0 : mutations$1.state.code) === 'expired',
      }, onClick: e => this.handleAddToOrderClick(e) }, index.h("slot", null)));
  }
  get el() { return index.getElement(this); }
};
ScUpsellSubmitButton.style = scUpsellSubmitButtonCss;

exports.sc_upsell_submit_button = ScUpsellSubmitButton;

//# sourceMappingURL=sc-upsell-submit-button.cjs.entry.js.map