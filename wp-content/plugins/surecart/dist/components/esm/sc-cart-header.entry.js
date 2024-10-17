import { r as registerInstance, c as createEvent, h } from './index-644f5478.js';
import { s as state } from './mutations-b8f9af9f.js';
import './index-1046c77e.js';
import './utils-00526fde.js';
import './get-query-arg-cb6b8763.js';
import './add-query-args-f4c5962b.js';
import './index-c5a96d53.js';
import './google-357f4c4c.js';
import './currency-728311ef.js';
import './price-178c2e2b.js';

const scCartHeaderCss = ".cart-header{display:flex;align-items:center;justify-content:space-between;width:100%;font-size:1em}.cart-title{text-align:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0 var(--sc-spacing-small)}.cart__close{cursor:pointer}";

const ScCartHeader = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.scCloseCart = createEvent(this, "scCloseCart", 7);
  }
  /** Count the number of items in the cart. */
  getItemsCount() {
    var _a, _b;
    const items = ((_b = (_a = state.checkout) === null || _a === void 0 ? void 0 : _a.line_items) === null || _b === void 0 ? void 0 : _b.data) || [];
    let count = 0;
    items.forEach(item => {
      count = count + (item === null || item === void 0 ? void 0 : item.quantity);
    });
    return count;
  }
  render() {
    var _a;
    return (h("div", { class: "cart-header" }, h("sc-icon", { class: "cart__close", name: "arrow-right", onClick: () => this.scCloseCart.emit(), onKeyDown: e => {
        if ('Enter' === (e === null || e === void 0 ? void 0 : e.code) || 'Space' === (e === null || e === void 0 ? void 0 : e.code)) {
          this.scCloseCart.emit();
        }
      }, tabIndex: 0, role: "button", "aria-label": wp.i18n.__('Close Cart', 'surecart') }), h("div", { class: "cart-title" }, h("slot", null)), h("sc-tag", { size: "small" }, ((_a = this === null || this === void 0 ? void 0 : this.getItemsCount) === null || _a === void 0 ? void 0 : _a.call(this)) || 0)));
  }
};
ScCartHeader.style = scCartHeaderCss;

export { ScCartHeader as sc_cart_header };

//# sourceMappingURL=sc-cart-header.entry.js.map