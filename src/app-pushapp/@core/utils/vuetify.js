import { isDarkPreferred } from "@app-pushapp/@core/composable/useThemeConfig";
import { themeConfig } from "@app-pushapp/themeConfig.js";

export const resolveVuetifyTheme = () => {
  const storedTheme =
    localStorage.getItem(`${themeConfig.app.title}-theme`) ||
    themeConfig.app.theme.value;

  return storedTheme === "system"
    ? isDarkPreferred.value
      ? "dark"
      : "light"
    : storedTheme;
};
