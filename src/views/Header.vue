<template>
  <header class="header_area" v-if="showHeader">
    <div class="main_menu">
      <nav
        class="navbar navbar-expand-lg navbar-light"
        style="direction: ltr; height: 70px"
      >
        <div
          class="container"
          style="max-width: 100%;padding-top:0 !important;margin-bottom: 0;"
        >
          <div style="direction: ltr" v-if="showIndependentLogo">
            <router-link class="navbar-brand" to="/">
              <img class="toplogo" src="@/assets/img/logo.png" alt="Logo" />
            </router-link>
          </div>
          <div style="direction: ltr" v-if="showActionMenus">
            <router-link v-if="showActionMenusLogo" class="navbar-brand" to="/">
              <img class="toplogo" src="@/assets/img/logo.png" alt="Logo" />
            </router-link>
            <router-link
              v-show="!userStatus.isLoggedin"
              to="./login"
              id="btn-login"
              class="btn btn-secondary btn-md"
            >
              <span class="glyphicon glyphicon-lock"></span> ثبت نام/ورود
            </router-link>
            <div id="useractionbar" v-show="userStatus.isLoggedin">
              <a class="useractionbtns" @click="openDropdown = !openDropdown">
                <img
                  id="profilepicture"
                  :src="
                    userStatus.isLoggedin
                      ? baseUrl + 'img/' + currentUser.profilepicture
                      : ''
                  "
                />
                <span id="username">{{
                  currentUser.firstname + " " + currentUser.lastname
                }}</span>
                <div style="float: left; position: absolute; left: 10px">
                  <img
                    id="dropdownicon"
                    :class="{ reverse: openDropdown }"
                    src="@/assets/img/Drop down icon.png"
                  />
                </div>
              </a>
              <div
                id="useractiondropdown"
                :class="{ showuseractiondropdown: openDropdown }"
              >
                <router-link
                  :to="{
                    name: 'Dashboard',
                    params: { activeSection: 'profile' }
                  }"
                  class="useractiondropdownbtns"
                  >مشخصات کاربر</router-link
                >
                <router-link
                  :to="{
                    name: 'Dashboard',
                    params: { activeSection: 'orders' }
                  }"
                  class="useractiondropdownbtns"
                  >درخواست ها</router-link
                >
                <router-link
                  :to="{
                    name: 'Dashboard',
                    params: { activeSection: 'incomes' }
                  }"
                  class="useractiondropdownbtns"
                  >تسویه حساب</router-link
                >
                <router-link
                  :to="{
                    name: 'Dashboard',
                    params: { activeSection: 'changepass' }
                  }"
                  class="useractiondropdownbtns"
                  >تغییر رمز عبور</router-link
                >
                <a
                  id="btn-logout"
                  class="useractiondropdownbtns"
                  @click="logout()"
                >
                  خروج
                </a>
              </div>
            </div>
            <router-link
              v-show="!userStatus.isLoggedin"
              to="./talentSignup"
              id="btn-signup"
              class="btn btn-secondary btn-md"
            >
              <span class="glyphicon glyphicon-lock"></span> ثبت نام چهره ها
            </router-link>
          </div>
          <div v-if="showSearchFormField" class="searchFormField">
            <div class="site-search col-12 col-sm-12 col-lg-12">
              <form role="search" method="get" class="search-form">
                <input
                  v-model="searchText"
                  type="search"
                  class="search-field"
                  placeholder="نام چهره یا هنرمند مورد نظر را جسنجو کنید"
                  @input="$root.$emit('showTalentsByNameSearch', searchText)"
                />

                <button type="button" class="button">
                  <span class="screen-reader-text">جستجو</span>
                  <img src="@/assets/img/search-icon.png" />
                </button>
              </form>
            </div>
          </div>
          <a
            v-if="showSearchFormField"
            class="searchIcon"
            @click="toggleSearchfield()"
          >
            <img src="@/assets/img/search-icon-orange.png" alt="Search" />
          </a>
          <b-navbar-toggle target="navbarSupportedContent">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </b-navbar-toggle>
          <b-collapse
            id="navbarSupportedContent"
            class="collapse navbar-collapse offset"
            style="direction: rtl"
          >
            <ul
              class="nav navbar-nav menu_nav justify-content-start"
              style="text-align: right; padding: 0"
            >
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  :target="$route.name == 'TalentSignup' ? '_blank' : '_self'"
                  to="/"
                  >صفحه اصلی</router-link
                >
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  :target="$route.name == 'TalentSignup' ? '_blank' : '_self'"
                  to="./search"
                >
                  دسته بندی
                </router-link>
              </li>
              <li class="nav-item">
                <a href="blog" target="_blank" class="nav-link">بلاگ</a>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  :target="$route.name == 'TalentSignup' ? '_blank' : '_self'"
                  to="/about"
                >
                  درباره ما
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  :target="$route.name == 'TalentSignup' ? '_blank' : '_self'"
                  to="/contact"
                >
                  تماس با ما
                </router-link>
              </li>
            </ul>
            <router-link
              to="/search"
              class="headerSearchGlass"
              :target="$route.name == 'TalentSignup' ? '_blank' : '_self'"
              v-if="showHeaderSearchGlass"
            >
              <img
                style="width: 21px; height: 21px"
                src="@/assets/img/search-icon-white.png"
              />
            </router-link>
          </b-collapse>
          <router-link v-if="!showActionMenusLogo" class="navbar-brand" to="/">
            <img
              class="toplogo"
              src="@/assets/img/logo.png"
              alt="Logo"
              style="height:50px"
            />
          </router-link>
          <router-link class="navbar-brand smallScreenLogo" to="/">
            <img
              class=""
              src="@/assets/img/logo.png"
              alt="Logo"
              style="height: 50px"
            />
          </router-link>
        </div>
      </nav>
    </div>
  </header>
