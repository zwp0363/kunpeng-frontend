import router from "@/router";
import store from "@/store";
import AccessEnum from "@/access/accessEnum";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";

router.beforeEach(async (to, from, next) => {
  console.log("登录用户信息", store.state.user.loginUser);
  let loginUser = store.state.user.loginUser;
  // 如果之前没登陆过，自动登录
  if (!loginUser || !loginUser.userRole) {
    // 加await是为了等用户登陆成功之后，再执行后续代码
    await store.dispatch("user/getLoginUser");
    loginUser = store.state.user.loginUser;
  }
  const needAccess = (to.meta?.access as string) ?? AccessEnum.NOT_LOGIN;
  // 要跳转的页面必须要登录
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    // 如果没登陆，跳转到登陆页面
    if (
      !loginUser ||
      !loginUser.userRole ||
      loginUser.userRole === AccessEnum.NOT_LOGIN
    ) {
      next(`/user/login?redirect=${to.fullPath}`); // 登录后跳转到原页面
      return;
    }
    // 如果已经登录了，但是权限不足，那么跳转到无权限页面
    if (!checkAccess(loginUser, needAccess)) {
      next("/noAuth");
      return;
    }
  }
  next(); // 如果是不用登录可访问页面，或者用户是管理员，则继续导航
});
