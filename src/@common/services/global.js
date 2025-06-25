import zipcelx from "zipcelx";

export const myVar = "This is my variable";

export const MyConst = {
  some: "Settings",
  app: window.CONST?.APP,
  appView: window.CONST?.APP_VIEW,
  cdn: window.CONST?.CDN_URL,
  appPrefix: "/" + window.CONST?.APP,
  tenant: window.CONST?.TENANT,
  appDomain: window.CONST?.APP_DOMAIN,
  appDomainId: window.CONST?.APP_DOMAIN_ID,
  context: window.CONST?.CONTEXT,
  user: window.CONST?.APP_USER,
  userProfile: window.CONST?.APP_USER_PROFILE,
  dept: window.CONST?.APP_DEPT,
  userName: window.CONST?.APP_USER_NAME,
  agent: window.CONST?.APP_USER,
  nounce: window.CONST?.NOUNCE,
  config: (function (config) {
    //Derived Constants
    config.chatRefreshInterval = config.chatIdleTimeout / 5; //Chats/sessions should be refreshed after this interval
    config.PERMS = {
      ...(config.PERMS || {}),
    };
    config.FEATURES = {
      ...(config.FEATURES || {}),
    };
    config.isLagacy = config?.FEATURES?.BUILD_VERSION < 2;
    return config;
  })(
    Object.assign(
      {
        chatSessionTimeout: 86400000, // After which chat is expired
        chatIdleTimeout: 1000 * 60 * 5, // Time after which  chat raised attention
        agentSessionTimeout: 1000 * 60 * 10, // Time to ping server
        CHAT_TAG_ENABLED: true,
        AGENT_CHAT_INIT: false,
      },
      window.CONST?.CONFIG,
      window.CONST?.dev
        ? {
            //CHAT_TAG_ENABLED : false,
            //AGENT_CHAT_INIT : true,
            //AGENT_CHAT_SEARCH_SESSION : true,
            // SETUP : {
            // 	POSTMAN_AGENT_CHAT_INIT_SESSION : true,
            // 	POSTMAN_AGENT_CHAT_INIT_CONTACT : true
            // }
          }
        : {}
    )
  ),
  logo: {
    full: window.CONST?.CDN_URL + "/logo/logo-long.png",
    full_inverse: window.CONST?.CDN_URL + "/logo/logo-long-o.png",
    short: window.CONST?.CDN_URL + "/logo/logo-short.png",
    short_inverse: window.CONST?.CDN_URL + "/logo/logo-short-o.png",
  },
  sessionLoadStamp: new Date().getTime(),
};

export const User = (function () {
  let PERMITTED = {
    VIEW_ALL_DOMAINS: ["DUPER_USER", "SUPER_DEV", "SUPER_MANAGER"],
  };
  let user = {
    isDuperUser: (window.CONST?.APP_USER_ROLE || []).indexOf("DUPER_USER") >= 0,
    isSuperDev: (window.CONST?.APP_USER_ROLE || []).indexOf("SUPER_DEV") >= 0,
    isPartner:
      (window.CONST?.APP_USER_ROLE || []).indexOf("BUSINESS_PARTNER") >= 0,
    isDomainOwner:
      (window.CONST?.APP_USER_ROLE || []).indexOf("BUSINESS_USER") >= 0,
    isWabaManager:
      (window.CONST?.APP_USER_ROLE || []).indexOf("WABA_MANAGER") >= 0,
    is() {
      for (let i in arguments) {
        if ((window.CONST?.APP_USER_ROLE || []).indexOf(arguments[i]) >= 0) {
          return true;
        }
      }
      return false;
    },
    has() {
      for (let i in arguments) {
        // eslint-disable-next-line
        if (!!(window.CONST?.CONFIG?.FEATURES || {})[arguments[i]]) {
          return true;
        }
      }
      return false;
    },
    can(doSomething) {
      return !!PERMITTED[doSomething].filter((role) => {
        return (window.CONST?.APP_USER_ROLE || []).indexOf(role) >= 0;
      })[0];
    },
  };
  user.isMultiDomainUser =
    user.isDuperUser || user.isSuperDev || user.isPartner;
  user.canAddOwner = user.isDuperUser || user.isSuperDev || user.isPartner;
  user.canManageFeatures = user.isDuperUser || user.isSuperDev;
  user.canAddWaba = user.isDuperUser || user.isWabaManager;
  user.canManageWaba =
    user.isDuperUser || user.isWabaManager || user.isSuperDev;
  user.canDebugDomain =
    user.isDuperUser || user.isSuperDev || user.isDomainOwner;
  return user;
})();

