import Vue from "vue";
import VueRouter from "vue-router";
import Authentication from "../views/Authentication.vue";
import Home from "../views/Home.vue";
import Catalog from "../views/Catalog.vue";
import Quizzes from "../views/Quizzes.vue";
import Prizes from "../views/Prizes.vue";
import Admin from "../views/Admin.vue";
import Profile from "../views/Profile.vue";
import Title from "../views/Title.vue";
import Quiz from "../views/Quiz.vue";
import Error from "../views/Error.vue";
import store from "../store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Authentication",
    component: Authentication,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/catalog",
    name: "Catalog",
    component: Catalog,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/quizzes",
    name: "Quizzes",
    component: Quizzes,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/prizes",
    name: "Prizes",
    component: Prizes,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      requiresAuth: true,
      onlyAdmin: true
    }
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/title/:imdbid",
    name: "Title",
    component: Title,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/quiz/:id",
    name: "Quiz",
    component: Quiz,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "*",
    name: "Error",
    component: Error
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.getLoggedUser) {
    next({ name: "Authentication" });
  } else if (!to.meta.requiresAuth && store.getters.getLoggedUser) {
    next({ name: "Home" });
  } else {
    if ((from.name == "Profile" && to.name == "Profile") || (from.name == "Title" && to.name == "Title")) {
      next();
      router.go(0);
    } else {
      if (to.meta.onlyAdmin && !store.getters.getLoggedUser.is_admin) {
        next({ name: "Home" });
      } else {
        next();
      }
    }
  }
});

export default router;
