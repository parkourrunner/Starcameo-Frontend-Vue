<template>
  <div class="container-fluid login">
    <div
      class="row no-gutter login-screen"
      v-if="
        ![
          'uploadTalentPicBio',
          'uploadTalentDocs',
          'uploadTalentIntro'
        ].includes(currentStep)
      "
    >
      <div class="login-banner col-md-4 col-lg-6"></div>
      <div class="col-md-12 col-lg-6 form-wrapper">
        <div class="d-flex align-items-center py-5" style="margin: auto 0">
          <div class="container">
            <div class="row">
              <div class="col-md-9 col-lg-6 mx-auto login-form">
                <img
                  class="form-logo"
                  src="../../assets/img/logo.png"
                  alt="Logo"
                />
                <form class="form-signin">
                  <div class="form-group valid-form">
                    <div class="form-group" v-show="currentStep == 'login'">
                      <label for="loginphone">شماره موبایل</label>
                      <input
                        type="text"
                        id="loginphone"
                        class="form-control dir-ltr"
                        placeholder=""
                        v-model="loginphone"
                      />
                    </div>
                    <div class="form-group" v-show="currentStep == 'login'">
                      <label for="loginpass">رمز ورود</label>
                      <input
                        type="password"
                        id="loginpass"
                        class="form-control dir-ltr"
                        v-model="loginpass"
                      />
                    </div>
                    <div
                      class="form-group"
                      v-show="
                        currentStep == 'signup' ||
                          currentStep == 'submitVerCode'
                      "
                    >
                      <label for="signupphone">شماره موبایل</label>
                      <input
                        type="text"
                        id="signupphone"
                        class="form-control dir-ltr"
                        placeholder=""
                        v-model="signupphone"
                        :disabled="currentStep == 'submitVerCode'"
                      />
                    </div>
                    <div
                      class="form-group"
                      v-show="currentStep == 'submitVerCode'"
                    >
                      <label for="signupvercode">کد تأیید</label>
                      <input
                        type="text"
                        id="signupvercode"
                        class="form-control dir-ltr"
                        placeholder=""
                        v-model="signupvercode"
                      />
                    </div>
                    <div
                      class="form-group"
                      v-show="currentStep == 'createAccount'"
                    >
                      <label for="signupfname">نام</label>
                      <input
                        type="text"
                        id="signupfname"
                        class="form-control top"
                        placeholder=""
                        v-model="signupfname"
                      />
                    </div>
                    <div
                      class="form-group"
                      v-show="currentStep == 'createAccount'"
                    >
                      <label for="signuplname">نام خانوادگی</label>
                      <input
                        type="text"
                        id="signuplname"
                        class="form-control mid"
                        placeholder=""
                        v-model="signuplname"
                      />
                    </div>
                    <!-- <div
                      class="form-group"
                      v-show="currentStep == 'createAccount'"
                    >
                      <label for="signupmelicode">کد ملی</label>
                      <input
                        type="text"
                        id="signupmelicode"
                        class="form-control dir-ltr"
                        placeholder=""
                        v-model="signupmelicode"
                        minlength="10"
                        maxlength="10"
                      />
                    </div> -->
                    <div
                      class="form-group round"
                      v-show="currentStep == 'createAccount'"
                    >
                      <label for="signuprefcode">
                        <input type="checkbox" v-model="signuphasrefcode" />
                        آیا کد معرف دارید؟
                      </label>
                      <input
                        type="text"
                        id="signuprefcode"
                        class="form-control dir-ltr"
                        v-if="signuphasrefcode"
                        v-model="signuprefcode"
                        minlength="6"
                        maxlength="6"
                      />
                    </div>
                    <div
                      class="form-group"
                      v-show="currentStep == 'createAccount'"
                    >
                      <label for="signuppassword">
                        رمز ورود (حداقل 6 کاراکتر)
                      </label>
                      <input
                        type="password"
                        id="signuppassword"
                        class="form-control dir-ltr"
                        placeholder=""
                        v-model="signuppassword"
                      />
                    </div>
                    <div
                      class="form-group"
                      v-show="currentStep == 'createAccount'"
                    >
                      <label for="signupconfirmpassword">تکرار رمز ورود</label>
                      <input
                        type="password"
                        id="signupconfirmpassword"
                        class="form-control dir-ltr"
                        placeholder=""
                        v-model="signupconfirmpassword"
                      />
                    </div>
                    <div
                      class="form-group"
                      v-show="currentStep == 'forgotpassword'"
                    >
                      <label for="forgetphone">شماره موبایل</label>
                      <input
                        type="text"
                        id="forgetphone"
                        class="form-control dir-ltr"
                        placeholder=""
                        v-model="forgetphone"
                      />
                    </div>
                    <div
                      class="form-group"
                      v-show="currentStep == 'submitforgotpassword'"
                    >
                      <label for="forgetcode">کلمه عبور موقت</label>
                      <input
                        type="text"
                        id="forgetcode"
                        class="form-control dir-ltr"
                        placeholder=""
                        v-model="forgetcode"
                      />
                    </div>
                    <div
                      class="form-group"
                      v-show="currentStep == 'submitforgotpassword'"
                    >
                      <label for="forgetpassword">رمز جدید</label>
                      <input
                        type="password"
                        id="forgetpassword"
                        class="form-control dir-ltr"
                        placeholder=""
                        v-model="forgetpassword"
                      />
                    </div>
                    <button
                      v-show="currentStep == 'login'"
                      class="btn btn-secondary btn-block login-btn"
                      type="button"
                      @click="login()"
                    >
                      ورود
                    </button>
                    <button
                      class="btn btn-secondary btn-block vercodereqbutton"
                      type="button"
                      v-show="
                        currentStep == 'signup' ||
                          (currentStep == 'submitVerCode' && count == 0)
                      "
                      @click="getVerificationCode()"
                    >
                      دریافت کد ثبت نام
                    </button>
                    <button
                      class="btn btn-secondary btn-block"
                      type="button"
                      v-show="currentStep == 'submitVerCode'"
                      @click="submitVerificationCode()"
                    >
                      ثبت کد فعالسازی
                    </button>
                    <button
                      id="btncreateaccount"
                      class="btn btn-secondary btn-block"
                      type="button"
                      v-show="currentStep == 'createAccount'"
                      @click="createAccount()"
                    >
                      ایجاد اکانت
                    </button>
                    <button
                      class="btn btn-secondary btn-block btngetresetcode"
                      type="button"
                      v-show="currentStep == 'forgotpassword'"
                      @click="getResetPassCode()"
                    >
                      دریافت کد
                    </button>
                    <button
                      id="btnresetpass"
                      class="btn btn-secondary btn-block"
                      type="button"
                      v-show="currentStep == 'submitforgotpassword'"
                      @click="resetPass()"
                    >
                      تغییر رمز
                    </button>
                    <div class="suba">
                      <a
                        v-show="currentStep == 'login'"
                        class="signup-btn"
                        @click="currentStep = 'signup'"
                        >ثبت نام
                      </a>
                      <a
                        v-show="currentStep == 'login'"
                        class="forgotpassword"
                        @click="currentStep = 'forgotpassword'"
                        >فراموشی رمز عبور</a
                      >
                      <a id="resendcodetimer" v-show="count > 0"
                        >ارسال مجدد در {{ count }}</a
                      >
                    </div>
                    <a
                      class="signin-btn"
                      v-show="
                        currentStep == 'forgotpassword' ||
                          currentStep == 'signup'
                      "
                      @click="currentStep = 'login'"
                    >
                      حساب کاربری دارید؟ وارد شوید</a
                    >
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="mx-auto docsscreen"
      v-show="
        [
          'uploadTalentPicBio',
          'uploadTalentDocs',
          'uploadTalentIntro'
        ].includes(currentStep)
      "
    >
      <div class="allformswrapper">
        <span
          v-show="
            ['uploadTalentPicBio', 'uploadTalentDocs'].includes(currentStep)
          "
          class="createheader"
          >بارگذاری و ارسال مدارک</span
        >
        <span v-show="currentStep == 'uploadTalentIntro'" class="createheader"
          >بارگذاری ویدیو معرفی</span
        >

        <div
          class="signup-form"
          autocomplete="off"
          :class="currentStep == 'uploadTalentDocs' ? 'width90' : ''"
        >
          <div class="form-group">
            <div class="form-group">
              <div v-show="currentStep == 'uploadTalentPicBio'">
                <div class="listrow">
                  <div class="righttext">
                    <span>
                      در این قسمت خودتان را برای مخاطبین معرفی کنید و فعالیت های
                      خود را به طور مختصر بنویسید.<br />
                      این مطلب در صفحه ی اختصاصی شما در سایت و اپلیکیشن
                      استارکمیو نمایش داده خواهد شد.<br />
                      لازم به ذکر است در صورت نیاز متن ارائه شده توسط تیم
                      پشتیبانی استارکمیو بازدید و ویرایش خواهد شد.<br />
                    </span>
                    <textarea
                      style="width: 100%"
                      class="mt-3 biotext"
                      v-model="biotext"
                    >
                    </textarea>
                  </div>
                  <div class="leftupload">
                    <ImageCroppie
                      :defaultImage.sync="defaultImage"
                      :croppedImage.sync="croppedImage"
                      :pictureName.sync="profilepicname"
                      :height="200"
                      :width="200"
                    >
                    </ImageCroppie>
                    <input
                      type="text"
                      id="profilepicname"
                      v-model="profilepicname"
                      class="profilepicname"
                      disabled
                    />

                    <button
                      @click="uploadTalentPicBio()"
                      class="btn btn-primary btn-block biopicuploadbtn"
                      type="button"
                    >
                      بارگذاری و ارسال تصویر چهره
                    </button>
                    <div style="text-align: center; padding: 1em">
                      <span>
                        لطفا برای انتخای عکس پروفایل تصویر تمام رخ و بدون عینک
                        آفتابی با نور مناسب انتخاب و بارگذاری کنید.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="docform" v-show="currentStep == 'uploadTalentDocs'">
                <img
                  class="docformimg"
                  src="../../assets/img/upload.png"
                  alt="Upload Logo"
                />
                <span class="docformspan"
                  >لطفاً عکس کارت ملی و شناسنامه خود را در این قسمت بارگذاری
                  کنید
                </span>

                <div class="upload-btn-wrapper">
                  <button class="uploadbtn">انتخاب عکس کارت ملی</button>
                  <input
                    type="file"
                    name="mellicard"
                    id="mellicard"
                    accept="image/*"
                  />
                </div>
                <div class="upload-btn-wrapper">
                  <button class="uploadbtn">انتخاب عکس شناسنامه</button>
                  <input
                    type="file"
                    name="shenasnameh"
                    id="shenasnameh"
                    accept="image/*"
                  />
                </div>
                <button
                  @click="uploadTalentDocs"
                  class="btn btn-primary btn-block btnuploaddocs"
                  type="button"
                >
                  بارگذاری و ارسال فایل
                </button>
              </div>
              <div v-show="currentStep == 'uploadTalentIntro'">
                <div class="listrow">
                  <div class="righttext">
                    <span
                      >چهره محترم لطفاً قبل از ضبط ویدیو به نکات زیر توجه
                      فرمایید : <br /><br />
                      1. زمان این ویدیو کمتر از 60 ثانیه می باشد.<br />
                      2.صدا و نور مناسب را در نظر بگیرید.<br />
                      3.جهت گوشی را به صورت عمودی در نظر بگیرید .<br />
                      4.فرمت فایل ارسالی به صورت MP4 مورد قبول میباشد.<br />
                      5.معرفی شما برای احراز هویت الزامیست.<br />
                      6.در صورت تمایل نوع فعالیت خود را شرح دهید.<br />
                      7.همکاری خود را با استارکمیو اعلام فرمایید .
                    </span>
                  </div>
                  <div class="leftupload">
                    <img src="../../assets/img/upload.png" alt="Upload Logo" />

                    <div class="upload-btn-wrapper" style="display: block">
                      <button class="uploadbtn">انتخاب ویدیو معرفی</button>
                      <input
                        type="file"
                        name="introvideo"
                        id="introvideo"
                        accept="video/*"
                      />
                    </div>
                    <button
                      @click="uploadTalentIntro"
                      class="btn btn-primary btn-block introuploadbtn"
                      type="button"
                    >
                      بارگذاری و ارسال فایل
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as authService from "../../services/authService";
import * as webService from "../../services/webService";
import * as $ from "jquery";
import { mapState, mapActions } from "vuex";
import ImageCroppie from "../../components/ImageCroppie";

