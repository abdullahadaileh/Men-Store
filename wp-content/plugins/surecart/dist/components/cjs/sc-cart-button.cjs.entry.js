'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const mutations = require('./mutations-164b66b1.js');
require('./index-00f0fc21.js');
require('./utils-a086ed6e.js');
require('./get-query-arg-53bf21e2.js');
require('./add-query-args-17c551b6.js');
require('./index-fb76df07.js');
require('./google-62bdaeea.js');
require('./currency-ba038e2f.js');
require('./price-f1f1114d.js');

const scCartButtonCss = ":host{display:inline-block;vertical-align:middle;line-height:1}::slotted(*){display:block !important;line-height:1}.cart__button{padding:0 4px;height:100%;display:grid;align-items:center}.cart__content{position:relative}.cart__count{box-sizing:border-box;position:absolute;inset:-12px -16px auto auto;text-align:center;font-size:10px;font-weight:bold;border-radius:var(--sc-cart-icon-counter-border-radius, 9999px);color:var(--sc-cart-icon-counter-color, var(--sc-color-primary-text, var(--sc-color-white)));background:var(--sc-cart-icon-counter-background, var(--sc-color-primary-500));box-shadow:var(--sc-cart-icon-box-shadow, var(--sc-shadow-x-large));padding:2px 6px;line-height:14px;min-width:14px;z-index:1}.cart__icon{font-size:var(--sc-cart-icon-size, 1.1em);cursor:pointer}.cart__icon sc-icon{display:block}";

const ScCartButton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.open = null;
    this.count = 0;
    this.formId = undefined;
    this.mode = 'live';
    this.cartMenuAlwaysShown = true;
    this.showEmptyCount = false;
  }
  /** Count the number of items in the cart. */
  getItemsCount() {
    var _a, _b;
    const items = (_b = (_a = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.line_items) === null || _b === void 0 ? void 0 : _b.data;
    let count = 0;
    (items || []).forEach(item => {
      count = count + (item === null || item === void 0 ? void 0 : item.quantity);
    });
    return count;
  }
  componentDidLoad() {
    this.link = this.el.closest('a');
    // this is to keep the structure that WordPress expects for theme styling.
    this.link.addEventListener('click', e => {
      e.preventDefault();
      e.stopImmediatePropagation();
      mutations.store.state.cart = { ...mutations.store.state.cart, open: !mutations.store.state.cart.open };
      return false;
    });
    // maybe hide the parent <a> if there are no items in the cart.
    this.handleParentLinkDisplay();
    mutations.onChange$1(this.mode, () => this.handleParentLinkDisplay());
  }
  handleParentLinkDisplay() {
    this.link.style.display = !this.cartMenuAlwaysShown && !this.getItemsCount() ? 'none' : null;
  }
  render() {
    return (index.h(index.Host, { tabindex: 0, role: "button", "aria-label": wp.i18n.sprintf(wp.i18n.__('Open Cart Menu Icon with %d items.', 'surecart'), this.getItemsCount()), onKeyDown: e => {
        if ('Enter' === (e === null || e === void 0 ? void 0 : e.code) || 'Space' === (e === null || e === void 0 ? void 0 : e.code)) {
          mutations.store.state.cart = { ...mutations.store.state.cart, open: !mutations.store.state.cart.open };
          e.preventDefault();
        }
      } }, index.h("div", { class: "cart__button", part: "base" }, index.h("div", { class: "cart__content" }, (this.showEmptyCount || !!this.getItemsCount()) && (index.h("span", { class: "cart__count", part: "count" }, this.getItemsCount())), index.h("div", { class: "cart__icon" }, index.h("slot", null))))));
  }
  get el() { return index.getElement(this); }
};
ScCartButton.style = scCartButtonCss;

exports.sc_cart_button = ScCartButton;

//# sourceMappingURL=sc-cart-button.cjs.entry.js.map