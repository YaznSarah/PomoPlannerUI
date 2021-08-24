<template>
  <!-- <Sidebar/> -->
  <Dashboard v-if="this.$route.query.id !== undefined" :id="this.$route.query.id" />
  <BoardList v-if="this.$route.query.id == undefined"/>
</template>

<script>
import Dashboard from "./components/Dashboard.vue";
import BoardList from "./components/BoardList.vue";
// import Sidebar from "./components/Sidebar.vue";
export default {
  name: "App",
  components: {
    Dashboard,
    BoardList,
    // Sidebar
  },
  created(){
    document.title = 'PomoPlanner'
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
  color: #2c3e50;
  background:#e6eefb;
  margin-top: 60px;
}

html{
  background: #e6eefb;
}

.sidebar{
  width: 200px;
  background: #ffff;
}
</style>
