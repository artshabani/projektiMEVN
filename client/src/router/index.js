import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import CreateMovie from "../views/CreateMovie.vue";
import MovieDetails from "../views/MovieDetails.vue";
import EditMovie from "../views/EditMovie.vue";
import PlayMovie from "../views/PlayMovie.vue";

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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
