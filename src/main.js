import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import VeeValidate from "./includes/VeeValidate";
import { auth } from "./includes/firebase";
import Icon from "./directives/icon";

let app;
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);

    app.use(createPinia());
    app.use(router);
    app.use(VeeValidate);
    app.directive("icon", Icon);

    app.mount("#app");
  }
});
