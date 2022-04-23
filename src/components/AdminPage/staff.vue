<template>
  <Table
    :items="items"
    :fields="fields"
    @del="deleteCustomer"
    :isStaff="isStaff"
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
      isStaff: true,
      items: [],
      fields: [
        {
          key: "manv",
          label: "Mã KH",
        },
        {
          key: "name",
          label: "Họ tên",
        },
        {
          key: "diachi",
          label: "Địa chỉ",
          class: "text-center",
        },
        {
          key: "gender",
          label: "Giới tính",
        },
        {
          key: "email",
          label: "email",
        },
        {
          key: "sdt",
          label: "Số đt",
        },
        {
          key: "email",
          label: "Email",
        },
        {
          key: "luong",
          label: "Lương",
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
      await HTTP.get(`/nhanvien`).then((res) => {
        this.items = res.data;
        this.$store.dispatch("setCus", res.data);
      });
    },
    async handleAdd() {
      await this.reload();
    },
    async deleteCustomer(id) {
      await HTTP.delete(`/nhanvien/${id.taikhoan.matk}`);
      await this.reload();
    },
  },
};
</script>