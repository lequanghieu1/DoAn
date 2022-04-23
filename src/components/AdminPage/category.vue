<template>
  <Table
    :items="items"
    :fields="fields"
    @del="deleteProduct"
    :isCategory="isCategory"
    v-on="$listeners"
    @add="handleAdd"
  />
</template>
<script>
import Table from "../table.vue";
import { HTTP } from "../../API/http_common";
export default {
  components: { Table },
  data() {
    return {
      items: [],
      fields: [
        {
          key: "madm",
          label: "Mã danh mục",
        },
        {
          key: "tendm",
          label: "Tên danh mục",
        },
        { key: "actions", label: "Actions" },
      ],
      isCategory: true,
    };
  },
  created() {
    this.reload();
  },
  methods: {
    async reload() {
      await HTTP.get(`/danhmuc`).then((res) => {
        this.items = res.data;
      });
    },
    handleAdd() {
      this.reload();
    },
    async deleteProduct(id) {
      try {
        await HTTP.delete(`/danhmuc/${id.madm}`);
        await this.reload();
      } catch (e) {
        console.log(e);
        alert("Danh mục có tồn tại sản phẩm, không thể xóa");
      }
    },
  },
};
</script>