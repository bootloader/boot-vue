import { BootRouter } from "@/@common";

export default BootRouter.route({
  app: "tuber",
  base: "/tuber/",
  routes: [
    {
      path: "/",
      redirect: "/home",
      name: "root",
    },
    // Dashboards
    {
      path: "/home",
      name: "HomePage",
      component: () => import("./Modules/TuberHome.vue"),
    },
  ],
});
