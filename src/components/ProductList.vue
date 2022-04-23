<template>
  <v-app>
    <template>
      <v-footer dark padless>
        <div v-for="item in list" :key="item">
          <v-btn text rounded @click="showFood(item.madm)">{{
            item.tendm
          }}</v-btn>
        </div>
      </v-footer>
    </template>
    <div class="d-flex justify-content-center flex-wrap">
      <div v-for="item in lists" :key="item" class="mt-5 ml-2">
        <div class="food" @click="showModal(item.masp)">
          <div class="d-flex justify-content-center" style="height: 40px">
            <h6>{{ item.tensp }}</h6>
          </div>
          <div class="d-flex justify-content-center">
            <img class="img_list" :src="item.photo" alt="" />
          </div>

          <div class="d-flex justify-content-center align-items-center mt-2">
            <p class="mr-2 mt-2">{{ formatCash(item.dongia.toString()) }}</p>
            <b-button
              variant="success"
              size="sm"
              class="mb-2"
              @click.stop="addToCard(item.masp)"
              >Mua ngay</b-button
            >
          </div>
        </div>
      </div>
      <b-modal ref="modal-1" hide-footer hide-header-close hide-header>
        <div>
          <h4>{{ nameFood }}</h4>
          <div class="d-flex justify-content-center">
            <img :src="image" class="img_detail" />
          </div>
          <p>{{ description }}</p>
          <div class="d-flex justify-content-between">
            <b-button
              variant="success"
              size="sm"
              class="mb-2"
              @click="addToCard(id_food)"
              >Mua ngay</b-button
            >
            <h5>{{ formatCash(price.toString()) }}đ</h5>
          </div>
        </div>
      </b-modal>
    </div>
    <div class="d-flex justify-content-center">
      <b-pagination
        class="mt-4"
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
      ></b-pagination>
    </div>
  </v-app>
</template>
<script>
import { HTTP } from "../API/http_common";
export default {
  data() {
    return {
      perPage: 12,
      currentPage: 1,
      nameFood: "",
      imgage: "",
      description: "",
      price: "",
      id_food: "",
      search: "",
      cate: "",
      list: [],
    };
  },
  async created() {
    await HTTP.get("/danhmuc").then((res) => {
      this.list = res.data;
    });
    this.$store.dispatch("getfood");
  },
  computed: {
    rows() {
      return this.$store.state.food.foods.length;
    },
    lists() {
      const items = this.$store.state.food.foods;
      return items.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      );
    },
  },
  watch: {
    // currentPage: {
    //   immediate: true,
    //   handler(data) {
    //     if (data !== 1) {
    //       this.$store.dispatch("getfood");
    //     } else {
    //       this.$store.dispatch("getfood");
    //     }
    //   },
    // },
    search: {
      handler(data) {
        if (data !== "") {
          this.$store.dispatch("searchfood", data);
        } else {
          this.$store.dispatch("getfood");
        }
      },
    },
  },
  methods: {
    async showModal(id_food) {
      await HTTP.get(`/sanpham/${id_food}`).then((res) => {
        this.nameFood = res.data.tensp;
        this.image = res.data.photo;
        this.description = res.data.mota_ngan;
        this.price = res.data.dongia;
        this.id_food = id_food;
        this.cate = res.data.danhmuc.madm;
      });
      this.$refs["modal-1"].show();
    },
    showFood(id) {
      this.$store.dispatch("listFood", id);
    },
    async addToCard(food) {
      if(!localStorage.getItem("token")){
        return alert("Vui lòng đăng nhập để mua sản phẩm")
      }
      await HTTP.post(
        `/giohang/${this.$store.state.users.users.makh}/${food}?soluong=1`
      ).then(() => {
        this.$store.dispatch("getNumQuan", this.$store.state.users.users.makh);
      });
    },
    formatCash(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>
<style lang='scss' src='../style.scss' scoped/>