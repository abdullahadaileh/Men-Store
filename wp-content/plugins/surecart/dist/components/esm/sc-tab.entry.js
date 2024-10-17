import { r as registerInstance, c as createEvent, h, a as getElement } from './index-644f5478.js';
import { i as isRtl } from './page-align-8602c4c7.js';

const scTabCss = ":host{display:block}.tab{font-family:var(--sc-font-sans);color:var(--sc-color-gray-600);display:flex;align-items:center;justify-content:flex-start;line-height:1;padding:var(--sc-spacing-small) var(--sc-spacing-small);font-size:var(--sc-font-size-medium);font-weight:var(--sc-font-weight-semibold);border-radius:var(--sc-border-radius-small);cursor:pointer;transition:color 0.35s ease, background-color 0.35s ease;user-select:none;text-decoration:none}.tab.tab--active,.tab:hover{color:var(--sc-tab-active-color, var(--sc-color-gray-900));background-color:var(--sc-tab-active-background, var(--sc-color-gray-100))}.tab.tab--disabled{cursor:not-allowed;color:var(--sc-color-gray-400)}.tab__content{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:var(--sc-line-height-dense)}.tab__prefix,.tab__suffix{flex:0 0 auto;display:flex;align-items:center}.tab__suffix{margin-left:auto}.tab__counter{background:var(--sc-color-gray-200);display:inline-block;padding:var(--sc-spacing-xx-small) var(--sc-spacing-small);border-radius:var(--sc-border-radius-pill);font-size:var(--sc-font-size-small);text-align:center;line-height:1;transition:color 0.35s ease, background-color 0.35s ease}.tab.tab--active .tab__counter,.tab:hover .tab__counter{background:var(--sc-color-white)}.tab--has-prefix{padding-left:var(--sc-spacing-small)}.tab--has-prefix .tab__content{padding-left:var(--sc-spacing-small)}.tab--has-suffix{padding-right:var(--sc-spacing-small)}.tab--has-suffix .tab__label{padding-right:var(--sc-spacing-small)}.tab--is-rtl.tab--has-prefix .tab__content{padding-left:0;padding-right:var(--sc-spacing-small)}";

let id = 0;
const ScTab = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.scClose = createEvent(this, "scClose", 7);
    this.componentId = `tab-${++id}`;
    this.panel = '';
    this.href = undefined;
    this.active = false;
    this.disabled = false;
    this.count = undefined;
    this.hasPrefix = false;
    this.hasSuffix = false;
  }
  /** Sets focus to the tab. */
  async triggerFocus(options) {
    this.tab.focus(options);
  }
  /** Removes focus from the tab. */
  async triggerBlur() {
    this.tab.blur();
  }
  handleSlotChange() {
    this.hasPrefix = !!this.el.querySelector('[slot="prefix"]');
    this.hasSuffix = !!this.el.querySelector('[slot="suffix"]');
  }
  render() {
    // If the user didn't provide an ID, we'll set one so we can link tabs and tab panels with aria labels
    this.el.id = this.el.id || this.componentId;
    const Tag = this.href ? 'a' : 'div';
    return (h(Tag, { part: `base ${this.active ? `active` : ``}`, href: this.href, class: {
        'tab': true,
        'tab--active': this.active,
        'tab--disabled': this.disabled,
        'tab--has-prefix': this.hasPrefix,
        'tab--has-suffix': this.hasSuffix,
        'tab--is-rtl': isRtl(),
      }, ref: el => (this.tab = el), role: "tab", "aria-disabled": this.disabled ? 'true' : 'false', "aria-selected": this.active ? 'true' : 'false', tabindex: this.disabled ? '-1' : '0' }, h("span", { part: "prefix", class: "tab__prefix" }, h("slot", { onSlotchange: () => this.handleSlotChange(), name: "prefix" })), h("div", { class: "tab__content", part: "content" }, h("slot", null)), h("span", { part: "suffix", class: "tab__suffix" }, h("slot", { onSlotchange: () => this.handleSlotChange(), name: "suffix" })), h("slot", { name: "suffix" }, !!this.count && (h("div", { class: "tab__counter", part: "counter" }, this.count)))));
  }
  get el() { return getElement(this); }
};
ScTab.style = scTabCss;

export { ScTab as sc_tab };

//# sourceMappingURL=sc-tab.entry.js.map