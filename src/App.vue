<template>
  <!-- <Sidebar/> -->
  <router-view/> 
  <!-- <BoardList v-if="this.$store.getters.isAuthenticated == true"/>-->
</template>

<script>

// import Sidebar from "./components/Sidebar.vue";
export default {
  name: "App",
  computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },
    methods: {
      async logout (){
        await this.$store.dispatch('LogOut')
        this.$router.push('/login')
      }
    },
  components: {
    // Sidebar
  },
  mounted(){
    console.log(this.$route.query.id);
    if(!this.isLoggedIn){
      this.$router.push('/login')
    }
    else{
      this.$router.push("/")
    }
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
