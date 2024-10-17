'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');

const scVisuallyHiddenCss = ":host(:not(:focus-within)){position:absolute !important;width:1px !important;height:1px !important;clip:rect(0 0 0 0) !important;clip-path:inset(50%) !important;border:none !important;overflow:hidden !important;white-space:nowrap !important;padding:0 !important}";

const ScVisuallyHidden = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return index.h("slot", null);
  }
};
ScVisuallyHidden.style = scVisuallyHiddenCss;

exports.sc_visually_hidden = ScVisuallyHidden;

//# sourceMappingURL=sc-visually-hidden.cjs.entry.js.map