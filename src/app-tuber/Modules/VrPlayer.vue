<template>
  <div class="vr-container">
    <a-scene embedded>
      <!-- 360° Video Sphere -->
      <a-videosphere :src="videoSrc" rotation="0 -90 0"></a-videosphere>

      <!-- You can add other interactive elements here -->
    </a-scene>
  </div>
</template>

<script>
import "aframe";

export default {
  props: ["src"],
  computed: {
    videoSrc() {
      return this.src || "path_to_your_video.mp4"; // Default or passed video source
    },
  },
};
</script>

<style scoped>
.vr-container {
  width: 100%;
  height: 500px;
  position: relative;
}
a-scene {
  width: 100%;
  height: 100%;
}
</style>