export const MyFlags = {
  showSidebar: false,
  showContactProfile: true,
  agent: {
    showProfile: true,
    showProfileAllowed: false,
    showContactSearch: false,
    showSessionSearch: false,
    showEventSearch: false,
    profileView: "history", //history,info
    contactsTab: "ME",
    mvu: "CONTACTS", //CONTACTS,CHATBOX,CPROFILE,
    sessionInView: null,
  },
};

export const MyDict = {
  social: {
    FACEBOOK: "fa fa-facebook",
    WEBSITE: "fa fa-chrome",
    TELEGRAM: "fa fa-telegram",
    TWITTER: "fa fa-twitter",
    WHATSAPP: "fa fa-whatsapp",
    INSTAGRAM: "fa fa-instagram",
    EMAIL: "fas fa-envelope",
    OA: "my my-oa-logo",
  },
  chatStatus: {
    UNASSIGNED: { label: "UNASSIGNED" },
    OPEN: { label: "OPEN", editable: true },
    ATTENTION: { label: "ATTENTION", editable: true },
    URGENT: { label: "URGENT", editable: true },
    ONHOLD: { label: "ONHOLD", editable: true },
    EXPIRED: { label: "EXPIRED" },
    RESOLVED: { label: "RESOLVED", editable: true },
    CLOSED: { label: "CLOSED" },
  },
  socialPrefix: function (argument, prefix) {
    var clz = this._socialPrefix(argument);
    if (prefix) {
      return clz.replace(/^fa |^f /, prefix + " ");
    } else {
      return clz.replace(/^f /, "");
    }
  },
  _socialPrefix: function (argument) {
    argument = argument || "";
    if (this.social[argument]) {
      return this.social[argument];
    }
    if (argument.indexOf("tw") == 0) {
      return this.social.TWITTER;
    } else if (argument.indexOf("tg") == 0) {
      return this.social.TELEGRAM;
    } else if (argument.indexOf("fb") == 0) {
      return this.social.FACEBOOK;
    } else if (argument.indexOf("wa") == 0) {
      return this.social.WHATSAPP;
    } else if (argument.indexOf("ig") == 0) {
      return this.social.INSTAGRAM;
    } else if (argument.indexOf("oa") == 0) {
      return this.social.OA;
    }
    return this.social.WEBSITE;
  },
  c2cUrl: function (c) {
    if (c.contactType == "FACEBOOK") {
      return `https://m.me/${c.facebook.handler}`;
    } else if (c.contactType == "TWITTER") {
      return `https://twitter.com/${c.twitter.handler}`;
    } else if (c.contactType == "WHATSAPP") {
      return `https://api.whatsapp.com/send/?phone=${c.lane}${
        c.sandbox ? "&text=/proxy " + (MyConst.appDomain || MyConst.tenant) : ""
      }`;
    } else if (c.contactType == "TELEGRAM") {
      return `https://telegram.me/${c.telegram.lane}`;
    } else if (c.contactType == "INSTAGRAM") {
      return `https://instagram.com/${c.instagram.handler}`;
    }
    return `https://${MyConst.tenant}.${MyConst.config.PROP_SERVICE_SERVER}`;
  },
  // profilePic: require("./../assets/agent/images/profile.png"),
  profilePicFun(url, name, type) {
    if (url) {
      return url;
    }
    switch (type) {
      case "FACEBOOK":
        return `https://ui-avatars.com/api/?name=${name}&background=a0acbe&color=333f54`;
      case "TWITTER":
        return `https://ui-avatars.com/api/?name=${name}&background=b7d9ec&color=102f41`;
      case "WHATSAPP":
        return `https://ui-avatars.com/api/?name=${name}&background=b9c4be&color=394f42`;
      case "TELEGRAM":
        return `https://ui-avatars.com/api/?name=${name}&background=8ca5b2&color=243037`;
      case "INSTAGRAM":
        return `https://ui-avatars.com/api/?name=${name}&background=cabcc6&color=371e4f`;
      case "EMAIL":
        return `https://ui-avatars.com/api/?name=${name}&background=a9a9a9&color=313030`;
      default:
        return `https://ui-avatars.com/api/?name=${name}&background=c6d7ee&color=20262d`;
    }
  },
};

