import { createLayouts } from "@app-pushapp/@layouts";
import "@app-pushapp/@layouts/styles/index.scss";
import { layoutConfig } from "@app-pushapp/themeConfig.js";

// ℹ️ We generate layout config from our themeConfig so you don't have to write config twice
export default createLayouts(layoutConfig);
