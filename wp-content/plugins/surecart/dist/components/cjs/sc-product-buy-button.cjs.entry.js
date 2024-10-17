'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const error = require('./error-25dd031d.js');
const watchers = require('./watchers-51b054bd.js');
require('./mutations-164b66b1.js');
require('./index-00f0fc21.js');
require('./utils-a086ed6e.js');
require('./get-query-arg-53bf21e2.js');
require('./add-query-args-17c551b6.js');
require('./index-fb76df07.js');
require('./google-62bdaeea.js');
require('./currency-ba038e2f.js');
require('./price-f1f1114d.js');
require('./mutations-8260a74b.js');
require('./mutations-7113e932.js');
require('./store-96a02d63.js');
require('./mutations-8d7c4499.js');
require('./index-a9c75016.js');
require('./fetch-2dba325c.js');
require('./google-55083ae7.js');
require('./util-efd68af1.js');

const scProductBuyButtonCss = "sc-product-buy-button{position:relative}sc-product-buy-button a.wp-block-button__link{position:relative;text-decoration:none}sc-product-buy-button .sc-block-button--sold-out,sc-product-buy-button .sc-block-button--unavailable{display:none !important}sc-product-buy-button.is-unavailable a{display:none !important}sc-product-buy-button.is-unavailable .sc-block-button--unavailable{display:initial !important}sc-product-buy-button.is-sold-out a{display:none !important}sc-product-buy-button.is-sold-out .sc-block-button--sold-out{display:initial !important}sc-product-buy-button sc-spinner::part(base){--indicator-color:currentColor;--spinner-size:12px;position:absolute;top:calc(50% - var(--spinner-size) + var(--spinner-size) / 4);left:calc(50% - var(--spinner-size) + var(--spinner-size) / 4)}sc-product-buy-button [data-text],sc-product-buy-button [data-loader]{transition:opacity var(--sc-transition-fast) ease-in-out, visibility var(--sc-transition-fast) ease-in-out}sc-product-buy-button [data-loader]{opacity:0;visibility:hidden}sc-product-buy-button.is-disabled{pointer-events:none}sc-product-buy-button.is-busy [data-text]{opacity:0;visibility:hidden}sc-product-buy-button.is-busy [data-loader]{opacity:1;visibility:visible}sc-product-buy-button sc-alert{margin-bottom:var(--sc-spacing-medium)}sc-product-buy-button.is-out-of-stock [data-text]{opacity:0.6}";

const ScProductBuyButton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.addToCart = undefined;
    this.productId = undefined;
    this.formId = undefined;
    this.mode = 'live';
    this.checkoutLink = undefined;
    this.error = undefined;
  }
  async handleCartClick(e) {
    var _a, _b, _c, _d, _e;
    e.preventDefault();
    console.log(e);
    // already busy, do nothing.
    if ((_a = watchers.state[this.productId]) === null || _a === void 0 ? void 0 : _a.busy)
      return;
    // ad hoc price, use the dialog.
    if ((_c = (_b = watchers.state[this.productId]) === null || _b === void 0 ? void 0 : _b.selectedPrice) === null || _c === void 0 ? void 0 : _c.ad_hoc) {
      watchers.setProduct(this.productId, { dialog: this.addToCart ? 'ad_hoc_cart' : 'ad_hoc_buy' });
      return;
    }
    // if add to cart is undefined/false navigate to buy url
    if (!this.addToCart) {
      const checkoutUrl = (_e = (_d = window === null || window === void 0 ? void 0 : window.scData) === null || _d === void 0 ? void 0 : _d.pages) === null || _e === void 0 ? void 0 : _e.checkout;
      if (!checkoutUrl)
        return;
      return window.location.assign(error.getProductBuyLink(this.productId, checkoutUrl, { no_cart: !this.addToCart }));
    }
    // submit the cart form.
    try {
      console.log('submit');
      await error.submitCartForm(this.productId);
    }
    catch (e) {
      console.error(e);
      this.error = e;
    }
  }
  componentDidLoad() {
    this.link = this.el.querySelector('a');
    this.updateProductLink();
    watchers.onChange(this.productId, () => this.updateProductLink());
  }
  updateProductLink() {
    var _a, _b;
    const checkoutUrl = (_b = (_a = window === null || window === void 0 ? void 0 : window.scData) === null || _a === void 0 ? void 0 : _a.pages) === null || _b === void 0 ? void 0 : _b.checkout;
    if (!checkoutUrl || !this.link)
      return;
    this.link.href = error.getProductBuyLink(this.productId, checkoutUrl, !this.addToCart ? { no_cart: true } : {});
  }
  render() {
    var _a, _b;
    return (index.h(index.Host, { class: {
        'is-busy': ((_a = watchers.state[this.productId]) === null || _a === void 0 ? void 0 : _a.busy) && !!this.addToCart,
        'is-disabled': (_b = watchers.state[this.productId]) === null || _b === void 0 ? void 0 : _b.disabled,
        'is-sold-out': watchers.isProductOutOfStock(this.productId) && !watchers.isSelectedVariantMissing(this.productId),
        'is-unavailable': watchers.isSelectedVariantMissing(this.productId),
      }, onClick: e => this.handleCartClick(e) }, !!this.error && (index.h("sc-alert", { onClick: event => {
        event.stopPropagation();
      }, type: "danger", scrollOnOpen: true, open: !!this.error, closable: false }, !!error.getTopLevelError(this.error) && index.h("span", { slot: "title", innerHTML: error.getTopLevelError(this.error) }), (error.getAdditionalErrorMessages(this.error) || []).map((message, index$1) => (index.h("div", { innerHTML: message, key: index$1 }))))), index.h("slot", null)));
  }
  get el() { return index.getElement(this); }
};
ScProductBuyButton.style = scProductBuyButtonCss;

exports.sc_product_buy_button = ScProductBuyButton;

//# sourceMappingURL=sc-product-buy-button.cjs.entry.js.map