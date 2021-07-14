<template>
  <b-container fluid>
    <b-row>
      <b-col lg="6" class="my-1 ml-5">
        <b-form-group
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <input
              v-model="search"
              style="height: 31px"
              type="search"
              placeholder="Tìm món"
            />

            <b-input-group-append>
              <b-button size="sm" @click="search = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <div class="d-flex justify-content-center flex-wrap">
      <div
        v-for="item in this.$store.state.food.foods"
        :key="item"
        class="mt-3 ml-2"
      >
        <div class="food" @click="showModal(item.foodId)">
          <div class="d-flex justify-content-center">
            <h6>{{ item.foodName.slice(0, 20) }}</h6>
          </div>
          <div class="d-flex justify-content-center">
            <img class="img_list" :src="item.images[0].imageUrl" alt="" />
          </div>

          <div class="d-flex justify-content-center align-items-center mt-2">
            <p class="mr-2 mt-2">{{ item.price }}</p>
            <b-button
              variant="success"
              size="sm"
              class="mb-2"
              @click.stop="addToCard(item.foodId)"
              >Mua ngay</b-button
            >
          </div>
        </div>
      </div>
      <b-pagination
        class="mt-4"
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
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
            <h5>{{ price }}đ</h5>
          </div>
        </div>
      </b-modal>
    </div>
  </b-container>
</template>
<script>
import { HTTP } from "../API/http_common";
export default {
  data() {
    return {
      perPage: 4,
      currentPage: 1,
      nameFood: "",
      imgage: "",
      description: "",
      price: "",
      id_food: "",
      search: "",
    };
  },
  created() {
    this.$store.dispatch("getfood", 0);
  },
  computed: {
    rows() {
      return this.$store.state.food.foods.length;
    },
  },
  watch: {
    currentPage: {
      immediate: true,
      handler(data) {
        if (data !== 1) {
          this.$store.dispatch(
            "getfood",
            this.$store.state.food.foods[11].updatedAt
          );
        } else {
          this.$store.dispatch("getfood", 0);
        }
      },
    },
    search: {
      handler(data) {
        if (data !== "") {
          this.$store.dispatch("searchfood", data);
        } else {
          this.$store.dispatch("getfood", 0);
        }
      },
    },
  },
  methods: {
    async showModal(id_food) {
      await HTTP.get(`/food/detail/${id_food}`).then((res) => {
        this.nameFood = res.data.data.foodName;
        this.image = res.data.data.images[0].imageUrl;
        this.description = res.data.data.description;
        this.price = res.data.data.price;
        this.id_food = id_food;
      });
      this.$refs["modal-1"].show();
    },
    async addToCard(foodId) {
      await HTTP.post(`/order/add-to-cart`, { foodId: foodId }).then(() => {
        this.$store.dispatch("getNumQuan");
      });
    },
  },
};
</script>
<style lang='scss' src='../style.scss' scoped/>