<template>
  <b-container>
    <b-form @submit="onSubmit">
      <div v-for="(user, i) in staff" :key="i">
        <b-form-group :label="user.label" :label-for="`input-${i}`">
          <v-radio-group
            v-if="user.key === 'gioitinh'"
            :id="`input-${i}`"
            v-model="objStaff[user.key]"
            required
            row
          >
            <v-radio label="Male" :value="0"></v-radio>
            <v-radio label="Female" :value="1"></v-radio>
          </v-radio-group>
          <b-form-input
            v-else
            :id="`input-${i}`"
            v-model="objStaff[user.key]"
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
import { objStaff, staff } from "../AdminPage/constant";
import { HTTP } from "../../API/http_common";
export default {
  data() {
    return {
      objStaff,
      staff,
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
      this.objStaff = this.items;
      this.objStaff.username = this.items.taikhoan.username;
      this.objStaff.password = this.items.taikhoan.password;
       delete this.objCustomer.taikhoan;
    }
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      if (this.$store.state.users.addEdit === true) {
        try {
          await HTTP.post("/nhanvien", this.objStaff).then((res) => {
            if (res.status === 200) {
              this.$emit("done");
            } else {
              alert("Thêm nhân viên thất bại");
            }
          });
        } catch (error) {
          alert("Username đã tồn tại,vui lòng đổi");
        }
      } else if (this.$store.state.users.addEdit === false) {
        try {
          await HTTP.put("/nhanvien", this.objStaff).then((res) => {
            if (res.status === 200) {
              this.$emit("done");
            } else {
              alert("Sửa nhân viên thất bại");
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