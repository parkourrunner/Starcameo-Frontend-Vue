<template>
  <div class="talent">
    <section class="main">
      <div class="row" style="padding: 3% 3%">
        <div class="col-md-4">
          <div class="row" id="introwrapper" :key="selectedTalent.uuid">
            <img
              class="avatar"
              v-if="!selectedTalent.intro"
              v-lazy="
                selectedTalent.profilepicture
                  ? baseUrl + 'img/' + selectedTalent.profilepicture
                  : ''
              "
              alt="Avatar"
            />
            <video
              id="introvideo"
              v-if="selectedTalent.intro"
              v-on:ended="pauseVideo()"
              :poster="
                selectedTalent.profilepicture
                  ? baseUrl + 'img/' + selectedTalent.profilepicture
                  : ''
              "
            >
              <source
                :src="
                  selectedTalent.intro
                    ? baseUrl + 'intro/' + selectedTalent.intro
                    : ''
                "
                type="video/mp4"
              />
            </video>
            <div id="videobutton">
              <span v-if="selectedTalent.intro != ''" class="videobutton">
                <img
                  v-show="videoPaused"
                  @click="playVideo()"
                  src="@/assets/img/play.svg"
                  alt="play icon"
                  class="videobuttonicon"
                  style="transition: all ease 0.5s"
                />
                <img
                  v-show="!videoPaused"
                  @click="pauseVideo()"
                  src="@/assets/img/pause.svg"
                  alt="play icon"
                  class="videobuttonicon"
                  style="transition: all ease 0.5s"
                />
              </span>
            </div>
          </div>

          <div class="row" style="margin-bottom: 1em">
            <button
              id="ordereq"
              type="button"
              class=".btn btn-secondary"
              @click="orderreq()"
            >
              درخواست کمیو
            </button>
          </div>
        </div>

        <div class="col-md-8">
          <div>
            <div class="col-md-9">
              <div class="row" style="margin: 1% 0; text-align: right">
                <h1 style="font-weight: 300" id="name">
                  {{ selectedTalent.firstname + " " + selectedTalent.lastname }}
                </h1>
              </div>
              <div class="row" style="margin: 1% 0">
                <h4 class="talentCats">
                  {{ selectedTalentCat }}
                </h4>
              </div>
              <div class="row" style="margin: 1% 0">
                <p id="fans" style="margin-right: 5px; font-size: 17px">
                  <img
                    v-if="!selectedTalent.liked"
                    src="@/assets/img/staroff.png"
                    @click="like()"
                    alt="Like"
                    height="30px"
                    width="30px"
                  />
                  <img
                    v-if="selectedTalent.liked"
                    src="@/assets/img/staron.png"
                    @click="dislike()"
                    alt="Dislike"
                    height="30px"
                    width="30px"
                  />
                  <!-- {{ selectedTalent.fans }} -->
                </p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-9 aboutWrapper">
              <p id="about">{{ selectedTalent.about }}</p>
            </div>
          </div>
        </div>
      </div>
      <b-modal
        centered
        :hide-footer="true"
        :hide-header="true"
        v-model="orderreqModalShow"
      >
        <button
          type="button"
          class="modal-close"
          aria-label="Close this dialog"
          style="display: flex"
          @click="orderreqModalShow = false"
        >
          ×
        </button>
        <div class="form-group title-wrapper">
          <label>به مناسبت</label>
          <input
            type="text"
            v-model="order.title"
            class="form-control"
            placeholder="مثال : تولد 22 سالگی همسرم نیلوفر"
          />
        </div>
        <div class="form-group description-wrapper">
          <label>پیام درخواستی</label>
          <textarea
            rows="5"
            type="text"
            v-model="order.description"
            class="form-control bot"
            placeholder="پیام درخواستی که دوست دارید چهره مورد نظر در این کمیو برای شما بیان کند را اینجا تایپ کنید"
          >
          </textarea>
        </div>
        <label class="custom-control fill-checkbox">
          <input
            type="checkbox"
            class="fill-control-input"
            v-model="order.agreement"
          />
          <span class="fill-control-indicator"></span>
          <span class="fill-control-description">
            قوانین
            <router-link
              :to="{ name: 'Faq', params: { showRules: true } }"
              target="_blank"
              >درخواست کمیو</router-link
            >
            را خوانده و قبول دارم.
          </span>
        </label>
        <div class="row" style="align-items: center; margin-top: 1em">
          <h4
            style="
              color: black;
              font-weight: 700;
              font-size: 16px;
              margin-bottom: 0;
              white-space: nowrap;
            "
            class="col-md-6"
          >
            مبلغ قابل پرداخت:
            <span id="price"> {{ selectedTalent.price }} تومان</span>
          </h4>
          <button
            class="btn-primary col-md-6"
            @click="submitOrder()"
            id="submitorder"
            style="
              font-size: 14px;
              border-radius: 25px;
              border: none;
              height: 32px;
            "
            :disabled="!order.agreement || !order.title || !order.description"
          >
            ثبت و پرداخت
          </button>
        </div>
      </b-modal>
      <b-modal
        centered
        :hide-footer="true"
        :hide-header="true"
        v-model="loginModalShow"
      >
        <h2 class="login-title">ابتدا وارد شوید!</h2>
        <button
          type="button"
          class="modal-close"
          aria-label="Close this dialog"
          style="display: flex"
          @click="loginModalShow = false"
        >
          ×
        </button>
        <div class="form-group has-feedback loginphonefield">
          <label for="loginphone">شماره موبایل</label>
          <input
            type="text"
            v-model="loginphone"
            class="form-control loginphone"
          />
        </div>
        <div class="form-group loginpassfield">
          <label for="loginpass">رمز ورود</label>
          <input
            type="password"
            v-model="loginpass"
            class="form-control loginpass"
          />
        </div>
        <button
          @click="login()"
          type="button"
          class="btn btn-secondary login-btn"
        >
          ورود
        </button>
      </b-modal>
      <b-modal
        centered
        :hide-footer="true"
        :hide-header="true"
        v-model="factorModalShow"
        modal-class="factor-modal"
      >
        <button
          type="button"
          class="modal-close"
          aria-label="Close this dialog"
          style="display: flex"
          @click="factorModalShow = false"
        >
          ×
        </button>
        <div class="row mainsection">
          <div class="row factorlogo">
            <img src="@/assets/img/paylogo.png" alt="paylogo" />
          </div>
          <div class="row factorsection">
            <span> تاریخ: {{ new Date() | moment("jYYYY/jMM/jDD") }} </span>
            <span class="en">
              شماره درخواست:
              {{ order.refcode }}
            </span>
            <span>
              درخواست کننده:
              {{ currentUser.firstname + " " + currentUser.lastname }}
            </span>
          </div>
          <div class="row factorsection">
            <span>
              درخواست کمیو از:
              {{ selectedTalent.firstname + " " + selectedTalent.lastname }}
            </span>
            <span>
              مبلغ:
              {{ (selectedTalent.price * 10).toLocaleString() + "  " + "ریال" }}
            </span>
          </div>
          <div class="row factorsection">
            <span>
              موجودی کیف پول شما:
              {{ (currentUser.balance * 10).toLocaleString() + "  " + "ریال" }}
            </span>
            <span>
              مبلغ قابل پرداخت:
              {{ order.hasToPay }}
            </span>
            <span v-show="discountSectionShow" id="discoundWrapper"
              >کد تخفیف:<input
                class="discountCode"
                v-model="discountCode"
                type="text"
              />
              <button
                @click="submitDiscountCode()"
                class="btn-primary submitDiscountCodeBtn"
              >
                ثبت
              </button>
            </span>
            <span class="discountError" v-show="discountErrorShow"></span>
            <span class="discountsucceed" v-show="discountsucceedShow">
              کد تخفیف اعمال شد
            </span>
          </div>
          <div class="row factorsection factorfooter">
            <span> پرداخت از طریق درگاه بانکی </span>
            <div style="display: flex">
              <label>
                <img
                  src="@/assets/img/psplogo.png"
                  alt="pasargadbanklogo"
                  style="margin: 1em"
                />
                <input type="radio" name="gateway" value="pep" checked />
              </label>
              <!--<label>
                    <img src="img/samanbank.png" alt="samanbanklogo" style="margin: 1em">
                    <input type="radio" name="gateway" value="payir">
                  </label>-->
            </div>
            <button class="btn-primary paybutton" @click="pay()">
              تایید و پرداخت
            </button>
          </div>
        </div>
      </b-modal>
    </section>
    <section id="suggested" v-if="suggestions.length != 0">
      <div class="row" style="justify-content: right !important">
        <div
          class="col-lg-6 text-center"
          style="padding-top: 4%; padding-right: 4.3%"
        >
          <div>
            <h3 style="text-align: right; color: white">چهره های دیگر</h3>
          </div>
        </div>
      </div>
      <div
        class="row"
        style="padding-top: 3%; padding-right: 4%; padding-left: 4%"
        id="suggested-show"
      >
        <div
          v-for="(item, index) in suggestions"
          :key="index"
          class="col-md-3 col-sm-3"
          style="padding-right: 4%; padding-left: 4%"
        >
          <div class="ot-portfolio-item">
            <a @click="findTalentByuuid(item.uuid)">
              <figure class="effect-bubba" style="border-radius: 15px;">
                <img
                  style="width: 100%"
                  :src="'https://api.starcameo.ir/img/' + item.profilepicture"
                  :alt="'cat' + item.firstname + ' ' + item.lastname"
                  class="img-responsive"
                />
                <div class="figcaptiontext">
                  <h2 class="talent-name">
                    {{ item.firstname + " " + item.lastname }}
                  </h2>
                  <p>
                    {{
                      item.categories
                        ? item.categories[0].subcategoryname
                          ? item.categories[0].subcategoryname
                          : ""
                        : ""
                    }}
                  </p>
                </div>
              </figure>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import * as webService from "../../services/webService";
