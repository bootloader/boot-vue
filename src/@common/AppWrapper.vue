<template>
  <div id="app" class="app-wrapper">
    <Suspense>
      <template #default>
        <component :is="app" />
      </template>
      <template #fallback>
        <div class="loading">Loading...</div>
      </template>
    </Suspense>
  </div>
</template>

<script>
export default {
  name: "AppWrapper",
  props: {
    app: {
      type: [Object, Function],
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
// @import "@/assets/base.scss";
</style>
