// import { defineStore } from "pinia";
// import { auth, userCollection } from "../includes/firebase";

// export const useUserStore = defineStore("modal", {
//   state: () => ({
//     isLoggedIn: false,
//   }),
//   actions: {
//     async register(values) {
//       let usercred = await auth.createUserWithEmailAndPassword(
//         values.email,
//         values.password
//       );
//       await userCollection.add({
//         name: values.name,
//         email: values.email,
//         age: values.age,
//         country: values.country,
//         singer: values.singer,
//       });
//       this.isLoggedIn = true;
//       return usercred;
//     },
//   },
// });

// import { defineStore } from "pinia";
// import { auth, userCollection } from "../includes/firebase";

// export const useUserStore = defineStore("modal", {
//   state: () => ({
//     isLoggedIn: false,
//     error: null,
//   }),
//   actions: {
//     async register(values) {
//       try {
//         this.error = null;
//         const usercred = await auth.createUserWithEmailAndPassword(
//           values.email,
//           values.password
//         );
//         await userCollection.add({
//           name: values.name,
//           email: values.email,
//           age: values.age,
//           country: values.country,
//           singer: values.singer,
//         });
//         this.isLoggedIn = true;

//         return usercred;
//       } catch (error) {
//         this.error = error;
//         throw error;
//       }
//     },
//   },
// });

import { defineStore } from "pinia";
import { auth, userCollection } from "../includes/firebase";

export const useUserStore = defineStore("user", {
  state: () => ({
    isLoggedIn: false,
  }),
  actions: {
    async register(values) {
      const usercred = await auth.createUserWithEmailAndPassword(
        values.email,
        values.password
      );

      await userCollection.doc(usercred.user.uid).set({
        name: values.name,
        email: values.email,
        age: values.age,
        country: values.country,
        singer: values.singer,
      });
      await usercred.user.updateProfile({
        displayName: values.name,
      });
      this.isLoggedIn = true;
    },
    async authenticate(values) {
      await auth.signInWithEmailAndPassword(values.email, values.password);

      this.isLoggedIn = true;
    },
    async signOut() {
      await auth.signOut();
      this.isLoggedIn = false;
    },
  },
});