import * as authService from "../../services/authService";
import * as $ from "jquery";
import { mapActions, mapState } from "vuex";
import Vue from "vue";
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require("@/assets/img/spinner-1.gif"),
  attempt: 1
});
export default {
  name: "Talent",
  data() {
    return {
      loginphone: "",
      loginpass: "",
      reqid: "",
      selectedTalent: {
        firstname: "",
        lastname: "",
        about: "",
        price: ""
      },
      suggestions: [],
      videoPaused: true,
      discountCode: "",
      order: { id: "", title: "", description: "" },
      baseUrl: process.env.VUE_APP_API_URL,
      orderreqModalShow: false,
      loginModalShow: false,
      factorModalShow: false,
      discountSectionShow: true,
      discountErrorShow: false,
      discountErrorText: "",
      discountsucceedShow: false
    };
  },
  computed: {
    ...mapState(["allTalents", "currentUser", "userStatus"]),
    selectedTalentCat() {
      if (
        this.selectedTalent.categories &&
        this.selectedTalent.categories.length != 0
      ) {
        var cat = "";
        var subcats = [];
        var tempSubcats = [];
        for (var j = 0; j < this.selectedTalent.categories.length; j++) {
          if (j == 0) {
            subcats.push(this.selectedTalent.categories[j].subcategoryname);
          } else if (j == this.selectedTalent.categories.length - 1) {
            subcats.push(this.selectedTalent.categories[j].subcategoryname);
          } else {
            subcats.push(this.selectedTalent.categories[j].subcategoryname);
          }
        }
        subcats.forEach(function(value, index) {
          if (!tempSubcats.includes(value)) {
            tempSubcats.push(value);
          }
        });
        for (var k = 0; k < tempSubcats.length; k++) {
          if (k == 0) {
            cat = cat + tempSubcats[k];
          } else if (k == tempSubcats.length - 1) {
            cat = cat + " و " + tempSubcats[k];
          } else {
            cat = cat + " , " + tempSubcats[k];
          }
        }
        return cat;
      } else {
        return "";
      }
    }
  },
  watch: {
    userStatus: {
      handler: function(n, o) {
        if (!this.userStatus.isLoggedin) {
          this.selectedTalent.liked = false;
        }
      },
      deep: true
    },
    selectedTalent: {
      handler: function(n, o) {
        setTimeout(() => {
          $("#introvideo").on("mouseover", function() {
            $("#videobutton span img")[0].style.opacity = 1;
            $("#videobutton span img")[1].style.opacity = 1;
          });
          $("#introvideo").on("mouseleave", function(e) {
            if (!$("#introvideo")[0].paused) {
              $("#videobutton span img")[0].style.opacity = 0;
              $("#videobutton span img")[1].style.opacity = 0;
            }
          });
        }, 1000);
      }
    }
  },
  methods: {
    ...mapActions(["setTalents", "setCurrentUser", "setUserStatus"]),
    async findTalentByuuid(uuid) {
      window.scrollTo(0, 0);
      this.videoPaused = true;
      var that = this;
      var head = {};
      if (this.$cookies.get("sctoken")) {
        head = { sctoken: this.$cookies.get("sctoken") };
      }
      await webService.get(
        this.baseUrl + "talents/" + uuid,
        {},
        head,
        true,
        function(response) {
          that.selectedTalent = response.data.data;
          that.suggestions = [];
          if (response.data.data.suggestions.length != 0) {
            for (var i = 0; i < 4; i++) {
              that.suggestions.push(response.data.data.suggestions[i]);
            }
          }
        }
      );
    },
    async findTalentByName(fname, lname) {
      var that = this;
      var talents = this.allTalents;
      var founduuid = null;
      talents.every(async function(talent, index) {
        if (talent.firstname == fname && talent.lastname == lname) {
          founduuid = talent.uuid;
          await that.findTalentByuuid(founduuid);
          return true;
        }
      });
      if (!founduuid) {
        alert("چهره ای یافت نشد");
      }
    },
    async orderreq() {
      if (!this.userStatus.isLoggedin) {
        this.loginModalShow = true;
        return false;
      } else if (this.userStatus.isTalent) {
        this.$swal({
          icon: "warning",
          showCloseButton: true,
          title: "شما یک چهره هستید",
          text: "متاسفانه چهره قادر به ثبت درخواست نمی باشد",
          showConfirmButton: false
        });
        return false;
      } else if (this.selectedTalent.onrest == 1) {
        this.$swal({
          title: "غیر فعال",
          imageUrl: "img/sadface.png",
          imageWidth: 190,
          imageHeight: 190,
          text: "در حال حاضر درخواست کمیو از طرف این چهره فعال نشده است",
          focusConfirm: false,
          showConfirmButton: false,
          showCloseButton: true,
          footer:
            '<span style="font-weight:600;color:black;font-size: 1.5em;"><a target="_blank" href="/cameo" style="border-bottom: 1px solid;color:black">کمیو</a> چیست؟</span>'
        });
      } else {
        this.orderreqModalShow = true;
      }
    },
    async submitOrder() {
      var that = this;
      if (this.order.description == "" || this.order.title == "") {
        this.$swal({
          icon: "warning",
          showCloseButton: true,
          title: "لطفاً هر دو فیلد را پر نمایید",
          showConfirmButton: false,
          timer: 3000,
          onClose: () => {
            this.orderreq();
          }
        });
        return;
      } else {
        var token = this.$cookies.get("sctoken");

        var data = {
          talentuuid: this.selectedTalent.uuid,
          title: this.order.title,
          description: this.order.description
        };
        await webService.post(
          this.baseUrl + "requests",
          data,
          {
            sctoken: token,
            "content-type": "application/json",
            "data-type": "json",
            "cross-domain": true
          },
          true,
          function(response) {
            that.order.id = response.data.requestid;
            that.order.refcode = response.data.refcode;
            that.order.hasToPay =
              that.selectedTalent.price - that.currentUser.balance <= 0
                ? "0 ریال"
                : (
                    (that.selectedTalent.price - that.currentUser.balance) *
                    10
                  ).toLocaleString() +
                  "  " +
                  "ریال";
            that.orderreqModalShow = false;
            that.discountSectionShow = true;
            that.discountErrorShow = false;
            that.discountErrorText = "";
            that.discountsucceedShow = false;
            that.factorModalShow = true;
          },
          function(error) {
            var err = error.data.message;
            if (err == "You're a talent!") {
              that.$swal({
                icon: "warning",
                showCloseButton: true,
                title: "شما یک چهره هستید",
                text: "متاسفانه چهره قادر به ثبت درخواست نمی باشد",
                showConfirmButton: false
              });
            } else if (err == "You can send request every 72 hours!") {
              that.$swal({
                icon: "warning",
                showCloseButton: true,
                title: "صبر کنید!!",
                text:
                  "شما در هر 72 ساعت فقط 1 بار قادر به ثبت درخواست هستند، لطفاً منتظر بمانید",
                showConfirmButton: false
              });
            } else if (err == "Login required!") {
              that.$swal({
                icon: "warning",
                showCloseButton: true,
                title: "وارد شوید",
                text: "برای ثبت درخواست، ابتدا باید وارد سایت شوید",
                showConfirmButton: true,
                confirmButtonText: "تایید",
                onClose: () => (that.loginModalShow = true)
              });
            } else {
              that.$swal({
                icon: "warning",
                showCloseButton: true,
                title: "خطا!",
                text:
                  "خطایی در ثبت رخواست شما رخداده است، لطفا با پشتیبانی سایت تماس بگیرید",
                showConfirmButton: false
              });
            }
          }
        );
      }
    },
    async checklogin() {
      var that = this;
      var token = this.$cookies.get("sctoken");
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
          return true;
        },
        function(error) {
          return false;
        }
      );
    },
    async login() {
      var that = this;
      await authService.login(
        this.loginphone,
        this.loginpass,
        function(response) {
          that.$cookies.set("sctoken", response.data.token);
          that.checklogin();
          that.loginModalShow = false;
          that.orderreqModalShow = true;
          window.scrollTo(0, 0);
          that.findTalentByuuid(that.selectedTalent.uuid);
        },
        function(error) {
          var err = error.data.message;
          if (err == "Your account isn't activated!") {
            that.$swal({
              imageUrl: "img/sadface.png",
              imageWidth: 190,
              imageHeight: 190,
              animation: false,
              title: "حساب کاربری شما هنوز فعال نشده است، لطفاً منتظر بمانید",
              showConfirmButton: true,
              focusConfirm: false,
              confirmButtonText: "بستن"
            });
          } else if (err == "Wrong username or password!") {
            that.$swal({
              imageUrl: "img/sadface.png",
              imageWidth: 190,
              imageHeight: 190,
              title: "نام کاربری و رمز عبور اشتباه می باشد، مجدد تلاش کنید",
              showConfirmButton: true,
              focusConfirm: false,
              confirmButtonText: "بستن"
            });
          } else {
            that.$swal({
              imageUrl: "img/sadface.png",
              imageWidth: 190,
              imageHeight: 190,
              title: "خطایی در شبکه رخداده است ،لطفا مجدد تلاش کنید",
              showConfirmButton: true,
              focusConfirm: false,
              confirmButtonText: "بستن"
            });
          }
        }
      );
    },
    async submitDiscountCode() {
      if (this.discountCode == "") {
        this.discountErrorText = "کدی وارد نشده است";
        this.discountErrorShow = true;
        return;
      }
      var that = this;
      webService.get(
        this.baseUrl +
          "requests/" +
          this.order.id +
          "/discount/" +
          this.discountCode,
        {},
        {
          sctoken: this.$cookies.get("sctoken")
        },
        true,
        function(response) {
          if (response.status == "success") {
            that.discountErrorText = "";
            that.discountErrorShow = false;
            that.discountsucceedShow = true;
            that.discountSectionShow = false;
            that.selectedTalent.price = response.data.newprice;
            that.order.hasToPay =
              that.selectedTalent.price - that.currentUser.balance <= 0
                ? "0 ریال"
                : (
                    (that.selectedTalent.price - that.currentUser.balance) *
                    10
                  ).toLocaleString() +
                  "  " +
                  "ریال";
          }
        },
        function(error) {
          var err = error.data.message;
          if (err == "Couldn't find requested code!") {
            that.discountErrorText = "کد تخفیف یافت نشد";
          } else if (err == "Already used!") {
            that.discountErrorText = "کد تخفیف قبلا استفاده شده است.";
          } else if (err == "Already paid!") {
            that.discountErrorText = "این فاکتور قبلا پرداخت شده است.";
          }
          that.discountErrorShow;
        }
      );
    },
    async pay() {
      var that = this;
      var gateway = $('input[name="gateway"]:checked').val();
      var requestUrl = "";
      if (gateway && gateway != "") {
        requestUrl =
          that.baseUrl + `requests/${that.order.id}/pay?gateway=${gateway}`;
      } else {
        requestUrl = that.baseUrl + `requests/${that.order.id}/pay`;
      }
      await webService.get(
        requestUrl,
        {},
        {
          sctoken: that.$cookies.get("sctoken")
        },
        true,
        function(response) {
          if (response.data.data.paymenturl) {
            location.href = response.data.data.paymenturl;
          } else if (response.data.data.factornumber) {
            that.$swal({
              icon: "success",
              title:
                "پرداخت شما با موفقیت انجام شد<br> شماره فاکتور " +
                response.data.data.factornumber,
              showConfirmButton: true,
              focusConfirm: false,
              onClose: () =>
                that.$router.push({
                  name: "Dashboard",
                  params: { activeSection: "orders" }
                })
            });
          }
        },
        function(error) {
          var err = error.data.message;
          if (error.data.status == "fail") {
            if (err == "Already paid!") {
              that.$swal({
                icon: "success",
                title: "این فاکتور قبلا پرداخت شده است",
                showConfirmButton: true,
                focusConfirm: false,
                confirmButtonText: "تایید"
              });
            } else if (
              err == "There's a problem connecting to payment gateway."
            ) {
              that.$swal({
                imageUrl: "img/sadface.png",
                imageWidth: 190,
                imageHeight: 190,
                title:
                  "ارتباط با درگاه بانک میسر نمی باشد، در صورت مشاهده مجدد با پشتیبانی تماس بگیرید!",
                showConfirmButton: true,
                focusConfirm: false,
                confirmButtonText: "تایید",
                onClose: () => {
                  that.$router.push({
                    name: "Dashboard",
                    params: { activeSection: "orders" }
                  });
                }
              });
            }
          } else if (error.data.status == "error") {
            if (err == "Request not found!") {
              that.$swal({
                imageUrl: "img/sadface.png",
                imageWidth: 190,
                imageHeight: 190,
                title: "درخواست مورد نظر یافت نشد",
                showConfirmButton: true,
                focusConfirm: false,
                confirmButtonText: "تایید"
              });
            } else if (err == "An error occurred!") {
              that.$swal({
                imageUrl: "img/sadface.png",
                imageWidth: 190,
                imageHeight: 190,
                title:
                  "خطایی رخداده است، درصورت مشاهده مجدد با پشایبانی تماس بگیرید",
                showConfirmButton: true,
                focusConfirm: false,
                confirmButtonText: "تایید"
              });
            }
          }
        }
      );
    },
    async like() {
      var that = this;
      if (!that.userStatus.isLoggedin) {
        this.$swal({
          imageUrl: "img/sadface.png",
          imageWidth: 190,
          imageHeight: 190,
          showCloseButton: true,
          title: "برای ستاره دادن ابتدا وارد شوید",
          showConfirmButton: true,
          focusConfirm: false,
          confirmButtonText: "ورود / ثبت نام",
          footer: ""
        }).then(result => {
          if (result.value) {
            this.loginModalShow = true;
          }
        });
        return false;
      }
      webService.post(
        this.baseUrl + "talents/vote",
        {
          votee: this.selectedTalent.uuid,
          operator: "1"
        },
        {
          sctoken: this.$cookies.get("sctoken"),
          "content-type": "application/json",
          "data-type": "json",
          "cross-domain": true
        },
        true,
        function(response) {
          that.selectedTalent.liked = true;
          that.selectedTalent.fans++;
        },
        function(error) {
          var err = error.data.message;
          if (err == "Already Voted!") {
            this.selectedTalent.liked = true;
          }
        }
      );
    },
    async dislike() {
      var that = this;
      webService.post(
        this.baseUrl + "talents/vote",
        {
          votee: this.selectedTalent.uuid,
          operator: "-1"
        },
        {
          sctoken: this.$cookies.get("sctoken"),
          "content-type": "application/json",
          "data-type": "json",
          "cross-domain": true
        },
        true,
        function(response) {
          that.selectedTalent.liked = false;
          that.selectedTalent.fans--;
        },
        function(error) {}
      );
    },
    playVideo() {
      $("#introvideo")[0].play();
      this.videoPaused = false;
    },
    pauseVideo() {
      $("#introvideo")[0].pause();
      this.videoPaused = true;
    }
  },
  async mounted() {
    var that = this;
    if (this.$route.params.uuid) {
      this.findTalentByuuid(this.$route.params.uuid);
    } else if (this.$route.query.fname && this.$route.query.lname) {
      var fname = this.$route.query.fname;
      var lname = this.$route.query.lname;
      if (this.allTalents.length != 0) {
        this.findTalentByName(fname, lname);
      } else {
        this.setTalents().then(res => {
          that.findTalentByName(fname, lname);
        });
      }
    } else {
      alert("چهره یافت نشد");
      this.$router.push({ name: "Search" });
    }
    setTimeout(() => {
      $("#introvideo").on("mouseover", function() {
        $("#videobutton span img")[0].style.opacity = 1;
        $("#videobutton span img")[1].style.opacity = 1;
      });
      $("#introvideo").on("mouseleave", function(e) {
        if (!$("#introvideo")[0].paused) {
          $("#videobutton span img")[0].style.opacity = 0;
          $("#videobutton span img")[1].style.opacity = 0;
        }
      });
    }, 1000);
  }
};
</script>
<style scoped>
#introwrapper {
  position: relative;
}
.main {
  height: auto;
  margin-bottom: 2em;
  margin-top: 6em;
}
.avatar {
  border-radius: 20em !important;
  width: 70%;
  height: 70%;
  margin-right: auto;
  margin-left: auto;
}
#intro {
  margin: 0 auto;
  height: 100%;
  border-radius: 10px;
  display: block;
  position: relative;
  visibility: initial;
  object-fit: cover;
}
#about {
  text-align: justify;
  float: right;
  color: white;
  font-size: unset;
  padding: 20px;
}
.talentCats {
  font-size: 20px;
  font-weight: 400;
  text-align: right;
}
.aboutWrapper {
  text-align: right;
  border-radius: 15px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
}
#videobutton {
  left: calc(50% - 30px);
  top: calc(50% - 30px);
  text-align: center;
  position: absolute;
}
.videobutton {
  font-size: 72px;
  color: #fff;
  bottom: 38px;
  left: 20px;
  -webkit-filter: drop-shadow(0 6px 22px rgba(0, 0, 0, 0.3));
  filter: drop-shadow(0 6px 22px rgba(0, 0, 0, 0.3));
}
.videobuttonicon {
  -webkit-transform: scale(1);
  transform: scale(1);
  transition: -webkit-transform 0.1s;
  transition: transform 0.1s;
  transition: transform 0.1s, -webkit-transform 0.1s;
}