export const MyFunc = {
  isInbound(mType) {
    return ["I", "Ii", "R"].indexOf(mType) > -1;
  },
  isOutbound(mType) {
    return ["O", "Oi"].indexOf(mType) > -1;
  },
  getAppModules() {
    const _map = {
      AGENT: {
        title: "Agent",
        code: "agent",
        icon: "fa-user-secret",
      },
      ADMIN: {
        title: "Admin",
        code: "admin",
        icon: "fa-user-shield",
      },
      CALENDAR: {
        title: "Calendar",
        code: "calendar",
        icon: "fa-calendar",
      },
      SOCIAL: {
        title: "Social",
        code: "social",
        icon: "fa-globe",
      },
    };

    let result = [];

    if (typeof window.CONST?.CONFIG?.PROFILE === "object") {
      result = (window.CONST?.CONFIG.PROFILE.appModules || [])
        .map((app) => {
          return _map[app] || false;
        })
        .filter(
          (app) =>
            !!app && app.code !== window.CONST?.APP && app.code !== "calendar"
        );
    }

    console.log("getAppModules", result);
    return result;
  },
  /**
   *
   * @param {string} key
   * @param {string} entity - "FEATURE / PERM / LICENSE" || "SETTING / SETUP" || "APP_MODULE"
   * @returns {boolean}
   */
  hasAccess(key, entity = "FEATURE") {
    let result = false;

    switch (entity) {
      case "FEATURE":
        result = !!(window.CONST?.CONFIG?.FEATURES || {})[key];
        break;

      case "SETUP":
        break;

      case "APP_MODULE":
        result = !!(window.CONST?.CONFIG?.PROFILE || {}).appModules?.includes(
          key
        );
        break;

      default:
        break;
    }

    console.log("hasAccess " + key, entity, result);
    return result;
  },
  exportToXLS(rows, fileName) {
    rows = rows.map(function (rowArray) {
      return rowArray.map((cell) => ({ value: cell, type: "string" }));
    });
    zipcelx({
      filename: fileName || "bulk-excel",
      sheet: {
        data: rows,
      },
    });
  },
  ensureApiPathPrefix(path, module) {
    let prefix;
    switch (module) {
      case "CALENDAR":
        if (
          window.CONST?.APP === "admin" &&
          window.CONST?.APP_CONTEXT === "/admin"
        ) {
          prefix = "/nexus";
        }
        break;

      default:
        break;
    }
    return prefix ? prefix + path : path;
  },
  fixingDomainTime() {
    let index =
      window.CONST?.CONFIG?.SETUP?.POSTMAN_TIMEZONE_OFFSET?.indexOf(":");
    const timeZone =
      window.CONST?.CONFIG?.SETUP?.POSTMAN_TIMEZONE_OFFSET?.slice(0, index) ||
      Intl.DateTimeFormat().resolvedOptions().timeZone;
    return timeZone;
  },
};

export const Event = {
  fp(callback) {
    if (window.CONST?.fp) {
      callback(window.CONST?.fp);
    } else {
      setTimeout(() => Event.fp(callback), 1500);
    }
  },
};

// Vue.prototype.$global = {
//   MyConst,
//   MyFlags,
//   MyDict,
//   MyFunc,
//   User,
//   Event,
//   isMobileApp: window.CONST?.APP_VIEW == "mobile",
//   db: {
//     "mehery.io": "prod",
//     "mehery.com": "prod",
//     "mehery.xyz": "dev",
//   }[MyConst.config.PROP_SERVICE_SERVER],
//   subdomain: (function (parts) {
//     return parts[0];
//   })(window.location.host.split(".")),
// };
