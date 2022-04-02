<script lang="ts">
import { ref, getCurrentInstance, onMounted } from "vue";
export default {
  setup() {
    const { proxy } = getCurrentInstance();
    const selectedKeys = ref<string[]>([proxy.$route.path]);
    const menus = ref<[]>([]);
    onMounted(() => {
      const routes = proxy.$router.options.routes;
      menus.value = routes[0].children;
    });
    return {
      selectedKeys,
      menus,
    };
  },
};
</script>

<template>
  <a-layout class="layout">
    <a-layout-header>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item :key="item.path" v-for="item in menus">
          <router-link :to="item.path">
            {{ item.name }}</router-link
          ></a-menu-item
        >
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '800px' }">
        <router-view></router-view>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center"> 底部内容 </a-layout-footer>
  </a-layout>
</template>

<style scoped></style>
