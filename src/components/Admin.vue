<template>
  <div id="demo" :class="[{ collapsed: collapsed }, { onmobile: isOnMobile }]">
    <sidebar-menu
      :menu="authorization"
      :collapsed="collapsed"
      width="250px"
      :show-one-child="true"
      @toggle-collapse="onToggleCollapse"
      @item-click="onItemClick"
      :disableHover="true"
    />
    <div
      v-if="isOnMobile && !collapsed"
      class="sidebar-overlay"
      @click="collapsed = true"
    />
    <Customer v-if="customer" />
    <Product v-if="product" :SPCate="SPCate" />
    <Order v-if="order" />
    <Staff v-if="staff" />
    <Category v-if="category" @update="loadSPCate" />
  </div>
</template>
<script>
import Customer from "./AdminPage/customer.vue";
import Staff from "./AdminPage/staff.vue";
import Product from "./AdminPage/product.vue";
import Order from "./AdminPage/order.vue";
import Category from "./AdminPage/category.vue";
import { HTTP } from "../API/http_common";
import { menu } from "./AdminPage/constant";
export default {
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize);
  },
  async created() {
    if (JSON.parse(localStorage.getItem("token")).quyen.maquyen === 2) {
      this.$router.push("/not-found");
    }
    else if (JSON.parse(localStorage.getItem("token")).quyen.maquyen === 3) {
      this.customer = false;
    }
    else if (JSON.parse(localStorage.getItem("token")).quyen.maquyen === 1) {
      this.staff = false;
    }
    await HTTP.get(
      `/nhanvien/${JSON.parse(localStorage.getItem("token")).username}`
    ).then((res) => {
      this.$store.dispatch("loadUsers", res.data);
    });
  },
  components: { Customer, Product, Order, Category, Staff },
  computed: {
    authorization() {
      let temp = this.menu.map((e) => {
        return {
          title: e.title,
          id: e.id,
          icon: e.icon,
          hiddenOnCollapse: e.hiddenOnCollapse || false,
          header: e.header || false,
          hidden:
            JSON.parse(localStorage.getItem("token")).quyen.maquyen === e.block,
        };
      });
      return temp;
    },
  },
  methods: {
    onToggleCollapse(collapsed) {
      this.collapsed = collapsed;
    },
    loadSPCate(id) {
      this.customer = false;
      this.order = false;
      this.product = true;
      this.staff = false;
      this.category = false;
      this.SPCate = id;
    },
    onItemClick(event, item) {
      switch (item.id) {
        case 1:
          this.customer = true;
          this.order = false;
          this.product = false;
          this.staff = false;
          this.category = false;
          this.SPCate = null;
          break;
        case 2:
          this.customer = false;
          this.order = true;
          this.product = false;
          this.staff = false;
          this.category = false;
          this.SPCate = null;
          break;
        case 3:
          this.customer = false;
          this.order = false;
          this.product = true;
          this.staff = false;
          this.category = false;
          break;
        case 4:
          this.customer = false;
          this.order = false;
          this.product = false;
          this.staff = true;
          this.category = false;
          this.SPCate = null;
          break;
        case 5:
          this.customer = false;
          this.order = false;
          this.product = false;
          this.staff = false;
          this.category = true;
          this.SPCate = null;
          break;
        case 6:
          if (confirm("Bạn chắc chắn muốn đăng xuất ?")) {
            localStorage.removeItem("token");
            this.$router.push("/");
          }
          break;
      }
    },
    onResize() {
      if (window.innerWidth <= 767) {
        this.isOnMobile = true;
        this.collapsed = true;
      } else {
        this.isOnMobile = false;
        this.collapsed = false;
      }
    },
  },
  data() {
    return {
      menu,
      collapsed: false,
      isOnMobile: false,
      customer: true,
      order: false,
      product: false,
      category: false,
      SPCate: null,
      staff: true,
    };
  },
};
</script>