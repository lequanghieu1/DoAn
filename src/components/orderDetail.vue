<template>
  <article>
    <div class="d-flex justify-content-center">
      <div style="width: 1000px">
        <b-table small striped hover :fields="fields" :items="items"></b-table>
      </div>
    </div>
  </article>
</template>

<script>
import { HTTP } from "../API/http_common";
export default {
  data() {
    return {
      fields: ["orderId", "foodName", "quantity", "price"],
      items: [],
    };
  },
  created() {
    HTTP.get(`/order/user/detail/${this.$route.params.id}`).then((res) => {
      this.items = res.data.data.items;
    });
  },
};
</script>
<style lang='scss' src='../style.scss' >
</style>