import { r as registerInstance, c as createEvent, h, F as Fragment, a as getElement } from './index-644f5478.js';
import { g as getLineItemByPriceId } from './index-bc0c0045.js';
import { s as state } from './mutations-b8f9af9f.js';
import './index-1046c77e.js';
import './utils-00526fde.js';
import './get-query-arg-cb6b8763.js';
import './add-query-args-f4c5962b.js';
import './index-c5a96d53.js';
import './google-357f4c4c.js';
import './currency-728311ef.js';
import './price-178c2e2b.js';

const scPriceChoicesCss = "sc-price-choices{display:block;position:relative}sc-block-ui{z-index:9}";

const ScPriceChoices = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.scRemoveLineItem = createEvent(this, "scRemoveLineItem", 7);
    this.scUpdateLineItem = createEvent(this, "scUpdateLineItem", 7);
    this.label = undefined;
    this.columns = 1;
    this.required = true;
  }
  handleChange() {
    this.el.querySelectorAll('sc-price-choice').forEach(priceChoice => {
      var _a;
      const choice = priceChoice.querySelector('sc-choice') || priceChoice.querySelector('sc-choice-container');
      if (!(choice === null || choice === void 0 ? void 0 : choice.checked)) {
        this.scRemoveLineItem.emit({ price_id: priceChoice.priceId, quantity: priceChoice.quantity });
      }
      else {
        const lineItem = getLineItemByPriceId((_a = state.checkout) === null || _a === void 0 ? void 0 : _a.line_items, choice.value);
        this.scUpdateLineItem.emit({ price_id: priceChoice.priceId, quantity: (lineItem === null || lineItem === void 0 ? void 0 : lineItem.quantity) || (priceChoice === null || priceChoice === void 0 ? void 0 : priceChoice.quantity) || 1 });
      }
    });
  }
  render() {
    return (h(Fragment, null, h("sc-choices", { label: this.label, required: this.required, class: "loaded price-selector", style: { '--columns': this.columns.toString() } }, h("slot", null))));
  }
  get el() { return getElement(this); }
};
ScPriceChoices.style = scPriceChoicesCss;

export { ScPriceChoices as sc_price_choices };

//# sourceMappingURL=sc-price-choices.entry.js.map