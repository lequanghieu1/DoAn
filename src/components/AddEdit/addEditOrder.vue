<template>
  <b-container>
    <div v-if="$store.state.users.addEdit === true">
      <p>Mã KH</p>
      <b-form-select
        class="select"
        v-model="idCustomer"
        :options="listKH"
      ></b-form-select>
      <b-button
        size="sm"
        :disabled="!idCustomer"
        @click="add.push(1)"
        class="mt-2"
        variant="success"
        >Thêm SP</b-button
      >
      <div v-for="pro in add" :key="pro">
        <AddPro @done1SP="addSP" />
      </div>
      <div class="d-flex justify-content-end" v-if="this.doneAdd.length !== 0">
        <b-button
          @click="onSubmit"
          variant="success"
          :disabled="dis"
          class="mt-3"
          >Submit</b-button
        >
      </div>
    </div>
    <div v-else>
      <p>Trạng Thái</p>
      <b-form-select
        class="select"
        v-model="status"
        :options="this.$store.state.food.status"
      ></b-form-select>
      <div class="d-flex justify-content-end" v-if="status">
        <b-button @click="onSubmit" variant="success" class="mt-3"
          >Submit</b-button
        >
      </div>
    </div>
  </b-container>
</template>
<script>
import AddPro from "./Product.vue";
import { HTTP } from "../../API/http_common";
export default {
  data() {
    return {
      idCustomer: null,
      add: [],
      doneAdd: [],
      status: null,
    };
  },
  components: { AddPro },
  computed: {
    listKH() {
      return this.$store.state.users.listKH.map((e) => {
        return {
          value: e.makh,
          text: e.makh,
        };
      });
    },
  },
  props: {
    items: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    if (this.$store.state.users.addEdit === false) {
      this.status = this.items.trangthai;
    }
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      if (this.$store.state.users.addEdit === true) {
        try {
          await HTTP.post(`/donhang/${this.idCustomer}`, this.doneAdd).then(
            (res) => {
              if (res.status === 200) {
                this.$emit("done");
              } else {
                alert("Thêm đơn hàng thất bại");
              }
            }
          );
        } catch (error) {
          alert("Thêm đơn hàng thất bại");
        }
      } else if (this.$store.state.users.addEdit === false) {
        try {
          const obj = { ...this.items };
          obj.trangthai = this.status;
          await HTTP.put("/donhang", obj).then((res) => {
            if (res.status === 200) {
              this.$emit("done");
            } else {
              alert("Sửa đơn hàng thất bại");
            }
          });
        } catch (error) {
          alert("Sửa đơn hàng thất bại");
        }
      }
    },
    addSP(val) {
      this.doneAdd.push(val);
    },
  },
};
</script>