String.prototype.toEnglishDigit = function() {
  var find = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  var replace = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  var replaceString = this;
  var regex;
  for (var i = 0; i < find.length; i++) {
    regex = new RegExp(find[i], "g");
    replaceString = replaceString.replace(regex, replace[i]);
  }
  return replaceString;
};

export default {
  name: "Login",
  components: {
    ImageCroppie
  },
  data() {
    return {
      currentStep: "login",
      baseUrl: process.env.VUE_APP_API_URL,
      steps: [
        "login",
        "forgotpassword",
        "submitforgotpassword",
        "signup",
        "submitVerCode",
        "createAccount",
        "uploadTalentPicBio",
        "uploadTalentDocs",
        "uploadTalentIntro"
      ],
      loginphone: "",
      loginpass: "",
      signupphone: "",
      signupvercode: "",
      signupfname: "",
      signuplname: "",
      signupmelicode: "",
      signuphasrefcode: "",
      signuppassword: "",
      signupconfirmpassword: "",
      signuprefcode: "",
      forgetphone: "",
      forgetcode: "",
      forgetpassword: "",
      biotoken: "",
      biotext: "",
      profilepic: null,
      profilepicname: "تصویر انتخابی",
      doctoken: "",
      introtoken: "",
      counter: null,
      count: 0,
      defaultImage: require("../../assets/img/default-picture.png"),
      croppedImage: null
    };
  },
  computed: {
    ...mapState(["userStatus"])
  },
  watch: {
    userStatus(n, o) {
      if (n.isLoggedin)
        this.$router.push({
          name: "Home"
        });
    },
    croppedImage: function(value) {
      if (value) {
        this.profilepic = this.croppedImage;
      }
    }
  },

  methods: {
    ...mapActions(["setCurrentUser", "setUserStatus"]),
    async login() {
      var that = this;
      if (!this.loginphone) {
        that.$swal({
          icon: "warning",
          showCloseButton: true,
          title: "لطفاً شماره موبایل را وارد کنید",
          showConfirmButton: false,
          footer: "",
          timer: 2000
        });
        return;
      } else if (!this.loginpass) {
        that.$swal({
          icon: "warning",
          showCloseButton: true,
          title: "لطفاً رمز عبور را وارد کنید",
          showConfirmButton: false,
          footer: "",
          timer: 2000
        });
        return;
      }
      if (
        this.loginphone.substr(0, 2) != "09" &&
        this.loginphone.substr(0, 2) != "۰۹"
      ) {
        that.$swal({
          icon: "warning",
          showCloseButton: true,
          title: "شماره موبایل را صحیح وارد کنید",
          showConfirmButton: false,
          footer: "مثال: 09*********",
          timer: 2000
        });
        return;
      } else if (this.loginphone.length != 11) {
        that.$swal({
          icon: "warning",
          showCloseButton: true,
          title: "تعداد اعداد شماره موبایل کم است!",
          showConfirmButton: false,
          footer: "مثال: 09123456789",
          timer: 2000
        });
        return;
      }
      this.loginphone = this.loginphone.toEnglishDigit();
      await authService.login(
        this.loginphone,
        this.loginpass,
        function(response) {
          if (response.data.biotoken) {
            that.biotoken = response.data.biotoken;
            that.$swal({
              imageUrl: "img/sadface.png",
              imageWidth: 190,
              imageHeight: 190,
              title:
                "شما هنوز بیوگرافی و تصویر پروفایل خود را بارگذاری نکرده اید",
              showConfirmButton: false,
              timer: 1500
            });
            that.currentStep = "uploadTalentPicBio";
            $("style").append(
              ".container{padding-left: 15px;padding-right: 15px !important;}"
            );
          } else if (response.data.docstoken) {
            that.doctoken = response.data.docstoken;
            that.$swal({
              imageUrl: "img/sadface.png",
              imageWidth: 190,
              imageHeight: 190,
              title: "شما هنوز مدارک خود را بارگذاری نکرده اید",
              showConfirmButton: false,
              timer: 1500
            });
            that.currentStep = "uploadTalentDocs";
            $("style").append(
              ".container{padding-left: 15px;padding-right: 15px !important;}"
            );
          } else if (response.data.videotoken) {
            that.introtoken = response.data.videotoken;
            that.$swal({
              imageUrl: "img/sadface.png",
              imageWidth: 190,
              imageHeight: 190,
              title: "شما هنوز ویدیو معرفی حود را بارگذاری نکرده اید",
              showConfirmButton: false,
              timer: 1500
            });
            that.currentStep = "uploadTalentIntro";
            $("style").append(
              ".container{padding-left: 15px;padding-right: 15px !important;}"
            );
          } else {
            that.$cookies.set("sctoken", response.data.token);
            that.checklogin();
          }
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
          if (that.$route.params.nextUrl) {
            that.$router.push({
              name: that.$route.params.nextUrl
            });
          } else {
            that.$router.push({
              name: "Home"
            });
          }
          return true;
        },
        function(error) {
          return false;
        }
      );
    },
    getVerificationCode() {
      this.signupphone = this.signupphone.toEnglishDigit();
      var requestUrl = "https://api.starcameo.ir/signup";
      var data = {
        phonenumber: this.signupphone
      };
      var that = this;
      webService.post(
        this.baseUrl + "signup",
        data,
        {
          "content-type": "application/json",
          "data-type": "json",
          "cross-domain": true
        },
        true,
        function(response) {
          if (response.status == "fail") {
            if (response.data.message == "Already a user.") {
              that.$swal({
                imageUrl: "img/sadface.png",
                imageWidth: 190,
                imageHeight: 190,
                title: "این موبایل قبلا ثبت نام کرده است",
                showConfirmButton: false,
                timer: 1500
              });
            }
          } else if (response.status == "success") {
            if (
              response.data.message ==
              "Your phone number has been verified, you can register now."
            ) {
              that.$swal({
                icon: "success",
                title:
                  "شماره شما قبلا تأیید شده است، لطفاً حساب کاربری خود را ایجاد کنید",
                showConfirmButton: true,
                focusConfirm: false,
                confirmButtonText: "تأیید"
              });
              that.currentStep = "createAccount";
            } else {
              that.$swal({
                icon: "success",
                title: "کد فعالسازی برای شما پیامک شد",
                showConfirmButton: false,
                timer: 1500
              });
              that.count = 60;
              var timer = function() {
                that.count = that.count - 1;
                if (that.count <= 0) {
                  clearInterval(that.counter);
                  return;
                }
                document.getElementById("resendcodetimer").innerHTML =
                  "ارسال مجدد در " + that.count;
              };
              that.counter = setInterval(timer, 1000);
              that.currentStep = "submitVerCode";
            }
          }
        },
        function(error) {
          that.$swal({
            imageUrl: "img/sadface.png",
            imageWidth: 190,
            imageHeight: 190,
            title: "خطایی در ثبت شماره شما رخ داده است،لطفاً مجدد تلاش کنید",
            showConfirmButton: false,
            timer: 1500
          });
        }
      );
    },
    submitVerificationCode() {
      var that = this;
      webService.post(
        this.baseUrl + "signup",
        {
          phonenumber: this.signupphone,
          activationcode: this.signupvercode
        },
        {
          "content-type": "application/json",
          "data-type": "json",
          "cross-domain": true
        },
        true,
        function(response) {
          clearInterval(that.counter);
          that.$swal({
            icon: "success",
            title: "شماره شما با موفق تأیید شد",
            showConfirmButton: false,
            timer: 1500
          });
          that.currentStep = "createAccount";
          that.count = 0;
        },
        function(error) {
          that.$swal({
            imageUrl: "img/sadface.png",
            imageWidth: 190,
            imageHeight: 190,
            title: "کد وارد شده صحیح نمی باشد",
            showConfirmButton: false,
            timer: 1500
          });
        }
      );
    },
    createAccount() {
      var just_persian = function(str) {
        var p = /^[\u0600-\u06FF\s]+$/;
        if (p.test(str)) {
          return true;
        }
      };
      this.signupphone = this.signupphone.toEnglishDigit();
      var requestUrl = "https://api.starcameo.ir/signup";
      if (!just_persian(this.signupfname)) {
        this.$swal({
          imageUrl: "img/sadface.png",
          imageWidth: 190,
          imageHeight: 190,
          title: "لطفاً نام خود را فارسی وارد کنید",
          showConfirmButton: true,
          focusConfirm: false,
          confirmButtonText: "بستن"
        });

        return;
      } else if (!just_persian(this.signuplname)) {
        this.$swal({
          imageUrl: "img/sadface.png",
          imageWidth: 190,
          imageHeight: 190,
          title: "لطفاً نام خانوادگی خود را فارسی وارد کنید",
          showConfirmButton: true,
          focusConfirm: false,
          confirmButtonText: "بستن"
        });

        return;
      } else if (this.signuphasrefcode && this.signuprefcode.length < 6) {
        this.$swal({
          imageUrl: "img/sadface.png",
          imageWidth: 190,
          imageHeight: 190,
          title: "کد معرف باید 6 کاراکتر باشد",
          showConfirmButton: true,
          focusConfirm: false,
          confirmButtonText: "بستن"
        });
        return;
      } else if (this.signuppassword == "") {
        this.$swal({
          imageUrl: "img/sadface.png",
          imageWidth: 190,
          imageHeight: 190,
          title: "لطفاً گذرواژه خود را وارد نمایید",
          showConfirmButton: true,
          focusConfirm: false,
          confirmButtonText: "بستن"
        });
        return;
      } else if (this.signuppassword.length < 6) {
        this.$swal({
          imageUrl: "img/sadface.png",
          imageWidth: 190,
          imageHeight: 190,
          title: "گذرواژه باید حداقل 6 حرف باشد",
          showConfirmButton: true,
          focusConfirm: false,

          confirmButtonText: "بستن"
        });
        return;
      } else if (this.signuppassword != this.signupconfirmpassword) {
        this.$swal({
          imageUrl: "img/sadface.png",
          imageWidth: 190,
          imageHeight: 190,
          title: "گذرواژه های وارد شده یکسان نیستند",
          showConfirmButton: true,
          focusConfirm: false,
          confirmButtonText: "بستن"
        });
        return;
      } else {
        var data = {
          phonenumber: this.signupphone,
          password: this.signuppassword,
          // ssn: this.signupmelicode,
          firstname: this.signupfname,
          lastname: this.signuplname
        };
        if (this.signuphasrefcode) {
          data = { ...data, referredby: this.signuprefcode };
        }
        var that = this;
        webService.post(
          this.baseUrl + "signup",
          data,
          {
            "content-type": "application/json",
            "data-type": "json",
            "cross-domain": true
          },
          true,
          function(response) {
            that.$swal({
              icon: "success",
              title: "حساب کاربری شما با موفقیت ایجاد شد",
              showConfirmButton: false,
              timer: 1500
            });
            that.currentStep = "login";
          },
          function(error) {
            if (error.data.message == "The entered referral code is wrong.") {
              that.$swal({
                imageUrl: "img/sadface.png",
                imageWidth: 190,
                imageHeight: 190,
                title:
                  "کد معرف وارد شده اشتباه است، لطفا کد صحیح را وارد کنید یا گزینه آن را حذف نمایید",
                showConfirmButton: true,
                focusConfirm: false,
                confirmButtonText: "بستن"
              });
            } else {
              that.$swal({
                imageUrl: "img/sadface.png",
                imageWidth: 190,
                imageHeight: 190,
                title: "خطایی رخ داده است. لطفا ورودی ها را بررسی نمایید",
                showConfirmButton: true,
                focusConfirm: false,
                confirmButtonText: "بستن"
              });
            }
          }
        );
      }
    },
    getResetPassCode() {
      this.forgetphone;
      if (
        this.forgetphone.substr(0, 2) != "09" &&
        this.forgetphone.substr(0, 2) != "۰۹"
      ) {
        this.$swal({
          icon: "warning",
          showCloseButton: true,
          title: "شماره موبایل را صحیح وارد کنید",
          showConfirmButton: false,
          footer: "مثال: 09*********",
          timer: 2000
        });
        return;
      } else if (this.forgetphone.length != 11) {
        this.$swal({
          icon: "warning",
          showCloseButton: true,
          title: "تعداد اعداد شماره موبایل کم است!",
          showConfirmButton: false,
          footer: "مثال: 09123456789",
          timer: 2000
        });
        return;
      }
      this.forgetphone = this.forgetphone.toEnglishDigit();
      var that = this;
      webService.post(
        this.baseUrl + "user/forgotpass",
        {
          phonenumber: this.forgetphone
        },
        {
          "content-type": "application/json",
          "data-type": "json",
          "cross-domain": true
        },
        true,
        function(response) {
          that.count = 60;
          that.counter = setInterval(timer, 1000);

          var timer = function() {
            that.count = that.count - 1;
            if (that.count <= 0) {
              clearInterval(that.counter);
              return;
            }
            document.getElementById("resendcodetimer").innerHTML =
              "ارسال مجدد در " + that.count;
          };
          $("#resendcodetimer").show();

          that.$swal({
            icon: "success",
            title: "کد تغییر رمز برای شما ارسال شد",
            showConfirmButton: false,
            timer: 1500
          });
          that.currentStep = "submitforgotpassword";
        },
        function(error) {
          var err = error.data.message;
          if (err == "Try again after some time.") {
            that.$swal({
              imageUrl: "img/sadface.png",
              imageWidth: 190,
              imageHeight: 190,
              title:
                "شما به تازگی درخواست کد داده اید، لطفاً 1 دقیقه منتظر بمانید",
              showConfirmButton: false,
              timer: 1500
            });
          } else if (err == "Phone number not found!") {
            that.$swal({
              imageUrl: "img/sadface.png",
              imageWidth: 190,
              imageHeight: 190,
              title: "کاربری با شماره وارد شده یافت نشد",
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            that.$swal({
              imageUrl: "img/sadface.png",
              imageWidth: 190,
              imageHeight: 190,
              title: "خطایی در ثبت شماره شما رخ داده است،لطفاً مجدد تلاش کنید",
              showConfirmButton: false,
              timer: 1500
            });
          }
        }
      );
    },
    resetPass() {
      this.resetcode1 = $("#resetphone").val();
      this.forgetphone = this.forgetphone.toEnglishDigit();
      var requestUrl = "https://api.starcameo.ir/user/resetpass";
      if (this.forgetpassword.length < 6) {
        this.$swal({
          imageUrl: "img/sadface.png",
          imageWidth: 190,
          imageHeight: 190,
          title: "رمز عبور باید حداقل 6 کاراکتر باشد",
          showConfirmButton: true,
          focusConfirm: false,
          confirmButtonText: "بستن"
        });
        return;
      }
      var postedDataJson = JSON.stringify();
      var that = this;
      webService.post(
        this.baseUrl + "user/resetpass",
        {
          phonenumber: this.forgetphone,
          resetcode: this.forgetcode,
          newpassword: this.forgetpassword
        },
        {
          "content-type": "application/json",
          "data-type": "json",
          "cross-domain": true
        },
        true,
        function(response) {
          clearInterval(that.counter);
          that.$swal({
            icon: "success",
            title: "رمز شما با موفقیت تغییر یافت",
            showConfirmButton: false,
            timer: 1500
          });
          that.count = 0;
          that.currentStep = "login";
        },
        function(error) {
          var err = error.data.message;
          if (err == "Entered code is wrong!") {
            that.$swal({
              imageUrl: "img/sadface.png",
              imageWidth: 190,
              imageHeight: 190,
              title: "کد وارد شده صحیح نمی باشد",
              showConfirmButton: false,
              timer: 1500
            });
          }
        }
      );
    },
    uploadTalentPicBio() {
      if (this.biotext == "") {
        this.$swal({
          imageUrl: "img/sadface.png",
          imageWidth: 190,
          imageHeight: 190,
          title: "لطفاً بیوگرافی خود را وارد کنید",
          showConfirmButton: true,
          focusConfirm: false,

          confirmButtonText: "بستن"
        });
        return;
      } else if (this.profilepic == undefined) {
        this.profilepicname = "تصویر انتخابی";
        $("#profilepicname").css("background-color", "white");
        this.$swal({
          imageUrl: "img/sadface.png",
          imageWidth: 190,
          imageHeight: 190,
          title: "خطا! عکسی برای بارگذاری انتخاب نشده است.",
          showConfirmButton: false,
          timer: 1500
        });
        return;
      }
      var that = this;
      webService.post(
        this.baseUrl + "user/bio",
        {
          bio: this.biotext
        },
        {
          sctoken: this.biotoken,
          "content-type": "application/json",
          "data-type": "json",
          "cross-domain": true
        },
        true,
        function(response) {
          if (response.data.docstoken) {
            that.doctoken = response.data.docstoken;
          }
          var senddata = new FormData();
          senddata.append("avatar", that.profilepic, "image.jpg");
          var thata = that;
          webService.post(
            that.baseUrl + "user/bio",
            senddata,
            {
              sctoken: thata.biotoken,
              "cross-domain": true
            },
            true,
            function(response) {
              if (response.data.docstoken) {
                thata.doctoken = response.data.docstoken;
              }
              $("#signup-form").removeClass("width90");
              thata.currentStep = "uploadTalentDocs";
            },
            function(error) {
              thata.$swal({
                imageUrl: "img/sadface.png",
                imageWidth: 190,
                imageHeight: 190,
                title: "بارگذاری تصویر پروفایل با خطا مواجه شده است.",
                showConfirmButton: true,
                focusConfirm: false,
                confirmButtonText: "بستن"
              });
              return;
            }
          );
        },
        function(error) {
          that.$swal({
            imageUrl: "img/sadface.png",
            imageWidth: 190,
            imageHeight: 190,
            title: "ثبت بیوگرافی با خطا مواجه شده است.",
            showConfirmButton: true,
            focusConfirm: false,
            confirmButtonText: "بستن"
          });
          return;
        }
      );
    },
    uploadTalentDocs() {
      var senddata = new FormData();
      var ssc = $("#mellicard").prop("files")[0];
      var bcs = $("#shenasnameh").prop("files")[0];
      senddata.append("ssc", ssc);
      senddata.append("bcs", bcs);
      var requestUrl = "https://api.starcameo.ir/user/verify";
      var that = this;
      webService.post(
        this.baseUrl + "user/verify",
        senddata,
        {
          sctoken: this.doctoken,
          "content-type": false,
          "data-type": "json",
          "cross-domain": true,
          "process-data": false
        },
        true,
        function(response) {
          that.introtoken = response.data.videotoken;
          that.$swal({
            icon: "success",
            title: "مدارک شما با موفقیت بارگذاری شد",
            showConfirmButton: false,
            timer: 1500
          });
          that.currentStep = "uploadTalentIntro";
        },
        function(error) {
          that.$swal({
            imageUrl: "img/sadface.png",
            imageWidth: 190,
            imageHeight: 190,
            title: "خطا! لطفاً مدارک بارگذاری شده را بررسی نمایید",
            showConfirmButton: false,
            timer: 1500
          });
        }
      );
    },
    uploadTalentIntro() {
      var senddata = new FormData();
      var video = $("#introvideo").prop("files")[0];
      senddata.append("intro", video);
      var requestUrl = "https://api.starcameo.ir/user/verify";
      this.$swal({
        title: `<span>چهره محترم، با توجه به حجم
     بالای ویدیو انتخاب شده و سرعت اینترنت، بارگذاری زمان بر خواهد بود.
     <br>لطفا شکیبا باشید<br>پیشرفت: <span id="status"></span></span>`,
        showConfirmButton: false
      });
      var that = this;
      webService.post(
        this.baseUrl + "user/verify",
        senddata,
        {
          sctoken: this.introtoken,
          "content-type": false,
          "data-type": "json",
          "cross-domain": true,
          "process-data": false
        },
        true,
        function(response) {
          that.$swal({
            icon: "success",
            title:
              "حساب کاربری شما با موفیت ایجاد شد. کارشناسان ما در اسرع وقت با شما تماس میگیرند",
            showConfirmButton: true,
            focusConfirm: false,
            confirmButtonText: "بستن",
            onAfterClose: () =>
              that.$router.push({
                name: "Home"
              })
          });
        },
        function(error) {
          that.$swal({
            imageUrl: "img/sadface.png",
            imageWidth: 190,
            imageHeight: 190,
            title: "خطا! لطفاً مدارک بارگذاری شده را بررسی نمایید",
            showConfirmButton: false,
            timer: 1500
          });
        },
        {
          onUploadProgress: function(progressEvent) {
            var percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            $("#status").html("<b>" + percentCompleted + "% </b>");
          }
        }
      );
    }
  },
  async mounted() {
    if (this.userStatus.isLoggedin) {
      this.$router.push({
        name: "Home"
      });
    }
    setTimeout(() => {
      $("#mellicard").on("change", function() {
        if ($(this).val() != "") {
          $(this)
            .prev()
            .css("background-color", "rgb(98, 161, 70)");
          $(this)
            .prev()
            .text(
              $("#mellicard")
                .val()
                .split("\\")
                .pop()
            );
        } else {
          $(this)
            .prev()
            .css("background-color", "#f44336");
          $(this)
            .prev()
            .text("انتخاب عکس کارت ملی");
        }
      });
      $("#shenasnameh").on("change", function() {
        if ($(this).val() != "") {
          $(this)
            .prev()
            .css("background-color", "rgb(98, 161, 70)");
          $(this)
            .prev()
            .text(
              $("#shenasnameh")
                .val()
                .split("\\")
                .pop()
            );
        } else {
          $(this)
            .prev()
            .css("background-color", "#f44336");
          $(this)
            .prev()
            .text("انتخاب عکس شناسنامه");
        }
      });
      $("#introvideo").on("change", function() {
        if ($(this).val() != "") {
          $(this)
            .prev()
            .css("background-color", "rgb(98, 161, 70)");
          $(this)
            .prev()
            .text(
              $("#introvideo")
                .val()
                .split("\\")
                .pop()
            );
        } else {
          $(this)
            .prev()
            .css("background-color", "#ff0000a8");
          $(this)
            .prev()
            .text("انتخاب ویدیو معرفی");
        }
      });
    }, 500);
  }
};
</script>
<style scoped>
#footer {
  display: none !important;
}
.login {
  padding-right: 0;
  padding-left: 0;
}
.login-banner {
  display: flex;
  background-image: url("../../assets/img/banner/2.png");
  background-size: cover;
  background-position: center;
}
.form-group > input {
  text-align: center;
}
#login {
  margin-top: 0.5em;
  border-radius: 25px;
  width: 147px;
  height: 32px;
  font-size: 14px;
  font-weight: 600;
  border: none;
}
.login-form {
  box-shadow: 0px -5px 18px #1b1b1b, -5px 0 18px #1b1b1b, 5px 5px 18px #000;
  padding: 20px;
}
.login-screen {
  flex-direction: row-reverse;
  height: 100vh;
}
.form-wrapper {
  text-align: center;
  background-color: #1b1b1b !important;
  display: flex;
  flex-direction: column;
}
.form-logo {
  width: 100px;
}
.valid-form {
  margin-bottom: 0 !important;
}
.login-btn {
  margin-top: 0.5em;
  margin-top: 0.5em;
  border-radius: 25px;
  width: 147px;
  height: 32px;
  font-size: 14px;
  font-weight: 600;
  border: none;
}
.vercodereqbutton {
  margin-bottom: 10px;
}
.btngetresetcode {
  margin-bottom: 10px;
}
.signup-btn {
  display: block;
  cursor: pointer;
  font-weight: 600;
  border-bottom: 1px solid white;
  width: 68px;
  margin: 1em auto;
}
.forgotpassword {
  display: block;
  cursor: pointer;
  padding: 5px 13px;
  text-decoration: underline;
}
.signin-btn {
  cursor: pointer;
}
.docformimg {
  width: 20%;
  margin: 0 auto;
  margin-bottom: 3em;
}
.docformspan {
  text-align: center;
  width: 60%;
  margin: 0 auto;
  font-weight: 400;
  font-size: 19px;
}
.leftupload > img {
  width: 30%;
  margin: 1em auto;
  display: block;
}

