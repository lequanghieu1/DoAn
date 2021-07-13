<template>
  <v-app>
    <v-content>
      <div class="top vuetify"></div>
      <div class="main">
        <v-card width="500" class="mx-auto mt-9">
          <v-card-title>Đăng nhập</v-card-title>
          <v-card-text>
            <form>
              <v-text-field
                v-model="name"
                :error-messages="emailErrors"
                label="Email"
                required
                @input="delayTouch($v.name)"
                @blur="$v.name.$touch()"
              ></v-text-field>
              <v-text-field
                v-model="pass"
                type="password"
                :error-messages="passErrors"
                label="Password"
                required
                @input="delayTouch($v.pass)"
                @blur="$v.pass.$touch()"
              ></v-text-field>
            </form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="info" @click="submit">Đăng nhập</v-btn>
            <v-btn color="success" @click="register">Đăng ký </v-btn>
          </v-card-actions>
        </v-card>
        <spinner v-if="this.$store.state.users.is_login" />
      </div>
      <div class="bot vuetify"></div>
    </v-content>
  </v-app>
</template>

<script>
import spinner from "./spinner";
import { validationMixin } from "vuelidate";
const touchMap = new WeakMap();
import { required, minLength, email } from "vuelidate/lib/validators";
import { HTTP } from "../API/http_common";
export default {
  components: { spinner },
  mixins: [validationMixin],
  validations: {
    name: { required, email },
    pass: { required, minLength: minLength(3) },
  },

  methods: {
    delayTouch($v) {
      $v.$reset();
      if (touchMap.has($v)) {
        clearTimeout(touchMap.get($v));
      }
      touchMap.set($v, setTimeout($v.$touch, 1000));
    },
    submit() {
      this.$v.$touch();
      HTTP.post("/user/sign-in", {
        email: this.name,
        password: this.pass,
      })
        .then((res) => {
          if (res.data.code === 200) {
            this.$router.push("/user");
            localStorage.setItem("token", res.data.data.token);
          }
        })
        .catch(() => {
           alert("Đăng nhập thất bại");
        });
    },
    register() {
      this.$router.push("/register");
    },
  },
  data() {
    return {
      showPassword: false,
      name: "",
      pass: "",
    };
  },
  computed: {
    passErrors() {
      const errors = [];
      if (!this.$v.pass.$dirty) return errors;
      !this.$v.pass.minLength &&
        errors.push("password must be at least 3 characters long");
      !this.$v.pass.required && errors.push("password is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.email && errors.push("Must be valid e-mail");
      !this.$v.name.required && errors.push("E-mail is required");
      return errors;
    },
  },
};
</script>

<style lang='scss' src='../style.scss' scoped/>
