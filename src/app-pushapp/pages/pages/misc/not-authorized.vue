<script setup>
import { useGenerateImageVariant } from "@app-pushapp/@core/composable/useGenerateImageVariant";
import pages401 from "@app-pushapp/assets/images/pages/401.png";
import miscMaskDark from "@app-pushapp/assets/images/pages/misc-mask-dark.png";
import miscMaskLight from "@app-pushapp/assets/images/pages/misc-mask-light.png";

const authThemeMask = useGenerateImageVariant(miscMaskLight, miscMaskDark);
</script>

<template>
  <div class="misc-wrapper">
    <ErrorHeader
      error-title="You are not authorized! 🔐"
      error-description="You do not have permission to view this page using the credentials that you have provided while login.
Please contact your site administrator."
    />
    <VBtn to="/" class="mb-12"> Back to Home </VBtn>

    <!-- 👉 Image -->
    <div class="misc-avatar w-100 text-center">
      <VImg
        :src="pages401"
        alt="Coming Soon"
        :max-width="170"
        class="mx-auto"
      />
    </div>

    <VImg :src="authThemeMask" class="misc-footer-img d-none d-md-block" />
  </div>
</template>

<style lang="scss">
@use "@app-pushapp/@core/scss/template/pages/misc.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
