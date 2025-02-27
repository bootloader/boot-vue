const AppConfig = require("./@common/AppConfig");

module.exports = AppConfig.extend({
  apps: {
    customer: {
      // entry: "./src/main.js",
      // template: "public/app-customer.html",
      // filename: "app-customer.html",
      // title: "Customer Aapp",
      // chunks: ["chunk-vendors", "chunk-common", "customer"],
      component: () => import("@/app-customer/AppCustomer.vue"),
      publicPath: "/customer",
    },
    default: {
      component: () => import("@/app/App.vue"),
      publicPath: "/default",
    },
  },
});
