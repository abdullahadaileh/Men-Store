'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const consumer = require('./consumer-21fdeb72.js');

const scOrderManualInstructionsCss = ":host{display:block}";

const ScOrderManualInstructions = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.manualPaymentTitle = undefined;
    this.manualPaymentInstructions = undefined;
  }
  render() {
    if (!this.manualPaymentInstructions || !this.manualPaymentTitle) {
      return index.h(index.Host, { style: { display: 'none' } });
    }
    return (index.h("sc-alert", { type: "info", open: true }, index.h("span", { slot: "title" }, this.manualPaymentTitle), index.h("div", { innerHTML: this.manualPaymentInstructions })));
  }
};
consumer.openWormhole(ScOrderManualInstructions, ['manualPaymentTitle', 'manualPaymentInstructions'], false);
ScOrderManualInstructions.style = scOrderManualInstructionsCss;

exports.sc_order_manual_instructions = ScOrderManualInstructions;

//# sourceMappingURL=sc-order-manual-instructions.cjs.entry.js.map