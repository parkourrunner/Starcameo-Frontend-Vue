<template>
  <div>
    <Header></Header>
    <router-view />
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
import * as $ from "jquery";
import * as authService from "../services/authService";
import { mapActions } from "vuex";
export default {
  name: "Index",
  data() {
    return {
      windowWidth: 0
    };
  },
  watch: {
    windowWidth(newWidth, oldWidth) {
      this.setMobileView(newWidth < 1000);
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
      this.windowWidth = window.innerWidth;
    }),
      this.checklogin();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    ...mapActions(["setMobileView", "setUserStatus", "setCurrentUser"]),
    async checklogin() {
      var that = this;
      var token = this.$cookies.get("sctoken");
      if (token) {
        await authService.checklogin(
          token,
          function(response) {
            that.setCurrentUser(response);
            if (response.onrest) {
              that.$cookies.set("talent", "1");
              that.setUserStatus({ isLoggedin: true, isTalent: true });
            } else {
              that.$cookies.set("talent", "0");
              that.setUserStatus({ isLoggedin: true, isTalent: false });
            }
          },
          function(error) {
            that.$cookies.remove("sctoken");
            that.$cookies.remove("talent");
            if (that.$route.meta.requiresAuth) {
              that.$router.push({
                name: "Login",
                params: { nextUrl: that.$route.name }
              });
            }
          }
        );
      } else {
        if (this.$route.meta.requiresAuth) {
          this.$router.push({
            name: "Login",
            params: { nextUrl: this.$route.name }
          });
        }
      }
    }
  },
  components: { Header, Footer }
};
</script>
<style scoped></style>