</template>
<script>
import * as $ from "jquery";
import { mapState, mapActions } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      baseUrl: process.env.VUE_APP_API_URL,
      showHeader: true,
      showActionMenus: true,
      showIndependentLogo: false,
      showHeaderSearchGlass: false,
      openDropdown: false,
      showSearchFormField: false,
      showActionMenusLogo: true,
      searchText: ""
    };
  },
  watch: {
    $route: function(n, o) {
      this.openDropdown = false;
      if (n.name == "Callback") {
        this.showHeader = false;
      } else {
        this.showHeader = true;
      }
      if (
        n.name == "Login" ||
        n.name == "TalentSignup" ||
        n.name == "Search" ||
        n.name == "Dashboard"
      ) {
        this.showActionMenus = false;
      } else {
        this.showActionMenus = true;
      }
      if (
        n.name == "TalentSignup" ||
        n.name == "Login" ||
        n.name == "Dashboard"
      ) {
        this.showIndependentLogo = true;
      } else {
        this.showIndependentLogo = false;
      }
      if (n.name == "Home") {
        this.showHeaderSearchGlass = true;
      } else {
        this.showHeaderSearchGlass = false;
      }
      if (n.name == "Search") {
        this.showSearchFormField = true;
      } else {
        this.showSearchFormField = false;
      }
      if (n.name == "Search") {
        this.showActionMenusLogo = false;
      } else {
        this.showActionMenusLogo = true;
      }
    }
  },
  computed: {
    ...mapState(["userStatus", "currentUser"])
  },
  mounted() {
    this.$root.$on("clearSearchText", () => {
      this.searchText = "";
    });
    function navbarFixed() {
      var nav_offset_top = $("header").height() + 50;
      if ($(".header_area").length) {
        $(window).scroll(function() {
          var scroll = $(window).scrollTop();
          if (scroll >= nav_offset_top) {
            $(".header_area").addClass("navbar_fixed");
            $(".toplogo").css("height", "50px");
            $("nav.navbar").height("70px");
            $("#navbarSupportedContent ul li a").css("color", "#cacaca");
            $("#useractionbar").css("top", "10px");
            $("#useractionbar").css("left", "60px");
          } else {
            $("#navbarSupportedContent ul li a").css("color", "white");
            $(".header_area").removeClass("navbar_fixed");
            $("nav.navbar").height("70px");
            $(".toplogo").css("height", "70px");
            $("#useractionbar").css("top", "21px");
            $("#useractionbar").css("left", "90px");
          }
        });
      }
    }
    navbarFixed();
    if (this.$route.name == "Callback") {
      this.showHeader = false;
    } else {
      this.showHeader = true;
    }
    if (
      this.$route.name == "Login" ||
      this.$route.name == "TalentSignup" ||
      this.$route.name == "Search" ||
      this.$route.name == "Dashboard"
    ) {
      this.showActionMenus = false;
    } else {
      this.showActionMenus = true;
    }
    if (
      this.$route.name == "TalentSignup" ||
      this.$route.name == "Login" ||
      this.$route.name == "Dashboard"
    ) {
      this.showIndependentLogo = true;
    } else {
      this.showIndependentLogo = false;
    }
    if (this.$route.name == "Home") {
      this.showHeaderSearchGlass = true;
    } else {
      this.showHeaderSearchGlass = false;
    }
    if (this.$route.name == "Search") {
      this.showSearchFormField = true;
    } else {
      this.showSearchFormField = false;
    }
    if (this.$route.name == "Search") {
      this.showActionMenusLogo = false;
    } else {
      this.showActionMenusLogo = true;
    }
  },
  methods: {
    ...mapActions(["setCurrentUser", "setUserStatus"]),
    dropdown() {
      var x = document.getElementById("useractiondropdown");
      if (x.className.indexOf("showuseractiondropdown") == -1) {
        x.className += "showuseractiondropdown";
        $("#dropdownicon").addClass("reverse");
      } else {
        x.className = x.className.replace("showuseractiondropdown", "");
        $("#dropdownicon").removeClass("reverse");
      }
    },
    toggleSearchfield() {
      $(".searchFormField").toggle();
    },
    logout() {
      this.$cookies.remove("sctoken");
      this.$cookies.remove("talent");
      this.setCurrentUser({});
      this.setUserStatus({ isLoggedin: false, isTalent: false });
      this.dropdown();
      if (this.$route.name == "Dashboard") {
        this.$router.push({ name: "Home" });
      }
    }
  }
};
</script>
<style scoped>
.header_area.navbar_fixed .main_menu {
  background-color: black !important;
}

