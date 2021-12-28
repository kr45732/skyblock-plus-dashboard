import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";
import ServerSettings from "../views/ServerSettings.vue";
import ServerSettingsVerify from "../views/ServerSettingsVerify.vue";
import ServerSettingsApply from "../views/ServerSettingsApply.vue";
import ServerSettingsRoles from "../views/ServerSettingsRoles.vue";
import SlayerRoles from "../views/SlayerRoles.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/dashboard/:userId",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/dashboard/:userId/:guildId",
    name: "ServerSettings",
    component: ServerSettings,
  },
  {
    path: "/dashboard/:userId/:guildId/verify",
    name: "ServerSettingsVerify",
    component: ServerSettingsVerify,
  },
  {
    path: "/dashboard/:userId/:guildId/apply",
    name: "ServerSettingsApply",
    component: ServerSettingsApply,
  },
  {
    path: "/dashboard/:userId/:guildId/roles",
    name: "ServerSettingsRoles",
    component: ServerSettingsRoles,
  },
  {
    path: "/dashboard/:userId/:guildId/roles/slayer",
    name: "SlayerRoles",
    component: SlayerRoles,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
