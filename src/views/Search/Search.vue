<template>
  <div class="row" style="margin-top: 70px;">
    <div
      class="MultiCarousel"
      data-items="1,3,4,5,6,7"
      data-slide="1"
      data-interval="1000"
    >
      <div class="MultiCarousel-inner" id="categories-show">
        <div
          v-for="(item, i) in allCategories"
          :key="i"
          :categoryid="item.categoryid"
          class="col-md-3 col-sm-6 item"
          @click="showTalentsByCategory(item.categoryid)"
          :class="{
            selected: categoryId == item.categoryid
          }"
        >
          <a>
            <figure class="zoom">
              <img
                :src="'https://starcameo.ir/img/categories/' + item.picture"
                :alt="'cat' + item.categoryid"
                class="img-responsive"
              />
              <div class="overlay"></div>
            </figure>
          </a>
        </div>
      </div>
      <button class="btn btn-primary leftLst">
        <img :src="require('../../assets/img/prev.png')" alt="Prev" />
      </button>
      <button class="btn btn-primary rightLst">
        <img :src="require('../../assets/img/next.png')" alt="Next" />
      </button>
      <div class="categoriesShadow" style="left: 0"></div>
      <div class="categoriesShadow" style="right: 0"></div>
    </div>
    <div
      class="col-md-12 subcategoriesWrapper mt-3 mb-3 pb-2"
      style="display: flex;"
      id="subcategories-show"
    >
      <div
        class="item"
        v-for="(item, index) in subcategoriesToShow"
        :key="index"
        @click="showTalentsBySubCategory(item.categoryid)"
      >
        <a
          class="btn btn-secondary btn-md float-right mr-1 ml-1"
          :subcategoryid="item.categoryid"
          :parentid="item.parentId"
          :class="{
            selected: subcategoryId == item.categoryid
          }"
        >
          <span class="glyphicon glyphicon-lock">{{ item.title }}</span>
        </a>
      </div>
    </div>
    <div class="col-md-12">
      <div class="row" id="talent-show" style="text-align: center;">
        <div
          v-for="(item, index) in talentsToShow"
          :key="index"
          class="col-md-2 col-sm-3 col-6 talent"
          :data-groups="'[' + item.datagroup + ']'"
          :tid="item.tid"
          :tname="item.name"
        >
          <p class="fans" style="display:none">{{ item.fans }}</p>
          <router-link
            :to="{
              name: 'Talent',
              query: { fname: item.firstname, lname: item.lastname },
              params: { uuid: item.uuid }
            }"
          >
            <figure class="effect-bubba" style="border-radius: 10px;">
              <div style="height: 0;padding-bottom: 100%;">
                <img
                  v-lazy="item.src"
                  :alt="item.name"
                  class="img-responsive"
                  style="width: 100%;"
                />
              </div>
              <div class="figcaptiontext">
                <h2 class="talent-name">{{ item.name }}</h2>
                <p>{{ item.cat }}</p>
              </div>
            </figure>
          </router-link>
        </div>
      </div>
    </div>
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
  name: "Search",
  data() {
    return {
      categoryId: 0,
      subcategoryId: 0,
      talentsToShow: [],
      refinedTalents: [],
      subcategoriesToShow: [],
      searchText: ""
    };
  },
  computed: {
    ...mapState(["allCategories", "allTalents"])
  },
  methods: {
    ...mapActions(["setTalents"]),
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
    },
    renderTalents() {
      var list = [];
      this.allTalents.forEach(function(value, key) {
        list[key] = {};
        list[key].name = value.firstname + " " + value.lastname;
        list[key].firstname = value.firstname;
        list[key].categories = value.categories;
        list[key].lastname = value.lastname;
        list[key].uuid = value.uuid;
        list[key].tid = value.tid;
        list[key].fans = value.fans;
        list[key].src = "https://api.starcameo.ir/img/" + value.profilepicture;
        list[key].cat = value.categories[0].subcategoryname;
        list[key].datagroup = [];
        value.categories.forEach(function(item, index) {
          var a = list[key].categories[index].subcategoryuri.split("/")[0];
          var b = list[key].categories[index].subcategoryuri.split("/")[1];
          list[key].datagroup.push(a);
          list[key].datagroup.push(b);
        });
      });
      this.refinedTalents = list;
      if (this.$route.params && this.$route.params.categoryId) {
        this.showTalentsByCategory(this.$route.params.categoryId);
        this.$route.params.categoryId = null;
      } else {
        this.talentsToShow = list;
      }
    },
    showAllTalents() {
      this.searchText = "";
      this.subcategoryId = 0;
      this.categoryId = 0;
      this.$root.$emit("clearSearchText");
      this.subcategoriesToShow = [];
      this.talentsToShow = this.refinedTalents;
    },
    showTalentsByCategory(categoryId) {
      this.categoryId = categoryId;
      this.$root.$emit("clearSearchText");
      this.searchText = "";
      this.subcategoryId = 0;
      var x = this.allCategories.find(c => c.categoryid == categoryId);
      this.subcategoriesToShow = [];
      this.subcategoriesToShow.push({
        categoryid: null,
        parentid: null,
        title: "همه چهره ها",
        picture: null
      });
      this.subcategoriesToShow = [
        ...this.subcategoriesToShow,
        ...x.subcategories
      ];
      this.talentsToShow = this.refinedTalents.filter(talent => {
        return talent.datagroup.includes(`${categoryId}`);
      });
    },
    showTalentsBySubCategory(subcategoryId) {
      if (!subcategoryId) {
        this.showAllTalents();
      } else {
        this.subcategoryId = subcategoryId;
        this.$root.$emit("clearSearchText");
        this.searchText = "";
        this.talentsToShow = this.refinedTalents.filter(talent => {
          return talent.datagroup.includes(`${subcategoryId}`);
        });
      }
    },
    showTalentsByNameSearch() {
      this.subcategoryId = 0;
      this.categoryId = 0;
      this.subcategoriesToShow = [];
      this.talentsToShow = this.refinedTalents.filter(talent => {
        return talent.name.indexOf(this.searchText) > -1;
      });
    }
  },
  mounted() {
    this.$root.$on("showTalentsByNameSearch", searchText => {
      this.searchText = searchText;
      if (searchText == "") {
        this.talentsToShow = this.refinedTalents;
      } else {
        this.showTalentsByNameSearch();
      }
    });

    var that = this;
    this.makeCarousel();
    if (this.allTalents.length == 0) {
      this.setTalents().then(res => {
        that.renderTalents();
      });
    } else {
      that.renderTalents();
    }
  }
};
</script>
<style scoped>
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  outline: 0;
  box-shadow: none;
  border: 0 !important;
  background: #2c3e50;
  background-image: none;
}

