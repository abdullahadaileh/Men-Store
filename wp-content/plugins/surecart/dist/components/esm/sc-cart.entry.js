import { r as registerInstance, h, F as Fragment, a as getElement } from './index-644f5478.js';
import { a as apiFetch } from './fetch-2525e763.js';
import { b as baseUrl, e as expand } from './index-d7508e37.js';
import { a as store, g as getCheckout, b as setCheckout, s as state, c as clearCheckout } from './mutations-b8f9af9f.js';
import { c as createErrorNotice } from './mutations-0a628afa.js';
import { u as updateFormState } from './mutations-8871d02a.js';
import { f as formBusy } from './getters-2c9ecd8c.js';
import { a as addQueryArgs } from './add-query-args-f4c5962b.js';
import './get-query-arg-cb6b8763.js';
import './index-1046c77e.js';
import './utils-00526fde.js';
import './index-c5a96d53.js';
import './google-357f4c4c.js';
import './currency-728311ef.js';
import './price-178c2e2b.js';
import './store-dde63d4d.js';

const scCartCss = ":host{--sc-drawer-header-spacing:var(--sc-spacing-large);--sc-drawer-body-spacing:var(--sc-spacing-large);--sc-drawer-footer-spacing:var(--sc-spacing-large)}.cart{font-size:16px}.cart__header{display:flex;align-items:center;justify-content:space-between;width:100%;font-size:1em}.cart__close{opacity:0.75;transition:opacity 0.25s ease;cursor:pointer}.cart__close:hover{opacity:1}::slotted(*){padding:var(--sc-drawer-header-spacing);background:var(--sc-panel-background-color);position:relative}::slotted(sc-line-items){flex:1 1 auto;overflow:auto;-webkit-overflow-scrolling:touch;min-height:200px}::slotted(:last-child){border-bottom:0 !important}sc-drawer::part(body){display:flex;flex-direction:column;box-sizing:border-box;padding:0;overflow:hidden}";

const ScCart = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
    store.set('cart', { ...store.state.cart, ...{ open: this.open } });
    if (this.open === true) {
      this.fetchOrder();
    }
    else {
      (_c = (_b = (_a = document === null || document === void 0 ? void 0 : document.querySelector('sc-cart-icon')) === null || _a === void 0 ? void 0 : _a.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('.cart')) === null || _c === void 0 ? void 0 : _c.focus();
    }
  }
  order() {
    return getCheckout(this.formId, this.mode);
  }
  setCheckout(data) {
    setCheckout(data, this.formId);
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
    const items = (_b = (_a = state.checkout) === null || _a === void 0 ? void 0 : _a.line_items) === null || _b === void 0 ? void 0 : _b.data;
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
    if (!((_a = state.checkout) === null || _a === void 0 ? void 0 : _a.id)) {
      return;
    }
    try {
      updateFormState('FETCH');
      state.checkout = (await apiFetch({
        method: 'GET',
        path: addQueryArgs(`${baseUrl}${(_b = state.checkout) === null || _b === void 0 ? void 0 : _b.id}`, {
          expand,
        }),
      }));
      updateFormState('RESOLVE');
    }
    catch (e) {
      console.error(e);
      updateFormState('REJECT');
      createErrorNotice(e);
      if ((e === null || e === void 0 ? void 0 : e.code) === 'checkout.not_found') {
        clearCheckout(this.formId, this.mode);
      }
    }
  }
  componentWillLoad() {
    this.open = !!store.state.cart.open;
    store.onChange('cart', cart => {
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
      empty: !((_c = (_b = (_a = state.checkout) === null || _a === void 0 ? void 0 : _a.line_items) === null || _b === void 0 ? void 0 : _b.pagination) === null || _c === void 0 ? void 0 : _c.count),
      order: state.checkout,
      lineItems: ((_e = (_d = state.checkout) === null || _d === void 0 ? void 0 : _d.line_items) === null || _e === void 0 ? void 0 : _e.data) || [],
      tax_status: (_f = state.checkout) === null || _f === void 0 ? void 0 : _f.tax_status,
      customerShippingAddress: typeof ((_g = state.checkout) === null || _g === void 0 ? void 0 : _g.customer) !== 'string' ? (_j = (_h = state.checkout) === null || _h === void 0 ? void 0 : _h.customer) === null || _j === void 0 ? void 0 : _j.shipping_address : {},
      shippingAddress: (_k = state.checkout) === null || _k === void 0 ? void 0 : _k.shipping_address,
      taxStatus: (_l = state.checkout) === null || _l === void 0 ? void 0 : _l.tax_status,
      formId: this.formId,
    };
  }
  render() {
    return (h("sc-cart-session-provider", null, h("sc-drawer", { open: this.open, onScAfterShow: () => (this.open = true), onScAfterHide: () => {
        this.open = false;
      } }, this.open === true && (h(Fragment, null, h("div", { class: "cart__header-suffix", slot: "header" }, h("slot", { name: "cart-header" }), h("sc-error", { style: { '--sc-alert-border-radius': '0' }, slot: "header" })), h("slot", null))), formBusy() && h("sc-block-ui", { "z-index": 9 }))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "open": ["handleOpenChange"]
  }; }
};
ScCart.style = scCartCss;

export { ScCart as sc_cart };

//# sourceMappingURL=sc-cart.entry.js.map