<template>
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link
        class="text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'home' }"
        extract-active-class="no active"
        >Music</router-link
      >

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <li>
            <router-link class="text-white px-2" to="/about">About</router-link>
          </li>
          <!-- Navigation Links -->
          <li v-if="!userStore.isLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuth"
              >Login / Register</a
            >
          </li>
          <template v-else>
            <li>
              <router-link class="px-2 text-white" to="/manage"
                >Manage</router-link
              >
            </li>
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="signOutHome"
                >Logout</a
              >
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import useModalStore from "../stores/modal";
import { mapStores } from "pinia";
import { useUserStore } from "../stores/user";
export default {
  name: "AppHeader",
  computed: {
    ...mapStores(useModalStore),
    ...mapStores(useUserStore),
  },
  methods: {
    toggleAuth() {
      this.modalStore.isOpen = !this.modalStore.isOpen;
      console.log(this.modalStore.isOpen);
    },
    signOutHome() {
      this.userStore.signOut();
      if (this.$route.name === "manage") {
        this.$router.push({ name: "home" });
      }
    },
  },
};
</script>
