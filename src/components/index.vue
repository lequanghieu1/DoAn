<template>
  <v-app>
    <v-app-bar app dark color="rgb(116, 116, 252)">
      <v-toolbar-title @click="homepage()" style="cursor: pointer">
        <img height="50px" src="../assets/app.png" />
        App Cosmetic</v-toolbar-title
      >
      <v-spacer />
      <v-btn text rounded v-if="isLogin" v-b-toggle.sidebar-right
        ><img
          class="icon"
          src="https://cdn.pixabay.com/photo/2015/12/23/01/14/edit-1105049_960_720.png"
        />
        <div class="number d-flex justify-content-center align-items-start">
          <p class="num mt-1">{{ this.$store.state.food.Quanty }}</p>
        </div></v-btn
      >
      <v-btn v-if="isLogin" text rounded v-b-toggle.sidebar-variant
        ><img
          class="icon"
          src="https://freeiconshop.com/wp-content/uploads/edd/clipboard-list-flat.png"
        />
        <div class="number d-flex justify-content-center align-items-start">
          <p class="num mt-1">{{ this.$store.state.food.bill.length }}</p>
        </div></v-btn
      >
      <v-btn v-if="isLogin" text rounded v-b-toggle.sidebar-1
        ><img
          class="icon user"
          src="https://www.ebanhang.vn/app/webroot/img/icon_login.png"
      /></v-btn>
      <b-breadcrumb class="mt-4" v-if="!isLogin">
        <b-breadcrumb-item to="/">
          <b-button variant="outline-light"
            ><b-icon class="mr-1" icon="reply-all-fill" aria-hidden="true"></b-icon>Đăng
            nhập</b-button
          >
        </b-breadcrumb-item>
        <b-breadcrumb-item to="register"
          ><b-button variant="dark"
            ><b-icon class="mr-1" icon="shield-fill-plus" aria-hidden="true"></b-icon>Đăng
            ký</b-button
          ></b-breadcrumb-item
        >
      </b-breadcrumb>
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
    <v-footer dark padless>
      <v-card flat tile class="indigo lighten-1 white--text text-center">
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
          Mauris cursus commodo interdum. Praesent ut risus eget metus luctus
          accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim
          a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula
          lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus
          iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum
          tempor vel ut orci. Orci varius natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-card-text>
      </v-card>
    </v-footer>
    <b-sidebar
      @shown="showCart"
      id="sidebar-right"
      title="Giỏ Hàng"
      bg-variant="dark"
      text-variant="light"
      right
      backdrop
      width="550px"
      shadow
    >
      <template #footer="{}">
        <div class="d-flex bg-dark text-light align-items-center px-3 py-2">
          <strong class="mr-auto">Tổng</strong>
          <strong class="mr-auto">{{ items ? formatCash(total) : 0 }}</strong>
          <b-button size="sm" class="mr-2" variant="danger" v-b-modal.modal-2
            >Xóa giỏ hàng</b-button
          >
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
        <div v-for="item in items" :key="item">
          <b-row>
            <b-col>{{ item.sanpham.tensp }}</b-col>
            <b-col
              ><img class="img_cart" :src="item.sanpham.photo" alt=""
            /></b-col>
            <b-col
              ><img
                class="mr-2"
                @click="editQuanty(item, '-1')"
                height="10px"
                style="cursor: pointer"
                src="../assets/minus.png" /><input
                type="number"
                min="0"
                class="input"
                v-model="item.soluong"
                disabled />
              <img
                @click="editQuanty(item, '1')"
                style="cursor: pointer"
                class="ml-2"
                height="10px"
                src="../assets/plus.png"
            /></b-col>
            <b-col>{{ formatCash(+item.sanpham.dongia) }}</b-col>
            <b-col
              ><img
                @click="deleteProduct(item.sanpham.masp)"
                class="icon_delete"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNQ8CLeXOGmVx62VfeFd3eH2elD1EUYLJ0WISuby6szkUl3P6PLW6Djxuy1yOlLkcCMNs&usqp=CAU"
            /></b-col>
          </b-row>
        </div>
      </div>
    </b-sidebar>
    <b-sidebar id="sidebar-1" title="Thông tin cá nhân" shadow backdrop>
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
          <p>Họ tên : {{ user.ho + " " + user.ten }}</p>
          <p>Email : {{ user.email }}</p>
          <p>Số điện thoại : {{ user.sdt }}</p>
          <p>Địa chỉ : {{ user.diachi }}</p>
          <p>Phân Quyền : {{ user.tenquyen }}</p>
        </div>

        <div v-if="edit">
          <div class="d-flex justify-content-center">
            <p>Họ</p>
            <b-form-input class="input" v-model="user.ho"></b-form-input>
            <p>Tên</p>
            <b-form-input class="input" v-model="user.ten"></b-form-input>
          </div>

          <div class="d-flex justify-content-center">
            <p>Địa chỉ</p>
            <b-form-input class="input" v-model="user.diachi"></b-form-input>
          </div>
          <div class="d-flex justify-content-center">
            <p>Số điện thoại</p>
            <b-form-input class="input" v-model="user.sdt"></b-form-input>
          </div>
          <div class="d-flex justify-content-center">
            <p>Email</p>
            <b-form-input class="input" v-model="user.email"></b-form-input>
          </div>
          <v-radio-group v-model="user.gioitinh" row>
            <template v-slot:label>
              <div>Gender :</div>
            </template>
            <v-radio label="Male" :value="0"></v-radio>
            <v-radio label="Female" :value="1"></v-radio>
          </v-radio-group>
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
        Bạn sẽ thanh toán hóa đơn với số tiền
        {{ items ? formatCash(total) : "" }} ?
      </p>
    </b-modal>
    <b-modal id="modal-2" title="Xác nhận thanh toán" @ok="handleDelete">
      <p class="my-4">Bạn có chắc chắn xóa giỏ hàng ?</p>
    </b-modal>
    <b-sidebar
      id="sidebar-variant"
      title="Danh sách đơn hàng"
      bg-variant="dark"
      width="450px"
      backdrop
      text-variant="light"
      shadow
    >
      <div class="px-3 py-2">
        <b-row>
          <b-col cols="3"><b>Mã Đơn</b></b-col>
          <b-col><b>Trạng Thái</b></b-col>
          <b-col><b>Ngày Đặt</b></b-col>
          <b-col><b>Hành động</b></b-col>
        </b-row>
        <div v-for="item in this.$store.state.food.bill" :key="item">
          <b-row @click="detail(item.madh)">
            <b-col cols="3">{{ item.madh }}</b-col>
            <b-col
              ><b-button :variant="handleStatus(item.trangthai).color">{{
                handleStatus(item.trangthai).text
              }}</b-button></b-col
            >
            <b-col>{{ item.ngaydat | moment("DD/MM/YYYY") }}</b-col>
            <b-col
              ><b-button
                :disabled="item.trangthai !== 0"
                @click.stop="cancelBill(item.madh)"
                variant="light"
                >Hủy đơn</b-button
              ></b-col
            >
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
    handleStatus(status) {
      let temp = this.$store.state.food.status.find((e) => {
        return e.value === status;
      });
      return temp;
    },
    async cancelBill(madh) {
      if (confirm("Bạn có chắc chắn hủy đơn")) {
        try {
          await HTTP.put(`/donhang/${madh}`);
          await this.$store.dispatch(
            "listBills",
            this.$store.state.users.users.makh
          );
        } catch (error) {
          alert("Hủy đơn hàng thất bại");
        }
      }
    },
    formatCash(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    async showCart() {
      await HTTP.get(`/giohang/${this.$store.state.users.users.makh}`).then(
        (res) => {
          this.items = res.data;
          if (this.items.length === 0) {
            this.total = 0;
          }
          this.items.forEach((e) => {
            if (e.soluong === 0) {
              this.deleteProduct(e.id.masp);
            }
          });
          this.order = this.items.map((e) => {
            return {
              masp: e.id.masp,
              soluong: e.soluong,
              dongia: e.sanpham.dongia,
            };
          });
          let temp = this.items.map((e) => {
            return e.sanpham.dongia * e.soluong;
          });
          this.total = temp.reduce((total, currentValue) => {
            return total + currentValue;
          });
        }
      );
    },
    editQuanty(item, isPlus) {
      HTTP.post(
        `/giohang/${this.$store.state.users.users.makh}/${item.id.masp}?soluong=${isPlus}`
      ).then(() => {
        this.showCart();
        this.$store.dispatch("getNumQuan", this.$store.state.users.users.makh);
      });
    },
    async deleteProduct(foodId) {
      await this.$store.dispatch("deleteBills", {
        foodId,
        makh: this.$store.state.users.users.makh,
      });
      setTimeout(() => {
        this.showCart();
        this.$store.dispatch("getNumQuan", this.$store.state.users.users.makh);
      }, 100);
    },
    detail(orderId) {
      this.$router.push(`detail/${orderId}`);
    },
    Logout() {
      if (confirm("Bạn chắc chắn muốn đăng xuất ?")) {
        localStorage.removeItem("token");
        this.$router.push("/");
      }
    },
    submit() {
      HTTP.put("/khachhang", {
        ho: this.user.ho,
        ten: this.user.ten,
        email: this.user.email,
        sdt: this.user.sdt,
        diachi: this.user.diachi,
        gioitinh: this.user.gioitinh,
        username: this.user.taikhoan.username,
      }).then(() => {
        this.edit = false;
      });
    },
    async handleOk() {
      if (this.$store.state.food.Quanty === 0) {
        return alert("Vui lòng chọn ít nhất 1 món ăn");
      }
      await HTTP.post(
        `/donhang/${this.$store.state.users.users.makh}`,
        this.order
      ).then(() => {
        this.showCart();
        this.$store.dispatch("getNumQuan", this.$store.state.users.users.makh);
        this.$store.dispatch("listBills", this.$store.state.users.users.makh);
      });
    },
    async handleDelete() {
      if (this.$store.state.food.Quanty === 0) {
        return alert("Giỏ hàng không còn sản phẩm");
      }
      await HTTP.delete(`/giohang/${this.$store.state.users.users.makh}`).then(
        () => {
          this.showCart();
          this.$store.dispatch(
            "getNumQuan",
            this.$store.state.users.users.makh
          );
        }
      );
    },
    editInfo() {
      this.edit = true;
    },
  },

  data() {
    return {
      numQuan: 0,
      items: [],
      user: {},
      edit: false,
      orderList: [],
      total: 0,
      order: [],
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    };
  },
  computed: {
    isLogin() {
      return localStorage.getItem("token");
    },
  },
  async created() {
    if (localStorage.getItem("token")) {
      if (JSON.parse(localStorage.getItem("token")).quyen.maquyen !== 2) {
        this.$router.push("/not-found");
      }
      let token = localStorage.getItem("token");
      await HTTP.get(`/khachhang/${JSON.parse(token).username}`).then((res) => {
        this.user = res.data;
        this.user.tenquyen = JSON.parse(token).quyen.tenquyen;
        this.$store.dispatch("loadUsers", res.data);
      });
      this.$store.dispatch("getNumQuan", this.$store.state.users.users.makh);
      this.$store.dispatch("listBills", this.$store.state.users.users.makh);
    }
  },
};
</script>
<style lang='scss' src='../style.scss' >
</style> 
