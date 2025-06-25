const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { VuetifyResolver } = require("unplugin-vue-components/resolvers");

process.env.VUE_APP_VERSION = require("./package.json").version;
process.env.VUE_APP_TIMESTAMP = Date.now();
const appName = process.env.VUE_APP_NAME || "default";

console.log("webpack", { appName });
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",

  transpileDependencies: true,
  runtimeCompiler: true,
  productionSourceMap: false,
  filenameHashing: false,

  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@common": path.resolve(__dirname, "src/@common"),
        "@app": path.resolve(__dirname, "src/app"),
      },
    },
    plugins: [
      AutoImport({
        imports: ["vue", "vue-router"],
        dts: false,
      }),
      Components({
        resolvers: ["src/@common/components", VuetifyResolver()],
        dts: false,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
          type: "javascript/auto",
        },
      ],
    },
  },
});
