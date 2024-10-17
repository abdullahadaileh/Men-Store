'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const watchers = require('./watchers-51b054bd.js');
require('./index-00f0fc21.js');
require('./google-55083ae7.js');
require('./currency-ba038e2f.js');
require('./google-62bdaeea.js');
require('./utils-a086ed6e.js');
require('./util-efd68af1.js');
require('./index-fb76df07.js');

const scProductTextCss = ":host{display:block}p{margin-block-start:0;margin-block-end:1em}";

const ScProductText = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.text = 'name';
    this.productId = undefined;
  }
  render() {
    var _a;
    const product = (_a = watchers.state[this.productId]) === null || _a === void 0 ? void 0 : _a.product;
    if (product === null || product === void 0 ? void 0 : product[this.text]) {
      return index.h("span", { style: { whiteSpace: 'pre-line' }, innerHTML: product[this.text] });
    }
    return (index.h(index.Host, null, index.h("slot", null)));
  }
};
ScProductText.style = scProductTextCss;

exports.sc_product_text = ScProductText;

//# sourceMappingURL=sc-product-text.cjs.entry.js.map