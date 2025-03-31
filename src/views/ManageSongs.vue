<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <app-upload ref="upload" :addSong="addSong" />
      </div>
      <div class="col-span-2">
        <div
          class="bg-white rounded border border-gray-200 relative flex flex-col"
        >
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i
              class="fa fa-compact-disc float-right text-green-400 text-2xl"
            ></i>
          </div>
          <div class="p-6">
            <app-songs
              v-for="(song, i) in songs"
              :key="song.docID"
              :song="song"
              :updateSong="updateSong"
              :index="i"
              :removeSong="removeSong"
              :updateUnsafe="updateUnsafe"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useUserStore } from "../stores/user";
import AppUpload from "../components/UploadFile.vue";
import AppSongs from "../components/SongsList.vue";
import { songsCollection, auth } from "../includes/firebase";
export default {
  name: "ManageSongs",
  components: { AppUpload, AppSongs },
  data() {
    return {
      songs: [],
      unSaved: false,
    };
  },
  async created() {
    const sht = await songsCollection
      .where("uid", "==", auth.currentUser.uid)
      .get();
    sht.forEach(this.addSong);
  },
  beforeRouteEnter(to, from, next) {
    const store = useUserStore();
    if (store.isLoggedIn) {
      next();
    } else {
      next({ name: "home" });
    }
  },
  beforeRouteleave(to, from, next) {
    if (!this.unSaved) {
      next();
    } else {
      const leave = alert(
        "You have unsaved changes. Are you sure you want to leave?"
      );
      next(leave);
    }
  },
  methods: {
    updateSong(i, values) {
      this.songs[i].modified_name = values.modified_name;
      this.songs[i].genre = values.genre;
    },
    removeSong(i) {
      this.songs.splice(i, 1);
    },
    async addSong(document) {
      let song;
      if (typeof document.data === "function") {
        song = { ...document.data(), docID: document.id };
      } else {
        const docSnapshot = await document.get();
        song = { ...docSnapshot.data(), docID: document.id };
      }
      this.songs.push(song);
    },
    updateUnsafe(values) {
      this.unSaved = values;
    },
  },
};
</script>
