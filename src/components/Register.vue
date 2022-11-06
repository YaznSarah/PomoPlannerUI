<template>
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" style="border-radius: 25px;">
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                <div class="alert alert-danger" v-for="(error, index) in this.$store.state.errors" :key="index">{{ error }}</div>
                <form class="mx-1 mx-md-4" @submit.prevent="register">

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="text" v-model="form.username" id="form3Example1c" class="form-control" required />
                      <label class="form-label" for="form3Example1c">Username</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="text" v-model="form.firstName" id="form3Example1c" class="form-control" required />
                      <label class="form-label" for="form3Example1c">First Name</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="text" v-model="form.lastName" id="form3Example1c" class="form-control" required />
                      <label class="form-label" for="form3Example1c">Last Name</label>
                    </div>
                  </div>


                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="email" v-model="form.email" id="form3Example3c" class="form-control" required />
                      <label class="form-label" for="form3Example3c">Email</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="password" v-model="form.password" id="form3Example4c" class="form-control" required/>
                      <label class="form-label" for="form3Example4c">Password</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0 border-1">
                      <input type="password" v-model="form.repeatPassword" id="form3Example4cd" class="form-control" :class="{'has-error': form.password != form.repeatPassword}" required />
                      <label class="form-label" for="form3Example4cd">Repeat your password</label>
                    </div>
                  </div>

                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" class="btn btn-primary btn-lg">Register</button>
                  </div>

                </form>

              </div>
              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  class="img-fluid" alt="Sample image">

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.has-error {
  border: 1px red solid !important;
}
</style>
<script>
export default {
  data: function () {
    return {
      form: {
        username: "",
        firstName: "",
        lastName: "",
        password: "",
        repeatPassword: "",
        email: "",
      }
    };
  },
  methods: {
    async register() {
      if(this.form.repeatPassword != this.form.password){
        this.$store.commit("addError", "Passwords must match")
        return
      }
      try {
        await this.$store.dispatch("addUser", {
          username: this.form.username,
          password: this.form.password,
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          email: this.form.email,
        })
        if(this.$store.state.errors.length === 0){
          this.$router.push("/");
        }
      } catch (e){
        console.log(e);
      }
    }
  },
  mounted() {
    this.$store.commit("clearErrors");
    if(this.$store.getters.isAuthenticated){
      this.$router.push('/')
    }
  }
};
</script>
