import { r as registerInstance, h } from './index-644f5478.js';
import { a as apiFetch } from './fetch-2525e763.js';
import './add-query-args-f4c5962b.js';

const scWordpressUserEditCss = ":host{display:block;position:relative}.customer-details{display:grid;gap:0.75em}";

const ScWordPressUserEdit = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.heading = undefined;
    this.successUrl = undefined;
    this.user = undefined;
    this.loading = undefined;
    this.error = undefined;
  }
  renderEmpty() {
    return h("slot", { name: "empty" }, wp.i18n.__('User not found.', 'surecart'));
  }
  async handleSubmit(e) {
    this.loading = true;
    try {
      const { email, first_name, last_name, name } = await e.target.getFormJson();
      await apiFetch({
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
    return (h("sc-dashboard-module", { class: "account-details", error: this.error }, h("span", { slot: "heading" }, this.heading || wp.i18n.__('Account Details', 'surecart'), " "), h("sc-card", null, h("sc-form", { onScFormSubmit: e => this.handleSubmit(e) }, h("sc-input", { label: wp.i18n.__('Account Email', 'surecart'), name: "email", value: (_a = this.user) === null || _a === void 0 ? void 0 : _a.email, required: true }), h("sc-columns", { style: { '--sc-column-spacing': 'var(--sc-spacing-medium)' } }, h("sc-column", null, h("sc-input", { label: wp.i18n.__('First Name', 'surecart'), name: "first_name", value: (_b = this.user) === null || _b === void 0 ? void 0 : _b.first_name })), h("sc-column", null, h("sc-input", { label: wp.i18n.__('Last Name', 'surecart'), name: "last_name", value: (_c = this.user) === null || _c === void 0 ? void 0 : _c.last_name }))), h("sc-input", { label: wp.i18n.__('Display Name', 'surecart'), name: "name", value: (_d = this.user) === null || _d === void 0 ? void 0 : _d.display_name }), h("div", null, h("sc-button", { type: "primary", full: true, submit: true }, wp.i18n.__('Save', 'surecart'))))), this.loading && h("sc-block-ui", { spinner: true })));
  }
};
ScWordPressUserEdit.style = scWordpressUserEditCss;

export { ScWordPressUserEdit as sc_wordpress_user_edit };

//# sourceMappingURL=sc-wordpress-user-edit.entry.js.map