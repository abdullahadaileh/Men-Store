import { r as registerInstance, h, H as Host } from './index-644f5478.js';

const scSpacingCss = ":host{display:block}::slotted(*:not(:last-child)){margin-bottom:var(--spacing)}";

const ScSpacing = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, null, h("slot", null)));
  }
};
ScSpacing.style = scSpacingCss;

export { ScSpacing as sc_spacing };

//# sourceMappingURL=sc-spacing.entry.js.map