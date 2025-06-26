<script setup>
import CardAdvanceActiveProject from "@app-pushapp/views/pages/cards/card-advance/CardAdvanceActiveProject.vue";
import CardAdvanceActivityTimeline from "@app-pushapp/views/pages/cards/card-advance/CardAdvanceActivityTimeline.vue";
import CardAdvanceBrowserStates from "@app-pushapp/views/pages/cards/card-advance/CardAdvanceBrowserStates.vue";
import CardAdvanceCongratulationsJohn from "@app-pushapp/views/pages/cards/card-advance/CardAdvanceCongratulationsJohn.vue";
import CardAdvanceEarningReports from "@app-pushapp/views/pages/cards/card-advance/CardAdvanceEarningReports.vue";
import CardAdvanceLastTransaction from "@app-pushapp/views/pages/cards/card-advance/CardAdvanceLastTransaction.vue";
import CardAdvanceMonthlyCampaignState from "@app-pushapp/views/pages/cards/card-advance/CardAdvanceMonthlyCampaignState.vue";
import CardAdvanceOrder from "@app-pushapp/views/pages/cards/card-advance/CardAdvanceOrder.vue";
import CardAdvancePopularProducts from "@app-pushapp/views/pages/cards/card-advance/CardAdvancePopularProducts.vue";
import CardAdvanceSalesByCountries from "@app-pushapp/views/pages/cards/card-advance/CardAdvanceSalesByCountries.vue";
import CardAdvanceSourceVisits from "@app-pushapp/views/pages/cards/card-advance/CardAdvanceSourceVisits.vue";
import CardAdvanceTransactions from "@app-pushapp/views/pages/cards/card-advance/CardAdvanceTransactions.vue";
import CardAdvanceWebsiteAnalytics from "@app-pushapp/views/pages/cards/card-advance/CardAdvanceWebsiteAnalytics.vue";
</script>

<template>
  <VRow>
    <!-- 👉 Campaign State -->
    <VCol cols="12" sm="6" lg="4">
      <CardAdvanceMonthlyCampaignState />
    </VCol>

    <!-- 👉 Active Project -->
    <VCol cols="12" sm="6" lg="4">
      <CardAdvanceActiveProject />
    </VCol>

    <!-- 👉 Source Visits -->
    <VCol cols="12" sm="6" lg="4">
      <CardAdvanceSourceVisits />
    </VCol>

    <!-- 👉 Sales by countries -->
    <VCol cols="12" sm="6" lg="4">
      <CardAdvanceSalesByCountries />
    </VCol>

    <!-- 👉 Earning Reports -->
    <VCol cols="12" sm="6" lg="4">
      <CardAdvanceEarningReports />
    </VCol>

    <!-- 👉 Browser States -->
    <VCol cols="12" sm="6" lg="4">
      <CardAdvanceBrowserStates />
    </VCol>

    <!-- 👉 Orders -->
    <VCol cols="12" sm="6" lg="4">
      <CardAdvanceOrder />
    </VCol>

    <!-- 👉 Transactions -->
    <VCol cols="12" sm="6" lg="4">
      <CardAdvanceTransactions />
    </VCol>

    <!-- 👉 Popular Products -->
    <VCol cols="12" sm="6" lg="4">
      <CardAdvancePopularProducts />
    </VCol>

    <!-- 👉 Last Transaction -->
    <VCol cols="12" sm="6">
      <CardAdvanceLastTransaction />
    </VCol>

    <!-- 👉 Activity Timeline -->
    <VCol cols="12" md="6">
      <CardAdvanceActivityTimeline />
    </VCol>

    <!-- 👉 Websites Analytics -->
    <VCol cols="12" md="6">
      <CardAdvanceWebsiteAnalytics />
    </VCol>

    <!-- 👉 Congratulations John -->
    <VCol cols="12" md="6">
      <CardAdvanceCongratulationsJohn />
    </VCol>
  </VRow>
</template>
