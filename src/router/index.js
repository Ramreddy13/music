import { createRouter, createWebHistory } from "vue-router";
const HomeView = () => import("../views/HomeView.vue");

const AboutView = () => import("../views/AboutView.vue");
const ManageSongs = () => import("../views/ManageSongs.vue");
const SongView = () => import("../views/SongView.vue");
import { useUserStore } from "../stores/user";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    name: "manage",
    // alias: "/manage",
    path: "/manage-music",
    component: ManageSongs,
    beforeEach: (to, from, next) => {
      console.log("Manage Sgaurd route");

      next();
    },
    requireAuth: true,
  },
  //you can use alias
  {
    path: "/manage",
    redirect: { name: "manage" },
  },
  {
    name: "song",
    path: "/song/:id",
    component: SongView,
  },
  {
    path: "/:catchAll(.*)*",
    redirect: { name: "home" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: "text-yellow-500",
});

router.beforeEach((to, from, next) => {
  console.log("gaurd route");
  if (!to.meta.requireAuth) {
    next();
    return;
  }
  const store = useUserStore();
  if (store.isLoggedIn) {
    next();
  } else {
    next({ name: "home" });
  }
});
export default router;
