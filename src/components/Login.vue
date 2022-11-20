<template>
  <section class="vh-100">
    <div class="container-fluid h-custom">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-9 col-lg-6 col-xl-5">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid"
            alt="Sample image">
        </div>
        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
          <div class="alert alert-danger" v-for="(error, index) in this.$store.state.errors" :key="index">{{ error }}</div>

          <form @submit.prevent="login">
            <!-- Email input -->
            <div class="form-outline mb-4">
              <input type="email" id="form3Example3" class="form-control form-control-lg"
                placeholder="Enter a valid email" v-model="form.email" required />
              <label class="form-label" for="form3Example3">Email</label>
            </div>

            <!-- Password input -->
            <div class="form-outline mb-3">
              <input type="password" id="form3Example4" class="form-control form-control-lg"
                placeholder="Enter password" v-model="form.password" required/>
              <label class="form-label" for="form3Example4">Password</label>
            </div>

            <div class="text-center text-lg-start mt-4 pt-2">
              <button type="button" class="btn btn-primary btn-lg"
                style="padding-left: 2.5rem; padding-right: 2.5rem;" @click="login()">Login</button>
              <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account?</p>
              <router-link :to="'/register'">Register</router-link>
              </div>
          </form>
        </div>
        <br/>
        <button class="btn btn-lg btn-danger" @click="initialize">Initialize Database</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: function () {
    return {
      form: {
        email: "",
        password: "",
      }
    };
  },
  methods: {
    async login() {
      await this.$store.dispatch("checkUser", this.form);
      if(this.$store.getters.isAuthenticated){
        this.$router.push('/');
      }
    },
    async initialize(){
      await this.$store.dispatch("initialize");
    }
  },
  mounted(){
    this.$store.commit("clearErrors");
  }

};
</script>