.round {
  min-height: 24px;
}
/*for talentsignup*/

.docsscreen {
  padding: 20px;
  margin-top: 0 !important;
  background-color: white;
  top: 80px !important;
  width: 95%;
  position: fixed;
  left: 0;
  right: 0;
  box-shadow: 0px -5px 18px #1b1b1b00, -5px 0 18px #1b1b1b00,
    5px 5px 18px #00000024;
  overflow: scroll;
  height: 85%;
  z-index: 10;
}
.createheader {
  color: black !important;
  font-size: 1.5em;
  font-weight: 600;
  margin-top: -7%;
  margin-bottom: 1em;
  text-align: right;
}
.signup-form {
  width: 50%;
  margin: 5% auto;
  border-radius: 1em;
}
.signup-form .form-group {
  margin-bottom: 0.5em;
}
.listrow {
  display: flex;
  flex-direction: row;
}
.righttext {
  font-weight: 600;
  width: 60%;
  padding: 2em;
  text-align: justify;
}
.leftupload {
  width: 40%;
}
.allformswrapper {
  text-align: right;
}
.biotext {
  border-radius: 5px;
  border-color: #00000029;
  color: black;
  padding: 10px;
  width: 100%;
  min-height: 270px;
}

.width90 {
  width: 90% !important;
}
.btnuploaddocs,
.introuploadbtn,
.biopicuploadbtn {
  min-width: 160px;
  display: block;
  font-size: 16px;
  padding: 6px 12px;
  line-height: 24px;
  color: #fff;
  background-color: #039be5;
  width: fit-content;
  border-radius: 25px;
  margin: 0 auto;
  margin-top: 1.5em;
}
.docform {
  display: flex;
  flex-direction: column;
}
.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
  margin: 0 auto;
  margin-top: 1em;
}
.uploadbtn {
  display: block;
  min-width: 200px;
  max-width: 200px;
  margin: 0 auto;
  border: 2px solid gray;
  color: black;
  background-color: white;
  padding: 8px 10px;
  border-radius: 28px;
  font-size: 20px;
  font-weight: 200;
  overflow-wrap: break-word;
}
.upload-btn-wrapper input[type="file"] {
  width: 100%;
  height: 100%;
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}

