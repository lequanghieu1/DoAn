<template>
  <v-card width="1200" class="mx-auto mt-9">
    <v-card-title v-highlight="'red'"
      >Axios call API and directive
    </v-card-title>
    <v-card-text
      ><b-container class="bv-example-row">
        <b-row class="justify-content-md-center">
          <b-col sm="12" md="10">
            <b-table
              striped
              hover
              :items="this.$store.state.users.users"
              :fields="fields"
            ></b-table>
          </b-col>
        </b-row>
      </b-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      fields: ["name", "username", "email", "phone", "website"],
      errors: [],
    };
  },
  created() {
    this.$store.dispatch("loadUsers");
    this.$store.dispatch("resetState");
  },
  
};
</script>

<style lang='scss' src='../style.scss' >
</style> 
