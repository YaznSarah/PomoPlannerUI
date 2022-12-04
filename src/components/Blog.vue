<template>
  <div class="container">
    <article>
      <!-- Post header-->
      <header class="mb-4">
        <!-- Post title-->
        <h1 class="fw-bolder mb-1">{{ blog.subject }}</h1>
        <!-- Post meta content-->
        <div class="text-muted fst-italic mb-2">Posted on {{ date_made }} by <strong>{{ blog.created_by }}</strong>
        </div>
        <!-- Post categories-->
        <a v-for="tag in tags" :key="tag.tag" class="badge bg-secondary text-decoration-none link-light">{{ tag.tag
        }}</a>
      </header>
      <!-- Post content-->
      <section class="mb-5">
        <p class="fs-5 mb-4">{{ blog.description }}</p>
      </section>
    </article>
    <label>Comments</label>
    <div class="comment">
      <div class="comment__flex">
        <p v-for="comment in comments" :key="comment.comment"><strong><i>{{comment.sentiment}}</i></strong>:  {{comment.description}} by <strong>{{comment.posted_by}}</strong></p>
      </div>
    </div>
    <div class="form">
      <form @submit.prevent="addComment">
        <div class="form__group">
          <label>Leave a comment</label>
          <div class="alert alert-danger" v-for="(error, index) in this.$store.state.errors" :key="index">{{ error }}</div>
          <textarea v-model="this.newComment.description" rows="1" required cols="10"
            placeholder="type in your comment"></textarea>
          <label for="Sentiment"></label>
          <div class="dropdown">
            <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
              {{this.newComment.sentiment}}
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" @click="setPositive()">Positive</a></li>
              <li><a class="dropdown-item" @click="setNegative()">Negative</a></li>
            </ul>
          </div>
          <button class="submitButton">Submit</button>
        </div>
      </form>
    </div>
    <div class="align-middle" style="height:100%">
      <div class="spinner-border align-middle" role="status" v-if="loading">
      </div>
    </div>
    <br>
    <router-link to="/" type="button" class="btn btn-secondary float-start">Go Back</router-link>
  </div>
</template>

<script>
export default {
  name: "Blog",
  components: {
  },
  data() {
    return {
      newComment: {
        sentiment: "Choose sentiment",
        description: ""
      }
    };
  },
  computed: {
    blog() {
      return this.$store.state.blog;
    },
    comments() {
      return this.$store.getters.getCommentsByBlogId(this.blog.blogid)
    },
    tags() {
      return this.$store.getters.getTagsByBlogId(this.blog.blogid)
    },
    date_made() {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(this.$store.state.blog.pdate).toLocaleDateString(undefined, options)
    }
  },
  mounted() {
    this.getBlog();
    this.getTags();
    this.getComments();
    this.$store.commit("clearErrors");
  },

  methods: {
    async getBlog() {
      await this.$store.dispatch('getBlog', this.$route.query.id)
      this.loading = false;
    },
    async getTags() {
      await this.$store.dispatch('getTags')
    },
    async getComments() {
      await this.$store.dispatch('getComments')
    },
    async addComment() {
      await this.$store.dispatch('addComment', this.newComment)
      this.getComments();
    },
    setNegative(){
      this.newComment.sentiment = "Negative"
    },
    setPositive(){
      this.newComment.sentiment = "Positive"
    }
  },
};
</script>

<style>
.comment {
  margin: 1em 0 2em;
  border-bottom: 1px solid #ccc;
  color: rgb(0, 116, 90);
}

.comment__flex-btn {
  margin: 1em 0;
}

a {
  margin-right: 10px;
}

.form {
  margin-top: 1.5em;
}

label {
  display: block;
  margin-bottom: 1em;
  margin-top: 20px;
  font-weight: 700;
  font-family: Padauk, sans-serif;
}

textarea {
  width: 100%;
  margin-top: 0.5em;
  border-radius: 10px;
}

.submitButton {
  background: #79b791;
  border: unset;
  border-radius: 10px;
  color: #230c0f;
  font-weight: 700;
  padding: 1em 2.5em;
  margin-top: 20px;
}

.btn {
  margin-top: 15px;
}
</style>
