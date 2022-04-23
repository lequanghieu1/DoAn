<template>
  <Table
    :items="items"
    :fields="fields"
    @del="deleteOrder"
    :isOrder="isOrder"
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
          key: "madh",
          label: "Mã đơn",
        },
        {
          key: "khachhang.makh",
          label: "Mã khách",
        },
        {
          key: "nameKH",
          label: "Tên khách",
        },
        {
          key: "ngaydat",
          label: "Ngày đặt",
          class: "text-center",
        },
        {
          key: "tongtien",
          label: "Tổng tiền",
        },
        {
          key: "trangthai",
          label: "Trạng Thái",
        },
        { key: "actions", label: "Actions" },
      ],
      isOrder: true,
    };
  },
  created() {
    this.reload();
  },
  methods: {
    async reload() {
      await HTTP.get(`/donhang`).then((res) => {
        this.items = res.data;
      });
    },
    async handleAdd() {
      await this.reload();
    },
    async deleteOrder(id) {
      await HTTP.delete(`/donhang/${id.madh}`);
      await this.reload();
    },
  },
};
</script>