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

const scProductPillsVariantOptionCss = ".sc-product-pills-variant-option__wrapper{display:flex;flex-wrap:wrap;gap:var(--sc-spacing-x-small)}";

const ScProductPillsVariantOption = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.label = undefined;
    this.optionNumber = 1;
    this.productId = undefined;
  }
  render() {
    return (index.h("sc-form-control", { label: this.label }, index.h("span", { slot: "label" }, this.label), index.h("div", { class: "sc-product-pills-variant-option__wrapper" }, (watchers.state[this.productId].variant_options[this.optionNumber - 1].values || []).map(value => {
      const isUnavailable = watchers.isOptionSoldOut(this.productId, this.optionNumber, value) || watchers.isOptionMissing(this.productId, this.optionNumber, value);
      return (index.h("sc-pill-option", { isUnavailable: isUnavailable, isSelected: watchers.state[this.productId].variantValues[`option_${this.optionNumber}`] === value, onClick: () => watchers.setProduct(this.productId, {
          variantValues: {
            ...watchers.state[this.productId].variantValues,
            [`option_${this.optionNumber}`]: value,
          },
        }) }, index.h("span", { "aria-hidden": "true" }, value), index.h("sc-visually-hidden", null, wp.i18n.sprintf(wp.i18n.__('Select %s: %s.', 'surecart'), this.label, value), isUnavailable && index.h(index.Fragment, null, " ", wp.i18n.__('(option unavailable)', 'surecart')), watchers.state[this.productId].variantValues[`option_${this.optionNumber}`] === value && index.h(index.Fragment, null, " ", wp.i18n.__('This option is currently selected.', 'surecart')))));
    }))));
  }
};
ScProductPillsVariantOption.style = scProductPillsVariantOptionCss;

exports.sc_product_pills_variant_option = ScProductPillsVariantOption;

//# sourceMappingURL=sc-product-pills-variant-option.cjs.entry.js.map