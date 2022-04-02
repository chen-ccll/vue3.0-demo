import Agency from "../pages/agency/Agency.vue";
import Notes from "../pages/notes/Notes.vue";
import Layout from "../layout/Layout.vue";
const routes = [
  {
    name: "home",
    path: "/",
    component: Layout,
    redirect: "/notes",
    children: [
      {
        name: "我的笔记",
        path: "/notes",
        component: Notes,
      },
      {
        name: "我的代办",
        path: "/agency",
        component: Agency,
      },
    ],
  },
];
export default routes;
