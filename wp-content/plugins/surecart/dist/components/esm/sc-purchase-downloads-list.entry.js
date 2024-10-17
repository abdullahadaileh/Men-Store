import { r as registerInstance, h, F as Fragment, a as getElement } from './index-644f5478.js';
import { a as addQueryArgs } from './add-query-args-f4c5962b.js';

const scPurchaseDownloadsListCss = ":host{display:block}.download__details{opacity:0.75}";

const ScPurchaseDownloadsList = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.allLink = undefined;
    this.heading = undefined;
    this.busy = undefined;
    this.loading = undefined;
    this.requestNonce = undefined;
    this.error = undefined;
    this.purchases = [];
  }
  renderEmpty() {
    return (h("div", null, h("sc-divider", { style: { '--spacing': '0' } }), h("slot", { name: "empty" }, h("sc-empty", { icon: "download" }, wp.i18n.__("You don't have any downloads.", 'surecart')))));
  }
  renderLoading() {
    return (h("sc-card", { "no-padding": true, style: { '--overflow': 'hidden' } }, h("sc-stacked-list", null, h("sc-stacked-list-row", { style: { '--columns': '2' }, "mobile-size": 0 }, h("div", { style: { padding: '0.5em' } }, h("sc-skeleton", { style: { width: '30%', marginBottom: '0.75em' } }), h("sc-skeleton", { style: { width: '20%' } }))))));
  }
  renderList() {
    return this.purchases.map(purchase => {
      var _a, _b, _c;
      const downloads = (_b = (_a = purchase === null || purchase === void 0 ? void 0 : purchase.product) === null || _a === void 0 ? void 0 : _a.downloads) === null || _b === void 0 ? void 0 : _b.data.filter((d) => !d.archived);
      const mediaBytesList = (downloads || []).map(item => { var _a; return ((item === null || item === void 0 ? void 0 : item.media) ? (_a = item === null || item === void 0 ? void 0 : item.media) === null || _a === void 0 ? void 0 : _a.byte_size : 0); });
      const mediaByteTotalSize = mediaBytesList.reduce((prev, curr) => prev + curr, 0);
      return (h("sc-stacked-list-row", { href: !(purchase === null || purchase === void 0 ? void 0 : purchase.revoked)
          ? addQueryArgs(window.location.href, {
            action: 'show',
            model: 'download',
            id: purchase.id,
            nonce: this.requestNonce,
          })
          : null, key: purchase.id, "mobile-size": 0 }, h("sc-spacing", { style: {
          '--spacing': 'var(--sc-spacing-xx--small)',
        } }, h("div", null, h("strong", null, (_c = purchase === null || purchase === void 0 ? void 0 : purchase.product) === null || _c === void 0 ? void 0 : _c.name)), h("div", { class: "download__details" }, wp.i18n.sprintf(wp.i18n._n('%s file', '%s files', downloads === null || downloads === void 0 ? void 0 : downloads.length, 'surecart'), downloads === null || downloads === void 0 ? void 0 : downloads.length), !!mediaByteTotalSize && (h(Fragment, null, ' ', "\u2022 ", h("sc-format-bytes", { value: mediaByteTotalSize }))))), h("sc-icon", { name: "chevron-right", slot: "suffix" })));
    });
  }
  renderContent() {
    var _a;
    if (this.loading) {
      return this.renderLoading();
    }
    if (((_a = this.purchases) === null || _a === void 0 ? void 0 : _a.length) === 0) {
      return this.renderEmpty();
    }
    return (h("sc-card", { "no-padding": true, style: { '--overflow': 'hidden' } }, h("sc-stacked-list", null, this.renderList())));
  }
  render() {
    return (h("sc-dashboard-module", { class: "downloads-list", error: this.error }, h("span", { slot: "heading" }, h("slot", { name: "heading" }, this.heading || wp.i18n.__('Items', 'surecart'))), h("slot", { name: "before" }), !!this.allLink && (h("sc-button", { type: "link", href: this.allLink, slot: "end" }, wp.i18n.__('View all', 'surecart'), h("sc-icon", { name: "chevron-right", slot: "suffix" }))), this.renderContent(), h("slot", { name: "after" }), this.busy && h("sc-block-ui", null)));
  }
  get el() { return getElement(this); }
};
ScPurchaseDownloadsList.style = scPurchaseDownloadsListCss;

export { ScPurchaseDownloadsList as sc_purchase_downloads_list };

//# sourceMappingURL=sc-purchase-downloads-list.entry.js.map