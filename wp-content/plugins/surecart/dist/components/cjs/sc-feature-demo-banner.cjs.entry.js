'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');

const scFeatureDemoBannerCss = ".sc-banner{background-color:var(--sc-color-brand-primary);color:white;display:flex;align-items:center;justify-content:center}.sc-banner>p{font-size:14px;line-height:1;margin:var(--sc-spacing-small)}.sc-banner>p a{color:inherit;font-weight:600;margin-left:10px;display:inline-flex;align-items:center;gap:8px;text-decoration:none;border-bottom:1px solid;padding-bottom:2px}";

const ScFeatureDemoBanner = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.url = 'https://app.surecart.com/plans';
    this.buttonText = wp.i18n.__('Upgrade Your Plan', 'surecart');
  }
  render() {
    return (index.h("div", { class: { 'sc-banner': true } }, index.h("p", null, index.h("slot", null, wp.i18n.__('This is a feature demo. In order to use it, you must upgrade your plan.', 'surecart')), index.h("a", { href: this.url, target: "_blank" }, index.h("slot", { name: "link" }, this.buttonText, " ", index.h("sc-icon", { name: "arrow-right" }))))));
  }
};
ScFeatureDemoBanner.style = scFeatureDemoBannerCss;

exports.sc_feature_demo_banner = ScFeatureDemoBanner;

//# sourceMappingURL=sc-feature-demo-banner.cjs.entry.js.map