<template>
  <div class="home">
    <!--================Home Banner Area =================-->
    <b-carousel v-model="bannerSlide" controls indicators v-if="!mobileView">
      <b-carousel-slide v-for="(item, i) in allBanners" :key="i">
        <template #img>
          <img
            v-if="!item.bannerurl"
            class="d-block img-fluid w-100"
            :src="baseUrl + 'img/banners/' + item.bannerpicture"
            :alt="'banner' + i"
          />
          <a target="_blank" :href="item.bannerurl" v-if="item.bannerurl">
            <img
              class="d-block img-fluid w-100"
              :src="baseUrl + 'img/banners/' + item.bannerpicture"
              :alt="'banner' + i"
            />
          </a>
        </template>
      </b-carousel-slide>
    </b-carousel>
    <b-carousel v-model="bannerSlide" controls indicators v-if="mobileView">
      <b-carousel-slide v-for="(item, i) in allBanners" :key="i">
        <template #img>
          <img
            v-if="!item.bannerurl"
            class="d-block img-fluid w-100"
            v-lazy="baseUrl + 'img/banners/' + item.mobilebannerpicture"
            :alt="'banner' + i"
          />
          <a target="_blank" :href="item.bannerurl" v-if="item.bannerurl">
            <img
              class="d-block img-fluid w-100"
              v-lazy="baseUrl + 'img/banners/' + item.mobilebannerpicture"
              :alt="'banner' + i"
            />
          </a>
        </template>
      </b-carousel-slide>
    </b-carousel>
    <!--================End Home Banner Area =================-->

    <!--================ Start Featured Area =================-->

    <section id="featured">
      <div class="row" style="justify-content: right !important;">
        <div
          class="col-lg-6 text-center"
          style="padding-top: 4%; padding-right: 4.3%;"
        >
          <div>
            <h1 style="text-align: right; color: white;">
              برترین ها
            </h1>
          </div>
        </div>
      </div>
      <div
        class="row"
        style="padding-top: 3%; padding-right: 4%; padding-left: 4%;"
        id="featured-show"
      >
        <div
          class="col-xs-4 col-md-4 col-sm-4"
          style="padding-right: 4%;padding-left: 4%;"
          v-for="(item, i) in randomFeatured"
          :key="i"
        >
          <div class="ot-portfolio-item">
            <router-link
              :to="{
                name: 'Talent',
                query: { fname: item.firstname, lname: item.lastname },
                params: { uuid: item.uuid }
              }"
            >
              <figure class="effect-bubba" style="border-radius: 15px;">
                <img
                  v-lazy="baseUrl + 'img/' + item.profilepicture"
                  :alt="item.firstname + ' ' + item.lastname"
                  class="img-responsive"
                  style="width: 100%;"
                />
                <div class="figcaptiontext">
                  <h2 class="talent-name">
                    {{ item.firstname + " " + item.lastname }}
                  </h2>
                  <p>{{ item.categories[0].subcategoryname }}</p>
                </div>
              </figure>
            </router-link>
          </div>
        </div>
      </div>
    </section>
    <!--================ End Featured Area =================-->

    <!--================ Start Categories Area =================-->
    <section id="cats">
      <div class="row" style="justify-content: right !important;">
        <div
          class="col-lg-6 text-center"
          style="padding-right: 4.3%; padding-top: 4%;"
        >
          <div>
            <router-link to="/search">
              <h1 style="text-align: right; color: white;">
                دسته بندی
              </h1>
            </router-link>
          </div>
        </div>
      </div>
      <div class="row">
        <div
          class="MultiCarousel"
          data-items="2,3,3,4"
          data-slide="1"
          data-interval="1000"
        >
          <div class="MultiCarousel-inner" id="categories-show">
            <div
              v-for="(item, i) in allCategories"
              :key="i"
              class="col-md-3 col-sm-6 item"
            >
              <router-link
                :to="{
                  name: 'Search',
                  params: { categoryId: item.categoryid }
                }"
              >
                <div>
                  <figure class="zoom">
                    <img
                      :src="
                        'https://starcameo.ir/img/categories/' + item.picture
                      "
                      :alt="'cat' + item.categoryid"
                      class="img-responsive"
                      style="width: 100%;border-radius:15px;"
                    />
                  </figure>
                </div>
              </router-link>
            </div>
          </div>
          <button class="btn btn-primary leftLst">
            <img src="../../assets/img/prev.png" alt="Prev" />
          </button>
          <button class="btn btn-primary rightLst">
            <img src="../../assets/img/next.png" alt="Next" />
          </button>
        </div>
      </div>
    </section>
    <!--================End Categories Area=================-->

    <!--================ Start About Area =================-->
    <section id="middle-text">
      <div class="text-right">
        <router-link to="/cameo">
          <h1 class="mb-30 title_color">
            <b>کمیو (cameo) چیست ؟</b>
          </h1>
        </router-link>
        <div
          class="row"
          style="padding: 0px 50px; padding-left: 4%; padding-right: 4%;"
        >
          <div class="col-md-12 col-sm-12" style="height: 100%; padding: 0;">
            <video
              preload="none"
              width="100%"
              controls=""
              style="display: block; margin: 0 auto;"
            >
              <source src="img/CameoIs.mp4" type="video/mp4" />
            </video>
          </div>
          <div class="col-md-12 col-sm-12" style="margin-top: 2em;">
            <p style="line-height: 1.9em; text-align: justify;">
              <b>کَمیو</b> با معادل فارسی
              <b>"تکجلوه"</b>
              در تعریف وب سایت معتبر ویکی پدیا به حضور افتخاری شخصیت های معروف
              در فیلم ها یا استفاده از صدای چهره‌های هنر نمایشی یا به کارگیری یک
              نفر در نقش خودش است که این نقش‌ها اغلب بسیار کوتاه هستند . در
              بیشتر موارد این حضور دلیل مشخصی دارد ؛ برای نمونه چهره مشهوری در
              نقش فردی ناشناس نمایش داده می‌شود . استفاده از کمیو بیشتر برای
              چهره‌های مشهور مانند هنرمندان ، بازیگران ، کارگردان‌های سینما ،
              فعالان حوزه موسیقی و ورزشکاران رایج است .
              <router-link
                style="
                  color: #f7a118 !important;
                  font-weight: bold;
                  text-decoration: underline;
                "
                to="/cameo"
              >
                ادامه مطلب
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </section>
    <!--================ End About Area =================-->
  </div>
