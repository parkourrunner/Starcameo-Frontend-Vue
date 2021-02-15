<template>
  <div id="app">
    <b-overlay
      :show="ShowOverlay"
      v-if="ShowOverlay"
      opacity="0.3"
      class="overlay-wrapper"
    >
      <template #overlay>
        <div class="align-items-center d-flex justify-content-center">
          <img class="spinner-img" src="@/assets/img/spinner-1.gif" />
        </div>
      </template>
    </b-overlay>
    <router-view />
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "App",
  data() {
    return {
      overlay: false
    };
  },
  computed: {
    ...mapState(["ShowOverlay"])
  }
};
</script>
<style lang="scss">
body {
  font-family: IRANSans !important;
  font-weight: 300;
  direction: rtl;
  background-color: #1b1b1b !important;
  color: white !important;
  overflow: auto;
  scrollbar-width: 0;
  scrollbar-base-color: transparent;
  line-height: 24px;
  font-size: 14px;
}
body.loading {
  overflow: hidden;
}
body.loading .waiting {
  display: block;
}
.en {
  font-family: IRANSansEn !important;
}
@media (max-width: 991px) {
  body {
    height: 91%;
  }
}
.row {
  margin: 0;
}
html,
body {
  height: 100%;
}
</style>
<style>
.spinner-img {
  width: 50px;
}
.overlay-wrapper {
  position: fixed !important;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
}
</style>
