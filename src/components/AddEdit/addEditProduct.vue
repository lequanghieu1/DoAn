<template>
  <b-container>
    <b-form @submit="onSubmit">
      <div v-for="(user, i) in product" :key="i">
        <b-form-group :label="user.label" :label-for="`input-${i}`">
          <b-form-select
            class="select"
            v-if="user.key === 'danhmuc'"
            v-model="objProducts[user.key]"
            :options="danhmuc"
          ></b-form-select>
          <b-form-input
            v-else
            :id="`input-${i}`"
            v-model="objProducts[user.key]"
            d="`input-${i}`"
            :disabled="
              $store.state.users.addEdit === false && user.key === 'masp'
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
import { objProducts, product } from "../AdminPage/constant";
import { HTTP } from "../../API/http_common";
export default {
  data() {
    return {
      objProducts,
      product,
      danhmuc: [],
    };
  },
  props: {
    items: {
      type: Object,
      default: () => {},
    },
  },
  async created() {
    if (this.$store.state.users.addEdit === false) {
      this.objProducts = this.items;
    }
    await HTTP.get(`/danhmuc`).then((res) => {
      this.danhmuc = res.data.map((e) => {
        return {
          value: { madm: e.madm, tendm: e.tendm },
          text: e.tendm,
        };
      });
    });
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      if (this.$store.state.users.addEdit === true) {
        try {
          await HTTP.post("/sanpham", this.objProducts).then((res) => {
            if (res.status === 200) {
              this.$emit("done");
            } else {
              alert("Thêm sản phẩm thất bại");
            }
          });
        } catch (error) {
          alert("1 trường đã tồn tại,vui lòng đổi");
        }
      } else if (this.$store.state.users.addEdit === false) {
        try {
          await HTTP.put("/sanpham", this.objProducts).then((res) => {
            if (res.status === 200) {
              this.$emit("done");
            } else {
              alert("Sửa sản phẩm thất bại");
            }
          });
        } catch (error) {
          alert("1 trường đã tồn tại,vui lòng đổi");
        }
      }
    },
  },
};
</script>
<style>
.select {
  width: 424px;
  height: 57px;
  border: 1px solid rgb(185, 184, 184);
}
</style>