</template>

<script>
import * as $ from "jquery";
import { mapState, mapActions } from "vuex";
import Vue from "vue";
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require("@/assets/img/spinner-1.gif"),
  attempt: 1
});
export default {
  name: "Home",
  data() {
    return {
      bannerSlide: 0,
      baseUrl: process.env.VUE_APP_API_URL
    };
  },
  computed: {
    ...mapState(["allBanners", "allFeatured", "allCategories", "mobileView"]),
    randomFeatured() {
      if (this.allFeatured.length != 0) {
        var that = this;
        var x = that.allFeatured.sort(() => 0.5 - Math.random());
        return x.slice(0, 3);
      } else {
        return [];
      }
    }
  },
  methods: {
    ...mapActions(["setBanners", "setFeatured", "setCategories", "setTalents"]),
    makeCarousel() {
      var itemsMainDiv = ".MultiCarousel";
      var itemsDiv = ".MultiCarousel-inner";
      var itemWidth = "";
      $(itemsMainDiv).on("touchstart", function(event) {
        var xClick = event.originalEvent.touches[0].pageX;
        $(this).one("touchmove", function(event) {
          var xMove = event.originalEvent.touches[0].pageX;
          if (Math.floor(xClick - xMove) > 5) {
            $(".rightLst").click();
          } else if (Math.floor(xClick - xMove) < -5) {
            $(".leftLst").click();
          }
        });
        $(".carousel").on("touchend", function() {
          $(this).off("touchmove");
        });
      });
      $(".leftLst, .rightLst").click(function() {
        var condition = $(this).hasClass("leftLst");
        if (condition) click(0, this);
        else click(1, this);
      });
      ResCarouselSize();
      $(window).resize(function() {
        ResCarouselSize();
      });
      function ResCarouselSize() {
        var incno = 0;
        var dataItems = "data-items";
        var itemClass = ".item";
        var id = 0;
        var btnParentSb = "";
        var itemsSplit = "";
        var sampwidth = $(itemsMainDiv).width();
        var bodyWidth = $("body").width();
        $(itemsDiv).each(function() {
          id = id + 1;
          var itemNumbers = $(this).find(itemClass).length;
          btnParentSb = $(this)
            .parent()
            .attr(dataItems);
          itemsSplit = btnParentSb.split(",");
          $(this)
            .parent()
            .attr("id", "MultiCarousel" + id);
          if (bodyWidth >= 1200) {
            incno = itemsSplit[3];
            itemWidth = sampwidth / incno;
          } else if (bodyWidth >= 992) {
            incno = itemsSplit[2];
            itemWidth = sampwidth / incno;
          } else if (bodyWidth >= 768) {
            incno = itemsSplit[1];
            itemWidth = sampwidth / incno;
          } else {
            incno = itemsSplit[0];
            itemWidth = sampwidth / incno;
          }
          $(this).css({
            transform: "translateX(0px",
            width: itemWidth * itemNumbers
          });
          $(this)
            .find(itemClass)
            .each(function() {
              $(this).outerWidth(itemWidth);
            });

          $(".leftLst").addClass("over");
          $(".rightLst").removeClass("over");
        });
      }
      function ResCarousel(e, el, s) {
        var leftBtn = ".leftLst";
        var rightBtn = ".rightLst";
        var translateXval = "";
        var divStyle = $(el + " " + itemsDiv).css("transform");
        var values = divStyle.match(/-?[\d.]+/g);
        var xds = Math.abs(values[4]);
        if (e == 0) {
          translateXval = parseInt(xds) - parseInt(itemWidth * s);
          $(el + " " + rightBtn).removeClass("over");

          if (translateXval <= itemWidth / 2) {
            translateXval = 0;
            $(el + " " + leftBtn).addClass("over");
          }
        } else if (e == 1) {
          var itemsCondition =
            $(el)
              .find(itemsDiv)
              .width() - $(el).width();
          translateXval = parseInt(xds) + parseInt(itemWidth * s);
          $(el + " " + leftBtn).removeClass("over");

          if (translateXval >= itemsCondition - itemWidth / 2) {
            translateXval = itemsCondition;
            $(el + " " + rightBtn).addClass("over");
          }
        }
        $(el + " " + itemsDiv).css(
          "transform",
          "translateX(" + -translateXval + "px"
        );
      }
      function click(ell, ee) {
        var Parent =
          "#" +
          $(ee)
            .parent()
            .attr("id");
        var slide = $(Parent).attr("data-slide");
        ResCarousel(ell, Parent, slide);
      }
    }
  },
  mounted() {
    if (this.allBanners.length == 0) {
      this.setBanners();
    }
    if (this.allFeatured.length == 0) {
      this.setFeatured();
    }
    this.makeCarousel();
    // this.setCategories();
  },
  components: {}
};
</script>
<style scoped>
figure.effect-bubba {
  margin-bottom: 30px;
  box-shadow: 0px 0px 50px rgb(0, 0, 0);
}
figure {
  position: relative;
  overflow: hidden;
  margin: 10px 1%;
  text-align: center;
  cursor: pointer;
}
figure.effect-bubba img {
  -webkit-transition: opacity 0.35s;
  transition: opacity 0.35s;
}
.figcaptiontext {
  bottom: 0;
  width: 100%;
  background: #313131;
  text-align: right;
  opacity: 1;
  padding: 5px;
}
figure.effect-bubba h2 {
  margin: 0;
  color: #fff;
  font-size: 18px;
  font-weight: 400;
  text-transform: uppercase;
  bottom: 1.5em;
  right: 25%;
  left: 25%;
}
figure.effect-bubba p {
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  opacity: 1;
  margin: 0;
}

