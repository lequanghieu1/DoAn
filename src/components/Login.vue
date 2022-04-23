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
                :error-messages="userErrors"
                label="Username"
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
            <v-btn color="blue-grey" @click="continues">tiếp tục lướt web </v-btn>
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
import { required, minLength } from "vuelidate/lib/validators";
import { HTTP } from "../API/http_common";
export default {
  components: { spinner },
  mixins: [validationMixin],
  validations: {
    name: { required },
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
      HTTP.post("/login", {
        username: this.name,
        password: this.pass,
      })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("token", JSON.stringify(res.data));
            if (res.data.quyen.maquyen === 2) {
              this.$router.push("/user");
            } else {
              this.$router.push("/admin");
            }
          }
        })
        .catch(() => {
          alert("Đăng nhập thất bại");
        });
    },
    register() {
      this.$router.push("/register");
    },
    continues() {
      this.$router.push("/user");
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
    userErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("Username is required");
      return errors;
    },
  },
};
</script>

<style lang='scss' src='../style.scss' scoped/>
