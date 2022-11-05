import { createStore, createLogger } from 'vuex'
const debug = process.env.NODE_ENV !== 'production'

const store = createStore({
    plugins: debug ? [createLogger()] : [],
    state() {
        return {
            boards: [],
            board: {},
            tasks: [],
            loggedIn: false,
            users: [],
            user: {},
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
        removeBoard(state, board){
            state.boards = state.boards.filter((item) => {
                return board.id !== item.id
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
        setUsers(state, users) {
            state.users = users;
        }, 
        setCurrentBoard(state, board){
            state.board = board
        },
        addUser(state, user){
            state.loggedIn = true
            state.user = user
            state.users.push(user)
        },
        setUser(state, user){
            state.loggedIn = true
            state.user = user
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
        getUsers: (state) => {return state.users},
        isAuthenticated: (state) => {return state.loggedIn},
    },
    // actions exist to allow you to trigger mutations asynchronously in one place
    actions: {
        async getBoards({ commit }) {
            const response = await fetch("http://localhost:3000/boards", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const boards = await response.json();
            commit('setBoards', boards)
        },
        async getUsers({ commit }) {
            const response = await fetch("http://localhost:3000/user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const users = await response.json();
            commit('setUsers', users)
        },
        async addUser({ commit }, userInfo) {
            const response = await fetch("http://localhost:3000/register", {
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
            const user = await response.json();
            // if(!user.error.length > 0){
            //     commit('addUser', user)
            // }
            commit('addUser', user)
        },
        async addBoard({ commit }, boardTitle) {
            const response = await fetch("/boards", {
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
        async deleteBoard({ commit }, board){
            await fetch("/boards/" + board.id, {
                method: "DELETE",
            });
            commit('removeBoard', board)
        },
        async getBoard({ commit }, id) {
            console.log('here')
            const response = await fetch("/boards/" + id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await response.json();
            commit('setTasks', data.tasks)
            commit('setCurrentBoard', data.board)
        },
        async deleteTask({ commit }, task) {
            await fetch("/tasks/" + task.id, {
                method: "DELETE",
            });
            commit('removeTask', task)
        },
        async addTask({ commit }, taskInfo) {
            const response = await fetch("/tasks", {
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
            await fetch("/tasks/" + task.id, {
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
        }
    }
})

export default store;