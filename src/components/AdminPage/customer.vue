<template>
  <Table
    :items="items"
    :fields="fields"
    @del="deleteCustomer"
    :isCus="isCus"
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
      isCus: true,
      items: [],
      fields: [
        {
          key: "makh",
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
        { key: "actions", label: "Actions" },
      ],
    };
  },
  created() {
    this.reload();
  },
  methods: {
    async reload() {
      await HTTP.get(`/khachhang`).then((res) => {
        this.items = res.data;
        this.$store.dispatch("setCus", res.data);
      });
    },
    async handleAdd() {
      await this.reload();
    },
    async deleteCustomer(id) {
      await HTTP.delete(`/khachhang/${id.taikhoan.matk}`);
      await this.reload();
    },
  },
};
</script>