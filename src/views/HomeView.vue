<template>
  <!-- Introduction -->
  <section class="mb-8 py-20 text-white text-center relative">
    <!-- Background div with correct z-index -->
    <div
      class="absolute inset-0 w-full h-full bg-contain introduction-bg"
      style="background-image: url('/assets/img/header.png')"
    ></div>

    <!-- Content with higher z-index -->
    <div class="container mx-auto relative z-10">
      <div class="text-white main-header-content">
        <h1 class="font-bold text-5xl mb-5">Listen to Great Music!</h1>
        <p class="w-full md:w-8/12 mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et
          dolor mollis, congue augue non, venenatis elit. Nunc justo eros,
          suscipit ac aliquet imperdiet, venenatis et sapien. Duis sed magna
          pulvinar, fringilla lorem eget, ullamcorper urna.
        </p>
      </div>
    </div>

    <img
      class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full z-10"
      src="/assets/img/introduction-music.png"
    />
  </section>

  <!-- Main -->
  <section class="container mx-auto">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div
        class="px-6 pt-6 pb-5 font-bold border-b border-gray-200"
        v-icon.right.yellow="'headphones-alt'"
      >
        <span class="card-title">Songs</span>
        <!-- Icon -->
      </div>
      <!-- Playlist -->
      <ol id="playlist">
        <app-song-items v-for="song in songs" :key="song.docID" :song="song" />
      </ol>
      <!-- .. end Playlist -->
    </div>
  </section>
</template>

<script>
import { songsCollection } from "../includes/firebase";
import AppSongItems from "../components/SongItems.vue";
export default {
  name: "HomeView",
  data() {
    return {
      songs: [],
      maxlimit: 5,
      pendingReq: false,
    };
  },
  components: {
    AppSongItems,
  },
  async created() {
    this.getSongs();

    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window;
      const bottomOfWindow =
        Math.round(scrollTop) + innerHeight === offsetHeight;
      if (bottomOfWindow) {
        this.getSongs();
      }
    },
    async getSongs() {
      if (this.pendingReq) {
        return;
      }
      this.pendingReq = true;
      let snapshots;
      if (this.songs.length) {
        const lastItem = await songsCollection
          .doc(this.songs[this.songs.length - 1].docID)
          .get();
        snapshots = await songsCollection
          .orderBy("modified_name")
          .startAfter(lastItem)
          .limit(this.maxlimit)
          .get();
      } else {
        snapshots = await songsCollection
          .orderBy("modified_name")
          .limit(this.maxlimit)
          .get();
      }

      snapshots.forEach((document) => {
        this.songs.push({
          docID: document.id,
          ...document.data(),
        });
      });
      this.pendingReq = false;
    },
  },
};
</script>
