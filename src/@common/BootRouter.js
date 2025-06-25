import { createRouter, createWebHistory } from "vue-router";
import AppConfig from "./AppConfig";

export default {
  _inst_: null,
  instance() {
    return this._inst_;
  },

  options: {},
  route: function (options) {
    let appName = AppConfig.config().getAppName();
    console.log("[BootRouter] route →", { appName });

    if (options.app == appName) {
      this.options = options;
    }

    return { options };
  },

  router: function (_router) {
    const appName = AppConfig.config().getAppName();
    const options = this.options;
    console.log("[BootRouter] router →", { appName, options });

    const router = createRouter({
      history: createWebHistory(options.base || "/"),
      scrollBehavior:
        options.scrollBehavior ||
        (() => ({ left: 0, top: 0, behavior: "smooth" })),
      routes: options.routes || [],
    });

    options.beforeEach =
      options.beforeEach ||
      function (to, from, next) {
        next();
      };

    options.accessDenied =
      options.accessDenied ||
      function (to, from, next) {
        next(false);
      };

    options.matchNotFound =
      options.matchNotFound ||
      function (to, from, next) {
        if (options.matchNotFoundExternal) {
          document.location.href = to.fullPath;
        } else {
          next();
        }
      };

    router.beforeEach((to, from, next) => {
      if (!to.matched.length) {
        console.log("[BootRouter] matchNotFound →", to.path);
        options.matchNotFound(to, from, next);
      } else if (
        !to.matched.some((record) => {
          if (!record.meta?.role || !window.CONST?.APP_USER_ROLE) return true;
          const requiredRoles = Array.isArray(record.meta.role)
            ? record.meta.role
            : [record.meta.role];
          const userRoles = Array.isArray(window.CONST.APP_USER_ROLE)
            ? window.CONST.APP_USER_ROLE
            : [window.CONST.APP_USER_ROLE];

          return requiredRoles.some((role) => userRoles.includes(role));
        })
      ) {
        console.log("[BootRouter] accessDenied →", to.path);
        options.accessDenied(to, from, next);
      } else {
        options.beforeEach(to, from, next);
      }
    });

    this._inst_ = router;

    return router;
  },
};
