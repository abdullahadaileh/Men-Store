import { r as registerInstance, h } from './index-644f5478.js';

const scBadgeNoticeCss = ":host{display:block}.notice{background:var(--sc-badge-notice-background-color, var(--sc-color-white));color:var(--sc-badge-notice-text-color, var(--sc-color-gray-950));border:solid 1px var(--sc-badge-notice-border-color, var(--sc-color-white));border-radius:var(--sc-border-radius-small);padding:var(--sc-spacing-small);font-size:var(--sc-font-size-x-small);display:flex;gap:0.5em;line-height:1}.notice--warning{background:var(--sc-color-warning-50);color:var(--sc-color-warning-700)}";

const ScBadgeNotice = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.type = 'primary';
    this.label = undefined;
    this.size = 'small';
  }
  render() {
    return (h("div", { class: {
        'notice': true,
        'notice--is-small': this.size === 'small',
        'notice--is-medium': this.size === 'medium',
        'notice--is-large': this.size === 'large',
        'notice--primary': this.type === 'primary',
        'notice--success': this.type === 'success',
        'notice--warning': this.type === 'warning',
        'notice--danger': this.type === 'danger',
        'notice--default': this.type === 'default',
      } }, h("sc-tag", { size: this.size, type: this.type }, this.label), h("slot", null)));
  }
};
ScBadgeNotice.style = scBadgeNoticeCss;

export { ScBadgeNotice as sc_badge_notice };

//# sourceMappingURL=sc-badge-notice.entry.js.map