.header_area .navbar-brand {
  margin: 0.3125rem 0;
  padding: 0;
}
.header_area .navbar .nav .nav-item {
  margin-right: 2em !important;
}

.header_area .navbar .nav .nav-item .nav-link {
  font-size: 15px !important;
}
.header_area {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 11;
  background: transparent;
}

.header_area .menu_nav {
  width: fit-content;
}
.header_area .navbar {
  background: #111111;
  padding: 0px;
  border: 0px;
  border-radius: 0px;
  width: 100%;
}
.header_area .navbar .nav .nav-item {
  margin-right: 45px;
}
.header_area .navbar .nav .nav-item .nav-link {
  font: 500 12px/100px "Roboto", sans-serif;
  text-transform: capitalize;
  color: #fff;
  padding: 0px;
  display: inline-block;
  font-size: 16px;
}
.header_area .navbar .nav .nav-item .nav-link:after {
  display: none;
}
.header_area .navbar .nav .nav-item:hover .nav-link,
.header_area .navbar .nav .nav-item.active .nav-link {
  color: #ffffff;
}
.header_area .navbar .nav .nav-item.submenu {
  position: relative;
}
.header_area .navbar .nav .nav-item.submenu ul {
  border: none;
  padding: 0px;
  border-radius: 0px;
  box-shadow: none;
  margin: 0px;
  background: #ffd200;
}
.header_area .navbar .nav .nav-item.submenu ul:before {
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px 10px 0 10px;
  border-color: #eeeeee transparent transparent transparent;
  position: absolute;
  right: 24px;
  top: 45px;
  z-index: 3;
  opacity: 0;
  transition: all 400ms linear;
}
.header_area .navbar .nav .nav-item.submenu ul .nav-item {
  display: block;
  float: none;
  margin-right: 0px;
  border-bottom: 1px solid #ededed;
  margin-left: 0px;
  transition: all 0.4s linear;
}
.header_area .navbar .nav .nav-item.submenu ul .nav-item .nav-link {
  line-height: 45px;
  color: #222222;
  padding: 0px 30px;
  transition: all 150ms linear;
  display: block;
  margin-right: 0px;
}
.header_area .navbar .nav .nav-item.submenu ul .nav-item:last-child {
  border-bottom: none;
}
.header_area .navbar .nav .nav-item.submenu ul .nav-item:hover .nav-link {
  background: #e45447;
  color: #fff;
}
.header_area .navbar .nav .nav-item.submenu:hover ul .nav-item {
  margin-top: 0px;
}
.header_area .navbar .nav .nav-item:last-child {
  margin-right: 0px;
}
.header_area.navbar_fixed .main_menu {
  position: fixed;
  width: 100%;
  top: -70px;
  left: 0;
  right: 0;
  background: #ffd200;
  transform: translateY(70px);
  transition: transform 500ms ease, background 500ms ease;
  -webkit-transition: transform 500ms ease, background 500ms ease;
  box-shadow: 0px 3px 16px 0px rgba(0, 0, 0, 0.1);
}
.header_area.navbar_fixed .main_menu .navbar .nav .nav-item .nav-link {
  line-height: 70px;
}
.header_area.white_menu .navbar .nav .nav-item .nav-link {
  color: #fff;
}
.header_area.white_menu.navbar_fixed .main_menu .navbar .navbar-brand img {
  display: inline-block;
}
.header_area.white_menu.navbar_fixed
  .main_menu
  .navbar
  .navbar-brand
  img
  + img {
  display: none;
}
.header_area.white_menu.navbar_fixed
  .main_menu
  .navbar
  .nav
  .nav-item
  .nav-link {
  line-height: 70px;
  color: #222222;
}

