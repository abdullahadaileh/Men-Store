import { r as registerInstance, c as createEvent, h, a as getElement } from './index-644f5478.js';
import { s as stopAnimations, g as getAnimation, a as animateTo, c as shimKeyframesHeightAuto, b as setDefaultAnimation } from './animation-registry-41d06a50.js';
import { i as isRtl } from './page-align-8602c4c7.js';
import { s as speak } from './index-c5a96d53.js';

const scToggleCss = ":host{display:block;font-family:var(--sc-font-sans);--sc-toggle-padding:var(--sc-spacing-medium)}::slotted([slot=summary]){display:flex;align-items:center;flex-direction:flex-start;gap:var(--sc-spacing-x-small)}.details{border-radius:var(--sc-border-radius-medium);background-color:var(--sc-toggle-background-color, var(--sc-color-white));overflow-anchor:none}.details__radio{flex:0 0 auto;position:relative;display:inline-flex;align-items:center;justify-content:center;background-color:var(--sc-input-background-color);color:transparent;border-radius:50%;border:solid var(--sc-toggle-border-width, var(--sc-input-border-width)) var(--sc-toggle-border-color, var(--sc-input-border-color));background-color:var(--sc-input-background-color);display:inline-flex;color:transparent;width:var(--sc-toggle-radio-size, var(--sc-radio-size));height:var(--sc-toggle-radio-size, var(--sc-radio-size));transition:var(--sc-input-transition, var(--sc-transition-medium)) border-color, var(--sc-input-transition, var(--sc-transition-medium)) background-color, var(--sc-input-transition, var(--sc-transition-medium)) color, var(--sc-input-transition, var(--sc-transition-medium)) box-shadow}.details__radio svg{width:100%;height:100%}.details--open .details__radio{color:var(--sc-color-white);border-color:var(--sc-color-primary-500);background-color:var(--sc-color-primary-500)}.details:not(.details--borderless){border:solid 1px var(--sc-toggle-border-color, var(--sc-color-gray-200))}.details--disabled{opacity:0.5}.details__header{display:flex;align-items:center;border-radius:inherit;padding:var(--sc-toggle-header-padding, var(--sc-toggle-padding));user-select:none;cursor:pointer;color:var(--sc-toggle-header-color, var(--sc-input-label-color));gap:0.75em}.details__header:focus{box-shadow:var(--sc-focus-ring)}.details__header:focus-visible{box-shadow:var(--sc-focus-ring)}.details--disabled .details__header{cursor:not-allowed}.details--disabled .details__header:focus-visible{outline:none;box-shadow:none}.details__summary{flex:1 1 auto;display:flex;align-items:center}.details__summary-icon{flex:0 0 auto;display:flex;align-items:center;transition:var(--sc-transition-medium) transform ease}.details--open .details__summary-icon{transform:rotate(90deg)}.details__content{padding:var(--sc-toggle-content-padding, var(--sc-toggle-padding));padding-top:calc(var(--sc-toggle-content-padding, var(--sc-toggle-padding)) / 4)}.details--shady .details__body{border-top:solid var(--sc-input-border-width) var(--sc-input-border-color);background:var(--sc-toggle-shady-color, var(--sc-color-gray-50))}.details--shady .details__content{padding-top:var(--sc-toggle-content-padding, var(--sc-toggle-padding))}";

const ScToggle = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.scShow = createEvent(this, "scShow", 7);
    this.scHide = createEvent(this, "scHide", 7);
    this.open = false;
    this.summary = undefined;
    this.disabled = false;
    this.borderless = false;
    this.shady = false;
    this.showControl = false;
    this.showIcon = true;
    this.collapsible = true;
  }
  componentDidLoad() {
    this.body.hidden = !this.open;
    this.body.style.height = this.open ? 'auto' : '0';
  }
  /** Shows the details. */
  async show() {
    if (this.open || this.disabled) {
      return undefined;
    }
    this.open = true;
    speak(wp.i18n.__('Summary Shown', 'surecart'));
  }
  /** Hides the details */
  async hide() {
    if (!this.open || this.disabled || !this.collapsible) {
      return undefined;
    }
    this.open = false;
    speak(wp.i18n.__('Summary Hidden', 'surecart'));
  }
  handleSummaryClick() {
    if (!this.disabled) {
      if (this.open) {
        this.hide();
      }
      else {
        this.show();
      }
      this.header.focus();
    }
  }
  handleSummaryKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (this.open) {
        this.hide();
      }
      else {
        this.show();
      }
    }
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      this.hide();
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      this.show();
    }
  }
  async handleOpenChange() {
    if (this.open) {
      this.scShow.emit();
      await stopAnimations(this.body);
      this.body.hidden = false;
      this.body.style.overflow = 'hidden';
      const { keyframes, options } = getAnimation(this.el, 'details.show');
      await animateTo(this.body, shimKeyframesHeightAuto(keyframes, this.body.scrollHeight), options);
      this.body.style.height = 'auto';
      this.body.style.overflow = 'visible';
    }
    else {
      this.scHide.emit();
      await stopAnimations(this.body);
      this.body.style.overflow = 'hidden';
      const { keyframes, options } = getAnimation(this.el, 'details.hide');
      await animateTo(this.body, shimKeyframesHeightAuto(keyframes, this.body.scrollHeight), options);
      this.body.hidden = true;
      this.body.style.height = 'auto';
      this.body.style.overflow = 'visible';
    }
  }
  render() {
    return (h("div", { part: "base", class: {
        'details': true,
        'details--open': this.open,
        'details--disabled': this.disabled,
        'details--borderless': this.borderless,
        'details--shady': this.shady,
        'details--is-rtl': isRtl(),
      } }, h("header", { ref: el => (this.header = el), part: "header", id: "header", class: "details__header", role: "button", "aria-expanded": this.open ? 'true' : 'false', "aria-controls": "content", "aria-disabled": this.disabled ? 'true' : 'false', tabindex: this.disabled ? '-1' : '0', onClick: () => this.handleSummaryClick(), onKeyDown: e => this.handleSummaryKeyDown(e) }, this.showControl && (h("span", { part: "radio", class: "details__radio" }, h("svg", { viewBox: "0 0 16 16" }, h("g", { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" }, h("g", { fill: "currentColor" }, h("circle", { cx: "8", cy: "8", r: "3.42857143" })))))), h("div", { part: "summary", class: "details__summary" }, h("slot", { name: "summary" }, this.summary)), this.showIcon && (h("span", { part: "summary-icon", class: "details__summary-icon" }, h("slot", { name: "icon" }, h("sc-icon", { name: "chevron-right" }))))), h("div", { class: "details__body", ref: el => (this.body = el), part: "body" }, h("div", { part: "content", id: "content", class: "details__content", role: "region", "aria-labelledby": "header" }, h("slot", null)))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "open": ["handleOpenChange"]
  }; }
};
setDefaultAnimation('details.show', {
  keyframes: [
    { height: '0', opacity: '0' },
    { height: 'auto', opacity: '1' },
  ],
  options: { duration: 250, easing: 'ease' },
});
setDefaultAnimation('details.hide', {
  keyframes: [
    { height: 'auto', opacity: '1' },
    { height: '0', opacity: '0' },
  ],
  options: { duration: 250, easing: 'ease' },
});
ScToggle.style = scToggleCss;

export { ScToggle as sc_toggle };

//# sourceMappingURL=sc-toggle.entry.js.map