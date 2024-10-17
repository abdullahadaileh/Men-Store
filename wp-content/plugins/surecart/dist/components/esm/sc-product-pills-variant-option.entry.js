import { r as registerInstance, h, F as Fragment } from './index-644f5478.js';
import { s as state, e as isOptionSoldOut, h as isOptionMissing, b as setProduct } from './watchers-5af31452.js';
import './index-1046c77e.js';
import './google-ee26bba4.js';
import './currency-728311ef.js';
import './google-357f4c4c.js';
import './utils-00526fde.js';
import './util-64ee5262.js';
import './index-c5a96d53.js';

const scProductPillsVariantOptionCss = ".sc-product-pills-variant-option__wrapper{display:flex;flex-wrap:wrap;gap:var(--sc-spacing-x-small)}";

const ScProductPillsVariantOption = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.label = undefined;
    this.optionNumber = 1;
    this.productId = undefined;
  }
  render() {
    return (h("sc-form-control", { label: this.label }, h("span", { slot: "label" }, this.label), h("div", { class: "sc-product-pills-variant-option__wrapper" }, (state[this.productId].variant_options[this.optionNumber - 1].values || []).map(value => {
      const isUnavailable = isOptionSoldOut(this.productId, this.optionNumber, value) || isOptionMissing(this.productId, this.optionNumber, value);
      return (h("sc-pill-option", { isUnavailable: isUnavailable, isSelected: state[this.productId].variantValues[`option_${this.optionNumber}`] === value, onClick: () => setProduct(this.productId, {
          variantValues: {
            ...state[this.productId].variantValues,
            [`option_${this.optionNumber}`]: value,
          },
        }) }, h("span", { "aria-hidden": "true" }, value), h("sc-visually-hidden", null, wp.i18n.sprintf(wp.i18n.__('Select %s: %s.', 'surecart'), this.label, value), isUnavailable && h(Fragment, null, " ", wp.i18n.__('(option unavailable)', 'surecart')), state[this.productId].variantValues[`option_${this.optionNumber}`] === value && h(Fragment, null, " ", wp.i18n.__('This option is currently selected.', 'surecart')))));
    }))));
  }
};
ScProductPillsVariantOption.style = scProductPillsVariantOptionCss;

export { ScProductPillsVariantOption as sc_product_pills_variant_option };

//# sourceMappingURL=sc-product-pills-variant-option.entry.js.map