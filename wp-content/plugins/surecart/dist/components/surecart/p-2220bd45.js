import{b as i,s as o}from"./p-fc86253d.js";import{t as n}from"./p-24f06282.js";import{a as l}from"./p-58517bdd.js";import{a as d}from"./p-1c2e2695.js";const v=async d=>{var e,a,t,c,r,s;const v=o[d];if(v&&(null===(e=v.selectedPrice)||void 0===e?void 0:e.id)&&(!(null===(a=v.selectedPrice)||void 0===a?void 0:a.ad_hoc)||null!==v.adHocAmount&&void 0!==v.adHocAmount))try{i(d,{busy:!0}),await l({price:null===(t=v.selectedPrice)||void 0===t?void 0:t.id,quantity:Math.max((null===(c=v.selectedPrice)||void 0===c?void 0:c.ad_hoc)?1:v.quantity,1),...(null===(r=v.selectedPrice)||void 0===r?void 0:r.ad_hoc)?{ad_hoc_amount:v.adHocAmount}:{},variant:null===(s=v.selectedVariant)||void 0===s?void 0:s.id}),n(!0),i(d,{dialog:null})}catch(i){throw console.error(i),o.error=i,i}finally{i(d,{busy:!1})}},t=(i,e,a={})=>{var l,t,c,n,r,s,v;const u=o[i];if(u&&(null===(l=u.selectedPrice)||void 0===l?void 0:l.id)&&(!(null===(t=u.selectedPrice)||void 0===t?void 0:t.ad_hoc)||u.adHocAmount||0===u.adHocAmount))return d(e,{line_items:[{price:null===(c=u.selectedPrice)||void 0===c?void 0:c.id,quantity:Math.max((null===(n=u.selectedPrice)||void 0===n?void 0:n.ad_hoc)?1:u.quantity,1),...(null===(r=u.selectedPrice)||void 0===r?void 0:r.ad_hoc)?{ad_hoc_amount:u.adHocAmount}:{},...(null===(s=u.selectedVariant)||void 0===s?void 0:s.id)?{variant:null===(v=u.selectedVariant)||void 0===v?void 0:v.id}:{}}],...a})},r=o=>((null==o?void 0:o.additional_errors)||[]).map((o=>o.message)),u=o=>{var i;return"checkout.invalid"===(null==o?void 0:o.code)&&(null===(i=r(o))||void 0===i?void 0:i.length)?"":null==o?void 0:o.message};export{u as a,r as b,t as g,v as s};