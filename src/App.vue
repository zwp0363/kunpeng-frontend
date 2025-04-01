<template>
  <div id="app">
    <BasicLayout />
  </div>
</template>

<style>
#app {
}
</style>
<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

router.beforeEach((to, from, next) => {
  // 仅管理员可见，判断当前用户是否有权限
  if (to.meta === "canAdmin") {
    if (store.state.user.loginUser?.role !== "admin") {
      // 用户不是管理员，重定向到无权限页
      next("/noAuth");
      return;
    }
  }
  next(); // 如果不是 "canAdmin" 路由，或者用户是管理员，则继续导航
});
</script>
