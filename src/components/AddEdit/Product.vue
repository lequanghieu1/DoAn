<template>
  <b-container>
    <b-form>
      <p>Sản phẩm</p>
      <b-form-select
        class="select"
        v-model="masp"
        :options="listProduct"
      ></b-form-select>
      <p>Số lượng</p>
      <b-form-input v-model="soluong" :min="1" type="number" required></b-form-input>
      <div v-if="dongia">
        <p>Đơn giá</p>
        <b-form-input
          disabled
          v-model="dongia"
          type="Number"
          required
        ></b-form-input>
      </div>
      <div class="d-flex justify-content-end">
        <b-button
          @click="onSubmit"
          variant="primary"
          :disabled="dis || !soluong"
          class="mt-3"
          >Done</b-button
        >
      </div>
    </b-form>
  </b-container>
</template>
<script>
import { HTTP } from "../../API/http_common";
export default {
  async created() {
    await HTTP.get(`/sanpham`).then((res) => {
      this.tempSP = res.data;
      this.listProduct = res.data.map((e) => {
        return {
          value: e.masp,
          text: e.tensp,
        };
      });
    });
  },
  watch: {
    masp: {
      handler() {
        this.dongia = this.tempSP.find((e) => {
          return this.masp === e.masp;
        }).dongia;
      },
    },
  },
  data() {
    return {
      masp: "",
      soluong: null,
      dongia: null,
      listProduct: [],
      tempSP: [],
      dis: false,
    };
  },
  methods: {
    onSubmit() {
      this.$emit("done1SP", {
        masp: this.masp,
        soluong: this.soluong,
        dongia: this.dongia,
      });
      this.dis = true;
    },
  },
};
</script>