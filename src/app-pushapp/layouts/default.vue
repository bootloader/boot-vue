<script setup>
import { useSkins } from "@app-pushapp/@core/composable/useSkins";
import { useThemeConfig } from "@app-pushapp/@core/composable/useThemeConfig";

// @app-pushapp/@layouts plugin
import { AppContentLayoutNav } from "@app-pushapp/@layouts/enums";

const DefaultLayoutWithHorizontalNav = defineAsyncComponent(() =>
  import("./components/DefaultLayoutWithHorizontalNav.vue")
);
const DefaultLayoutWithVerticalNav = defineAsyncComponent(() =>
  import("./components/DefaultLayoutWithVerticalNav.vue")
);
const { width: windowWidth } = useWindowSize();
const { appContentLayoutNav, switchToVerticalNavOnLtOverlayNavBreakpoint } =
  useThemeConfig();

// Remove below composable usage if you are not using horizontal nav layout in your app
switchToVerticalNavOnLtOverlayNavBreakpoint(windowWidth);

const { layoutAttrs, injectSkinClasses } = useSkins();

injectSkinClasses();
</script>

<template>
  <template v-if="appContentLayoutNav === AppContentLayoutNav.Vertical">
    <DefaultLayoutWithVerticalNav v-bind="layoutAttrs" />
  </template>
  <template v-else>
    <DefaultLayoutWithHorizontalNav v-bind="layoutAttrs" />
  </template>
</template>

<style lang="scss">
// As we are using `layouts` plugin we need its styles to be imported
@use "@app-pushapp/@layouts/styles/default-layout";
</style>
