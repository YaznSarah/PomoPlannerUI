import { createApp } from 'vue'
import App from './App.vue'
import Login from './components/Login.vue'
import BoardList from './components/BoardList.vue'
import Register from "./components/Register.vue";

import 'bootstrap/dist/css/bootstrap.css'
import store from './store';
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: BoardList },
  { path: '/register', component: Register },
  { path: '/login', component: Login, },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters.isAuthenticated) {
      next("/");
      return;
    }
    next();
  } else {
    next();
  }
});

const app = createApp(App);
app.use(store)
app.use(router)

app.mount('#app')