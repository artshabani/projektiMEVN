import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import CreateMovie from "../views/CreateMovie.vue";
import MovieDetails from "../views/MovieDetails.vue";
import EditMovie from "../views/EditMovie.vue";
import PlayMovie from "../views/PlayMovie.vue";
import MoviesByCategory from "../views/MoviesByCategory.vue";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import MovieSearch from "../views/MovieSearch.vue";
import Logs from "../views/Logs.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/PlayMovie/:id",
    name: "PlayMovie",
    component: PlayMovie,
  },
  {
    path: "/CreateMovie",
    name: "CreateMovie",
    component: CreateMovie,
  },
  {
    path: "/MovieSearch/:id",
    name: "MovieSearch",
    component: MovieSearch,
  },
  {
    path: "/MoviesByCategory/:category",
    name: "MoviesByCategory",
    component: MoviesByCategory,
  },
  {
    path: "/EditMovie/:id",
    name: "EditMovie",
    component: EditMovie,
  },
  {
    path: "/MovieDetails/:id",
    name: "MovieDetails",
    component: MovieDetails,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/user/Register.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/user/Login.vue"),
  },
  {
    path: "/Logs",
    name: "Logs",
    component: Logs,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  onAuthStateChanged(getAuth(), async (user) => {
    const shouldBeLoggedIn = (record) =>
      record.meta.isAuthenticated || record.meta.isAdmin;

    if (to.matched.some((record) => shouldBeLoggedIn(record))) {
      if (!user) {
        next("/login");
      } else {
        const tokenResult = await getAuth().currentUser.getIdTokenResult();
        const isAdmin = tokenResult.claims.admin;
        if (isAdmin && to.matched.some((record) => !record.meta.isAdmin)) {
          next();
        } else if (to.matched.some((record) => record.meta.isAdmin)) {
          if (!tokenResult.claims.admin) {
            next("/");
          } else {
            next();
          }
        } else {
          next();
        }
      }
    } else {
      next();
    }
  });
});

export default router;
