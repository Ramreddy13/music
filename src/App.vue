<template>
  <app-header />

  <router-view></router-view>
  <!-- Player -->
  <app-player></app-player>

  <!-- Auth Modal -->
  <app-auth></app-auth>
</template>
<script>
import AppHeader from "./components/AppHeader.vue";
import AppPlayer from "./components/AppPlayer.vue";
import AppAuth from "./components/AppAuth.vue";
import { mapWritableState } from "pinia";
import { useUserStore } from "./stores/user";
import { auth } from "./includes/firebase";
auth;
export default {
  name: "App",
  components: { AppHeader, AppPlayer, AppAuth },
  computed: {
    ...mapWritableState(useUserStore, ["isLoggedIn"]),
  },
  created() {
    if (auth.currentUser) {
      this.isLoggedIn = true;
    }
  },
};
</script>
