import { breakpointsVuetify } from "@vueuse/core";
import { VIcon } from "vuetify/components/VIcon";

import { defineThemeConfig } from "@app-pushapp/@core";
import { RouteTransitions, Skins } from "@app-pushapp/@core/enums";
import {
  AppContentLayoutNav,
  ContentWidth,
  FooterType,
  NavbarType,
} from "@app-pushapp/@layouts/enums";

// ❗ Logo SVG must be imported with ?raw suffix
import logo from "@app-pushapp/assets/images/logo.svg?raw";
// import logo_default from "@app-pushapp/assets/images/logo_default.svg?raw";

export const { themeConfig, layoutConfig } = defineThemeConfig({
  app: {
    title: "PushApp",
    logo: h("div", {
      innerHTML: logo,
      style: "line-height:0; color: rgb(var(--v-global-theme-primary))",
    }),
    contentWidth: ContentWidth.Boxed,
    contentLayoutNav: AppContentLayoutNav.Vertical,
    overlayNavFromBreakpoint: breakpointsVuetify.md + 16,
    // enableI18n: true,
    theme: "system",
    isRtl: false,
    skin: Skins.Default,
    routeTransition: RouteTransitions.Fade,
    iconRenderer: VIcon,
  },
  navbar: {
    type: NavbarType.Sticky,
    navbarBlur: true,
  },
  footer: { type: FooterType.Static },
  verticalNav: {
    isVerticalNavCollapsed: false,
    defaultNavItemIconProps: { icon: "tabler-circle", size: 10 },
    isVerticalNavSemiDark: false,
  },
  horizontalNav: {
    type: "sticky",
    transition: "slide-y-reverse-transition",
  },
  icons: {
    chevronDown: { icon: "tabler-chevron-down" },
    chevronRight: { icon: "tabler-chevron-right", size: 18 },
    close: { icon: "tabler-x" },
    verticalNavPinned: { icon: "tabler-circle-dot" },
    verticalNavUnPinned: { icon: "tabler-circle" },
    sectionTitlePlaceholder: { icon: "tabler-separator" },
  },
});