.videobuttonicon:hover {
  -webkit-transform: scale(1.3);
  transform: scale(1.3);
  transition: -webkit-transform 0.1s;
  transition: transform 0.1s;
  transition: transform 0.1s, -webkit-transform 0.1s;
  cursor: pointer;
}
#introvideo {
  margin: 0 auto;
  height: 100%;
  border-radius: 10px;
  display: block;
  position: relative;
  visibility: initial;
  object-fit: cover;
}
#ordereq {
  border-radius: 25px;
  width: 167px;
  margin: 20px auto 0 auto;
  height: 37px;
  border: none;
  font-weight: 600;
  font-size: 14px;
}
.title-wrapper {
  margin-bottom: 0 !important;
  color: #545454;
}
.loginphonefield,
.loginpassfield {
  margin-bottom: 36px;
  color: #545454;
}

.loginphonefield {
  width: 60%;
  margin-left: auto;
  margin-right: auto;
}
.loginphone {
  background-color: #e4e4e4 !important;
  color: black;
  border-radius: 0.75em !important;
}
.loginpassfield {
  width: 60%;
  margin-left: auto;
  margin-right: auto;
}
.loginpass {
  background-color: #e4e4e4 !important;
  color: black;
  border-radius: 0.75em !important;
}
.login-title {
  display: block;
  position: relative;
  max-width: 100%;
  margin: 0 0 0.4em;
  padding: 0;
  color: #595959;
  font-size: 1.875em;
  font-weight: 600;
  text-align: center;
  text-transform: none;
  word-wrap: break-word;
}
.login-btn {
  margin-top: 0.5em;
  border-radius: 25px;
  width: 147px;
  height: 32px;
  font-size: 14px;
  font-weight: 600;
  border: none;
}
.title-wrapper > label {
  font-weight: 800;
  padding-right: 0;
  margin-top: 1em;
}
.title-wrapper > input,
.loginphonefield > input {
  font-size: 14px;
  background-color: #e4e4e4 !important;
  color: black;
  border-radius: 0.75em !important;
}
.description-wrapper {
  margin-bottom: 0;
  color: #545454;
}
.description-wrapper > label {
  font-weight: 800;
  padding-right: 0;
  margin-top: 1em;
}
.description-wrapper > textarea {
  font-size: 14px;
  background-color: #e4e4e4 !important;
  color: black;
  border-radius: 0.75em !important;
}
.fill-checkbox {
  color: #9b9b9b;
  margin-top: 1.5em;
  padding-left: 0 !important;
}
.fill-checkbox > .fill-control-description {
  font-size: 14px;
  margin-right: 30px;
  color: #9b9b9b;
}
.fill-checkbox > .fill-control-description > a {
  font-weight: 600;
  color: #2d7bf7 !important;
  border-bottom: 1px solid;
}

