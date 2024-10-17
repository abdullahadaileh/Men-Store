import { r as registerInstance, h, H as Host } from './index-644f5478.js';
import { s as state } from './watchers-5af31452.js';
import './index-1046c77e.js';
import './google-ee26bba4.js';
import './currency-728311ef.js';
import './google-357f4c4c.js';
import './utils-00526fde.js';
import './util-64ee5262.js';
import './index-c5a96d53.js';

const scProductTextCss = ":host{display:block}p{margin-block-start:0;margin-block-end:1em}";

const ScProductText = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.text = 'name';
    this.productId = undefined;
  }
  render() {
    var _a;
    const product = (_a = state[this.productId]) === null || _a === void 0 ? void 0 : _a.product;
    if (product === null || product === void 0 ? void 0 : product[this.text]) {
      return h("span", { style: { whiteSpace: 'pre-line' }, innerHTML: product[this.text] });
    }
    return (h(Host, null, h("slot", null)));
  }
};
ScProductText.style = scProductTextCss;

export { ScProductText as sc_product_text };

//# sourceMappingURL=sc-product-text.entry.js.map