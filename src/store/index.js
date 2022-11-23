import { createStore, createLogger } from 'vuex'
const debug = process.env.NODE_ENV !== 'production'
const hostname = debug ? 'http://localhost:3000' : '';
const store = createStore({
    plugins: debug ? [createLogger()] : [],
    state() {
        return {
            boards: [],
            board: {},
            blogs: [],
            blog: {
                blogTags: [],
                blogComments: []
            },
            tags: [],
            comments: [],
            tasks: [],
            loggedIn: false,
            user: {},
            errors: []
        }
    },
    // only mutations can affect the state
    mutations: {
        addTask(state, task) {
            state.tasks.push(task)
        },
        addBoard(state, board){
            state.boards.push(board);
        },
        addBlog(state, blog){
            state.blogs.push(blog);
        },
        addTag(state, blogTag){
            state.blog.blogTags.push(blogTag);
        },
        addComment(state, comment){
            state.comments.push(comment);
        },
        removeBoard(state, board){
            state.boards = state.boards.filter((item) => {
                return board.id !== item.id
            })
        },
        removeBlog(state, blog){
            state.blogs = state.blogs.filter((item) => {
                return blog.blogid !== item.blogid
            })
        },
        removeTask(state, task) {
            state.tasks = state.tasks.filter((item) => {
                return task.id !== item.id
            })
        },
        updateTask(state, task) {
            for (let t in state.tasks) {
                if (state.tasks[t].id == task.id) {
                    state.tasks[t] = task
                }
            }
        },
        setTasks(state, tasks) {
            state.tasks = tasks;
        },
        setBoards(state, boards) {
            state.boards = boards;
        },
        setBlogs(state, blogs) {
            state.blogs = blogs;
        },
        setTags(state, tags){
            state.tags = tags;
        },
        setCurrentBlog(state, blog){
            state.blog = blog;
            state.blog.blogTags = [];
        },
        setComments(state, comments){
            state.comments = comments;
        },
        setCurrentBoard(state, board){
            state.board = board;
        },
        addUser(state, user){
            state.loggedIn = true
            state.user = user
        },
        setUser(state, user){
            state.loggedIn = true
            state.user = user
        },
        addError(state, error){
            state.errors.push(error);
        },
        clearErrors(state){
            state.errors = [];
        },
        clearBlogTags(state){
            state.blog.blogTags = [];
        },
        logout(state){
            state.loggedIn = false;
            state.user = {};
        }
    },
    // getters allow you to create utility functions for access state, but are not required
    getters: {
        getTasksByStatus: (state) => (status) => {
            return state.tasks.filter((item) => {
                return item.status == status
            })
        },
        getTaskById: (state) => (id) => {
            return state.tasks.filter((item) => {
                return item.id == id
            })[0]
        },
        getTagsByBlogId: (state) => (id) => {
            return state.tags.filter((item) => {
                return item.blogid == id
            })
        },
        getCommentsByBlogId: (state) => (id) => {
            return state.comments.filter((item) => {
                return item.blogid == id
            })
        },
        isAuthenticated: (state) => {return state.loggedIn},
    },
    // actions exist to allow you to trigger mutations asynchronously in one place
    actions: {
        async getBoards({ commit }) {
            const response = await fetch(hostname + "/boards", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const boards = await response.json();
            commit('setBoards', boards)
        },
        async getBlogs({ commit }) {
            const response = await fetch(hostname + "/blogs", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const blogs = await response.json();
            commit('setBlogs', blogs)
        },
        async getTags({ commit }) {
            const response = await fetch(hostname + "/blogstags", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const blogs = await response.json();
            commit('setTags', blogs)
        },
        async addUser({ commit }, userInfo) {
            commit('clearErrors');
            const response = await fetch(hostname + "/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: userInfo.username,
                    password: userInfo.password,
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    email: userInfo.email,
                }),
            });
            if(response.status === 401){
                commit('addError', 'Email or Username already exists');
            }
            else if(response.status === 400){
                commit('addError', 'Invalid input given');
            }
            else if(response.status === 200) {
                const user = await response.json();
                commit('addUser', user)
            }
        },
        async checkUser({ commit }, userInfo){
            commit('clearErrors');
            const response = await fetch(hostname + "/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: userInfo.email,
                    password: userInfo.password
                }),
            });
            const user = await response.json();
            if(user.length > 0){
                commit('setUser', user[0])
            }
            else{
                commit('addError', "Invalid credentials")
            }
        },
        async addBoard({ commit }, boardTitle) {
            const response = await fetch(hostname + "/boards", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: boardTitle,
                }),
            });
            const board = await response.json();
            commit('addBoard', board)
        },
        async addBlog({ commit }, blogInfo) {
            const response = await fetch(hostname + "/blogs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    subject: blogInfo.subject,
                    description: blogInfo.description,
                    created_by: this.state.user.username
                }),
            });
            const blog = await response.json();
            commit('addBlog', blog)
        },
        async addTag({ commit }, tagInfo) {
            const response = await fetch(hostname + "/blogstags", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    blogid: this.state.blogs.length + 1,
                    tag: tagInfo
                }),
            });
            const tag = await response.json();
            commit(tag)
        },
        async addComment({ commit }, commentInfo) {
            const response = await fetch(hostname + "/comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sentiment: commentInfo.sentiment,
                    description: commentInfo.description,
                    posted_by: this.state.user.username,
                    blogid : this.state.blog.blogid
                }),
            });
            const comment = await response.json();
            commit('addComment', comment)
        },
        async deleteBoard({ commit }, board){
            await fetch(hostname + "/boards/" + board.id, {
                method: "DELETE",
            });
            commit('removeBoard', board)
        },
        async deleteBlog({ commit }, blog){
            await fetch(hostname + "/boards/" + blog.blogid, {
                method: "DELETE",
            });
            commit('removeBlog', blog)
        },
        async getBoard({ commit }, id) {
            console.log('here')
            const response = await fetch(hostname + "/boards/" + id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await response.json();
            commit('setTasks', data.tasks)
            commit('setCurrentBoard', data.board)
        },
        async getBlog({ commit }, id) {
            const response = await fetch(hostname + "/blogs/" + id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await response.json();
            data.blog.blogTags = [];
            data.blog.blogComments = [];
            commit('setCurrentBlog', data.blog)
            commit('setComments', data.blog.blogComments)
        },
        async deleteTask({ commit }, task) {
            await fetch(hostname + "/tasks/" + task.id, {
                method: "DELETE",
            });
            commit('removeTask', task)
        },
        async addTask({ commit }, taskInfo) {
            const response = await fetch(hostname + "/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    boardId: taskInfo.boardId,
                    title: taskInfo.title,
                    status: "to-do",
                }),
            });
            const task = await response.json();
            commit('addTask', task)
        },
        async updateTask({ commit }, task) {
            await fetch(hostname + "/tasks/" + task.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: task.title,
                    status: task.status,
                    description: task.description,
                    points: task.points
                }),
            });
            commit('updateTask', task)
        },
        async initialize( {commit} ){
            commit("logout");
            await fetch(hostname + "/initialize");
        }
    }
})

export default store;