.form-group > label {
  margin-bottom: 0.5em;
}
#submitorder:disabled {
  background-color: #c9c9c9;
  cursor: not-allowed;
  color: #ffffff7a;
  border: 0;
  border-radius: 0.25em;
}
#submitorder {
  font-size: 14px;
  border-radius: 25px;
  height: 32px;
  font-weight: 600;
  border: none;
  flex: 0 0 147px;
  max-width: 147px;
  left: 22px;
  position: absolute;
}
.custom-control.fill-checkbox
  > .fill-control-input:checked
  ~ .fill-control-indicator {
  background-color: #2d7bf7;
  background-size: 80%;
  border-color: #2d7bf7;
}
#submitorder:disabled {
  background-color: #c9c9c9;
  cursor: not-allowed;
  color: #ffffff7a;
  border: 0;
  border-radius: 0.25em;
}
.custom-control.fill-checkbox {
  text-align: right;
}
.custom-control.fill-checkbox > .fill-control-input {
  display: none;
}
.custom-control.fill-checkbox > .fill-control-indicator {
  border-radius: 1em;
  display: inline-block;
  position: absolute !important;
  top: 2px;
  width: 20px;
  height: 20px;
  border: 2px solid #aaa;
  transition: 0.3s;
  background: transparent;
  background-size: 0%;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url("../../assets/img/tik.svg");
}
.custom-control.fill-checkbox
  > .fill-control-input:checked
  ~ .fill-control-indicator {
  background-color: #2d7bf7;
  background-size: 80%;
  border-color: #2d7bf7;
}
figure.effect-bubba {
  margin-bottom: 30px;
  box-shadow: 0px 0px 50px rgb(0, 0, 0);
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
@media (min-width: 992px) {
  #introvideo {
    width: 90% !important;
  }
}
@media (min-width: 1366px) {
  #introvideo {
    width: 80% !important;
  }
  #name {
    margin-top: 2em;
  }
}
@media (min-width: 1920px) {
  #introvideo {
    width: 60% !important;
  }
}
@media (max-width: 991px) {
  #introvideo {
    width: 100% !important;
  }
}
@media (max-width: 767px) {
  #introvideo {
    width: 80% !important;
    margin: 0 auto;
  }
  .videobutton {
    left: 80px !important;
  }
}
@media (max-width: 767px) {
  #introvideo {
    width: 80% !important;
    margin: 0 auto;
  }
  .videobutton {
    left: 80px !important;
  }
}
</style>
<style>
.modal-content {
  border-radius: 8px !important;
}
.modal-body {
  padding: 1.25rem;
  text-align: center;
}
.factor-modal > .modal-dialog > .modal-content {
  border-radius: 0.6em;
  background-color: rgb(245, 245, 245);
  justify-content: center;
  color: #545454;
}
.factor-modal > .modal-dialog > .modal-content > .modal-body {
  display: flex;
  padding: 36px 20%;
}
.factorlogo {
  display: block;
  width: 100%;
  margin: 0.5em 0;
}
.factorsection {
  border-top: 1px solid #cccccc;
  width: 100%;
  padding: 0.25em;
}
.factorsection span {
  width: 100%;
  text-align: right;
  padding: 0.25em;
  font-size: 14px;
  font-weight: 400;
}
.factorfooter {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5em;
}
.factorfooter span {
  margin: 0.25em;
  text-align: center !important;
  font-weight: 800 !important;
}
.factorfooter img {
  border: 2px solid #ffa726;
  border-radius: 5px;
  width: 70%;
  cursor: pointer;
}
.factorfooter input[type="radio"] {
  cursor: pointer;
  display: block;
  margin: 0 auto;
}
.paybutton {
  margin-top: 0.5em;
  border-radius: 25px;
  width: 147px;
  height: 32px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  background-color: #0072bb;
}
.discountCode {
  font-size: 0.8em;
  background-color: #e4e4e4 !important;
  color: black;
  border-radius: 0.75em !important;
}
.submitDiscountCodeBtn {
  margin-top: 0.5em;
  border-radius: 25px;
  width: 50px;
  height: 25px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  background-color: #0072bb;
}
.discountError {
  color: red;
}
.discountsucceed {
  color: green;
}
</style>
