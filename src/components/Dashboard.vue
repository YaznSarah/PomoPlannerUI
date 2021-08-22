<template>
  <div class="container">
    <div class="h2">{{ this.$store.state.board.title }}</div>
    <div class="align-middle" style="height:100%">
      <div class="spinner-border align-middle" role="status" v-if="loading">
      </div>
    </div>
    <router-link to="/" type="button" class="btn btn-secondary float-start">Go Back</router-link>
    <div class="row" v-if="!loading">
      <div class="row">
        <card-list status="to-do"></card-list>
        <card-list status="in-progress"></card-list>
        <card-list status="complete"></card-list>
      </div>
    </div>
  </div>
</template>

<script>
import CardList from './CardList.vue'
export default {
  name: "Dashboard",
  props: {
    id: String
  },
  components: {
    'card-list': CardList,
  },
  data() {
    return {
      tasks: [],
      loading: true
    };
  },
  mounted() {
    this.getTasks()
  },
  methods: {
    async getTasks() {
      await this.$store.dispatch('getBoard', this.$props.id)
      this.loading = false;
    },
  },
};
</script>

<style>
body{
  background: lightblue;
}
</style>
