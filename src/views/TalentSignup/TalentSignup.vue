<template>
  <div class="mx-auto modalform">
    <div class="allformswrapper">
      <section class="progressbarsection">
        <!-- progressbar -->
        <ul id="progressbar" style="padding: 0">
          <li
            :class="{
              active: currentStep == 'submitVerCode' || currentStep == 'signup',
              done: [
                'createAccount',
                'uploadTalentPicBio',
                'uploadTalentDocs',
                'uploadTalentIntro',
                'Done'
              ].includes(currentStep)
            }"
          >
            <span>تایید شماره موبایل</span>
          </li>
          <li
            :class="{
              active: currentStep == 'createAccount',
              done: [
                'uploadTalentPicBio',
                'uploadTalentDocs',
                'uploadTalentIntro',
                'Done'
              ].includes(currentStep)
            }"
          >
            <span>ورود اطلاعات فردی و حرفه ای</span>
          </li>
          <li
            :class="{
              active: currentStep == 'uploadTalentPicBio',
              done: ['uploadTalentDocs', 'uploadTalentIntro', 'Done'].includes(
                currentStep
              )
            }"
          >
            <span>بیوگرافی و عکس پروفایل</span>
          </li>
          <li
            :class="{
              active: currentStep == 'uploadTalentDocs',
              done: ['uploadTalentIntro', 'Done'].includes(currentStep)
            }"
          >
            <span>بارگذاری مدارک شناسایی</span>
          </li>
          <li
            :class="{
              active: currentStep == 'uploadTalentIntro',
              done: currentStep == 'Done'
            }"
          >
            <span>بارگذاری ویدیو معرفی</span>
          </li>
        </ul>
      </section>
      <div
        class="signup-form"
        autocomplete="off"
        :class="{
          width90: [
            'uploadTalentIntro',
            'createAccount',
            'uploadTalentPicBio'
          ].includes(currentStep)
        }"
      >
        <div class="form-group" style="padding: 3%">
          <div
            class="form-header"
            v-show="currentStep == 'signup'"
            id="form-header-title"
          >
            <span>ثبت نام چهره ها</span>
          </div>
          <div
            class="form-group"
            id="mobilefield"
            v-show="currentStep == 'signup' || currentStep == 'submitVerCode'"
          >
            <div
              class="labeldiv"
              style="padding-right: 0 !important; text-align: center"
            >
              <label for="phone">لطفاً شماره موبایل خود را وارد کنید</label>
            </div>
            <input
              type="text"
              id="phone"
              class="form-control dir-ltr"
              placeholder=""
              :disabled="currentStep == 'submitVerCode'"
              v-model="signupphone"
            />
          </div>
          <div
            class="form-group"
            id="vercodefield"
            v-show="currentStep == 'submitVerCode'"
          >
            <input
              type="text"
              id="vercode"
              class="form-control dir-ltr"
              placeholder="کد تأیید"
              v-model="signupvercode"
            />
          </div>
          <div v-show="currentStep == 'createAccount'" id="createform">
            <div class="listcolumns">
              <div class="rightlist">
                <div class="form-group" id="fnamefield">
                  <div class="labeldiv">
                    <label for="fname">نام (فارسی)</label>
                  </div>
                  <input
                    type="text"
                    id="fname"
                    class="form-control top"
                    placeholder=""
                    v-model="signupfname"
                  />
                </div>
                <div class="form-group" id="lnamefield">
                  <div class="labeldiv">
                    <label for="lname">نام خانوادگی (فارسی)</label>
                  </div>
                  <input
                    type="text"
                    id="lname"
                    class="form-control"
                    placeholder=""
                    v-model="signuplname"
                  />
                </div>
                <div class="form-group" id="birthdatefield">
                  <div class="labeldiv">
                    <label for="birthdate">تاریخ تولد (مثال: 1398/10/03)</label>
                  </div>
                  <div class="form-group bdWrapper">
                    <select
                      id="bDay"
                      v-model="signupbday"
                      class="form-control bdSelectors"
                      style="direction: ltr"
                    >
                    </select>
                    <select
                      id="bMonth"
                      class="form-control bmSelectors"
                      v-model="signupbmonth"
                    >
                      <option value="1">فروردین</option>
                      <option value="2">اردیبهشت</option>
                      <option value="3">خرداد</option>
                      <option value="4">تیر</option>
                      <option value="5">مرداد</option>
                      <option value="6">شهریور</option>
                      <option value="7">مهر</option>
                      <option value="8">آبان</option>
                      <option value="9">آذر</option>
                      <option value="10">دی</option>
                      <option value="11">بهمن</option>
                      <option value="12">اسفند</option>
                    </select>
                    <select
                      v-model="signupbyear"
                      id="bYear"
                      class="form-control bySelectors"
                      style="direction: ltr"
                    >
                    </select>
                  </div>
                </div>

                <div class="form-group" id="codemellifield">
                  <div class="labeldiv">
                    <label for="codemelli">کد ملی</label>
                  </div>
                  <input
                    v-model="signupmellicode"
                    type="text"
                    id="codemelli"
                    class="form-control dir-ltr"
                    placeholder=""
                    minlength="10"
                    maxlength="10"
                  />
                </div>
                <div
                  class="form-group"
                  id="genderfield"
                  style="display: inline-block"
                >
                  <div class="labeldiv">
                    <label>
                      جنسیت
                    </label>
                  </div>
                  <div
                    class="labeldiv"
                    style="display: inline-flex; float: right"
                  >
                    <label class="container"
                      >مرد
                      <input
                        type="radio"
                        value="1"
                        checked="checked"
                        name="gender"
                        v-model="signupgender"
                      />
                      <span class="checkmark"></span>
                    </label>
                    <label class="container"
                      >زن
                      <input
                        type="radio"
                        value="0"
                        name="gender"
                        v-model="signupgender"
                      />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </div>
              </div>
              <div class="leftlist">
                <div class="labeldiv">
                  <label>
                    دسته فعالیت
                  </label>
                </div>
                <div>
                  <multiselect
                    v-model="signupcategories"
                    :options="allCategories"
                    :multiple="true"
                    select-group-label="برای انتخاب کل گروه کلیک کنید"
                    deselect-group-label="برای حذف کل گروه کلیک کنید"
                    select-label="برای انتخاب دسته کلیک کنید"
                    deselect-label="برای حذف دسته کلیک کنید"
                    selected-label="انتخاب شده"
                    :close-on-select="false"
                    :clear-on-select="false"
                    open-direction="bottom"
                    group-values="subcategories"
                    group-label="title"
                    :group-select="true"
                    placeholder="دسته مورد نظر را جستجو کنید"
                    track-by="categoryid"
                    label="title"
                  >
                    <span slot="noResult"> دسته ویا زیردسته ای یافت نشد. </span>
                  </multiselect>
                </div>
                <div class="form-group" id="pricefield">
                  <div class="labeldiv">
                    <label for="price"
                      >قیمت مورد نظر برای ساخت ویدیو (تومان)</label
                    >
                  </div>
                  <input
                    v-model="signupprice"
                    type="text"
                    id="price"
                    class="form-control dir-ltr"
                    placeholder=""
                  />
                </div>
                <div class="form-group" id="passfield">
                  <div class="labeldiv">
                    <label for="pass">
                      رمز ورود
                    </label>
                  </div>
                  <input
                    v-model="signuppassword"
                    type="password"
                    id="pass"
                    class="form-control dir-ltr"
                    placeholder=""
                    name="password"
                  />
                </div>
                <div class="form-group" id="repassfield">
                  <div class="labeldiv">
                    <label for=" repass">تکرار رمز ورود</label>
                  </div>
                  <input
                    v-model="signupconfirmpassword"
                    type="password"
                    id="repass"
                    class="form-control dir-ltr"
                    placeholder=""
                    name="confirmPassword"
                  />
                </div>
              </div>
            </div>

            <div class="disclaimer">
              <div class="round">
                <input
                  type="checkbox"
                  id="checkbox"
                  required="required"
                  v-model="signupdisclaimer"
                />
                <label for="checkbox"></label>
              </div>
              <span
                >ضمن تأیید صحت اطلاعات ارسال شده فرم تمام
                <router-link
                  target="_blank"
                  style="color: #0056b3 !important"
                  :to="{ name: 'Faq', params: { showRules: true } }"
                >
                  قوانین وشرایط
                </router-link>
                فعالیت دراستارکمیو را با دقت مطالعه نموده و می پذیرم</span
              >
            </div>
          </div>
          <div v-show="currentStep == 'uploadTalentPicBio'">
            <div class="listrow">
              <div class="righttext">
                <span>
                  در این قسمت خودتان را برای مخاطبین معرفی کنید و فعالیت های خود
                  را به طور مختصر بنویسید.<br />
                  این مطلب در صفحه ی اختصاصی شما در سایت و اپلیکیشن استارکمیو
                  نمایش داده خواهد شد.<br />
                  لازم به ذکر است در صورت نیاز متن ارائه شده توسط تیم پشتیبانی
                  استارکمیو بازدید و ویرایش خواهد شد.<br />
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
              >لطفاً عکس کارت ملی و شناسنامه خود را در این قسمت بارگذاری کنید
            </span>

            <div class="upload-btn-wrapper">
              <button class="uploadbtn">انتخاب عکس کارت ملی</button>
              <input
                type="file"
                name="mellicard"
                id="mellicard"
                required="required"
                accept="image/*"
              />
            </div>
            <div class="upload-btn-wrapper">
              <button class="uploadbtn">انتخاب عکس شناسنامه</button>
              <input
                type="file"
                name="shenasnameh"
                id="shenasnameh"
                required="required"
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
                  >چهره محترم لطفاً قبل از ضبط ویدیو به نکات زیر توجه فرمایید :
                  <br /><br />
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
                    required="required"
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

          <a
            style="
              cursor: pointer;
              margin-bottom: 0.5em;
              padding: 5px 15px;
              border-radius: 45px;
              background-color: #7cb342;
              width: fit-content;
              display: block;
              margin: 0 auto;
              color: white;
            "
            id="resendcode"
            v-show="currentStep == 'submitVerCode' && count == 0"
            @click="getVerificationCode()"
          >
            ارسال مجدد کد
          </a>
          <a
            v-show="count > 0"
            id="resendcodetimer"
            style="display: block; text-align: center"
            >ارسال مجدد در {{ count }}</a
          >
          <button
            v-show="currentStep == 'signup'"
            id="vercodereqbutton"
            class="btn btn-secondary btn-block"
            type="button"
            style="margin-bottom: 10px"
            @click="getVerificationCode()"
          >
            دریافت کد تأیید
          </button>
          <button
            v-show="currentStep == 'submitVerCode'"
            id="checkcode"
            class="btn btn-secondary btn-block"
            type="button"
            @click="submitVerificationCode()"
          >
            تأیید و ادامه
          </button>
          <button
            class="btn btn-secondary btn-block btncreateaccount"
            type="button"
            v-show="currentStep == 'createAccount'"
            @click="createAccount()"
          >
            تأیید و ادامه
          </button>

          <div class="form-footer" v-show="currentStep == 'signup'">
            <span style="font-weight: 800"
              >لطفاً هنگام ثبت نام به موارد زیر توجه فرمایید:<br /><br />
            </span>

            <span
              >1. ابتدا
              <router-link
                :to="{ name: 'Faq', params: { showRules: true } }"
                target="_blank"
                >قوانین و شرایط
              </router-link>
              استفاده از استارکمیو را با دقت مطالعه نموده و سپس اقدام به ثبت نام
              نمایید.<br />
            </span>

            <span
              >2. لطفاً مشخصات و شماره موبایل خود را با دقت و به طور صحیح وارد
              نمایید.<br />
            </span>
            <span
              >3. کد تأیید جهت ثبت نام به شماره موبایل شما ارسال خواهد شد.
            </span>
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
import Multiselect from "vue-multiselect";
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
  name: "TalentSignup",
  components: {
    ImageCroppie,
    Multiselect
  },
  data() {
    return {
      currentStep: "signup",
      loading: true,
      baseUrl: process.env.VUE_APP_API_URL,
      steps: [
        "signup",
        "submitVerCode",
        "createAccount",
        "uploadTalentPicBio",
        "uploadTalentDocs",
        "uploadTalentIntro",
        "Done"
      ],
      signupphone: "",
      signupvercode: "",
      signupfname: "",
      signuplname: "",
      signupbday: "",
      signupbmonth: "",
      signupbyear: "",
      signupmellicode: "",
      signupgender: "1",
      signuphasRefCode: "",
      signuppassword: "",
      signupconfirmpassword: "",
      signupprice: "",
      signupdisclaimer: false,
      signuprefcode: "",
      signupcategories: "",
      biotoken: "",
      biotext: "",
      profilepicname: "",
      doctoken: "",
      introtoken: "",
      counter: null,
      count: 0,
      defaultImage: require("../../assets/img/default-picture.png"),
      croppedImage: null
    };
  },
  computed: {
    ...mapState(["userStatus", "allCategories"])
  },
  methods: {
    ...mapActions(["setCurrentUser", "setUserStatus"]),
    getVerificationCode() {
      this.signupphone = this.signupphone.toEnglishDigit();
      var data = {
        phonenumber: this.signupphone
      };
      var that = this;
      this.loading = true;
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
              that.currentStep = "submitVerCode";
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
            }
            that.counter = setInterval(timer, 1000);
          }
          that.loading = false;
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
          that.loading = false;
        }
      );
    },
    submitVerificationCode() {
      var that = this;
      this.loading = true;
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
          that.loading = false;
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
          that.loading = false;
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
      var price = this.signupprice.replace(/,/g, "");
      this.signupphone = this.signupphone.toEnglishDigit();
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
      } else if (!(this.signupbday && this.signupbmonth && this.signupbyear)) {
        this.$swal({
          imageUrl: "img/sadface.png",
          imageWidth: 190,
          imageHeight: 190,
          title: "لطفاً تاریخ تولد خود را کامل وارد کنید",
          showConfirmButton: true,
          focusConfirm: false,
          confirmButtonText: "بستن"
        });
        return;
      } else if (
        !this.signupmellicode ||
        this.signupmellicode < 10 ||
        !parseInt(this.signupmellicode)
      ) {
        this.$swal({
          imageUrl: "img/sadface.png",
          imageWidth: 190,
          imageHeight: 190,
          title: "لطفاً کد ملی خود را به درستی وارد کنید",
          showConfirmButton: true,
          focusConfirm: false,
          confirmButtonText: "بستن"
        });
        return;
      } else if (this.signupcategories.length == 0) {
        this.$swal({
          imageUrl: "img/sadface.png",
          imageWidth: 190,
          imageHeight: 190,
          title: "لطفاً حداقل یک دسته فعالیت انتخاب کنید",
          showConfirmButton: true,
          focusConfirm: false,
          confirmButtonText: "بستن"
        });
        return;
      } else if (!this.signupprice) {
        this.$swal({
          imageUrl: "img/sadface.png",
          imageWidth: 190,
          imageHeight: 190,
          title: "لطفاً قیمت مورد نظر برای ساخت ویدیو خود را وارد کنید",
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
      } else if (!this.signupdisclaimer) {
        this.$swal({
          imageUrl: "img/sadface.png",
          imageWidth: 190,
          imageHeight: 190,
          title: "لطفاً توافق نامه را تأیید کنید",
          showConfirmButton: true,
          focusConfirm: false,
          confirmButtonText: "بستن"
        });
        return;
      } else {
        this.loading = true;
        var fabd = `${this.signupbyear}-${this.signupbmonth}-${this.signupbday}`;
        var bd = this.$moment(fabd, "jYYYY-jMM-jDD")
          .locale("en")
          .format("YYYY-MM-DD");
        var categoryids = [
          ...new Set(this.signupcategories.map(item => item.parentid))
        ];
        categoryids = "[" + categoryids.toString() + "]";
        var subcategoryids = [
          ...new Set(this.signupcategories.map(item => item.categoryid))
        ];
        subcategoryids = "[" + subcategoryids.toString() + "]";
        var data = {
          phonenumber: this.signupphone,
          password: this.signuppassword,
          firstname: this.signupfname,
          lastname: this.signuplname,
          ssn: this.signupmellicode,
          category: categoryids,
          subcategory: subcategoryids,
          gender: this.signupgender,
          price: price,
          birthday: bd,
          talent: "true"
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
            that.$swal({
              icon: "success",
              title: "حساب کاربری شما با موفقیت ایجاد شد",
              showConfirmButton: false,
              timer: 1500
            });
            var thata = that;
            webService.post(
              "signin",
              {
                phonenumber: that.signupphone,
                password: that.signuppassword,
                platform: "web"
              },
              {
                "content-type": "application/json",
                "data-type": "json",
                "cross-domain": true
              },
              true,
              function(response) {
                thata.biotoken = response.data.biotoken;
                thata.currentStep = "uploadTalentPicBio";
                thata.loading = false;
              },
              function(error) {
                thata.loading = false;
              }
            );
          },
          function(error) {
            var err = error.data.message;
            if (err == "The entered referral code is wrong.") {
              that.$swal({
                imageUrl: "img/sadface.png",
                imageWidth: 190,
                imageHeight: 190,
                title:
                  "کد معرف وارد شده اشتباه است، لطفا کد صحیح را وارد کنید یا فیلد را خالی بگذارید",
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
            that.loading = false;
          }
        );
      }
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
      } else if (this.croppedImage == undefined) {
        this.profilepicname = "تصویر انتخابی";
        $(".profilepicname").css("background-color", "white");
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
          senddata.append("avatar", that.croppedImage, "image.jpg");
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
      this.$swal({
        title: `<span>چهره محترم، با توجه به حجم
     بالای ویدیو انتخاب شده و سرعت اینترنت، بارگذاری زمان بر خواهد بود.
     <br>لطفا شکیبا باشید<br>پیشرفت: <span id="status"></span></span>`,
        showConfirmButton: false,
        allowOutsideClick: false
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
          that.currentStep = "Done";
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
      $("#bDay").innerHTML = "";
      var i = 1;
      do {
        var bDay = document.createElement("option");
        bDay.innerText = i;
        bDay.value = i;
        $("#bDay").append(bDay);
        i++;
      } while (i < 32);
      $("#bYear").innerHTML = "";
      var j = 1300;
      do {
        var bYear = document.createElement("option");
        bYear.innerText = j;
        bYear.value = j;
        $("#bYear").append(bYear);
        j++;
      } while (j < 1400);
    }, 500);
  },
  watch: {
    signupprice: function(newValue) {
      const result = newValue
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.$nextTick(() => (this.signupprice = result));
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.form-group > input,
.form-group > select {
  background-color: #e0e0e0 !important;
  color: black;
  text-align: center;
}

.form-group > input:focus,
.form-group > select:focus {
  color: black;
}

.btn-secondary {
  background-color: #7cb342 !important;
  width: auto !important;
}

.btn-secondary:hover {
  background-color: #54792d;
}

.table {
  color: black;
}

.popover-header {
  color: black;
}

.popover-body > div > table > tfoot {
  display: none;
}

.popover-header > table > tbody > tr > th > a {
  color: black !important;
}

.bdSelectors {
  background-image: linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%),
    linear-gradient(to right, #ccc, #ccc);
  background-position: calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;
  -webkit-appearance: none;
  padding-right: 50px;
}

.bmSelectors {
  background-image: linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%),
    linear-gradient(to right, #ccc, #ccc);
  background-position: calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;
  -webkit-appearance: none;
  padding-right: 50px;
}

.bySelectors {
  background-image: linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%),
    linear-gradient(to right, #ccc, #ccc);
  background-position: calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;
  -webkit-appearance: none;
  padding-right: 50px;
}

.bdWrapper {
  margin: 0 auto;
  display: flex;
  width: 80%;
}
.listcolumns {
  display: flex;
}
@media (min-width: 1295px) {
  .listcolumns {
    flex-direction: row;
  }
  .signup-form {
    color: black;
    margin-top: 4%;
    box-shadow: 0px -5px 18px #1b1b1b00, -5px 0 18px #1b1b1b00,
      5px 5px 18px #00000024;
    display: flex;
    flex-direction: column;
  }
  .allformswrapper {
    width: 90%;
    margin: 0 auto;
  }
  .form-group > input,
  .form-group > select {
    width: 80%;
    margin: 0 auto;
  }
  .rightlist,
  .leftlist {
    width: 50%;
  }
  .bdSelectors {
    width: 25% !important;
  }
  .bmSelectors {
    width: 50% !important;
  }
  .bySelectors {
    width: 25% !important;
  }
}

@media (max-width: 1294px) {
  .listcolumns {
    flex-direction: row;
  }
  .modalform {
    background-color: white;
    display: block !important;
    top: 80px !important;
    width: 95%;
    position: fixed;
    left: 0;
    right: 0;
    box-shadow: 0px -5px 18px #1b1b1b00, -5px 0 18px #1b1b1b00,
      5px 5px 18px #00000024;
  }
  .signup-form {
    width: 60% !important;
    color: black;
    margin: 2% auto;
    box-shadow: 0px -5px 18px #1b1b1b00, -5px 0 18px #1b1b1b00,
      5px 5px 18px #00000024;
    display: flex;
    flex-direction: column;
  }
  .allformswrapper {
    width: 90%;
    margin: 0 auto;
  }
  .form-group > input,
  .form-group > select {
    width: 80%;
    margin: 0 auto;
  }
  .rightlist,
  .leftlist {
    width: 50%;
  }
  .bdWrapper {
    flex-direction: column;
  }
  .bdSelectors {
    width: 100% !important;
    margin: 10px 0 !important;
  }
  .bmSelectors {
    width: 100% !important;
    margin: 10px 0 !important;
  }
  .bySelectors {
    width: 100% !important;
    margin: 10px 0 !important;
  }
}

@media (max-width: 991px) {
  .modalform {
    background-color: white;
    display: block !important;
    top: 80px !important;
    width: 60%;
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
    margin-top: 2%;
    box-shadow: 0px -5px 18px #1b1b1b00, -5px 0 18px #1b1b1b00,
      5px 5px 18px #00000024;
    display: flex;
    flex-direction: column;
  }
  .allformswrapper {
    width: 70%;
    margin: 0 auto;
  }
  .form-group > input,
  .form-group > select {
    width: 70%;
    margin: 0 auto;
  }
  .listcolumns {
    flex-direction: column;
  }
  .rightlist,
  .leftlist {
    width: 100%;
  }
  .header_area .navbar .nav .nav-item:last-child {
    margin-right: 2em;
  }
  .navbar-toggler {
    border: none;
    border-radius: 0px;
    padding: 0px;
    cursor: pointer;
    margin-top: 27px;
    margin-bottom: 23px;
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
}

@media (max-width: 575px) {
  .signup-form {
    color: black;
    margin-top: 2%;
    box-shadow: 0px -5px 18px #1b1b1b00, -5px 0 18px #1b1b1b00,
      5px 5px 18px #00000024;
    display: flex;
    flex-direction: column;
  }
  .allformswrapper {
    width: 100%;
    margin: 0 auto;
  }
  .form-group > input,
  .form-group > select {
    width: 60%;
    margin: 0 auto;
  }
  .disclaimer {
    padding: 0 50px;
  }
}
.allformswrapper {
  background-color: #f5f5f5;
  text-align: right;
  overflow: scroll;
}

.width90 {
  width: 90% !important;
  margin: 0 auto !important;
}

.form-group {
  margin-bottom: 1.5em !important;
}

.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 16px;
  width: 16px;
  background-color: white;
  border: 1px solid #929292;
  border-radius: 50%;
}

.container:hover input ~ .checkmark {
  background-color: #2d7af7a9;
}

.container input:checked ~ .checkmark {
  background-color: white;
  border: 1px solid #929292;
}

.checkmark:before {
  content: "";
  position: absolute;
  display: none;
}

.container input:checked ~ .checkmark:before {
  display: block;
}

.container .checkmark:before {
  top: 3px;
  left: 3px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #1987e5;
}

::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}

.round {
  position: relative;
  display: inline-block;
}

.round label {
  background-color: #fff;
  border: 2px solid #676767;
  border-radius: 50%;
  cursor: pointer;
  height: 28px;
  right: -35px;
  position: absolute;
  top: 0;
  width: 28px;
}

.round label:hover {
  background-color: #2e7cf9;
}

.round label:after {
  border: 2px solid #fff;
  border-top: none;
  border-right: none;
  content: "";
  height: 6px;
  left: 7px;
  opacity: 0;
  position: absolute;
  top: 8px;
  transform: rotate(-45deg);
  width: 12px;
}

.round input[type="checkbox"] {
  visibility: hidden;
}

.round input[type="checkbox"]:checked + label {
  background-color: #2d7bf7;
  border-color: #2d7bf7;
}

.round input[type="checkbox"]:checked + label:after {
  opacity: 1;
}

.disclaimer {
  padding: 0 80px;
}
.disclaimer span {
  text-align: right;
  display: inline-block;
}

.signup-form {
  width: 30%;
  margin: 0 auto;
  border-radius: 1em;
  background-color: white;
}
.biotext {
  border-radius: 5px;
  border-color: #00000029;
  color: black;
  padding: 10px;
  width: 100%;
  min-height: 270px;
}
.modalform {
  background-color: #f5f5f5;
  display: block !important;
  width: 95%;
  padding: 20px;
  padding-bottom: 0;
  top: 80px !important;
  position: absolute;
  right: 0;
  left: 0;
  box-shadow: 0px -5px 18px #1b1b1b00, -5px 0 18px #1b1b1b00,
    5px 5px 18px #00000024;
  overflow: scroll;
  z-index: 10;
  height: 85%;
}

.labeldiv {
  text-align: right;
  padding-right: 2.5em;
  font-size: 15px;
  color: #9d9d9d;
  font-weight: 500;
}

.main,
.second {
  background-image: linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%),
    linear-gradient(to right, #ccc, #ccc);
  background-position: calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.main:focus,
.second:focus {
  background-image: linear-gradient(45deg, green 50%, transparent 50%),
    linear-gradient(135deg, transparent 50%, green 50%),
    linear-gradient(to right, #ccc, #ccc);
  background-position: calc(100% - 15px) 1em, calc(100% - 20px) 1em,
    calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;
  border-color: green;
  outline: 0;
}

.removeicon {
  width: 10% !important;
  height: 10% !important;
  margin: auto;
}

.removeicon > div {
  padding: 0.25em !important;
  cursor: pointer;
  text-align: center !important;
  font-size: 15px;
  color: red;
  font-weight: 600;
}

.form-header {
  font-weight: 600;
  font-size: 19px;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 1em;
  text-align: center;
}

.form-footer {
  text-align: right;
  font-size: 14px;
  font-weight: 500;
  color: black;
  padding: 1.5em;
}

.form-footer > span > a {
  color: #2e8ee6 !important;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.docform {
  display: flex;
  flex-direction: column;
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
.btncreateaccount {
  float: left;
  margin-left: 1em;
  border-radius: 20px;
}
.profilepicname {
  width: 70%;
  margin: 0px 15%;
  border-radius: 25px;
  text-align: center;
  background: transparent;
  border: 1px solid gray;
  line-height: 30px;
}
.btnuploaddocs,
.introuploadbtn,
.biopicuploadbtn {
  min-width: 160px;
  background-color: #039be5;
  width: fit-content;
  border-radius: 25px;
  margin: 0 auto;
  margin-top: 1.5em;
}
.introuploadbtn {
  background-color: rgb(98, 161, 70) !important;
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
  margin: 0 auto;
  border: 2px solid gray;
  color: black;
  background-color: white;
  padding: 8px 10px;
  border-radius: 28px;
  font-size: 20px;
  font-weight: 200;
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

.listrow {
  display: flex;
  flex-direction: row;
}

.leftupload {
  width: 40%;
}
.leftupload > img {
  width: 30%;
  margin: 1em auto;
  display: block;
}
.righttext {
  font-weight: 600;
  width: 60%;
  padding: 25px;
  text-align: justify;
}

#profile > div > div {
  flex-direction: row;
}

.progressbarsection {
  display: block;
  overflow: hidden;
  text-align: center;
  position: relative;
  margin: 0 auto;
  z-index: 1;
}

.progressbarsection #progressbar {
  margin-bottom: 30px;
  overflow: hidden;
}

.progressbarsection #progressbar li {
  list-style-type: none;
  color: #757575;
  width: calc(100% / 5);
  float: right;
  position: relative;
  font: normal 13px/2 IRANsans;
}

.progressbarsection #progressbar li:nth-child(2):before {
  content: "2";
}

.progressbarsection #progressbar li:nth-child(3):before {
  content: "3";
}

.progressbarsection #progressbar li:nth-child(4):before {
  content: "4";
}

.progressbarsection #progressbar li:nth-child(5):before {
  content: "5";
}

.progressbarsection #progressbar li:before {
  content: "1";
  font: normal 25px IRANSans;
  width: 47.7px;
  height: 47.7px;
  line-height: 47.7px;
  display: block;
  background: #f5f5f5;
  border-radius: 50%;
  border: 3px solid #757575;
  margin: 0 auto 10px auto;
}

