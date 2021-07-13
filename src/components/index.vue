<template>
  <v-app>
    <v-app-bar app dark color="rgb(116, 116, 252)">
      <v-toolbar-title @click="homepage()" style="cursor: pointer">
        APP FOOD</v-toolbar-title
      >
      <v-spacer />
      <v-btn text rounded v-b-toggle.sidebar-right
        ><img
          class="icon"
          src="https://cdn.pixabay.com/photo/2015/12/23/01/14/edit-1105049_960_720.png"
        />
        <div class="number d-flex justify-content-center align-items-start">
          <p class="num mt-1">{{ this.$store.state.food.Quanty }}</p>
        </div></v-btn
      >
      <v-btn text rounded v-b-toggle.sidebar-variant
        ><img
          class="icon"
          src="https://freeiconshop.com/wp-content/uploads/edd/clipboard-list-flat.png"
        />
        <div class="number d-flex justify-content-center align-items-start">
          <p class="num mt-1">{{ this.$store.state.food.bill.length }}</p>
        </div></v-btn
      >
      <v-btn text rounded v-b-toggle.sidebar-1
        ><img
          class="icon user"
          src="https://www.ebanhang.vn/app/webroot/img/icon_login.png"
      /></v-btn>
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
    <template>
      <v-footer dark padless>
        <div v-for="item in list" :key="item">
          <v-btn text rounded @click="showFood(item.cateId)">{{
            item.cateName
          }}</v-btn>
        </div>
      </v-footer>
    </template>
    <b-sidebar
      @shown="showCart"
      id="sidebar-right"
      title="Giỏ Hàng"
      bg-variant="dark"
      text-variant="light"
      right
      width="550px"
      shadow
    >
      <template #footer="{}">
        <div class="d-flex bg-dark text-light align-items-center px-3 py-2">
          <strong class="mr-auto">Tổng</strong>
          <strong class="mr-auto">{{ items.total }}</strong>
          <b-button size="sm" variant="info" v-b-modal.modal-1
            >Thanh Toán</b-button
          >
        </div>
      </template>
      <div class="px-3 py-2">
        <b-row>
          <b-col><b>Tên món</b></b-col>
          <b-col><b>Hình ảnh</b></b-col>
          <b-col><b>Số lượng</b></b-col>
          <b-col><b>Đơn giá</b></b-col>
          <b-col></b-col>
        </b-row>
        <div v-for="item in items.items" :key="item">
          <b-row>
            <b-col>{{ item.foodName }}</b-col>
            <b-col
              ><img class="img_cart" :src="item.images[0].imageUrl" alt=""
            /></b-col>
            <b-col
              ><input
                type="number"
                min="0"
                class="input"
                v-model="item.quantity"
                @change="editQuanty(item.orderId, item.foodId, item.quantity)"
            /></b-col>
            <b-col>{{ item.price }}</b-col>
            <b-col
              ><img
                @click="deleteFood(item.foodId)"
                class="icon_delete"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNQ8CLeXOGmVx62VfeFd3eH2elD1EUYLJ0WISuby6szkUl3P6PLW6Djxuy1yOlLkcCMNs&usqp=CAU"
            /></b-col>
          </b-row>
        </div>
      </div>
    </b-sidebar>
    <b-sidebar
      id="sidebar-1"
      title="Thông tin cá nhân"
      shadow
      @shown="showInfo"
    >
      <template #footer="{}">
        <div
          class="d-flex justify-content-between align-items-center px-3 py-2"
        >
          <b-button size="sm" variant="warning" @click="editInfo"
            >Sửa thông tin</b-button
          >
          <b-button size="sm" variant="danger" @click="Logout"
            >Đăng xuất</b-button
          >
        </div>
      </template>
      <div class="px-3 py-2">
        <div v-if="!edit">
          <p>Họ tên : {{ user.fullName }}</p>
          <p>Email : {{ user.email }}</p>
          <p>Số điện thoại : {{ user.phone }}</p>
          <p>Địa chỉ : {{ user.address }}</p>
          <p>Phân Quyền : {{ user.role }}</p>
        </div>

        <div v-if="edit">
          <div class="d-flex justify-content-center">
            <p>Họ tên</p>
            <b-form-input class="input" v-model="user.fullName"></b-form-input>
          </div>
          <div class="d-flex justify-content-center">
            <p>Địa chỉ</p>
            <b-form-input class="input" v-model="user.address"></b-form-input>
          </div>
          <div class="d-flex justify-content-center">
            <p>Số điện thoại</p>
            <b-form-input class="input" v-model="user.phone"></b-form-input>
          </div>
          <div class="d-flex justify-content-center">
            <p>Email</p>
            <b-form-input class="input" v-model="user.email"></b-form-input>
          </div>
          <b-button size="sm" variant="success" @click="submit"
            >Submit</b-button
          >
        </div>
        <b-img
          src="https://picsum.photos/500/500/?image=54"
          fluid
          thumbnail
        ></b-img>
      </div>
    </b-sidebar>
    <b-modal id="modal-1" title="Xác nhận thanh toán" @ok="handleOk">
      <p class="my-4">
        Bạn sẽ thanh toán hóa đơn với số tiền {{ items.total }} ?
      </p>
    </b-modal>
    <b-sidebar
      id="sidebar-variant"
      title="Sidebar"
      bg-variant="dark"
      width="450px"
      text-variant="light"
      shadow
    >
      <div class="px-3 py-2">
        <b-row>
          <b-col cols="3"><b>ID</b></b-col>
          <b-col><b>Trạng Thái</b></b-col>
          <b-col><b>Ngày Đặt</b></b-col>
        </b-row>
        <div v-for="item in this.$store.state.food.bill" :key="item">
          <b-row @click="detail(item.orderId)">
            <b-col cols="3">{{ item.orderId }}</b-col>
            <b-col
              ><b-button
                :variant="item.status === 'PENDING' ? 'warning' : 'success'"
                >{{ item.status }}</b-button
              ></b-col
            >
            <b-col>{{ item.updatedAt | moment("dddd, MMMM Do YYYY") }}</b-col>
          </b-row>
        </div>
      </div>
      <div class="px-3 py-2">
        <b-table striped hover :items="orderList"></b-table>
      </div>
    </b-sidebar>
  </v-app>
