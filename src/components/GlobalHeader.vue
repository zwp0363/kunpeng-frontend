<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
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
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div>
        {{ store.state.user?.loginUser?.userName ?? "未登录" }}
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import AccessEnum from "@/access/accessEnum";

const router = useRouter();
const store = useStore();
const loginUser = store.state.user.loginUser;

// 展示在菜单的路由数组，根据权限动态展示菜单
// 创建一个计算属性 visibleRoutes，它会根据依赖的变化自动重新计算
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    if (!checkAccess(loginUser, item?.meta?.access as string)) {
      return false;
    }
    return true;
  });
});

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

setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "zwp管理者",
    userRole: AccessEnum.ADMIN,
  });
}, 3000);
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