.zoom:hover {
  -ms-transform: scale(1.09);
  transition: all 400ms;
  -webkit-transform: scale(1.09);
  transform: scale(1.09);
}
@media (max-width: 575px) {
  #categories-show > div {
    padding-right: 0 !important;
    padding-left: 0 !important;
  }
}
.MultiCarousel {
  float: right;
  overflow: hidden;
  width: 100%;
  position: relative;
}
.MultiCarousel .MultiCarousel-inner {
  transition: 1s ease all;
  float: left;
}

.MultiCarousel .MultiCarousel-inner .item {
  float: right;
}

.MultiCarousel .MultiCarousel-inner .item > div {
  text-align: center;
  padding: 10px;
  margin: 10px;
  background: #f1f1f1;
  color: #666;
}

.MultiCarousel .leftLst,
.MultiCarousel .rightLst {
  color: white;
  background-color: transparent;
  border-color: transparent;
  position: absolute;
  top: calc(50% - 20px);
  box-shadow: none !important;
}

.MultiCarousel .leftLst:active,
.MultiCarousel .rightLst:active {
  background-color: transparent !important;
  border-color: transparent !important;
}

.MultiCarousel .leftLst:focus,
.MultiCarousel .rightLst:focus {
  box-shadow: none !important;
}

.MultiCarousel .leftLst > img,
.MultiCarousel .rightLst > img {
  width: 50px;
}

.MultiCarousel .leftLst {
  left: 0;
  z-index: 1;
}

.MultiCarousel .rightLst {
  right: 0;
  z-index: 1;
}

.MultiCarousel .leftLst.over,
.MultiCarousel .rightLst.over {
  pointer-events: none;
}

.over {
  display: none;
}
.title-color {
  padding-right: 4.3%;
  padding-bottom: 2%;
  padding-top: 4%;
  color: white;
}
</style>
<style>
.carousel-control-next-icon {
  background-image: url("../../assets//img/next.png");
}
.carousel-control-prev-icon {
  background-image: url("../../assets/img/prev.png");
}
.carousel-indicators {
  padding: 0;
}
.carousel-indicators li {
  width: 10px !important;
  height: 10px !important;
  border-radius: 50%;
  background-color: white !important;
  opacity: 1 !important;
}

.carousel-indicators li.active {
  background-color: #f7a118 !important;
}
@media (min-width: 768px) {
  .carousel-control-next-icon,
  .carousel-control-prev-icon {
    width: 50px !important;
    height: 50px !important;
  }
  #middle-text video {
    width: 70% !important;
  }
}
</style>
