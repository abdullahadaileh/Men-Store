'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const fetch = require('./fetch-2dba325c.js');
const index$1 = require('./index-a9c75016.js');
const mutations = require('./mutations-164b66b1.js');
const mutations$2 = require('./mutations-8d7c4499.js');
const mutations$1 = require('./mutations-7113e932.js');
const getters = require('./getters-1e382cac.js');
const addQueryArgs = require('./add-query-args-17c551b6.js');
require('./get-query-arg-53bf21e2.js');
require('./index-00f0fc21.js');
require('./utils-a086ed6e.js');
require('./index-fb76df07.js');
require('./google-62bdaeea.js');
require('./currency-ba038e2f.js');
require('./price-f1f1114d.js');
require('./store-96a02d63.js');

const scCartCss = ":host{--sc-drawer-header-spacing:var(--sc-spacing-large);--sc-drawer-body-spacing:var(--sc-spacing-large);--sc-drawer-footer-spacing:var(--sc-spacing-large)}.cart{font-size:16px}.cart__header{display:flex;align-items:center;justify-content:space-between;width:100%;font-size:1em}.cart__close{opacity:0.75;transition:opacity 0.25s ease;cursor:pointer}.cart__close:hover{opacity:1}::slotted(*){padding:var(--sc-drawer-header-spacing);background:var(--sc-panel-background-color);position:relative}::slotted(sc-line-items){flex:1 1 auto;overflow:auto;-webkit-overflow-scrolling:touch;min-height:200px}::slotted(:last-child){border-bottom:0 !important}sc-drawer::part(body){display:flex;flex-direction:column;box-sizing:border-box;padding:0;overflow:hidden}";

const ScCart = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.open = null;
    this.formId = undefined;
    this.header = undefined;
    this.checkoutLink = undefined;
    this.cartTemplate = undefined;
    this.mode = 'live';
    this.checkoutUrl = undefined;
    this.alwaysShow = undefined;
    this.floatingIconEnabled = true;
    this.uiState = 'idle';
  }
  handleOpenChange() {
    var _a, _b, _c;
    mutations.store.set('cart', { ...mutations.store.state.cart, ...{ open: this.open } });
    if (this.open === true) {
      this.fetchOrder();
    }
    else {
      (_c = (_b = (_a = document === null || document === void 0 ? void 0 : document.querySelector('sc-cart-icon')) === null || _a === void 0 ? void 0 : _a.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('.cart')) === null || _c === void 0 ? void 0 : _c.focus();
    }
  }
  order() {
    return mutations.getCheckout(this.formId, this.mode);
  }
  setCheckout(data) {
    mutations.setCheckout(data, this.formId);
  }
  /**
   * Search for the sc-checkout component on a page to make sure
   * we don't show the cart on a checkout page.
   */
  pageHasForm() {
    return !!document.querySelector('sc-checkout');
  }
  /** Count the number of items in the cart. */
  getItemsCount() {
    var _a, _b;
    const items = (_b = (_a = mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.line_items) === null || _b === void 0 ? void 0 : _b.data;
    let count = 0;
    (items || []).forEach(item => {
      count = count + (item === null || item === void 0 ? void 0 : item.quantity);
    });
    return count;
  }
  handleSetState(e) {
    this.uiState = e.detail;
  }
  handleCloseCart() {
    this.open = false;
  }
  /** Fetch the order */
  async fetchOrder() {
    var _a, _b;
    if (!((_a = mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.id)) {
      return;
    }
    try {
      mutations$1.updateFormState('FETCH');
      mutations.state.checkout = (await fetch.apiFetch({
        method: 'GET',
        path: addQueryArgs.addQueryArgs(`${index$1.baseUrl}${(_b = mutations.state.checkout) === null || _b === void 0 ? void 0 : _b.id}`, {
          expand: index$1.expand,
        }),
      }));
      mutations$1.updateFormState('RESOLVE');
    }
    catch (e) {
      console.error(e);
      mutations$1.updateFormState('REJECT');
      mutations$2.createErrorNotice(e);
      if ((e === null || e === void 0 ? void 0 : e.code) === 'checkout.not_found') {
        mutations.clearCheckout(this.formId, this.mode);
      }
    }
  }
  componentWillLoad() {
    this.open = !!mutations.store.state.cart.open;
    mutations.store.onChange('cart', cart => {
      this.open = cart.open;
    });
  }
  state() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    return {
      uiState: this.uiState,
      checkoutLink: this.checkoutLink,
      loading: this.uiState === 'loading',
      busy: this.uiState === 'busy',
      navigating: this.uiState === 'navigating',
      empty: !((_c = (_b = (_a = mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.line_items) === null || _b === void 0 ? void 0 : _b.pagination) === null || _c === void 0 ? void 0 : _c.count),
      order: mutations.state.checkout,
      lineItems: ((_e = (_d = mutations.state.checkout) === null || _d === void 0 ? void 0 : _d.line_items) === null || _e === void 0 ? void 0 : _e.data) || [],
      tax_status: (_f = mutations.state.checkout) === null || _f === void 0 ? void 0 : _f.tax_status,
      customerShippingAddress: typeof ((_g = mutations.state.checkout) === null || _g === void 0 ? void 0 : _g.customer) !== 'string' ? (_j = (_h = mutations.state.checkout) === null || _h === void 0 ? void 0 : _h.customer) === null || _j === void 0 ? void 0 : _j.shipping_address : {},
      shippingAddress: (_k = mutations.state.checkout) === null || _k === void 0 ? void 0 : _k.shipping_address,
      taxStatus: (_l = mutations.state.checkout) === null || _l === void 0 ? void 0 : _l.tax_status,
      formId: this.formId,
    };
  }
  render() {
    return (index.h("sc-cart-session-provider", null, index.h("sc-drawer", { open: this.open, onScAfterShow: () => (this.open = true), onScAfterHide: () => {
        this.open = false;
      } }, this.open === true && (index.h(index.Fragment, null, index.h("div", { class: "cart__header-suffix", slot: "header" }, index.h("slot", { name: "cart-header" }), index.h("sc-error", { style: { '--sc-alert-border-radius': '0' }, slot: "header" })), index.h("slot", null))), getters.formBusy() && index.h("sc-block-ui", { "z-index": 9 }))));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "open": ["handleOpenChange"]
  }; }
};
ScCart.style = scCartCss;

exports.sc_cart = ScCart;

//# sourceMappingURL=sc-cart.cjs.entry.js.map