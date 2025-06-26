<script setup>
import CardWidgetsEarningReportsWeeklyOverview from "@app-pushapp/views/pages/cards/card-widgets/CardWidgetsEarningReportsWeeklyOverview.vue";
import CardWidgetsEarningReportsYearlyOverview from "@app-pushapp/views/pages/cards/card-widgets/CardWidgetsEarningReportsYearlyOverview.vue";
import CardWidgetsProjectStatus from "@app-pushapp/views/pages/cards/card-widgets/CardWidgetsProjectStatus.vue";
import CardWidgetsRevenueReport from "@app-pushapp/views/pages/cards/card-widgets/CardWidgetsRevenueReport.vue";
import CardWidgetsSales from "@app-pushapp/views/pages/cards/card-widgets/CardWidgetsSales.vue";
import CardWidgetsSupportTracker from "@app-pushapp/views/pages/cards/card-widgets/CardWidgetsSupportTracker.vue";
import CardWidgetsTotalEarning from "@app-pushapp/views/pages/cards/card-widgets/CardWidgetsTotalEarning.vue";
</script>

<template>
  <VRow>
    <!-- 👉 Earning Report Weekly Overview -->
    <VCol cols="12" md="6" order-md="1" order="1">
      <CardWidgetsEarningReportsWeeklyOverview />
    </VCol>

    <!-- 👉 Support Tracker -->
    <VCol cols="12" sm="6" order-md="2" order="2">
      <CardWidgetsSupportTracker />
    </VCol>

    <!-- 👉 Sales -->
    <VCol cols="12" md="4" sm="6" order-md="3" order="3">
      <CardWidgetsSales />
    </VCol>

    <!-- 👉 Revenue Report -->
    <VCol cols="12" md="8" order-md="4" order="4">
      <CardWidgetsRevenueReport />
    </VCol>

    <!-- 👉 Project Status -->
    <VCol cols="12" sm="6" lg="4" order-md="5" order="6">
      <CardWidgetsProjectStatus />
    </VCol>

    <!-- 👉 Earning Reports Yearly Overview -->
    <VCol cols="12" md="6" lg="8" order-md="6" order="5">
      <CardWidgetsEarningReportsYearlyOverview />
    </VCol>

    <!-- 👉 Total Earning -->
    <VCol cols="12" sm="6" lg="4" order="7" order-md="7">
      <CardWidgetsTotalEarning />
    </VCol>
  </VRow>
</template>
