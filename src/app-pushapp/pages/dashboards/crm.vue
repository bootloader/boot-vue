<script setup>
import CrmActiveProject from "@app-pushapp/views/dashboards/crm/CrmActiveProject.vue";
import CrmActivityTimeline from "@app-pushapp/views/dashboards/crm/CrmActivityTimeline.vue";
import CrmAnalyticsSales from "@app-pushapp/views/dashboards/crm/CrmAnalyticsSales.vue";
import CrmBrowserStates from "@app-pushapp/views/dashboards/crm/CrmBrowserStates.vue";
import CrmEarningReportsYearlyOverview from "@app-pushapp/views/dashboards/crm/CrmEarningReportsYearlyOverview.vue";
import CrmProjectStatus from "@app-pushapp/views/dashboards/crm/CrmProjectStatus.vue";
import CrmRecentTransactions from "@app-pushapp/views/dashboards/crm/CrmRecentTransactions.vue";
import CrmRevenueGrowth from "@app-pushapp/views/dashboards/crm/CrmRevenueGrowth.vue";
import CrmSalesAreaCharts from "@app-pushapp/views/dashboards/crm/CrmSalesAreaCharts.vue";
import CrmSessionsBarWithGapCharts from "@app-pushapp/views/dashboards/crm/CrmSessionsBarWithGapCharts.vue";

const simpleStatisticsDemoCards = [
  {
    icon: "tabler-currency-dollar",
    color: "error",
    title: "Total Profit",
    subTitle: "Last week",
    stat: "1.28k",
    change: "-12.2%",
  },
  {
    icon: "tabler-chart-bar",
    color: "info",
    title: "Total Sales",
    subTitle: "Last week",
    stat: "$4,673",
    change: "+25.2%",
  },
];
</script>

<template>
  <VRow class="match-height">
    <VCol cols="12" md="4" sm="6" lg="2">
      <CrmSalesAreaCharts />
    </VCol>

    <VCol cols="12" md="4" sm="6" lg="2">
      <CrmSessionsBarWithGapCharts />
    </VCol>

    <VCol
      v-for="demo in simpleStatisticsDemoCards"
      :key="demo.title"
      cols="12"
      sm="6"
      md="4"
      lg="2"
    >
      <VCard>
        <VCardText>
          <VAvatar :color="demo.color" variant="tonal" rounded size="42">
            <VIcon :icon="demo.icon" />
          </VAvatar>

          <h5 class="text-h5 mt-4">
            {{ demo.title }}
          </h5>
          <p class="text-sm text-disabled my-1 mb-0">
            {{ demo.subTitle }}
          </p>
          <p class="mb-3">
            {{ demo.stat }}
          </p>
          <VChip color="disabled" label>
            {{ demo.change }}
          </VChip>
        </VCardText>
      </VCard>
    </VCol>

    <!-- 👉 Revenue Growth -->
    <VCol cols="12" md="8" lg="4">
      <CrmRevenueGrowth />
    </VCol>

    <!-- 👉 Earning Reports -->
    <VCol cols="12" md="8">
      <CrmEarningReportsYearlyOverview />
    </VCol>

    <!-- 👉 Sales -->
    <VCol cols="12" md="4">
      <CrmAnalyticsSales />
    </VCol>

    <!-- 👉 Browser States -->
    <VCol cols="12" md="4">
      <CrmBrowserStates />
    </VCol>

    <!-- 👉 Project Status -->
    <VCol cols="12" md="4">
      <CrmProjectStatus />
    </VCol>

    <!-- 👉 Active Project -->
    <VCol cols="12" md="4">
      <CrmActiveProject />
    </VCol>

    <!-- 👉 Recent Transactions -->
    <VCol cols="12" md="6">
      <CrmRecentTransactions />
    </VCol>

    <!-- 👉 Active timeline -->
    <VCol cols="12" md="6">
      <CrmActivityTimeline />
    </VCol>
  </VRow>
</template>
