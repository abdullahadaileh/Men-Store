'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const fetch = require('./fetch-2dba325c.js');
require('./add-query-args-17c551b6.js');

const scWordpressUserEditCss = ":host{display:block;position:relative}.customer-details{display:grid;gap:0.75em}";

const ScWordPressUserEdit = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.heading = undefined;
    this.successUrl = undefined;
    this.user = undefined;
    this.loading = undefined;
    this.error = undefined;
  }
  renderEmpty() {
    return index.h("slot", { name: "empty" }, wp.i18n.__('User not found.', 'surecart'));
  }
  async handleSubmit(e) {
    this.loading = true;
    try {
      const { email, first_name, last_name, name } = await e.target.getFormJson();
      await fetch.apiFetch({
        path: `wp/v2/users/me`,
        method: 'PATCH',
        data: {
          first_name,
          last_name,
          email,
          name,
        },
      });
      if (this.successUrl) {
        window.location.assign(this.successUrl);
      }
      else {
        this.loading = false;
      }
    }
    catch (e) {
      this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
      this.loading = false;
    }
  }
  render() {
    var _a, _b, _c, _d;
    return (index.h("sc-dashboard-module", { class: "account-details", error: this.error }, index.h("span", { slot: "heading" }, this.heading || wp.i18n.__('Account Details', 'surecart'), " "), index.h("sc-card", null, index.h("sc-form", { onScFormSubmit: e => this.handleSubmit(e) }, index.h("sc-input", { label: wp.i18n.__('Account Email', 'surecart'), name: "email", value: (_a = this.user) === null || _a === void 0 ? void 0 : _a.email, required: true }), index.h("sc-columns", { style: { '--sc-column-spacing': 'var(--sc-spacing-medium)' } }, index.h("sc-column", null, index.h("sc-input", { label: wp.i18n.__('First Name', 'surecart'), name: "first_name", value: (_b = this.user) === null || _b === void 0 ? void 0 : _b.first_name })), index.h("sc-column", null, index.h("sc-input", { label: wp.i18n.__('Last Name', 'surecart'), name: "last_name", value: (_c = this.user) === null || _c === void 0 ? void 0 : _c.last_name }))), index.h("sc-input", { label: wp.i18n.__('Display Name', 'surecart'), name: "name", value: (_d = this.user) === null || _d === void 0 ? void 0 : _d.display_name }), index.h("div", null, index.h("sc-button", { type: "primary", full: true, submit: true }, wp.i18n.__('Save', 'surecart'))))), this.loading && index.h("sc-block-ui", { spinner: true })));
  }
};
ScWordPressUserEdit.style = scWordpressUserEditCss;

exports.sc_wordpress_user_edit = ScWordPressUserEdit;

//# sourceMappingURL=sc-wordpress-user-edit.cjs.entry.js.map