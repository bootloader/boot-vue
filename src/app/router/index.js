import { BootRouter } from "@/@common";
import HomeView from "@app/views/HomeView.vue";

export default BootRouter.route({
  app: "default",
  base: "/",
  routes: [
    // {
    //   path: "/",
    //   redirect: "/home",
    //   name: "root",
    // },
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "@app/views/AboutView.vue"),
    },
  ],
});
