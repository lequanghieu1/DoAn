<template>
  <b-container>
    <b-form @submit="onSubmit">
      <div v-for="(user, i) in category" :key="i">
        <b-form-group :label="user.label" :label-for="`input-${i}`">
          <b-form-input
            :id="`input-${i}`"
            v-model="objCate[user.key]"
            :disabled="
              $store.state.users.addEdit === false && user.key === 'madm'
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
import { objCate, category } from "../AdminPage/constant";
import { HTTP } from "../../API/http_common";
export default {
  data() {
    return {
      objCate,
      category,
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
      this.objCate = this.items;
    }
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      if (this.$store.state.users.addEdit === true) {
        try {
          await HTTP.post("/danhmuc", this.objCate).then((res) => {
            if (res.status === 200) {
              this.$emit("done");
            } else {
              alert("Thêm danh mục thất bại");
            }
          });
        } catch (error) {
          alert("Danh mục đã tồn tại,vui lòng đổi");
        }
      } else if (this.$store.state.users.addEdit === false) {
        try {
          await HTTP.put("/danhmuc", this.objCate).then((res) => {
            if (res.status === 200) {
              this.$emit("done");
            } else {
              alert("Sửa danh mục thất bại");
            }
          });
        } catch (error) {
          alert("Danh mục đã tồn tại,vui lòng đổi");
        }
      }
    },
  },
};
</script>