.progressbarsection #progressbar li:after {
  content: "";
  width: 100%;
  height: 5px;
  background: #757575;
  position: absolute;
  left: 0;
  top: 21px;
  z-index: -1;
}

.progressbarsection #progressbar li.done {
  color: #7cb342;
}

.progressbarsection #progressbar li.active {
  color: #f7a118;
}

.progressbarsection #progressbar li.done:before {
  border-color: #7cb342;
}

.progressbarsection #progressbar li.active:before {
  border-color: #f7a118;
}

.progressbarsection #progressbar li.done:after {
  background: #7cb342;
  color: white;
}

.progressbarsection #progressbar li.active:after {
  background: #f7a118;
  color: white;
}

.progressbarsection #progressbar li span {
  font-size: 11px;
}
</style>
<style>
body {
  background-color: #b0b0b0 !important;
}
header {
  background: #1b1b1b !important;
}
.toplogo {
  height: 50px !important;
}
.header_area .menu_nav {
  padding-right: 0;
}
#navbarSupportedContent > ul > li > a {
  color: rgb(202, 202, 202) !important;
}

.header_area .navbar .nav .nav-item .nav-link {
  font-weight: 400;
}
.container {
  /* display: block; */
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  /* font-size: 22px; */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.multiselect {
  text-align: right;
  width: 80%;
  margin: 0 auto;
  background-color: #e0e0e0 !important;
  border-radius: 25px !important;
  border: 1px transparent;
}
.multiselect__option:after {
  right: unset;
  left: 0;
}
.multiselect__tags {
  background-color: #e0e0e0 !important;
  border-radius: 25px !important;
  border: 1px transparent;
}
.multiselect__input {
  background: transparent;
}
</style>
