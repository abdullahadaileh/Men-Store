'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const fetch = require('./fetch-2dba325c.js');
const addQueryArgs = require('./add-query-args-17c551b6.js');

const scDownloadsListCss = ":host{display:block}.purchase{display:flex;flex-direction:column;gap:var(--sc-spacing-large)}.single-download .single-download__preview{display:flex;align-items:center;justify-content:center;background:var(--sc-color-gray-200);border-radius:var(--sc-border-radius-small);height:4rem;min-width:4rem;width:4rem}";

const ScDownloadsList = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.renderFileExt = download => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      if ((_a = download === null || download === void 0 ? void 0 : download.media) === null || _a === void 0 ? void 0 : _a.filename) {
        return (_e = (_d = (_c = (_b = download.media.filename).split) === null || _c === void 0 ? void 0 : _c.call(_b, '.')) === null || _d === void 0 ? void 0 : _d.pop) === null || _e === void 0 ? void 0 : _e.call(_d);
      }
      if (download === null || download === void 0 ? void 0 : download.url) {
        try {
          const url = new URL(download.url);
          if (url.pathname.includes('.')) {
            return (_j = (_h = (_g = (_f = url.pathname).split) === null || _g === void 0 ? void 0 : _g.call(_f, '.')) === null || _h === void 0 ? void 0 : _h.pop) === null || _j === void 0 ? void 0 : _j.call(_h);
          }
        }
        catch (err) {
          console.error(err);
        }
      }
      return index.h("sc-icon", { name: "file" });
    };
    this.downloads = undefined;
    this.customerId = undefined;
    this.heading = undefined;
    this.busy = undefined;
    this.error = undefined;
  }
  async downloadItem(download) {
    var _a, _b;
    if (download === null || download === void 0 ? void 0 : download.url) {
      this.downloadFile(download.url, (_a = download === null || download === void 0 ? void 0 : download.name) !== null && _a !== void 0 ? _a : 'file');
      return;
    }
    const mediaId = (_b = download === null || download === void 0 ? void 0 : download.media) === null || _b === void 0 ? void 0 : _b.id;
    if (!mediaId)
      return;
    try {
      this.busy = mediaId;
      const media = (await fetch.apiFetch({
        path: addQueryArgs.addQueryArgs(`surecart/v1/customers/${this.customerId}/expose/${mediaId}`, {
          expose_for: 60,
        }),
      }));
      if (!(media === null || media === void 0 ? void 0 : media.url)) {
        throw {
          message: wp.i18n.__('Could not download the file.', 'surecart'),
        };
      }
      this.downloadFile(media === null || media === void 0 ? void 0 : media.url, media.filename);
    }
    catch (e) {
      console.error(e);
      this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
    }
    finally {
      this.busy = null;
    }
  }
  downloadFile(path, filename) {
    // Create a new link
    const anchor = document.createElement('a');
    anchor.href = path;
    anchor.download = filename;
    // Append to the DOM
    document.body.appendChild(anchor);
    // Trigger `click` event
    anchor.click();
    // To make this work on Firefox we need to wait
    // a little while before removing it.
    setTimeout(() => {
      document.body.removeChild(anchor);
    }, 0);
  }
  render() {
    const downloads = this.downloads || [];
    return (index.h("sc-dashboard-module", { class: "purchase", part: "base", heading: wp.i18n.__('Downloads', 'surecart') }, index.h("span", { slot: "heading" }, index.h("slot", { name: "heading" }, this.heading || wp.i18n.__('Downloads', 'surecart'))), index.h("sc-card", { "no-padding": true }, index.h("sc-stacked-list", null, downloads.map(download => {
      var _a, _b, _c, _d;
      const media = download === null || download === void 0 ? void 0 : download.media;
      return (index.h("sc-stacked-list-row", { style: { '--columns': '1' } }, index.h("sc-flex", { class: "single-download", justifyContent: "flex-start", alignItems: "center" }, index.h("div", { class: "single-download__preview" }, this.renderFileExt(download)), index.h("div", null, index.h("div", null, index.h("strong", null, (_b = (_a = media === null || media === void 0 ? void 0 : media.filename) !== null && _a !== void 0 ? _a : download === null || download === void 0 ? void 0 : download.name) !== null && _b !== void 0 ? _b : '')), index.h("sc-flex", { justifyContent: "flex-start", alignItems: "center", style: { gap: '0.5em' } }, (media === null || media === void 0 ? void 0 : media.byte_size) && index.h("sc-format-bytes", { value: media.byte_size }), !!((_c = media === null || media === void 0 ? void 0 : media.release_json) === null || _c === void 0 ? void 0 : _c.version) && (index.h("sc-tag", { type: "primary", size: "small", style: {
          '--sc-tag-primary-background-color': '#f3e8ff',
          '--sc-tag-primary-color': '#6b21a8',
        } }, "v", (_d = media === null || media === void 0 ? void 0 : media.release_json) === null || _d === void 0 ? void 0 :
        _d.version))))), index.h("sc-button", { size: "small", slot: "suffix", onClick: () => this.downloadItem(download), busy: (media === null || media === void 0 ? void 0 : media.id) ? this.busy == (media === null || media === void 0 ? void 0 : media.id) : false, disabled: (media === null || media === void 0 ? void 0 : media.id) ? this.busy == (media === null || media === void 0 ? void 0 : media.id) : false }, wp.i18n.__('Download', 'surecart'))));
    })))));
  }
};
ScDownloadsList.style = scDownloadsListCss;

exports.sc_downloads_list = ScDownloadsList;

//# sourceMappingURL=sc-downloads-list.cjs.entry.js.map