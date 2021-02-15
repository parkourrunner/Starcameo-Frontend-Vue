import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import * as webService from "../services/webService";
export default new Vuex.Store({
  state: {
    userStatus: {
      isLoggedin: false,
      isTalent: false
    },
    ShowOverlay: false,
    currentUser: {},
    allBanners: [],
    allFeatured: [],
    allCategories: [
      {
        categoryid: 1,
        title: "سینما",
        picture: "cinema1.png",
        subcategories: [
          { categoryid: 30, parentid: 1, title: "بازیگر", picture: null },
          { categoryid: 31, parentid: 1, title: "کارگردان", picture: null },
          {
            categoryid: 32,
            parentid: 1,
            title: "دستیار کارگردان",
            picture: null
          },
          { categoryid: 33, parentid: 1, title: "تهیه کننده", picture: null },
          { categoryid: 34, parentid: 1, title: "تصویربردار", picture: null },
          { categoryid: 35, parentid: 1, title: "طراح صحنه", picture: null },
          { categoryid: 36, parentid: 1, title: "طراح لباس", picture: null },
          { categoryid: 37, parentid: 1, title: "چهره پرداز", picture: null },
          { categoryid: 38, parentid: 1, title: "صدابردار", picture: null },
          {
            categoryid: 39,
            parentid: 1,
            title: "طراح جلوه های بصری",
            picture: null
          },
          { categoryid: 40, parentid: 1, title: "بدلکار", picture: null },
          {
            categoryid: 41,
            parentid: 1,
            title: "فیلمنامه نویس",
            picture: null
          },
          { categoryid: 42, parentid: 1, title: "نورپرداز", picture: null },
          { categoryid: 43, parentid: 1, title: "تدوینگر", picture: null },
          { categoryid: 44, parentid: 1, title: "صداپیشه", picture: null }
        ]
      },
      {
        categoryid: 2,
        title: "موسیقی",
        picture: "music 1.png",
        subcategories: [
          { categoryid: 45, parentid: 2, title: "خواننده", picture: null },
          { categoryid: 46, parentid: 2, title: "نوازنده", picture: null },
          { categoryid: 47, parentid: 2, title: "آهنگساز", picture: null },
          { categoryid: 48, parentid: 2, title: "ترانه سرا", picture: null },
          { categoryid: 49, parentid: 2, title: "تنظیم کننده", picture: null }
        ]
      },
      {
        categoryid: 3,
        title: "تلویزیون",
        picture: "tv1.png",
        subcategories: [
          { categoryid: 50, parentid: 3, title: "بازیگر", picture: null },
          { categoryid: 51, parentid: 3, title: "مجری", picture: null },
          { categoryid: 52, parentid: 3, title: "گزارشگر", picture: null },
          { categoryid: 53, parentid: 3, title: "خبرنگار", picture: null },
          { categoryid: 54, parentid: 3, title: "صداپیشه", picture: null },
          { categoryid: 55, parentid: 3, title: "دوبلور", picture: null },
          { categoryid: 56, parentid: 3, title: "گوینده", picture: null },
          { categoryid: 57, parentid: 3, title: "کارگردان", picture: null },
          {
            categoryid: 58,
            parentid: 3,
            title: "دستیار کارگردان",
            picture: null
          },
          { categoryid: 59, parentid: 3, title: "تهیه کننده", picture: null },
          { categoryid: 60, parentid: 3, title: "تصویربردار", picture: null },
          { categoryid: 61, parentid: 3, title: "طراح صحنه", picture: null },
          { categoryid: 62, parentid: 3, title: "طراح لباس", picture: null },
          { categoryid: 63, parentid: 3, title: "چهره پرداز", picture: null },
          { categoryid: 64, parentid: 3, title: "صدابردار", picture: null },
          {
            categoryid: 65,
            parentid: 3,
            title: "طراح جلوه های بصری",
            picture: null
          },
          { categoryid: 66, parentid: 3, title: "بدلکار", picture: null },
          {
            categoryid: 67,
            parentid: 3,
            title: "فیلمنامه نویس",
            picture: null
          },
          { categoryid: 68, parentid: 3, title: "نورپرداز", picture: null },
          { categoryid: 69, parentid: 3, title: "تدوینگر", picture: null },
          { categoryid: 112, parentid: 3, title: "عروسک گردان", picture: null },
          {
            categoryid: 113,
            parentid: 3,
            title: "استندآپ کمدین",
            picture: null
          }
        ]
      },
      {
        categoryid: 4,
        title: "تئاتر",
        picture: "theater 1.png",
        subcategories: [
          { categoryid: 70, parentid: 4, title: "بازیگر", picture: null },
          {
            categoryid: 71,
            parentid: 4,
            title: "استندآپ کمدین",
            picture: null
          },
          { categoryid: 72, parentid: 4, title: "کارگردان", picture: null },
          {
            categoryid: 73,
            parentid: 4,
            title: "نمایشنامه نویس",
            picture: null
          },
          { categoryid: 74, parentid: 4, title: "طراح صحنه", picture: null },
          { categoryid: 75, parentid: 4, title: "طراح لباس", picture: null },
          { categoryid: 78, parentid: 4, title: "چهره پرداز", picture: null },
          { categoryid: 79, parentid: 4, title: "عروسک گردان", picture: null },
          { categoryid: 80, parentid: 4, title: "صداپیشه", picture: null }
        ]
      },
      {
        categoryid: 5,
        title: "ورزش",
        picture: "sport 1.png",
        subcategories: [
          { categoryid: 81, parentid: 5, title: "فوتبالیست", picture: null },
          { categoryid: 82, parentid: 5, title: "والیبالیست", picture: null },
          { categoryid: 83, parentid: 5, title: "کشتی گیر", picture: null },
          { categoryid: 84, parentid: 5, title: "بسکتبالیست", picture: null },
          { categoryid: 85, parentid: 5, title: "بدنساز", picture: null },
          { categoryid: 86, parentid: 5, title: "فیتنس کار", picture: null },
          { categoryid: 87, parentid: 5, title: "پارکور کار", picture: null },
          { categoryid: 88, parentid: 5, title: "شطرنج باز", picture: null },
          { categoryid: 89, parentid: 5, title: "داور", picture: null },
          { categoryid: 90, parentid: 5, title: "تکواندو کار", picture: null },
          { categoryid: 91, parentid: 5, title: "جودو کار", picture: null },
          { categoryid: 92, parentid: 5, title: "کاراته کار", picture: null },
          { categoryid: 93, parentid: 5, title: "شمشیر باز", picture: null },
          { categoryid: 94, parentid: 5, title: "سوار کار", picture: null },
          { categoryid: 95, parentid: 5, title: "دوچرخه سوار", picture: null },
          { categoryid: 96, parentid: 5, title: "اتومبیل ران", picture: null },
          { categoryid: 97, parentid: 5, title: "اسکیت سوار", picture: null },
          { categoryid: 98, parentid: 5, title: "شناگر", picture: null }
        ]
      },
      {
        categoryid: 6,
        title: "شبکه های اجتماعی",
        picture: "social media 1.png",
        subcategories: [
          { categoryid: 99, parentid: 6, title: "اینفلوئنسر", picture: null },
          { categoryid: 100, parentid: 6, title: "بلاگر", picture: null },
          {
            categoryid: 101,
            parentid: 6,
            title: "سازنده پادکست",
            picture: null
          },
          {
            categoryid: 102,
            parentid: 6,
            title: "سازنده محتوای ویدیویی",
            picture: null
          },
          {
            categoryid: 103,
            parentid: 6,
            title: "سازنده محتوای صوتی",
            picture: null
          },
          {
            categoryid: 114,
            parentid: 6,
            title: "استندآپ کمدین",
            picture: null
          },
          { categoryid: 115, parentid: 6, title: "کارآفرین", picture: null },
          {
            categoryid: 116,
            parentid: 6,
            title: "سازنده محتوای آموزشی",
            picture: null
          }
        ]
      },
      {
        categoryid: 7,
        title: "هنرهای تجسمی",
        picture: "art.png",
        subcategories: [
          { categoryid: 104, parentid: 7, title: "عکاس", picture: null },
          { categoryid: 105, parentid: 7, title: "گرافیست", picture: null },
          { categoryid: 106, parentid: 7, title: "تصویرساز", picture: null },
          { categoryid: 107, parentid: 7, title: "انیماتور", picture: null },
          { categoryid: 108, parentid: 7, title: "خوشنویس", picture: null },
          { categoryid: 109, parentid: 7, title: "مجسمه ساز", picture: null },
          {
            categoryid: 110,
            parentid: 7,
            title: "طراح زیور آلات",
            picture: null
          },
          { categoryid: 111, parentid: 7, title: "نقاش", picture: null },
          {
            categoryid: 117,
            parentid: 7,
            title: "کاریکاتوریست",
            picture: null
          },
          { categoryid: 118, parentid: 7, title: "شاعر", picture: null },
          { categoryid: 119, parentid: 7, title: "نویسنده", picture: null }
        ]
      }
    ],
    allTalents: [],
    mobileView: false
  },
  mutations: {
    setBanners(state, payload) {
      state.allBanners = payload;
    },
    setFeatured(state, payload) {
      state.allFeatured = payload;
    },
    setCategories(state, payload) {
      state.allCategories = payload;
    },
    setTalents(state, payload) {
      state.allTalents = payload;
    },
    setMobileView(state, payload) {
      state.mobileView = payload;
    },
    SET_OVERLAY(state, payload) {
      state.ShowOverlay = payload;
    },
    setCurrentUser(state, payload) {
      state.currentUser = payload;
    },
    setUserStatus(state, payload) {
      state.userStatus.isLoggedin = payload.isLoggedin;
      state.userStatus.isTalent = payload.isTalent;
    }
  },
  actions: {
    setBanners({ commit }) {
      return webService.get(
        process.env.VUE_APP_API_URL + "banners",
        {},
        {},
        true,
        function(response) {
          commit("setBanners", response.data.data.banners);
        }
      );
    },
    setFeatured({ commit }) {
      return webService.get(
        process.env.VUE_APP_API_URL + "featured",
        {},
        {},
        true,
        function(response) {
          commit("setFeatured", response.data.data.features);
        }
      );
    },
    setCategories({ commit }) {
      return webService.get(
        process.env.VUE_APP_API_URL + "categories",
        {},
        {},
        true,
        function(response) {
          commit("setCategories", response.data.data.categories);
        }
      );
    },
    setTalents({ commit }) {
      return webService.get(
        process.env.VUE_APP_API_URL + "talents",
        {},
        {},
        true,
        function(response) {
          commit("setTalents", response.data.data.talents);
        }
      );
    },
    setMobileView({ commit }, payload) {
      commit("setMobileView", payload);
    },
    setCurrentUser({ commit }, payload) {
      commit("setCurrentUser", payload);
    },
    setUserStatus({ commit }, payload) {
      commit("setUserStatus", payload);
    }
  },
  modules: {}
});
