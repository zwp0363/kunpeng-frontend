<template>
  <div id="globalHeader">
    <a-menu
      mode="horizontal"
      :selectedKeys="selectedKeys"
      @menu-item-click="doMenuClick"
    >
      <a-menu-item
        key="0"
        :style="{ padding: 0, marginRight: '38px' }"
        disabled
      >
        <div class="title-bar">
          <img class="logo" src="../assets/oj-logo.svg" />
          <div class="title">鲲鹏OJ</div>
        </div>
      </a-menu-item>
      <a-menu-item v-for="item in routes" :key="item.path">
        {{ item.name }}
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import { routes } from "../router/routes";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const route = useRoute();

// 默认主页
const selectedKeys = ref(["/"]);

// 路由跳转后，更新选中的的菜单项
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
</script>

<style scoped>
.logo {
  height: 48px;
}

.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: #444;
  height: 16px;
}
</style>
