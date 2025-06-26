<script setup>
import * as demoCode from "@app-pushapp/views/demos/components/badge/demoCodeBadge";
</script>

<template>
  <VRow class="match-height">
    <VCol cols="12" md="6">
      <!-- 👉 Style -->
      <AppCardCode title="Style" :code="demoCode.style">
        <p>
          You can use various props like <code>bordered</code>,
          <code>dot</code>, <code>inline</code>, <code>rounded</code> etc. to
          style the badge.
        </p>

        <DemoBadgeStyle />
      </AppCardCode>
    </VCol>

    <VCol cols="12" md="6">
      <!-- 👉 Color -->
      <AppCardCode title="Color" :code="demoCode.color">
        <p>Use <code>color</code> prop to create various background badges.</p>

        <DemoBadgeColor />
      </AppCardCode>
    </VCol>

    <VCol cols="12" md="6">
      <!-- 👉 Position -->
      <AppCardCode title="Position" :code="demoCode.position">
        <p>
          You can use <code>location</code> prop to change the position of the
          badge. Possible values are <code>top-end</code>,
          <code>bottom-end</code>, <code>bottom-start</code>,
          <code>top-start</code>.
        </p>

        <DemoBadgePosition />
      </AppCardCode>
    </VCol>

    <VCol cols="12" md="6">
      <!-- 👉 Icon -->
      <AppCardCode title="Icon" :code="demoCode.icon">
        <p>
          You can use <code>icon</code> prop or use <code>slot</code> to render
          the icon
        </p>

        <DemoBadgeIcon />
      </AppCardCode>
    </VCol>

    <VCol cols="12" md="6">
      <!-- 👉 Avatar Status -->
      <AppCardCode title="Avatar Status" :code="demoCode.avatarStatus">
        <p>You can use badge with avatar as status.</p>

        <DemoBadgeAvatarStatus />
      </AppCardCode>
    </VCol>

    <VCol cols="12" md="6">
      <!-- 👉 Dynamic notifications -->
      <AppCardCode
        title="Dynamic notifications"
        :code="demoCode.dynamicNotifications"
      >
        <p>
          You can incorporate badges with dynamic content to make things such as
          a notification system.
        </p>

        <DemoBadgeDynamicNotifications />
      </AppCardCode>
    </VCol>

    <VCol cols="12" md="6">
      <!-- 👉 Show on hover -->
      <AppCardCode title="Show on hover" :code="demoCode.showOnHover">
        <p>
          You can do many things with visibility control, for example, show
          badge on hover.
        </p>

        <DemoBadgeShowOnHover />
      </AppCardCode>
    </VCol>

    <VCol cols="12" md="6">
      <!-- 👉 Tabs -->
      <AppCardCode title="Tabs" :code="demoCode.tabs">
        <p>Badges help convey information to the user in a variety of ways.</p>

        <DemoBadgeTabs />
      </AppCardCode>
    </VCol>

    <VCol cols="12" md="6">
      <!-- 👉 Maximum value content -->
      <AppCardCode title="Maximum Value" :code="demoCode.maximumValue">
        <p>Use <code>max</code> prop to cap the value of the badge content</p>

        <DemoBadgeMaximumValue />
      </AppCardCode>
    </VCol>
  </VRow>
</template>
