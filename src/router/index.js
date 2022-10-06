import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const Main = () => {
  return import(/* webpackChunkName: "main" */ "../views/Main.vue");
};

const BarGraph = () => {
  return import(/* webpackChunkName: "barGraph" */ "../views/BarGraph.vue");
};

const LineGraph = () => {
  return import(/* webpackChunkName: "lineGraph" */ "../views/LineGraph.vue");
};

const List = () => {
  return import(/* webpackChunkName: "list" */ "../views/List.vue");
};

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/main",
    name: "main",
    component: Main,
  },
  {
    path: "/bar-graph",
    name: "barGraph",
    component: BarGraph,
  },
  {
    path: "/line-graph",
    name: "lineGraph",
    component: LineGraph,
  },
  {
    path: "/list",
    name: "list",
    component: List,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
