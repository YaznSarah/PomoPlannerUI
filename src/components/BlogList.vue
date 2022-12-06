<template>
  <div class="container">
    <div v-if="blogs.length === 0" class="alert alert-secondary" role="alert">
      No blogs have been posted, create one below
    </div>
    <div class="row">
      <div class="col-4">
        <div class="card text-center" v-for="blog in blogs" :key="blog.blogid">
          <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
            <a href="#!">
              <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
            </a>
          </div>
          <div class="card-body">
            <h4 class="card-title">{{ blog.subject }} by <strong><i>{{ blog.created_by }}</i></strong></h4>
            <p class="card-text">
              {{ blog.description }}
            </p>
            <router-link :to="'/blog/?id=' + blog.blogid" class="btn btn-primary">Read</router-link>
          </div>
        </div>
      </div>
      <div class="col-8">
        <h2>Create your own blog!</h2>
        <div class="alert alert-danger" v-for="(error, index) in this.$store.state.errors" :key="index">{{ error }}</div>
        <label>Subject</label>
        <input type="text" class="form-control" placeholder="Enter blog subject/title" aria-describedby="basic-addon2"
          v-model="blog.subject" />
        <div class="form-group">
          <div class="form-group">
            <label>Description</label>
            <textarea v-model="blog.description" class="form-control" id="description" rows="4"></textarea>
          </div>
        </div>
        <tag-input />
        <br />
        <button class="btn btn-info" type="button" @click.stop="createBlog()"
          :disabled="blog.subject.trim().length == 0">
          Create Blog
        </button>
        <br />
        <div class="buttonContainer">
          <button type="button" @click="question1()" :disabled="this.input.user.trim().length == 0"
            class="btn btn-success">Good Blogs</button>
          <input type="text" class="form-control-sm" placeholder="Enter a user" v-model="this.input.user" />
          <button type="button" @click="question2()" class="btn btn-success">Most Commenting User</button>
          <br />
          <button type="button" @click="question3()"
            :disabled="(this.input.userX.trim().length == 0 || this.input.userY.trim().length == 0)"
            class="btn btn-success">FollowedByPair</button>
          <input type="text" class="form-control-sm" placeholder="Enter first user" v-model="this.input.userX" />
          <input type="text" class="form-control-sm" placeholder="Enter second user" v-model="this.input.userY" />
          <br />
          <button type="button" @click="question4()" class="btn btn-success">User who never posts</button>
          <button type="button" @click="question5()" class="btn btn-success">Good Users</button>
          <button type="button" @click="question6()" class="btn btn-success">Shared Hobbies</button>
        </div>
        <div class="questionContainer">
          <div class="card" id = "containerCard">
            <ul class="list-group list-group-flush">
              <strong>
                <li class="list-group-item" v-for="item in container" :key="item.blogid">
                  {{ (item.username) }} <h3 v-if="item.subject"><strong>Subject: </strong>{{ item.subject }}</h3>
                  <h4 v-if="item.description">
                    <strong>Comment: </strong> {{ item.description }} by <strong>{{ item.posted_by }} *{{item.sentiment}}*</strong>
                  </h4>
                  <p v-if="(item.posted_by && !item.subject)">{{ item.posted_by }}</p>
                  <h3 v-if="item.userA"> <strong>UserA: </strong> {{ item.userA }} <strong> UserB: </strong>{{ item.userB }}
                    <strong>SharedHobby:</strong> {{ item.SharedHobby }}</h3>
                  <h3 v-if="item.followers"><strong>LeaderName: </strong>{{ item.leadername }} <strong>Followers:</strong>
                    {{ item.followers }}</h3>
                </li>
              </strong>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <br />
  </div>
</template>

<script>
import TagInput from "./TagInput.vue"

export default {
  data: function () {
    return {
      blog: {
        subject: " ",
        description: " ",
      },
      input: {
        user: "",
        userX: "",
        userY: "",
      }
    };
  },
  computed: {
    blogs() {
      return this.$store.state.blogs;
    },
    container() {
      return this.$store.state.questContainer;
    }
  },
  mounted() {
    this.$store.dispatch("getBlogs");
    this.$store.commit('clearErrors')
  },
  name: "BlogList",
  components: {
    'tag-input': TagInput
  },
  methods: {
    async createBlog() {
      this.$store.commit('clearErrors')
      await this.$store.dispatch("addBlog", { blog: this.blog, tags: this.$store.state.blog.blogTags });
      this.clearFields();
    },
    async clearFields() {
      this.$store.commit('clearBlogTags')
      this.blog.subject = ""
      this.blog.description = " "
    },
    async question1() {
      await this.$store.dispatch("computeQuestion1", this.input)
    },
    async question2() {
      await this.$store.dispatch("computeQuestion2")
    },
    async question3() {
      await this.$store.dispatch("computeQuestion3", this.input)
    },
    async question4() {
      await this.$store.dispatch("computeQuestion4")
    },
    async question5() {
      await this.$store.dispatch("computeQuestion5")
    },
    async question6() {
      await this.$store.dispatch("computeQuestion6")
    }
  }
};
</script>

<style scoped>
input {
  margin-bottom: 10px;
}

label {
  margin-bottom: 10px;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin: 5px;
}

.card-link {
  color: inherit;
}

.btn {
  padding: 10px;
  margin: 5px;
}

.buttonContainer {
  margin-top: 20px;
}

.questionContainer {
  margin-top: 40px;
  font-size: 25px;
}

#containerCard{
  padding: 4px;
  border-radius: 5px;
  background-color: lightskyblue;
}

.form-control-sm {
  padding: 5px;
  margin: 5px;
}
</style>