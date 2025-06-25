console.log("preloader", window.CONST);

if (window.CONST && window.CONST.CDN_URL) {
  // eslint-disable-next-line
  __webpack_public_path__ = window.CONST.CDN_URL + "/";
}

window.callMobileEventListener = function (options) {
  console.log("callMobileEventListener", options);
};
window.parent.postMessage("BootVueApp", "*");

try {
  window.localStorage.getItem;
} catch (e) {
  console.error("localStorage not accible but its ok", e);

  window.localStorage = {
    getItem(key) {
      return window.localStorageFallback?.getItem(key);
    },
    setItem(k, v) {
      return window.localStorageFallback?.setitem(k, v);
    },
  };
}

try {
  let VUE_APP_VERSION = process.env?.VUE_APP_VERSION;
  let VUE_APP_TIMESTAMP = process.env?.VUE_APP_TIMESTAMP;

  console.log(`
	################################# CDN DETAILS #################################
	APP :: ${"default"}
	VERSION :: ${VUE_APP_VERSION || "-"}
	BUILD TIME :: ${VUE_APP_TIMESTAMP ? new Date(Number(VUE_APP_TIMESTAMP)) : "-"}
	###############################################################################
`);
} catch (error) {
  console.error(error);
}

window.localCDN = function () {
  let context = window.CONST.CONTEXT || window.CONST.APP_CONTEXT || "/";
  document.cookie = `CDN_URL=${btoa("http://127.0.0.1:8080")};path=` + context;
  document.cookie =
    `BOOTJX_CDN_URL=${btoa("http://127.0.0.1:8080")};path=` + context;
};
