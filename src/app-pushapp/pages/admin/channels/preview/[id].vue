<script setup>
import ChannelEditable from "@app-pushapp/views/admin/channels/ChannelEditable.vue";

import { useChannelsStore } from "@app-pushapp/views/admin/channels/useChannelsStore";

const { show } = inject("snackbar");

const channelsStore = useChannelsStore();

const router = useRouter();
const route = useRoute();
const paramId = route.params.id;
if (paramId) {
  channelsStore
    .fetchChannel({ id: paramId })
    .then((response) => {
      console.log(response);
      channelData.value = response.data.channel; // TODO
    })
    .catch((error) => {
      console.log(error);
      show({ message: "Something went wrong", color: "error" });
    });
} else {
  show({ message: "Channel ID missing", color: "error" });
}

const channelData = ref({
  app_name: "",
  company_id: "",
  company_name: "",
  platforms: [{}],
});

// const onCreate = async () => {
//   try {
//     const formData = new FormData();
//     formData.append("app_name", channelData.value.app_name);
//     formData.append("company_id", channelData.value.company_id);
//     formData.append("company_name", channelData.value.company_name);
//     channelData.value.platforms.map((p) => {
//       formData.append(`${p.platform_type}_file`, p.file);
//       formData.append(`${p.platform_type}_bundle_id`, p.bundle_id);
//       if (p.platform_type === "ios") {
//         formData.append(`key_id`, p.key_id);
//         formData.append(`team_id`, p.team_id);
//       }
//     });

//     await channelsStore.createChannel(formData);

//     show({ message: "Channel created successfully", color: "success" });

//     router.push({ name: "admin-channels-list" });
//   } catch (error) {
//     console.error(error);
//   }
// };

// const onUpdate = async () => {
//   console.log("onUpdate");
// };
</script>

<template>
  <VRow>
    <VCol cols="12" md="9">
      <VRow>
        <VCol cols="12">
          <ChannelEditable :data="channelData" />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" class="text-right">
          <div class="px-6">
            <!-- <VBtn @click="onCreate" class="mr-3"> Create </VBtn>
            <VBtn @click="onUpdate" class="mr-3"> Update </VBtn> -->
            <VBtn
              variant="tonal"
              color="secondary"
              :to="{ name: 'admin-channels-list' }"
            >
              Back
            </VBtn>
          </div>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>
