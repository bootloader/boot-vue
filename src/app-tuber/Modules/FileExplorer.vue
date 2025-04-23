<template>
  <div class="container py-4">
    <h2 class="h4 fw-bold mb-4">📂 File Explorer</h2>

    <div style="position: absolute; top: 0; right: 0; z-index: 100">
      <button v-if="!vrMode" class="btn btn-primary btn-sm float-left" @click="vrMode = true">🎥 View in VR</button>
      <button v-else class="btn btn-secondary btn-sm mb-2" @click="vrMode = false">⬅ Back to Normal View</button>
    </div>

    <!-- Path and Back Button -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="text-muted small">Path: {{ currentPath }}</div>
      <button v-if="currentPath !== '/'" @click="goBack" class="btn btn-link btn-sm text-decoration-none">
        ⬅ Back
      </button>
    </div>

    <!-- Explorer and Viewer Side-by-Side -->
    <div class="row">
      <!-- Right: Preview Panel -->
      <div class="col-md-6 border-start ps-4">
        <div v-if="selectedFile">
          <h5 class="fw-bold mb-3">Preview: {{ selectedFile.name }}</h5>

          <!-- Image preview -->
          <div v-if="selectedFile.media_type === 'IMAGE'">
            <img :src="selectedFile.url" alt="preview" class="img-fluid rounded" />
          </div>

          <!-- Video preview -->
          <div v-else-if="selectedFile.media_type === 'VIDEO'">
            <!-- Show normal video by default -->
            <div v-if="!vrMode">
              <video
                :src="selectedFile.url"
                controls
                class="w-100 rounded"
                style="max-height: 400px; object-fit: contain"
              ></video>
            </div>

            <!-- VR 360 view -->
            <div v-else>
              <a-scene embedded style="height: 400px">
                <a-assets>
                  <video id="vrVideo" :src="selectedFile.url" autoplay loop="true" crossorigin="anonymous"></video>
                </a-assets>
                <a-videosphere src="#vrVideo" rotation="0 -90 0"></a-videosphere>
                <a-camera wasd-controls-enabled="false" look-controls="true"></a-camera>
              </a-scene>
            </div>
          </div>

          <!-- Default file message -->
          <div v-else>
            <p class="text-muted">No preview available for this file type.</p>
          </div>
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
            <!-- Icon / Preview -->
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

            <!-- Name -->
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
//import "aframe"; // Import A-Frame for VR

export default {
  data() {
    return {
      items: [], // List of files and directories
      history: [], // History for navigating backward
      selectedFile: null, // Selected file for preview
      vrMode: false, // controls VR toggle
    };
  },
  computed: {
    currentPath() {
      return this.$route.query.dir || "/";
    },
  },
  watch: {
    "$route.query.dir": "fetchItems",
  },
  created() {
    this.fetchItems();
  },
  methods: {
    // Fetch items for the current directory
    async fetchItems() {
      try {
        this.items = await this.$service.getX("vdo/list", {
          dir: this.currentPath,
        });
        this.selectedFile = null; // Reset preview on directory change
      } catch (err) {
        console.error("Failed to load items:", err);
      }
    },

    // Navigate to a selected folder
    navigateTo(folderName) {
      const newPath = `${this.currentPath.replace(/\/$/, "")}/${folderName}`;
      this.$router.push({ query: { dir: newPath } });
    },

    // Go back to the previous folder
    goBack() {
      if (this.currentPath === "/" || this.currentPath === "") return;

      const parts = this.currentPath.split("/").filter(Boolean);
      parts.pop(); // remove last folder
      const parentPath = "/" + parts.join("/");

      this.$router.push({ query: { dir: parentPath || "/" } });
    },

    // Select a file to preview
    selectFile(file) {
      if (file.type === "file") {
        this.selectedFile = file;
        //this.vrMode = false; // reset VR on new selection
      }
    },

    // Check if a video is a VR360 video
    isVR360Video(file) {
      // Example: Check for file name or metadata that suggests it's a VR360 video
      return file.url.includes("360") || file.media_type === "VIDEO"; // Adjust based on your conditions
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

img {
  max-height: 400px;
  object-fit: contain;
}

video {
  max-height: 400px;
  object-fit: contain;
}
</style>