/* Remove IE arrow */
select::-ms-expand {
  display: none;
}

/* Custom Select */
.select {
  position: relative;
  display: flex;
  width: 20em;
  height: 3em;
  line-height: 3;
  background: #1b1b1b;
  overflow: hidden;
  border-radius: 0.25em;
}

select {
  flex: 1;
  padding: 0 0.5em;
  color: #fff;
  cursor: pointer;
}

/* Arrow */
.select::after {
  content: "\25BC";
  position: absolute;
  top: 0;
  right: 0;
  padding: 0 1em;
  background: #1b1b1b;
  cursor: pointer;
  pointer-events: none;
  -webkit-transition: 0.25s all ease;
  -o-transition: 0.25s all ease;
  transition: 0.25s all ease;
}

/* Transition */
.select:hover::after {
  color: #f39c12;
}

span.screen-reader-text {
  display: none;
}

.subcategoriesWrapper .selected {
  background: #f7a118;
}

.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: 0.5s ease;
  background-color: #f7a118;
  border-radius: 15px;
}

.overlay-text {
  color: white;
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
  opacity: 0;
}

.zoom:hover .overlay {
  opacity: 0.7;
}

.zoom:hover .overlay-text {
  opacity: 1;
}

.item.selected .overlay {
  opacity: 0.7;
}

.item.selected .overlay-text {
  opacity: 1;
}

.talent {
  padding-right: 10px !important;
  padding-left: 10px !important;
}

@media (max-width: 991px) {
  .navbar-toggler {
    position: absolute;
    right: 10px;
  }
}

.img-responsive {
  width: 100%;
}
.img-responsive[lazy="loading"] {
  width: 40% !important;
  margin: auto;
  margin-top: 30%;
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
.MultiCarousel .leftLst.over,
.MultiCarousel .rightLst.over {
  pointer-events: none;
}
.MultiCarousel .leftLst {
  left: 0;
  z-index: 1;
}
.MultiCarousel .rightLst {
  right: 0;
  z-index: 1;
}
.over {
  display: none;
}
.MultiCarousel .leftLst > img,
.MultiCarousel .rightLst > img {
  width: 50px;
}
figure {
  position: relative;
  overflow: hidden;
  margin: 10px 1%;
  text-align: center;
  cursor: pointer;
}
.figcaptiontext {
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
.subcategoriesWrapper {
  overflow: auto;
  white-space: nowrap;
}
.talent {
  padding-right: 10px !important;
  padding-left: 10px !important;
}
</style>
