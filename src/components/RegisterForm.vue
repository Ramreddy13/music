<template>
  <div
    class="text-white text-center p-4 mb-4 rounded font-bold"
    v-if="reg_show_alert"
    :class="reg_alert_variant"
  >
    {{ reg_alert_msg }}
  </div>
  <vee-form
    :validation-schema="schema"
    @submit="submitRegistration"
    :initial-values="userData"
  >
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <vee-field
        type="text"
        name="name"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <ErrorMessage class="text-red-600" name="name" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        type="email"
        name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <vee-field
        type="number"
        name="age"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage class="text-red-600" name="age" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field name="password" :bails="false" v-slot="{ field, errors }">
        <input
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
          v-bind="field"
        />
        <div class="text-red-600" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </vee-field>
      <ErrorMessage class="text-red-600" name="password" />
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <vee-field
        type="password"
        name="confirm_password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <ErrorMessage class="text-red-600" name="confirm_password" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <vee-field
        as="select"
        name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Antartica">Antartica</option>
      </vee-field>
      <ErrorMessage class="text-red-600" name="country" />
    </div>
    <!-- Faviorate Singer -->
    <div class="mb-3">
      <label class="inline-block mb-2">Faviorate Singer</label>
      <vee-field
        as="select"
        name="singer"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="A.R.Rahaman">A.R.Rahaman</option>
        <option value="Ajith Singh">Ajith Singh</option>
        <option value="Anirudh">Anirudh</option>
        <option value="Karthik">Karthik</option>
      </vee-field>
      <ErrorMessage class="text-red-600" name="singer" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field
        name="tos"
        value="0"
        type="checkbox"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      />
      <label class="inline-block">Accept terms of service</label>
      <br />
      <ErrorMessage class="text-red-600" name="tos" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="reg_in_submission"
    >
      Submit
    </button>
  </vee-form>
</template>

<!-- <script>
import { mapActions } from "pinia";
import useUserStore from "../stores/user";
export default {
  name: "RegisterForm",
  data() {
    return {
      schema: {
        name: "required|min:3|max:100|aplha_spaces",
        email: "required|min:8|max:50|email",
        age: "required|min_value:12|max_value:150",
        password: "required|min:3|max:100|excluded:password",
        confirm_password: "password_missmatched:@password",
        country: "required|country_excluded:Antartica",
        singer: "",
        tos: "tos",
      },

      userData: {
        singer: "Anirudh",
        country: "USA",
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: "bg-red-500",
      reg_alert_msg: "Please Wait! Your account is been created.",
    };
  },

  methods: {
    ...mapActions(useUserStore, {
      createUser: "register",
    }),
    async register(values) {
      this.reg_in_submission = true;
      this.reg_show_alert = true;
      this.reg_alert_variant = "bg-blue-500";
      this.reg_alert_msg = "Please Wait! Your account is been created.";

      try {
        console.log(values);
        await this.createUser(values);
        this.reg_alert_variant = "bg-green-500";
        this.reg_alert_msg = "Success! Your account is been created.";
      } catch (error) {
        this.reg_in_submission = false;
        this.reg_alert_variant = "bg-red-500";
        this.reg_alert_msg = error.message;
        console.log(error);
      }
    },
  },
};
</script> -->
<!-- <script>
import { mapActions, mapState } from "pinia";
import { useUserStore } from "../stores/user";

export default {
  name: "RegisterForm",
  data() {
    return {
      schema: {
        name: "required|min:3|max:100|aplha_spaces",
        email: "required|min:8|max:50|email",
        age: "required|min_value:12|max_value:150",
        password: "required|min:3|max:100|excluded:password",
        confirm_password: "password_missmatched:@password",
        country: "required|country_excluded:Antartica",
        singer: "",
        tos: "tos",
      },
      userData: {
        singer: "Anirudh",
        country: "USA",
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: "bg-blue-500",
      reg_alert_msg: "Please Wait! Your account is being created.",
    };
  },
  computed: {
    ...mapState(useUserStore, ["isLoggedIn", "error"]),
  },
  methods: {
    ...mapActions(useUserStore, ["register"]),

    async register(values) {
      this.reg_in_submission = true;
      this.reg_show_alert = true;
      this.reg_alert_variant = "bg-blue-500";
      this.reg_alert_msg = "Please Wait! Your account is being created.";

      try {
        await this.register(values);
        this.reg_alert_variant = "bg-green-500";
        this.reg_alert_msg = "Success! Your account has been created.";
      } catch (error) {
        this.reg_in_submission = false;
        this.reg_alert_variant = "bg-red-500";
        this.reg_alert_msg =
          error.message || "Registration failed. Please try again.";
        console.error(error);
      }
    },
  },
};
</script> -->
<script>
import { mapActions } from "pinia";
import { useUserStore } from "../stores/user";

export default {
  name: "RegisterForm",
  data() {
    return {
      schema: {
        name: "required|min:3|max:100|aplha_spaces",
        email: "required|min:8|max:50|email",
        age: "required|min_value:12|max_value:150",
        password: "required|min:3|max:100|excluded:password",
        confirm_password: "password_missmatched:@password",
        country: "required|country_excluded:Antartica",
        singer: "",
        tos: "tos",
      },
      userData: {
        singer: "Anirudh",
        country: "USA",
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: "bg-blue-500",
      reg_alert_msg: "Please Wait! Your account is being created.",
    };
  },
  methods: {
    ...mapActions(useUserStore, {
      createUser: "register",
    }),
    async submitRegistration(values) {
      this.reg_in_submission = true;
      this.reg_show_alert = true;
      this.reg_alert_variant = "bg-blue-500";
      this.reg_alert_msg = "Please Wait! Your account is being created.";

      try {
        await this.createUser(values);
        this.reg_in_submission = false;
        this.reg_alert_variant = "bg-green-500";
        this.reg_alert_msg = "Success! Your account has been created.";
      } catch (error) {
        this.reg_in_submission = false;
        this.reg_alert_variant = "bg-red-500";
        this.reg_alert_msg =
          error.message || "Registration failed. Please try again.";
        console.error(error);
      }
      window.location.reload();
    },
  },
};
</script>
