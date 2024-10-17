import { r as registerInstance, h } from './index-644f5478.js';

const scVisuallyHiddenCss = ":host(:not(:focus-within)){position:absolute !important;width:1px !important;height:1px !important;clip:rect(0 0 0 0) !important;clip-path:inset(50%) !important;border:none !important;overflow:hidden !important;white-space:nowrap !important;padding:0 !important}";

const ScVisuallyHidden = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return h("slot", null);
  }
};
ScVisuallyHidden.style = scVisuallyHiddenCss;

export { ScVisuallyHidden as sc_visually_hidden };

//# sourceMappingURL=sc-visually-hidden.entry.js.map