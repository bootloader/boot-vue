import Vue from "vue";

import BootRouter from "./BootRouter";
import AppWrapper from "./AppWrapper";

export default function Bootloader(appConfig) {
  let configs = {};
  this.map = function (...apps) {
    if (apps) {
      apps.map(function (app) {
        configs[app.name || "default"] = app;
      });
    }
    return this;
  };

  for(let key in appConfig.apps){
    let app = appConfig.apps[key];
    app.name = key;
    this.map(app)
  }

  this.getApp = function(appName){
    return configs[appName];
  }

  let MODULES = {};
  this.modules = function (modules) {
    MODULES = {
      ...modules,
    };
    return this;
  };

  this.mount = function (appName, site = "") {
    appName = appName || appConfig.getAppName()
    var config = configs[appName] || configs.dev;
    if (config?.alias) {
      appName = config.alias;
      config = configs[appName];
    }
    console.log("App", appName, config);
    if (!config) {
      throw `Connot Find App(${appName}:${site})`;
    }

    const appPath = "default" == appName ? "app" : `app-${appName}`;
    const appComponent = "default" == appName ? "app" : `app-${appName}`;

    if (typeof config.beforeLoad == "function") {
      config.beforeLoad();
    }

    Vue.component(`${appPath}`, config.component);
    console.log(`@/${appPath}${site}/router`);
    import(`@/${appPath + site}/router`).then(function (router) {
      new Vue({
        el: "#app",
        //store,service,i18n,
        ...MODULES,
        router: BootRouter.router(router.default),
        template: `<AppWrapper app="${appComponent}"/>`,
        components: { AppWrapper },
      });
    });
  };
}
