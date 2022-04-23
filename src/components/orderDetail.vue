<template>
  <article>
    <div class="d-flex justify-content-center">
      <div style="width: 1000px">
        <div class="d-flex justify-content-between">
          <span>Ngày đặt : {{ dataTable.ngaydat | moment("DD/MM/YYYY") }}</span>
          <span>Tổng tiền : {{ `${formatCash(dataTable.tongtien)}đ` }}</span>
          <span>Trạng Thái : {{ handleStatus(dataTable.trangthai).text }}</span>
        </div>

        <b-table small striped hover :fields="fields" :items="items" class="mt-3">
          <template #cell(price)="data">
            {{ formatCash(data.value) }}
          </template>
        </b-table>
      </div>
    </div>
  </article>
</template>

<script>
import { HTTP } from "../API/http_common";
export default {
  data() {
    return {
      fields: [
        {
          key: "masp",
          label: "Mã sản phẩm",
        },
        {
          key: "tensp",
          label: "Tên sản phẩm",
        },
        {
          key: "soluong",
          label: "Số lượng",
        },
        {
          key: "dongia",
          label: "Đơn giá",
        },
      ],
      items: [],
      dataTable: [],
    };
  },
  created() {
    HTTP.get(
      `/donhang/${this.$store.state.users.users.makh}/${this.$route.params.id}`
    ).then((res) => {
      this.dataTable = res.data;
      this.items = res.data.listCTDH.map((e) => {
        return {
          masp: e.id.masp,
          soluong: e.soluong,
          dongia: e.sanpham.dongia,
          tensp: e.sanpham.tensp,
        };
      });
      console.log(res.data);
    });
  },
  methods: {
    formatCash(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    handleStatus(status) {
      let temp = this.$store.state.food.status.find((e) => {
        return e.value === status;
      });
      return temp;
    },
  },
};
</script>
<style lang='scss' src='../style.scss' >
</style>