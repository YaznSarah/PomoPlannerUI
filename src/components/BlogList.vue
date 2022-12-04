<template>
  <div class="container">
    <div v-if="blogs.length === 0" class="alert alert-secondary" role="alert">
      No blogs have been posted, create one below
    </div>
    <div class="row">
      <div class="col-5">
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
      <div class="col">
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
        <button class="btn btn-info" type="button" @click="createBlog()" :disabled="blog.subject.trim().length == 0">
          Create Blog
        </button>
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
      }
    };
  },
  computed: {
    blogs() {
      return this.$store.state.blogs;
    },
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
      await this.$store.dispatch("addBlog", { blog: this.blog, tags: this.$store.state.blog.blogTags });
      this.clearFields();
    },
    async clearFields() {
      this.$store.commit('clearBlogTags')
      this.blog.subject = ""
      this.blog.description = " "
    },
    async deleteBoard(board) {
      this.$store.dispatch("deleteBoard", board);
    },
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
</style>