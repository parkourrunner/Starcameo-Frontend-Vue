<template>
  <footer id="footer" class="container-fluid rtl text-right" v-if="showFooter">
    <div class="row footer-info footer-border">
      <div class="col-12 col-sm-8 text-right">
        <ul
          class="nav navbar-nav menu_nav justify-content-start navbar-expand-lg navbar-nav"
          style="text-align: right; padding-right: 0"
        >
          <li class="nav-item active">
            <router-link to="/" class="nav-link">صفحه اصلی</router-link>
          </li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'Faq', params: { showRules: true } }"
              class="nav-link"
            >
              قوانین و مقررات
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/faq" class="nav-link">
              سوالات های متداول
            </router-link>
          </li>
          <li class="nav-item">
            <a href="blog" class="nav-link">بلاگ</a>
          </li>

          <li class="nav-item">
            <router-link to="/about" class="nav-link">
              درباره استارکمیو
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/contact" class="nav-link">
              تماس با ما
            </router-link>
          </li>
        </ul>
        <ul class="list-unstyled pr-2" style="padding-right: 2em">
          <li>
            <span>برای دریافت اپلیکیشن از لینک های زیر استفاده کنید </span>
          </li>
          <li>
            <div style="display: flex">
              <img
                src="@/assets/img/cafebazaar.png"
                alt="CafeeBazar"
                style="width: 50%"
              />
              <img
                src="@/assets/img/sibapp.png"
                alt="SibApp"
                style="width: 50%"
              />
            </div>
          </li>
          <div class="col-12 col-sm-12 copyright">
            <div style="display: block; margin: 1em 0">
              <span>
                <img src="@/assets/img/copyright.png" alt="CopyRight" />
                تمام حقوق مادی و معنوی این سایت متعلق به استارکمیو می باشد
              </span>
            </div>
            <div style="display: block">
              <span>
                <img src="@/assets/img/dangericon.png" alt="Danger" />
                خدمات ارائه شده در استارکمیو دارای مجوزهای لازم از مراجع مربوطه
                می باشد و هرگونه بهره برداری و سوءاستفاده از محتوای سایت پیگرد
                قانونی دارد
              </span>
            </div>
          </div>
        </ul>
      </div>
      <div class="col-12 col-sm-4">
        <div class="row">
          <div class="col-12 col-sm-12">
            <ul class="list-unstyled" style="padding-right: 0">
              <li style="text-align: center">
                <span class="socialLinks">
                  استار کمیو را در شبکه های اجتماعی دنبال کنید
                </span>
              </li>
              <li
                style="
                  display: flex;
                  width: 50%;
                  justify-content: center;
                  margin: 0 auto;
                "
              >
                <a target="_blank" style="cursor: pointer; margin: 0 0.5em">
                  <img
                    style="margin: 0 auto"
                    src="@/assets/img/twitter.png"
                    alt="Twitter"
                  />
                </a>
                <a target="_blank" style="cursor: pointer; margin: 0 0.5em">
                  <img
                    style="margin: 0 auto"
                    src="@/assets/img/telegram.png"
                    alt="Telegram"
                  />
                </a>
                <a
                  target="_blank"
                  style="cursor: pointer; margin: 0 0.5em"
                  href="https://www.instagram.com/starcameo/"
                >
                  <img
                    style="margin: 0 auto"
                    src="@/assets/img/instaicon.png"
                    alt="Instagram"
                  />
                </a>
              </li>
              <li
                style="
                  display: flex;
                  margin-top: 2em;
                  justify-content: space-between;
                "
              >
                <img
                  src="@/assets/img/enamad.png"
                  onclick='window.open("https://trustseal.enamad.ir/?id=142542&amp;Code=YN9GOIPhzPhYX4UT7bxa", "Popup","toolbar=no, scrollbars=no, location=no, statusbar=no, menubar=no, resizable=0, width=450, height=630, top=30")'
                  style="width: 30%; cursor: pointer"
                  alt="Enamad.ir"
                  id="YN9GOIPhzPhYX4UT7bxa"
                />
                <!-- <img
              src="@/assets/img/samanbank.png"
              alt="Saman Bank"
              style="width: 30%;"
              alt="samanbank"
            /> -->
                <img
                  src="@/assets/img/psplogo.png"
                  alt="Pasargad Bank"
                  style="width: 30%; border-radius: 5px"
                />
                <!-- <img id='jxlzesgtwlaorgvjwlaoapfuoeuk' style='cursor:pointer; width: 30%;' onclick='window.open("https://logo.samandehi.ir/Verify.aspx?id=1043458&p=rfthobpdaodsxlaoaodsdshwmcsi", "Popup","toolbar=no, scrollbars=no, location=no, statusbar=no, menubar=no, resizable=0, width=450, height=630, top=30")'
                            alt='logo-samandehi' src='img/samandehi.png' /> -->
                <img
                  id="jxlzesgtwlaorgvjwlaoapfuoeuk"
                  style="
                    background-color: white;
                    border-radius: 5px;
                    width: 30%;
                    cursor: pointer;
                  "
                  onclick='window.open("https://logo.samandehi.ir/Verify.aspx?id=1043458&p=rfthobpdaodsxlaoaodsdshwmcsi", "Popup","toolbar=no, scrollbars=no, location=no, statusbar=no, menubar=no, resizable=0, width=450, height=630, top=30")'
                  alt="logo-samandehi"
                  src="https://logo.samandehi.ir/logo.aspx?id=1043458&p=nbpdlymashwlqftishwlujynaqgw"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!--.col-->
    </div>
  </footer>
</template>
<script>
export default {
  name: "Footer",
  data() {
    return {
      showFooter: true
    };
  },
  watch: {
    $route(n, o) {
      if (
        n.name == "Login" ||
        this.$route.name == "TalentSignup" ||
        this.$route.name == "Callback"
      ) {
        this.showFooter = false;
      } else {
        this.showFooter = true;
      }
    }
  },
  mounted() {
    if (
      this.$route.name == "Login" ||
      this.$route.name == "TalentSignup" ||
      this.$route.name == "Callback"
    ) {
      this.showFooter = false;
    } else {
      this.showFooter = true;
    }
  }
};
</script>
<style lang="sass" scoped>
#footer
  direction: rtl
  margin-top: 2rem
  background-color: #131313
  color: rgb(255, 255, 255)
  padding-top: 1rem

#footer a
  color: #ffffff

#footer .footer-border
  padding-bottom: 2.5rem
  border-bottom: 0.1rem solid rgba(0, 0, 0, 0.2)

#footer h4
  font-size: 0.88rem

#footer .footer-top
  font-size: 1.3rem

#footer .footer-info li
  font-size: 16px
  vertical-align: middle
  margin: 10px 10px

  & i
    display: inline-block
    margin-left: 10px

#footer .copyright
  font-size: 12px

#footer > div > div > ul > li
  width: -webkit-fit-content
  width: -moz-fit-content
  width: fit-content
.copyright
  margin-top: 40px
</style>
