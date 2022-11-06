import { createApp } from 'vue'
import App from './App.vue'
import Login from './components/Login.vue'
import BoardList from './components/BoardList.vue'
import Register from "./components/Register.vue";

import 'bootstrap/dist/css/bootstrap.css'
import store from './store';
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: BoardList, meta: {
    guest: false
    }},
  { path: '/register', component: Register, meta: {
    guest: true
    } },
  { path: '/login', component: Login, meta: {
    guest: true
    } },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})


router.beforeEach((to, from, next) => {
  if (to.meta.guest === false && store.getters.isAuthenticated !== true) {
    next("/login");
  } else {
    next();
  }
});

const app = createApp(App);
app.use(store)
app.use(router)

app.mount('#app')