</template>

<script>
import { HTTP } from "../API/http_common";
export default {
  methods: {
    showFood(id) {
      this.$store.dispatch("listFood", id);
    },
    async showInfo() {
      await HTTP.get("/user/profile").then((res) => {
        this.user = res.data.data;
      });
    },
    showCart() {
      HTTP.get("/order/shopping-cart").then((res) => {
        this.items = res.data.data;
      });
    },
    editQuanty(orderId, foodId, quantity) {
      HTTP.post("/order/update", {
        orderId,
        foodId,
        quantity: parseInt(quantity),
      }).then(() => {
        this.showCart();
        this.$store.dispatch("getNumQuan");
      });
    },
    deleteFood(foodId) {
      HTTP.delete("/order/delete", {
        foodId,
      }).then(() => {
        this.showCart();
        this.$store.dispatch("getNumQuan");
      });
    },
    detail(orderId) {
      this.$router.push(`detail/${orderId}`);
    },
    Logout() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
    submit() {
      HTTP.put("/user/profile/update", {
        fullName: this.user.fullName,
        email: this.user.email,
        phone: this.user.phone,
        address: this.user.address,
      }).then(() => {
        this.edit = false;
      });
    },
    handleOk() {
      HTTP.post("/order/confirm", {
        orderId: this.items.items[0].orderId,
        status: "CONFIRM",
      }).then(() => {
        this.showCart();
        this.$store.dispatch("getNumQuan");
      });
    },
    editInfo() {
      this.edit = true;
    },
  },

  data() {
    return {
      list: [],
      numQuan: 0,
      items: [],
      user: {},
      edit: false,
      orderList: [],
    };
  },
  created() {
    HTTP.get("/cate/list").then((res) => {
      this.list = res.data.data;
    });
    this.$store.dispatch("getNumQuan");
    this.$store.dispatch("listBills");
  },
};
</script>
<style lang='scss' src='../style.scss' >
</style> 
