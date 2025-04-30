import { BootRouter } from "@/@common";

export default BootRouter.route({
  app: "default",
  base: "/",
  routes: [
    {
      path: "/",
      redirect: "/app/notbook",
      name: "root",
    },
    // Dashboards
    {
      path: "/app/notbook",
      name: "customer-notbook",
      component: () => import("./Modules/NoteBook.vue"),
    },
  ],
});
