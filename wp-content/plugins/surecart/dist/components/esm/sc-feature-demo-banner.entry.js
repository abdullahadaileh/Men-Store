import { r as registerInstance, h } from './index-644f5478.js';

const scFeatureDemoBannerCss = ".sc-banner{background-color:var(--sc-color-brand-primary);color:white;display:flex;align-items:center;justify-content:center}.sc-banner>p{font-size:14px;line-height:1;margin:var(--sc-spacing-small)}.sc-banner>p a{color:inherit;font-weight:600;margin-left:10px;display:inline-flex;align-items:center;gap:8px;text-decoration:none;border-bottom:1px solid;padding-bottom:2px}";

const ScFeatureDemoBanner = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.url = 'https://app.surecart.com/plans';
    this.buttonText = wp.i18n.__('Upgrade Your Plan', 'surecart');
  }
  render() {
    return (h("div", { class: { 'sc-banner': true } }, h("p", null, h("slot", null, wp.i18n.__('This is a feature demo. In order to use it, you must upgrade your plan.', 'surecart')), h("a", { href: this.url, target: "_blank" }, h("slot", { name: "link" }, this.buttonText, " ", h("sc-icon", { name: "arrow-right" }))))));
  }
};
ScFeatureDemoBanner.style = scFeatureDemoBannerCss;

export { ScFeatureDemoBanner as sc_feature_demo_banner };

//# sourceMappingURL=sc-feature-demo-banner.entry.js.map