<script setup>
import { useUserListStore } from "@app-pushapp/views/apps/user/useUserListStore";
import UserBioPanel from "@app-pushapp/views/apps/user/view/UserBioPanel.vue";
import UserTabAccount from "@app-pushapp/views/apps/user/view/UserTabAccount.vue";
import UserTabBillingsPlans from "@app-pushapp/views/apps/user/view/UserTabBillingsPlans.vue";
import UserTabConnections from "@app-pushapp/views/apps/user/view/UserTabConnections.vue";
import UserTabNotifications from "@app-pushapp/views/apps/user/view/UserTabNotifications.vue";
import UserTabSecurity from "@app-pushapp/views/apps/user/view/UserTabSecurity.vue";

const userListStore = useUserListStore();
const route = useRoute();
const userData = ref();
const userTab = ref(null);

const tabs = [
  {
    icon: "tabler-user-check",
    title: "Account",
  },
  {
    icon: "tabler-lock",
    title: "Security",
  },
  {
    icon: "tabler-currency-dollar",
    title: "Billing & Plan",
  },
  {
    icon: "tabler-bell",
    title: "Notifications",
  },
  {
    icon: "tabler-link",
    title: "Connections",
  },
];

userListStore.fetchUser(Number(route.params.id)).then((response) => {
  userData.value = response.data;
});
</script>

<template>
  <VRow v-if="userData">
    <VCol cols="12" md="5" lg="4">
      <UserBioPanel :user-data="userData" />
    </VCol>

    <VCol cols="12" md="7" lg="8">
      <VTabs v-model="userTab" class="v-tabs-pill">
        <VTab v-for="tab in tabs" :key="tab.icon">
          <VIcon :size="18" :icon="tab.icon" class="me-1" />
          <span>{{ tab.title }}</span>
        </VTab>
      </VTabs>

      <VWindow
        v-model="userTab"
        class="mt-6 disable-tab-transition"
        :touch="false"
      >
        <VWindowItem>
          <UserTabAccount />
        </VWindowItem>

        <VWindowItem>
          <UserTabSecurity />
        </VWindowItem>

        <VWindowItem>
          <UserTabBillingsPlans />
        </VWindowItem>

        <VWindowItem>
          <UserTabNotifications />
        </VWindowItem>

        <VWindowItem>
          <UserTabConnections />
        </VWindowItem>
      </VWindow>
    </VCol>
  </VRow>
</template>
