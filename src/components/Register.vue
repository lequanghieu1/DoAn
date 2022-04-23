<template>
  <v-app>
    <v-content>
      <div class="top vuetify" style="background-color: green"></div>
      <div class="main">
        <v-card width="500" class="mx-auto mt-9">
          <v-card-title>Đăng ký tài khoản</v-card-title>
          <v-card-text>
            <form>
              <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                label="Email"
                required
                @input="delayTouch($v.email)"
                @blur="$v.email.$touch()"
              ></v-text-field>
              <v-text-field
                v-model="userName"
                :error-messages="requireErrors($v.userName)"
                label="User Name"
                required
                @input="delayTouch($v.userName)"
                @blur="$v.userName.$touch()"
              ></v-text-field>
              <v-text-field
                v-model="first"
                :error-messages="requireErrors($v.first)"
                label="First Name"
                required
                @input="delayTouch($v.first)"
                @blur="$v.first.$touch()"
              ></v-text-field>
              <v-text-field
                v-model="last"
                :error-messages="requireErrors($v.last)"
                label="Last Name"
                required
                @input="delayTouch($v.last)"
                @blur="$v.last.$touch()"
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
              <v-text-field
                v-model="phone"
                :error-messages="requireErrors($v.phone)"
                label="Phone"
                required
                @input="delayTouch($v.phone)"
                @blur="$v.phone.$touch()"
              ></v-text-field>

              <v-text-field
                v-model="address"
                :error-messages="requireErrors($v.address)"
                label="Address"
                required
                @input="delayTouch($v.address)"
                @blur="$v.address.$touch()"
              ></v-text-field>
              <v-radio-group v-model="gender" row>
                <template v-slot:label>
                  <div>Gender :</div>
                </template>
                <v-radio label="Male" :value="0"></v-radio>
                <v-radio label="Female" :value="1"></v-radio>
              </v-radio-group>
            </form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="info" @click="submit">Đăng ký</v-btn>
            <v-btn color="success" @click="login">Đăng nhập</v-btn>
          </v-card-actions>
        </v-card>
        <spinner v-if="this.$store.state.users.is_login" />
      </div>
      <div class="bot vuetify" style="background-color: green"></div>
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
    email: { required, email },
    pass: { required, minLength: minLength(3) },
    phone: { required },
    first: { required },
    last: { required },
    userName: { required },
    address: { required },
  },

  methods: {
    delayTouch($v) {
      $v.$reset();
      if (touchMap.has($v)) {
        clearTimeout(touchMap.get($v));
      }
      touchMap.set($v, setTimeout($v.$touch, 1000));
    },
    requireErrors(field) {
      const errors = [];
      if (!field.$dirty) return errors;
      !field.required && errors.push("This field is required");
      return errors;
    },
    async submit() {
      this.$v.$touch();
      if (this.email && this.pass && this.address && this.userName && this.last && this.first && this.phone) {
        await HTTP.post("/register", {
          username: this.userName,
          password: this.pass,
          ho: this.last,
          ten: this.first,
          gioitinh: this.gender,
          sdt: this.phone,
          email: this.email,
          diachi: this.address,
        }).then((res) => {
          if (res.status === 200) {
            this.$router.push("/");
          } else {
            alert("Đăng ký thất bại");
          }
        });
      }
      {
            alert("Vui lòng điền đủ các trường bắt buộc");
          }
    },
    login() {
      this.$router.push("/");
    },
  },
  data() {
    return {
      showPassword: false,
      email: "",
      pass: "",
      address: "",
      last: "",
      first: "",
      userName: "",
      phone: "",
      gender: 0,
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
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
  },
};
</script>

<style lang='scss' src='../style.scss' scoped/>
