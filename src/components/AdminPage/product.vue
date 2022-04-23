<template>
  <Table :items="items" :fields="fields" @del="deleteProduct" :isPro="isPro" @add="handleAdd" />
</template>
<script>
import Table from "../table.vue";
import { HTTP } from "../../API/http_common";
export default {
  components: { Table },
  props: {
    SPCate: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isPro:true,
      items: [],
      fields: [
        {
          key: "masp",
          label: "Mã SP",
        },
        {
          key: "danhmuc.tendm",
          label: "Danh mục",
        },
        {
          key: "tensp",
          label: "Tên SP",
        },
        {
          key: "dongia",
          label: "Giá",
        },
        {
          key: "soluong",
          label: "Số lượng",
          class: "text-center",
        },
        {
          key: "mota_ngan",
          label: "Mô tả",
        },
        {
          key: "photo",
          label: "Hình ảnh",
        },
        { key: "actions", label: "Actions" },
      ],
    };
  },
  created() {
    this.reload();
  },
  methods: {
    async reload() {
      if (!this.SPCate) {
        await HTTP.get(`/sanpham`).then((res) => {
          this.items = res.data;
        });
      } else {
        await HTTP.get(`/sanpham/danhmuc/${this.SPCate}`).then((res) => {
          this.items = res.data;
        });
      }
    },
    handleAdd(){
      this.reload()
    },
    async deleteProduct(id) {
      try {
        await HTTP.delete(`/sanpham/${id.masp}`);
        await this.reload();
      } catch (e) {
        console.log(e);
        alert("Sản phẩm đã được mua, không thể xóa");
      }
    },
  },
};
</script>