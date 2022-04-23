<template>
  <b-container>
    <b-form @submit="onSubmit">
      <div v-for="(user, i) in customer" :key="i">
        <b-form-group :label="user.label" :label-for="`input-${i}`">
          <v-radio-group
            v-if="user.key === 'gioitinh'"
            :id="`input-${i}`"
            v-model="objCustomer[user.key]"
            required
            row
          >
            <v-radio label="Male" :value="0"></v-radio>
            <v-radio label="Female" :value="1"></v-radio>
          </v-radio-group>
          <b-form-input
            v-else
            :id="`input-${i}`"
            v-model="objCustomer[user.key]"
            :disabled="
              $store.state.users.addEdit === false && user.key === 'username'
            "
            :type="user.type"
            :placeholder="`Nhập ${user.label}`"
            required
          ></b-form-input>
        </b-form-group>
      </div>
      <div class="d-flex justify-content-end">
        <b-button type="submit" variant="primary" class="mt-3">Submit</b-button>
      </div>
    </b-form>
  </b-container>
</template>
<script>
import { objCustomer, customer } from "../AdminPage/constant";
import { HTTP } from "../../API/http_common";
export default {
  data() {
    return {
      objCustomer,
      customer,
    };
  },
  props: {
    items: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    if (this.$store.state.users.addEdit === false) {
      this.objCustomer = this.items;
      this.objCustomer.username = this.items.taikhoan.username;
      this.objCustomer.password = this.items.taikhoan.password;
      delete this.objCustomer.khachhang;
    }
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      if (this.$store.state.users.addEdit === true) {
        try {
          await HTTP.post("/register", this.objCustomer).then((res) => {
            if (res.status === 200) {
              this.$emit("done");
            } else {
              alert("Thêm khách thất bại");
            }
          });
        } catch (error) {
          alert("Username đã tồn tại,vui lòng đổi");
        }
      } else if (this.$store.state.users.addEdit === false) {
        try {
          await HTTP.put("/khachhang", this.objCustomer).then((res) => {
            if (res.status === 200) {
              this.$emit("done");
            } else {
              alert("Sửa khách thất bại");
            }
          });
        } catch (error) {
          alert("Username đã tồn tại,vui lòng đổi");
        }
      }
    },
  },
};
</script>