<template>
  <div class="container py-4">
    <h2 class="h4 fw-bold mb-4">📂 File Explorer</h2>

    <div style="position: absolute; top: 0; right: 0; z-index: 100">
      {{ vrModeName }}
      <button v-if="vrMode == 0" class="btn btn-primary btn-sm float-left" @click="enterVRMode">🎥 VR</button>
      <button v-else-if="vrMode == 1" class="btn btn-primary btn-sm float-left" @click="enterVRMode">🎥 Pano VR</button>
      <button v-else class="btn btn-secondary btn-sm mb-2" @click="enterVRMode">⬅ Normal View</button>
    </div>

    <!-- Path and Back Button -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="text-muted small">Path: {{ currentPath }}</div>
      <button v-if="currentPath !== '/'" @click="goBack" class="btn btn-link btn-sm text-decoration-none">
        ⬅ Back
      </button>
    </div>

    <!-- Explorer and Viewer -->
    <div class="row">
      <!-- Right Panel -->
      <div class="col-md-6 border-start ps-4">
        <div v-if="vrMode == 0 && selectedFile">
          <h5 class="fw-bold mb-3">Preview: {{ selectedFile.name }}</h5>
          <video
            v-if="selectedFile.media_type === 'VIDEO'"
            :src="selectedFile.url"
            controls
            class="w-100 rounded"
            style="max-height: 500px; object-fit: contain"
          ></video>
          <img
            v-else-if="selectedFile.media_type === 'IMAGE'"
            :src="selectedFile.url"
            alt="preview"
            class="img-fluid rounded"
          />
          <div v-else class="text-muted">No preview available for this file type.</div>
        </div>

        <!-- VR Scene -->
        <div v-else-if="vrMode == 1">
          <a-scene embedded style="height: 500px">
            <a-assets>
              <video id="vrVideo" :src="activeVRVideo" autoplay loop crossorigin="anonymous"></video>
            </a-assets>

            <a-videosphere src="#vrVideo" rotation="0 0 0"></a-videosphere>

            <a-camera position="0 1.6 0" look-controls>
              <a-cursor
                color="white"
                fuse="true"
                fuse-timeout="800"
                geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
                material="color: white; shader: flat"
              ></a-cursor>
            </a-camera>

            <!-- Buttons for videos in VR -->
            <a-entity position="0 1.2 -3">
              <a-entity
                v-for="(video, index) in videoFiles"
                :key="video.name"
                :position="`${(index - videoFiles.length / 2) * 1.2} 0 0`"
                geometry="primitive: plane; width: 1; height: 0.4"
                material="color: #2196f3; opacity: 0.9"
                :text="`value: ${video.name}; align: center; width: 2; color: white`"
                class="clickable"
                @click="playVRVideo(video.url)"
              ></a-entity>
            </a-entity>

            <!-- Exit VR button -->
            <a-entity
              position="0 0.2 -2"
              geometry="primitive: plane; height: 0.3; width: 1"
              material="color: #f44336; shader: flat"
              text="value: Exit VR; align: center; color: white; width: 3"
              class="clickable"
              @click="enterVRMode"
            ></a-entity>
          </a-scene>
        </div>
        <div v-else-if="vrMode == 2 && selectedFile.media_type === 'VIDEO'">
          <Pano type="video" :source="selectedFile.url" :rotation="rotationForVR" ></Pano>
        </div>

        <div v-else class="text-muted fst-italic">Select a file to preview</div>
      </div>

      <!-- Left: File/Folder List -->
      <div class="col-md-6">
        <ul class="list-group">
          <li
            v-for="item in items"
            :key="item.name"
            @click="item.type === 'dir' ? navigateTo(item.name) : selectFile(item)"
            class="list-group-item d-flex align-items-center"
            style="cursor: pointer"
          >
            <div class="me-3" style="width: 60px; height: 48px">
              <template v-if="item.type === 'dir'">
                <div class="fs-3">📁</div>
              </template>
              <template v-else-if="item.media_type === 'IMAGE'">
                <img :src="item.url" class="img-thumbnail" style="height: 100%; width: 100%; object-fit: cover" />
              </template>
              <template v-else-if="item.media_type === 'VIDEO'">
                <video :src="item.url" class="w-100 h-100" muted style="object-fit: cover"></video>
              </template>
              <template v-else>
                <div class="fs-3">📄</div>
              </template>
            </div>

            <div class="flex-grow-1 text-truncate">
              <span :class="item.type === 'dir' ? 'fw-semibold text-primary text-decoration-underline' : ''">
                {{ item.name }}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Pano } from "vuejs-vr";

export default {
  components: { Pano },
  data() {
    return {
      items: [],
      selectedFile: null,
      vrMode: false,
      activeVRVideo: "", // currently selected video URL in VR
      rotationForVR: "0 90 0",
    };
  },
  computed: {
    currentPath() {
      return this.$route.query.dir || "/";
    },
    videoFiles() {
      return this.items.filter((f) => f.media_type === "VIDEO");
    },
    vrModeName() {
      if (this.vrMode === 1) return "VR";
      if (this.vrMode === 2) return "Pano VR";
      return "Normal";
    },
  },
  watch: {
    "$route.query.dir": "fetchItems",
  },
  created() {
    this.fetchItems();
  },
  methods: {
    async fetchItems() {
      try {
        this.items = await this.$service.getX("vdo/list", { dir: this.currentPath });
        this.selectedFile = null;
        this.activeVRVideo = "";
      } catch (err) {
        console.error("Failed to load items:", err);
      }
    },
    navigateTo(folderName) {
      const newPath = `${this.currentPath.replace(/\/$/, "")}/${folderName}`;
      this.$router.push({ query: { dir: newPath } });
    },
    goBack() {
      if (this.currentPath === "/" || this.currentPath === "") return;
      const parts = this.currentPath.split("/").filter(Boolean);
      parts.pop();
      const parentPath = "/" + parts.join("/");
      this.$router.push({ query: { dir: parentPath || "/" } });
    },
    selectFile(file) {
      if (file.type === "file") this.selectedFile = file;
    },
    enterVRMode() {
      this.vrMode = (this.vrMode + 1) % 3; // Toggle VR mode
      this.activeVRVideo = ""; // Reset selected video when toggling VR
      if (typeof DeviceMotionEvent !== "undefined" && typeof DeviceMotionEvent.requestPermission === "function") {
        DeviceMotionEvent.requestPermission().catch(console.error);
      }
    },
    playVRVideo(url) {
      this.activeVRVideo = url;
    },
  },
};
</script>

<style scoped>
a-scene {
  width: 100%;
  height: 100%;
}
video,
img {
  max-height: 500px;
  object-fit: contain;
}
</style>
