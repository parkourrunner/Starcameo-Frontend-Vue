import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";
import * as authService from "../services/authService";
Vue.use(VueRouter);

const routes = [
  {
    name: "Index",
    path: "/",
    component: Index,
    children: [
      {
        name: "Home",
        path: "/",
        component: () => import("../views/Home/Home.vue"),
        meta: {
          title:
            "استارکمیو | اولین پلتفرم درخواست ویدیو شخصی سازی شده از چهره های مشهور و هنرمندان"
        }
      },
      {
        name: "About",
        path: "/about",
        component: () => import("../views/About/About.vue"),
        meta: { title: "درباره ما - استارکمیو" }
      },
      {
        name: "Faq",
        path: "/faq",
        component: () => import("../views/Faq/Faq.vue"),
        meta: { title: "سوالات متداول - استارکمیو" }
      },
      {
        name: "Cameo",
        path: "/cameo",
        component: () => import("../views/Cameo/Cameo.vue"),
        meta: { title: "کمیو چیست؟ - استارکمیو" }
      },
      {
        name: "Contact",
        path: "/contact",
        component: () => import("../views/Contact/Contact.vue"),
        meta: { title: "تماس با ما - استارکمیو" }
      },
      {
        name: "Callback",
        path: "/callback",
        component: () => import("../views/Callback/Callback.vue"),
        meta: { title: "صفحه پرداخت" }
      },
      {
        name: "Login",
        path: "/login",
        component: () => import("../views/Login/Login.vue"),
        meta: { title: "ورود یا ثبت نام - استارکمیو" }
      },
      {
        name: "Search",
        path: "/search",
        component: () => import("../views/Search/Search.vue"),
        meta: { title: "چهره ها - استارکمیو" }
      },
      {
        name: "Talent",
        path: "/talent",
        component: () => import("../views/Talent/Talent.vue"),
        meta: { title: "چهره - استارکمیو" }
      },
      {
        name: "TalentSignup",
        path: "/talentSignup",
        component: () => import("../views/TalentSignup/TalentSignup.vue"),
        meta: { title: "ثبت نام چهره ها - استارکمیو" }
      },
      {
        name: "Dashboard",
        path: "/dashboard",
        component: () => import("../views/Dashboard/Dashboard.vue"),
        meta: { title: "پنل کاربری - استارکمیو", requiresAuth: true },
        children: []
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});
const DEFAULT_TITLE =
  "استارکمیو | اولین پلتفرم درخواست ویدیو شخصی سازی شده از چهره های مشهور و هنرمندان";
router.beforeEach((to, from, next) => {
  next();
});
router.afterEach((to, from) => {
  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE;
  });
});
export default router;
