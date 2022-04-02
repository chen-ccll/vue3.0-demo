import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./router";
import VMdEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import "@kangc/v-md-editor/lib/theme/style/github.css";
import hljs from "highlight.js";
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
const app = createApp(App);
VMdEditor.use(githubTheme, {
  Hljs: hljs,
});
app.use(VMdEditor);
app.use(router);
app.mount("#app");
