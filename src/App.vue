<template>
  <p class="h1">Pomo Planner</p>
  <Dashboard v-if="this.$route.query.id !== undefined" :id="this.$route.query.id" />
  <BoardList v-if="this.$route.query.id == undefined"/>
</template>

<script>
import Dashboard from "./components/Dashboard.vue";
import BoardList from "./components/BoardList.vue";

export default {
  name: "App",
  components: {
    Dashboard,
    BoardList
  },
  mounted(){
    console.log(this.$route.query.id);
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
