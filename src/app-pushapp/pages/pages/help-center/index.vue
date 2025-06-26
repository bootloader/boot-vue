<script setup>
import HelpCenterLandingArticlesOverview from "@app-pushapp/views/pages/help-center/HelpCenterLandingArticlesOverview.vue";
import HelpCenterLandingFooter from "@app-pushapp/views/pages/help-center/HelpCenterLandingFooter.vue";
import HelpCenterLandingKnowledgeBase from "@app-pushapp/views/pages/help-center/HelpCenterLandingKnowledgeBase.vue";
import axios from "@app-pushapp/@fake-db/axios";

const apiData = ref();

// fetching data from the @app-pushapp/@fake-db
const fetchHelpCenterData = () => {
  return axios.get("/pages/help-center/landing").then((res) => {
    apiData.value = res.data;
  });
};

fetchHelpCenterData();
</script>

<template>
  <VCard v-if="apiData">
    <AppSearchHeader
      title="Hello, how can we help?"
      subtitle="Common troubleshooting topics: eCommerce, Blogging to payment"
      custom-class="rounded-0"
    />

    <!-- 👉 Popular Articles -->
    <VCardText class="py-12">
      <h5 class="text-h3 text-center my-6">Popular Articles</h5>

      <HelpCenterLandingArticlesOverview :articles="apiData.popularArticles" />
    </VCardText>

    <!-- 👉 Knowledge Base -->
    <div>
      <VCardText class="bg-var-theme-background py-12">
        <h5 class="text-h3 text-center my-6">Knowledge Base</h5>

        <HelpCenterLandingKnowledgeBase :categories="apiData.categories" />
      </VCardText>
    </div>

    <!-- 👉 Keep Learning -->
    <VCardText class="py-12">
      <h5 class="text-h3 text-center my-6">Keep Learning</h5>

      <HelpCenterLandingArticlesOverview :articles="apiData.keepLearning" />
    </VCardText>

    <!-- 👉 Still need help? -->
    <HelpCenterLandingFooter />
  </VCard>
</template>