@media (min-width: 1295px) {
  .signup-form {
    color: black;
    box-shadow: 0px -5px 18px #1b1b1b00, -5px 0 18px #1b1b1b00,
      5px 5px 18px #00000024;
    display: flex;
    flex-direction: column;
  }

  .allformswrapper {
    width: 90%;
    margin: 0 auto;
  }
}

@media (max-width: 1294px) {
  .docsscreen {
    background-color: white;
    top: 80px !important;
    width: 95%;
    position: fixed;
    left: 0;
    right: 0;
    box-shadow: 0px -5px 18px #1b1b1b00, -5px 0 18px #1b1b1b00,
      5px 5px 18px #00000024;
  }

  .signup-form {
    color: black;
    box-shadow: 0px -5px 18px #1b1b1b00, -5px 0 18px #1b1b1b00,
      5px 5px 18px #00000024;
    display: flex;
    flex-direction: column;
  }

  .allformswrapper {
    width: 70%;
    margin: 0 auto;
  }
}

@media (max-width: 991px) {
  .docsscreen {
    background-color: white;
    top: 80px !important;
    width: 95%;
    position: fixed;
    left: 0;
    right: 0;
    box-shadow: 0px -5px 18px #1b1b1b00, -5px 0 18px #1b1b1b00,
      5px 5px 18px #00000024;
  }
  .listrow {
    flex-direction: column !important;
  }
  .righttext,
  .leftupload {
    width: 100% !important;
  }
  .signup-form {
    width: 100% !important;
    color: black;
    box-shadow: 0px -5px 18px #1b1b1b00, -5px 0 18px #1b1b1b00,
      5px 5px 18px #00000024;
    display: flex;
    flex-direction: column;
  }

  .allformswrapper {
    width: 70%;
    margin: 0 auto;
  }
}

@media (max-width: 575px) {
  .signup-form {
    color: black;
    box-shadow: 0px -5px 18px #1b1b1b00, -5px 0 18px #1b1b1b00,
      5px 5px 18px #00000024;
    display: flex;
    flex-direction: column;
  }
  .allformswrapper {
    width: 100%;
    margin: 0 auto;
  }
}
</style>
