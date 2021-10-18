import { createWebHistory, createRouter } from "vue-router";
import Home from '../components/views/Home.vue'
import Login from '../components/views/Login.vue'
import SignUp from '../components/views/SignUp.vue'
import Profile from '../components/views/Profile.vue'

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile
  }


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;