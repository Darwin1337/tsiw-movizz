import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Catalog from "../views/Catalog.vue";
import Quizzes from "../views/Quizzes.vue";
import Prizes from "../views/Prizes.vue";
import Admin from "../views/Admin.vue";
import Profile from "../views/Profile.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/catalog",
    name: "Catalog",
    component: Catalog,
  },
  {
    path: "/quizzes",
    name: "Quizzes",
    component: Quizzes,
  },
  {
    path: "/prizes",
    name: "Prizes",
    component: Prizes,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
