'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const addQueryArgs = require('./add-query-args-17c551b6.js');

const scPurchaseDownloadsListCss = ":host{display:block}.download__details{opacity:0.75}";

const ScPurchaseDownloadsList = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.allLink = undefined;
    this.heading = undefined;
    this.busy = undefined;
    this.loading = undefined;
    this.requestNonce = undefined;
    this.error = undefined;
    this.purchases = [];
  }
  renderEmpty() {
    return (index.h("div", null, index.h("sc-divider", { style: { '--spacing': '0' } }), index.h("slot", { name: "empty" }, index.h("sc-empty", { icon: "download" }, wp.i18n.__("You don't have any downloads.", 'surecart')))));
  }
  renderLoading() {
    return (index.h("sc-card", { "no-padding": true, style: { '--overflow': 'hidden' } }, index.h("sc-stacked-list", null, index.h("sc-stacked-list-row", { style: { '--columns': '2' }, "mobile-size": 0 }, index.h("div", { style: { padding: '0.5em' } }, index.h("sc-skeleton", { style: { width: '30%', marginBottom: '0.75em' } }), index.h("sc-skeleton", { style: { width: '20%' } }))))));
  }
  renderList() {
    return this.purchases.map(purchase => {
      var _a, _b, _c;
      const downloads = (_b = (_a = purchase === null || purchase === void 0 ? void 0 : purchase.product) === null || _a === void 0 ? void 0 : _a.downloads) === null || _b === void 0 ? void 0 : _b.data.filter((d) => !d.archived);
      const mediaBytesList = (downloads || []).map(item => { var _a; return ((item === null || item === void 0 ? void 0 : item.media) ? (_a = item === null || item === void 0 ? void 0 : item.media) === null || _a === void 0 ? void 0 : _a.byte_size : 0); });
      const mediaByteTotalSize = mediaBytesList.reduce((prev, curr) => prev + curr, 0);
      return (index.h("sc-stacked-list-row", { href: !(purchase === null || purchase === void 0 ? void 0 : purchase.revoked)
          ? addQueryArgs.addQueryArgs(window.location.href, {
            action: 'show',
            model: 'download',
            id: purchase.id,
            nonce: this.requestNonce,
          })
          : null, key: purchase.id, "mobile-size": 0 }, index.h("sc-spacing", { style: {
          '--spacing': 'var(--sc-spacing-xx--small)',
        } }, index.h("div", null, index.h("strong", null, (_c = purchase === null || purchase === void 0 ? void 0 : purchase.product) === null || _c === void 0 ? void 0 : _c.name)), index.h("div", { class: "download__details" }, wp.i18n.sprintf(wp.i18n._n('%s file', '%s files', downloads === null || downloads === void 0 ? void 0 : downloads.length, 'surecart'), downloads === null || downloads === void 0 ? void 0 : downloads.length), !!mediaByteTotalSize && (index.h(index.Fragment, null, ' ', "\u2022 ", index.h("sc-format-bytes", { value: mediaByteTotalSize }))))), index.h("sc-icon", { name: "chevron-right", slot: "suffix" })));
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
    return (index.h("sc-card", { "no-padding": true, style: { '--overflow': 'hidden' } }, index.h("sc-stacked-list", null, this.renderList())));
  }
  render() {
    return (index.h("sc-dashboard-module", { class: "downloads-list", error: this.error }, index.h("span", { slot: "heading" }, index.h("slot", { name: "heading" }, this.heading || wp.i18n.__('Items', 'surecart'))), index.h("slot", { name: "before" }), !!this.allLink && (index.h("sc-button", { type: "link", href: this.allLink, slot: "end" }, wp.i18n.__('View all', 'surecart'), index.h("sc-icon", { name: "chevron-right", slot: "suffix" }))), this.renderContent(), index.h("slot", { name: "after" }), this.busy && index.h("sc-block-ui", null)));
  }
  get el() { return index.getElement(this); }
};
ScPurchaseDownloadsList.style = scPurchaseDownloadsListCss;

exports.sc_purchase_downloads_list = ScPurchaseDownloadsList;

//# sourceMappingURL=sc-purchase-downloads-list.cjs.entry.js.map