.navbar-toggler span {
  display: block;
  width: 25px;
  height: 3px;
  background: #f7a118;
  margin: auto;
  margin-bottom: 4px;
  transition: all 400ms linear;
  cursor: pointer;
}
.smallScreenLogo {
  display: none;
  right: 40px;
  position: absolute;
}
#useractiondropdown {
  animation: animatezoom 0.6s;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2), 0 4px 20px 0 rgba(0, 0, 0, 0.19);
  cursor: auto;
  color: #000;
  display: none;
  position: absolute;
  background-color: #808080e6;
  border-radius: 0 0 10px 10px;
  min-width: 100px;
  margin: 0px 9%;
  padding: 0;
  z-index: 1;
  width: 148px;
}

.useractionbtns {
  padding: 5px 10px;
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  flex-direction: row-reverse;
  background-color: #808080a1;
  border-radius: 200px;
  width: 180px;
  align-items: center;
}

.useractiondropdownbtns {
  padding: 5px 20px;
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  flex-direction: row-reverse;
  width: 148px;
  align-items: center;
}

.useractiondropdownbtns:hover {
  color: #f7a118;
}
#profilepicture {
  width: 28px;
  height: 28px;
  border-radius: 50%;
}
#useractionbar {
  position: absolute;
  display: inline-block;
  cursor: pointer;
  left: 90px;
  top: 21px;
}
#username {
  padding: 0 10px;
  margin-left: 10px;
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  direction: rtl;
}
#dropdownicon {
  width: 12px;
  -webkit-transition-duration: 0.5s;
  -moz-transition-duration: 0.5s;
  -o-transition-duration: 0.5s;
  transition-duration: 0.5s;
  -webkit-transition-property: -webkit-transform;
  -moz-transition-property: -moz-transform;
  -o-transition-property: -o-transform;
  transition-property: transform;
}
#dropdownicon.reverse {
  -webkit-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
}
.showuseractiondropdown {
  display: block !important;
}
#navbarSupportedContent > ul > li > a {
  color: white;
  line-height: 50px;
}
#navbarSupportedContent {
  direction: rtl;
  padding-right: 0px;
  flex-grow: 0;
  right: 0;
}
.searchIcon {
  display: none;
  position: absolute;
  right: 100px;
}
.headerSearchGlass {
  margin-right: 10px;
  cursor: pointer;
}
#btn-login {
  margin: 0 5px;
  border-radius: 2rem;
  font-size: 13px !important;
}
#btn-signup {
  border-radius: 2rem;
  font-size: 13px !important;
}
#btn-login span,
#btn-signup span {
  font-size: 13px !important;
}
.site-search {
  border: 1px solid #ccc;
  display: inline-block;
  background-color: #616161;
  border-radius: 25px;
  border-color: black;
  max-width: 370px;
  top: 0 !important;
  left: 0 !important;
}
.site-search .search-field {
  width: 100%;
  background: none;
  border: none;
  border-color: transparent;
  float: left;
  font-size: 0.8rem;
  height: 36px;
  padding: 0 6px 0 6px;
  -webkit-appearance: none;
}
.site-search button {
  background: none;
  border: none;
  border-color: transparent;
  float: left;
  padding: 7px 7px 7px 0;
}
.site-search button img {
  cursor: pointer;
}
.searchIcon {
  display: none;
  position: absolute;
  right: 100px;
}
span.screen-reader-text {
  display: none;
}
.search-form {
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
}
.site-search input:focus,
.site-search button:focus {
  outline: none;
}
.searchFormField {
  flex-grow: 1;
  justify-content: flex-start;
  direction: rtl;
}
@media (min-width: 992px) {
  .header_area .navbar .nav .nav-item:last-child {
    margin-right: 2em;
  }
  .header_area .navbar .nav .nav-item.submenu ul {
    position: absolute;
    top: 120%;
    left: 0px;
    min-width: 200px;
    text-align: left;
    opacity: 0;
    transition: all 300ms ease-in;
    visibility: hidden;
    display: block;
    border: none;
    padding: 0px;
    border-radius: 0px;
    box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.4);
  }
  .header_area.white_menu .navbar .navbar-brand img {
    display: none;
  }
  .header_area.white_menu .navbar .navbar-brand img + img {
    display: inline-block;
  }
  .toplogo {
    height: 70px;
  }
}
@media (max-width: 991px) {
  .header_area .navbar .nav .nav-item.submenu:hover ul {
    visibility: visible;
    opacity: 1;
    top: 100%;
  }
  .header_area .navbar {
    background: #1b1b1b;
  }
  #navbarSupportedContent {
    overflow: hidden;
  }
  .header_area.white_menu .navbar .navbar-brand img {
    display: inline-block;
  }
  .header_area.white_menu .navbar .navbar-brand img + img {
    display: none;
  }
  .toplogo {
    height: 50px !important;
    display: none !important;
  }
  .smallScreenLogo {
    display: block !important;
    padding-right: 10px;
  }
  .headerSearchGlass {
    right: 100px !important;
    top: 26px !important;
  }
  #useractionbar {
    left: 60px !important;
    top: 16px !important;
  }
  #navbarSupportedContent {
    position: absolute;
    top: 70px;
    width: 100%;
    background-color: #1b1b1b;
    overflow: hidden;
  }
  .navbar-toggler[aria-expanded="false"] span:nth-child(2) {
    opacity: 1;
  }

  .navbar-toggler[aria-expanded="true"] span:nth-child(2) {
    opacity: 0;
  }

  .navbar-toggler[aria-expanded="true"] span:first-child {
    transform: rotate(-45deg);
    position: relative;
    top: 7.5px;
  }

  .navbar-toggler[aria-expanded="true"] span:last-child {
    transform: rotate(45deg);
    bottom: 6px;
    position: relative;
  }
}
@media (min-width: 576px) {
  .searchFormField {
    display: flex !important;
  }
}

@media (max-width: 575px) {
  .searchFormField {
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
  }
  .searchIcon {
    display: block !important;
  }
  .site-search {
    max-width: 100% !important;
  }
  .searchFormField {
    display: none;
    position: absolute;
  }
}

@media (min-width: 576px) and (max-width: 991px) {
  .searchFormField {
    margin-right: 70px;
  }
}
</style>
