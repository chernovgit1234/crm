import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home/Index.vue";

import Tasks from "../views/tasks/Index.vue";
import Telegram from "../views/telegram/Index.vue";

import Settings from "../views/settings/Index.vue";


const routes: any = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings,
  },
  {
    path: "/tasks",
    name: "tasks",
    component: Tasks,
  },
  ,
  {
    path: "/telegram",
    name: "telegram",
    component: Telegram,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
});

export default router;
