<template>
  <b-container fluid style="width: 1125px; margin-left: 270px">
    <!-- User Interface controls -->
    <b-row>
      <b-col lg="6" class="my-1">
        <b-form-group class="mb-1 mt-5">
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col lg="6" class="my-1 add">
        <b-button
          v-if="isCategory || isPro"
          variant="success"
          @click="showEdit(true)"
          >Thêm</b-button
        >
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table
      class="mt-5"
      :items="lists"
      :fields="fields"
      :filter="filter"
      show-empty
      small
    >
      <template #cell(name)="row">
        {{ row.item.ho }} {{ row.item.ten }}
      </template>
      <template #cell(dongia)="row">
        {{ formatCash(row.item.dongia) }}
      </template>
      <template #cell(tongtien)="row">
        {{ formatCash(row.item.tongtien) }}
      </template>
      <template #cell(luong)="row">
        {{ formatCash(row.item.luong) }}
      </template>
      <template #cell(nameKH)="row">
        {{ row.item.khachhang.ho }} {{ row.item.khachhang.ten }}
      </template>
      <template #cell(ngaydat)="row">
        {{ row.item.ngaydat | moment("DD/MM/YYYY") }}
      </template>
      <template #cell(gender)="row">
        {{ row.item.gioitinh ? "Nữ" : "Nam" }}
      </template>
      <template #cell(photo)="row">
        <img
          :src="row.item.photo"
          alt="hinhanh"
          style="width: 50px; height: 50px"
        />
      </template>
      <template #cell(trangthai)="row">
        <b-button
          size="sm"
          :variant="handleStatus(row.item.trangthai).color"
          style="margin-right: 5px"
        >
          {{ handleStatus(row.item.trangthai).text }}
        </b-button>
      </template>

      <template #cell(actions)="row">
        <b-button
          v-if="isOrder"
          size="sm"
          variant="outline-primary"
          style="margin-right: 5px"
          @click="detail(row.item.madh)"
        >
          Xem chi tiết
        </b-button>
        <b-button
          v-if="isCategory"
          size="sm"
          variant="outline-primary"
          style="margin-right: 5px"
          @click="detailProduct(row.item.madm)"
        >
          Xem sản phẩm
        </b-button>
        <b-button
          size="sm"
          v-if="isOrder"
          variant="outline-success"
          style="margin-right: 5px"
          @click="showEdit(false, handlePage(row.index, currentPage, perPage))"
        >
          Xác nhận
        </b-button>
        <b-button
          v-if="!isOrder"
          size="sm"
          variant="outline-warning"
          style="margin-right: 5px"
          @click="showEdit(false, handlePage(row.index, currentPage, perPage))"
        >
          Sứa
        </b-button>
        <b-button
          size="sm"
          variant="outline-danger"
          @click="handleDelete(row.item)"
        >
          Xóa
        </b-button>
      </template>
    </b-table>
    <b-col sm="7" md="6" class="my-1" style="transform: translateX(200px)">
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        align="fill"
        size="sm"
        class="my-0"
      ></b-pagination>
    </b-col>
    <b-modal hide-footer scrollable v-model="editPage" title="BootstrapVue">
      <AddEditCus v-if="isCus" @done="checkUpdate" :items="items[indexEdit]" />
      <AddEditStaff
        v-if="isStaff"
        @done="checkUpdate"
        :items="items[indexEdit]"
      />
      <AddEditProduct
        v-if="isPro"
        @done="checkUpdate"
        :items="items[indexEdit]"
      />
      <AddEditCate
        v-if="isCategory"
        @done="checkUpdate"
        :items="items[indexEdit]"
      />
      <AddEditOrder
        v-if="isOrder"
        @done="checkUpdate"
        :items="items[indexEdit]"
      />
    </b-modal>
  </b-container>
</template>

<script>
import AddEditCus from "./AddEdit/addEditCus.vue";
import AddEditOrder from "./AddEdit/addEditOrder.vue";
import AddEditCate from "./AddEdit/addEditCate.vue";
import AddEditProduct from "./AddEdit/addEditProduct.vue";
import AddEditStaff from "./AddEdit/addEditStaff.vue";
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    fields: {
      type: Array,
      default: () => [],
    },
    isOrder: {
      type: Boolean,
      default: false,
    },
    isCus: {
      type: Boolean,
      default: false,
    },
    isStaff: {
      type: Boolean,
      default: false,
    },
    isCategory: {
      type: Boolean,
      default: false,
    },
    isPro: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    AddEditCus,
    AddEditProduct,
    AddEditCate,
    AddEditOrder,
    AddEditStaff,
  },
  computed: {
    lists() {
      const items = this.items;
      return items.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      );
    },
    totalRows() {
      return this.items.length;
    },
  },
  data() {
    return {
      currentPage: 1,
      perPage: 10,
      filter: null,
      editPage: false,
      indexEdit: null,
    };
  },
  methods: {
    detail(orderId) {
      this.$router.push(`detail/${orderId}`);
    },
    handlePage(index, page, quantity) {
      if (page === 1) return index;
      return index + (page - 1) * quantity;
    },
    checkUpdate() {
      this.editPage = false;
      this.$emit("add");
    },
    detailProduct(id) {
      this.$emit("update", id);
    },
    showEdit(action, index) {
      this.$store.dispatch("setActions", action);
      this.editPage = true;
      this.indexEdit = index;
    },
    handleStatus(status) {
      let temp = this.$store.state.food.status.find((e) => {
        return e.value === status;
      });
      return temp;
    },
    handleDelete(id) {
      if (confirm("Bạn chắc chắn muốn xóa ?")) {
        this.$emit("del", id);
      }
    },
    formatCash(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>