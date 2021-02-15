<template>
  <section class="row dashboard">
    <div class="col-lg-2 right-menu">
      <h4>پنل کاربری</h4>
      <ul class="nav navbar-nav right-menu-nav">
        <li id="btn-profile" :class="{ active: activeSection == 'profile' }">
          <a @click="activeSection = 'profile'">مشخصات کاربر</a>
        </li>
        <li class="divider"></li>
        <li id="btn-orders" :class="{ active: activeSection == 'orders' }">
          <a @click="activeSection = 'orders'">درخواست ها</a>
        </li>
        <li class="divider"></li>
        <li id="btn-incomes" :class="{ active: activeSection == 'incomes' }">
          <a @click="activeSection = 'incomes'">تسویه حساب</a>
        </li>
        <li class="divider"></li>
        <li
          id="btn-changepass"
          :class="{ active: activeSection == 'changepass' }"
        >
          <a @click="activeSection = 'changepass'">تغییر رمز عبور</a>
        </li>
        <li class="divider"></li>
        <li id="btn-logout">
          <a @click="logout()">
            خروج<span class="glyphicon glyphicon-log-out pull-right"></span>
          </a>
        </li>
      </ul>
    </div>

    <div class="col-lg-10 dashboard-content">
      <section v-show="activeSection == 'profile'" class="profile-section">
        <div class="container">
          <h4 style="margin-top:10px">مشخصات کاربر</h4>
          <hr />
          <div class="row" style="flex-direction:row">
            <!-- left column -->
            <div class="col-lg-4">
              <div class="row container">
                <div class="col-xs-12">
                  <ImageCroppie
                    :defaultImage.sync="defaultImage"
                    :croppedImage.sync="croppedImage"
                    :pictureName.sync="profilepicname"
                    :okButtonText="'بروزرسانی'"
                    :onConfirm="changepic"
                    :height="200"
                    :width="200"
                  ></ImageCroppie>
                </div>
              </div>
            </div>
            <div class="col-lg-5 personal-info">
              <div class="form-group">
                <label for="fname">نام:</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="user.firstname"
                  id="fname"
                  disabled=""
                />
              </div>
              <div class="form-group">
                <label for="lname">نام خانوادگی:</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="user.lastname"
                  id="lname"
                  disabled=""
                />
              </div>
              <div class="form-group" v-show="userStatus.isTalent">
                <label for="link">لینک صفحه شما:</label>
                <input
                  class="form-control link"
                  type="text"
                  v-model="userlink"
                  disabled=""
                />
              </div>
              <div class="form-group">
                <label for="email">ایمیل:</label>
                <input
                  id="email"
                  v-model="user.email"
                  class="form-control dir-ltr"
                  type="text"
                />
              </div>

              <div class="form-group">
                <label for="mobilenum">شماره موبایل:</label>
                <input
                  id="mobilenum"
                  v-model="user.phonenumber"
                  class="form-control dir-ltr"
                  type="text"
                  disabled=""
                />
              </div>
              <div class="form-group">
                <label for="cardnum">شماره کارت:</label>
                <input
                  id="cardnum"
                  v-model="user.cardnumber"
                  class="form-control dir-ltr"
                  type="text"
                />
              </div>
              <div class="form-group">
                <label for="refcode">کد معرف:</label>
                <input
                  id="refcode"
                  v-model="user.referralcode"
                  class="form-control dir-ltr"
                  type="text"
                  disabled
                />
              </div>

              <div class="form-group" style="display:flex">
                <button
                  @click="changeinfo()"
                  type="button"
                  class="btn btn-secondary"
                  style="margin:0 20px"
                >
                  ذخیره تغییرات
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </section>

      <section v-show="activeSection == 'orders'" class="orders-table">
        <h4 style="margin-top:10px">جدول درخواست ها</h4>
        <div
          class="panel panel-default"
          style="padding: 10px; direction: rtl;text-align: right; color: black; overflow: auto"
        >
          <b-table
            class="table-curved"
            style="border-spacing:0 20px;max-height: 100%;"
            :tbody-tr-class="rowClass"
            show-empty
            empty-html='<div class="text-center my-2" style="direction: rtl;">درخواستی یافت نشد.</div>'
            responsive
            sticky-header
            :busy="loadingRequests"
            :items="requests"
            :current-page="currentPage"
            :per-page="perPage"
            :fields="headers"
          >
            <template #cell(date)="row">
              {{ convertDate(row.item.date) }}
            </template>
            <template #cell(rid)="row">
              {{ "SC-" + row.item.rid.substr(row.item.rid.length - 5, 5) }}
            </template>
            <template #cell(level)="row">
              <span
                v-if="
                  !userStatus.isTalent &&
                    row.item.paid == '1' &&
                    row.item.level == 1
                "
                class="label label-primary"
                >درحال بررسی</span
              >
              <span
                v-if="
                  !userStatus.isTalent &&
                    row.item.paid == '1' &&
                    row.item.level == 2
                "
                class="label label-primary"
                >در حال انجام</span
              >
              <span
                v-if="
                  !userStatus.isTalent &&
                    row.item.paid == '1' &&
                    row.item.level == 3
                "
                class="label label-primary"
                >درحال بررسی</span
              >
              <span
                v-if="
                  !userStatus.isTalent &&
                    row.item.paid == '1' &&
                    row.item.level == 4
                "
                class="label label-primary"
                >آماده شده است</span
              >
              <span
                v-if="
                  !userStatus.isTalent &&
                    row.item.paid == '1' &&
                    row.item.level == -1
                "
                class="label label-danger"
                >رد شده است</span
              >
              <span
                v-if="
                  !userStatus.isTalent &&
                    row.item.paid == '1' &&
                    row.item.level == -2
                "
                class="label label-danger"
                >رد شده است</span
              >
              <span
                v-if="
                  !userStatus.isTalent &&
                    row.item.paid == '1' &&
                    row.item.level == -3
                "
                class="label label-primary"
                >درحال بررسی</span
              >
              <span
                v-if="
                  !userStatus.isTalent &&
                    row.item.paid == '1' &&
                    row.item.level == -4
                "
                class="label label-default"
                >منقضی شده</span
              >
              <span
                v-if="!userStatus.isTalent && row.item.paid == '0'"
                style="margin-left: 5px;"
                class="label label-info"
                >در انتظار پرداخت
              </span>
              <span
                v-if="!userStatus.isTalent && row.item.paid == '0'"
                class="label label-primary"
                style="text-decoration: underline;cursor: pointer;font-weight:600;"
                @click="showFactor(row.item)"
                >پرداخت کنید</span
              >
              <span
                v-if="userStatus.isTalent && row.item.level == 2"
                class="label label-primary"
                >منتظر آپلود یا رد درخواست</span
              >
              <span
                v-if="userStatus.isTalent && row.item.level == 3"
                class="label label-primary"
                >درحال بررسی</span
              >
              <span
                v-if="userStatus.isTalent && row.item.level == 4"
                class="label label-primary"
                >انجام شده</span
              >
            </template>
            <template #cell(actions)="row">
              <span
                v-if="!userStatus.isTalent && row.item.level != 4"
                @click="showRequestDetails(row.item)"
                class="label label-primary"
                style="text-decoration: underline;cursor: pointer;font-weight:600;"
                >جزئیات</span
              >
              <span
                v-if="userStatus.isTalent && row.item.level != 4"
                style="cursor:pointer;text-decoration:underline;font-weight:600;"
                @click="showTalentActions(row.item)"
                >جزئیات</span
              >
              <span
                v-if="row.item.level == 4"
                class="label label-primary"
                style="text-decoration: underline;cursor: pointer;font-weight:600"
                @click="downloadCameo(row.item)"
                >دانلود کمیو</span
              >
            </template>
            <template #table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>در حال بارگذاری...</strong>
              </div>
            </template>
          </b-table>
          <div class="row">
            <div class="col-sm-12 col-md-5">
              <div
                class="dataTables_info"
                id="table-append_info"
                role="status"
                aria-live="polite"
              >
                نمایش {{ perPage * (currentPage - 1) + 1 }} تا
                {{ perPage * currentPage }} از {{ requests.length }} درخواست
              </div>
            </div>
            <div class="col-sm-12 col-md-7">
              <b-pagination
                style="justify-content: flex-end;"
                v-model="currentPage"
                :total-rows="requests.length"
                :per-page="perPage"
                prev-text="قبلی"
                next-text="بعدی"
                first-number
                last-number
                align="fill"
                size="sm"
                class="my-0"
              ></b-pagination>
            </div>
          </div>
          <b-modal
            centered
            :hide-footer="true"
            :hide-header="true"
            v-model="orderDetailsModalShow"
            modal-class="details-modal"
          >
            <button
              type="button"
              class="modal-close"
              aria-label="Close this dialog"
              style="display: flex"
              @click="orderDetailsModalShow = false"
            >
              ×
            </button>
            <span
              class="detailsModal-header"
              :style="{ 'background-color': currentOrderDetails.headerColor }"
            >
              {{ currentOrderDetails.orderstate }}
            </span>
            <div class="row detailsModal-body">
              <div
                class="row"
                style="display: block;width: 100%;padding: 1em 1em 0.5em 1em;"
              >
                <span style="float: right;font-size: 14px;"
                  >تاریخ ثبت درخواست: {{ currentOrderDetails.submitDate }}</span
                >
                <span class="en floatRight991"
                  >شماره پیگیری: {{ currentOrderDetails.reqnumber }}</span
                >
              </div>
              <br />
              <div class="row" style="width: 100%;padding: 0 1em 0.5em 0;">
                <span style="float: right;font-size: 14px;">
                  زمان باقی مانده:
                  <span style="color:#ff0000; font-weight:600;"
                    >{{
                      currentOrderDetails.currentorderremainedtime
                    }}
                    ساعت</span
                  >
                </span>
              </div>
              <div class="row t2">
                <span style="float: right;font-size: 14px">
                  <span style="font-size: 14px;font-weight: 600;color: black;"
                    >درخواست از: </span
                  >{{ currentOrderDetails.talentname }}
                </span>
              </div>
              <div class="row t2">
                <span style="font-size: 14px;font-weight: 600;color: black;"
                  >به مناسبت:</span
                >
              </div>
              <div class="row t2">
                <input
                  class="form-control"
                  style="font-size: 14px;width:calc(100% - 1em);color: black;border-radius: 5px;background-color: #e4e4e5;border: none;padding: 0 10px;"
                  disabled="disabled"
                  v-model="this.currentOrderDetails.requesttitle"
                />
              </div>
              <div class="row t2">
                <span style="font-size: 14px;font-weight: 600;color: black;"
                  >پیام درخواستی:</span
                >
              </div>
              <div class="row t2">
                <textarea
                  rows="5"
                  class="form-control"
                  style="font-size: 14px;width: calc(100% - 1em);color: black;border-radius: 5px;background-color: #e4e4e5;border: none;padding: 0 10px;"
                  disabled="disabled"
                  v-model="this.currentOrderDetails.requesttext"
                ></textarea>
              </div>
            </div>
            <div
              class="row"
              style="display:block;height: 80px;padding: 1em 0 1em 1em;"
            >
              <button
                v-if="currentOrderDetails.level == '0'"
                id="pay"
                style="float: left;color: white;background-color: #0072bb;border-radius: 50px;margin-right: 0.5em;"
                class="btn btn-sm"
                type="button"
                @click="showFactor(currentOrderDetails)"
              >
                پرداخت
              </button>
            </div>
          </b-modal>
          <b-modal
            centered
            :hide-footer="true"
            :hide-header="true"
            v-model="orderPayModalShow"
            modal-class="factor-modal"
          >
            <button
              type="button"
              class="modal-close"
              aria-label="Close this dialog"
              style="display: flex"
              @click="orderPayModalShow = false"
            >
              ×
            </button>
            <div class="row mainsection">
              <div class="row factorlogo">
                <img
                  :src="require('../../assets/img/paylogo.png')"
                  alt="paylogo"
                />
              </div>
              <div class="row factorsection">
                <span> تاریخ: {{ new Date() | moment("jYYYY/jMM/jDD") }} </span>
                <span class="en">
                  شماره درخواست:
                  {{ currentOrder.reqnumber }}
                </span>
                <span>
                  درخواست کننده:
                  {{ currentUser.firstname + " " + currentUser.lastname }}
                </span>
              </div>
              <div class="row factorsection">
                <span>
                  درخواست کمیو از:
                  {{ currentOrder.talnetname }}
                </span>
                <span>
                  مبلغ:
                  {{ currentOrder.price }}
                </span>
              </div>
              <div class="row factorsection">
                <span>
                  موجودی کیف پول شما:
                  {{
                    (currentUser.balance * 10).toLocaleString() + "  " + "ریال"
                  }}
                </span>
                <span>
                  مبلغ قابل پرداخت:
                  {{ currentOrder.hastopay }}
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
          <b-modal
            centered
            :hide-footer="true"
            :hide-header="true"
            modal-class="details-modal"
            v-model="talentActionModalShow"
          >
            <button
              type="button"
              class="modal-close"
              aria-label="Close this dialog"
              style="display: flex"
              @click="talentActionModalShow = false"
            >
              ×
            </button>
            <span
              class="detailsModal-header"
              :style="{ 'background-color': currentOrderDetails.headerColor }"
            >
              {{ currentOrderDetails.orderstate }}
            </span>
            <div class="row detailsModal-body">
              <div
                class="row"
                style="display: block;width: 100%;padding: 1em 1em 0.5em 1em;"
              >
                <span style="float: right;font-size: 14px;"
                  >تاریخ ثبت درخواست: {{ currentOrderDetails.submitDate }}</span
                >
                <span class="en floatRight991"
                  >شماره پیگیری: {{ currentOrderDetails.reqnumber }}</span
                >
              </div>
              <br />
              <div class="row" style="width: 100%;padding: 0 1em 0.5em 0;">
                <span style="float: right;font-size: 14px;">
                  زمان باقی مانده:
                  <span style="color:#ff0000; font-weight:600;"
                    >{{
                      currentOrderDetails.currentorderremainedtime
                    }}
                    ساعت</span
                  >
                </span>
              </div>
              <div class="row t2">
                <span style="float: right;font-size: 14px">
                  <span style="font-size: 14px;font-weight: 600;color: black;"
                    >درخواست از: </span
                  >{{ currentOrderDetails.talentname }}
                </span>
              </div>
              <div class="row t2">
                <span style="font-size: 14px;font-weight: 600;color: black;"
                  >به مناسبت:</span
                >
              </div>
              <div class="row t2">
                <input
                  class="form-control"
                  style="font-size: 14px;width:calc(100% - 1em);color: black;border-radius: 5px;background-color: #e4e4e5;border: none;padding: 0 10px;"
                  disabled="disabled"
                  v-model="this.currentOrderDetails.requesttitle"
                />
              </div>
              <div class="row t2">
                <span style="font-size: 14px;font-weight: 600;color: black;"
                  >پیام درخواستی:</span
                >
              </div>
              <div class="row t2">
                <textarea
                  rows="5"
                  class="form-control"
                  style="font-size: 14px;width: calc(100% - 1em);color: black;border-radius: 5px;background-color: #e4e4e5;border: none;padding: 0 10px;"
                  disabled="disabled"
                  v-model="this.currentOrderDetails.requesttext"
                ></textarea>
              </div>
            </div>
            <div
              class="row"
              style="display:block;height: 80px;padding: 1em 0 1em 1em;"
            >
              <button
                v-if="currentOrderDetails.level == '2'"
                @click="choosecameo()"
                style="float: left;color: white;background-color: #7cb342;border-radius: 50px;margin-right: 0.5em;"
                class="btn btn-sm"
                type="button"
              >
                تایید و بارگذاری ویدیو
              </button>
              <button
                v-if="currentOrderDetails.level == '2'"
                @click="rejectcameo()"
                style="float: left;background-color: #e53935;color: white;border-radius: 30px;"
                type="button"
                class="btn btn-sm"
              >
                رد درخواست
              </button>
            </div>
          </b-modal>
          <b-modal
            centered
            :hide-footer="true"
            :hide-header="true"
            modal-class="details-modal"
            v-model="rejectcameoModalShow"
          >
            <button
              type="button"
              class="modal-close"
              aria-label="Close this dialog"
              style="display: flex"
              @click="rejectcameoModalShow = false"
            >
              ×
            </button>
            <span
              class="detailsModal-header"
              style="background-color: #e53935;"
            >
              رد درخواست
            </span>
            <div class="row detailsModal-body">
              <div
                class="row"
                style="display: block;width: 100%;padding: 1em 1em 0.5em 1em;"
              >
                <span style="float: right;font-size: 14px;"
                  >تاریخ ثبت درخواست: {{ currentOrderDetails.submitDate }}</span
                >
                <span class="en floatRight991"
                  >شماره پیگیری: {{ currentOrderDetails.reqnumber }}</span
                >
              </div>
              <br />
              <div class="row" style="width: 100%;padding: 0 1em 0.5em 0;">
                <span style="float: right;font-size: 14px;">
                  زمان باقی مانده:
                  <span style="color:#ff0000; font-weight:600;"
                    >{{
                      currentOrderDetails.currentorderremainedtime
                    }}
                    ساعت</span
                  >
                </span>
              </div>
              <div
                class="row"
                style="width: 100%;padding: 0 1em 0.5em 0;flex-direction: column;align-items: baseline;"
              >
                <div>
                  <span style="font-size: 14px;font-weight: 600;color: black;"
                    >علت رد درخواست:</span
                  >
                  <span style="font-size: 12px;color: #e53935;"
                    >* انتخاب یکی از گزینه ها اجباری می باشد</span
                  >
                </div>
                <div style="height:30px;display: flex;">
                  <input
                    style="height:100%;"
                    type="checkbox"
                    name="rejectreason"
                    value="موضوع نامناسب بود"
                  />
                  <label style="margin-right: 5px;">موضوع نامناسب بود</label>
                </div>
                <div style="height:30px;display: flex;">
                  <input
                    style="height:100%;"
                    type="checkbox"
                    name="rejectreason"
                    value="متن درخواست قابل درک نبود"
                  />
                  <label style="margin-right: 5px;"
                    >متن درخواست قابل درک نبود</label
                  >
                </div>
                <div style="height:30px;display: flex;">
                  <input
                    style="height:100%;"
                    type="checkbox"
                    name="rejectreason"
                    value="امکان ضبط ویدیو برای من فراهم نبود"
                  />
                  <label style="margin-right: 5px;"
                    >امکان ضبط ویدیو برای من فراهم نبود</label
                  >
                </div>
              </div>
              <div class="row t2">
                <span style="font-size: 14px;font-weight: 600;color: black;"
                  >موارد دیگر:</span
                >
              </div>
              <div class="row t2">
                <textarea
                  id="rejreason"
                  rows="3"
                  style="font-size: 14px;width: calc(100% - 1em);color: black;border-radius: 5px;background-color: #e4e4e5;border: none;padding: 0 10px;"
                  placeholder="در صورتی که علت دیگری نیز برای رد درخواست دارید لطفا علت را شرح دهید"
                ></textarea>
              </div>
            </div>
            <div
              class="row"
              style="display:block;height: 80px;padding: 1em 0 1em 1em;"
            >
              <button
                disabled=""
                @click="submitReject()"
                id="submitrejectbtn"
                style="float: left;background-color: #e53935;color: white;border-radius: 30px;"
                type="button"
                class="btn btn-sm"
              >
                رد درخواست
              </button>
            </div>
          </b-modal>
        </div>
      </section>

      <section v-show="activeSection == 'incomes'">
        <div style="width: 50%;margin: 0 25%; padding: 10px">
          <form
            class="form-horizontal"
            role="form"
            style="display:flex; flex-direction: column"
          >
            <div class="form-group">
              <label for="curbalance">موجودی حساب شما:</label>
              <input
                v-model="balance"
                style="text-align:center"
                class="form-control"
                type="text"
                id="curbalance"
                readonly
              />
            </div>
            <div class="form-group">
              <label for="withreq">مقدار درخواستی:</label>
              <input
                v-model="withdrawReqAmount"
                style="text-align:center"
                class="form-control dir-ltr"
                type="text"
                id="withreqam"
                value=""
              />
            </div>
            <div style="margin-left:auto; margin-right: auto">
              <input
                style="float:right"
                type="button"
                @click="withdraw()"
                class="btn btn-secondary"
                value="ثبت درخواست"
              />
            </div>
          </form>
        </div>
      </section>

      <section v-show="activeSection == 'changepass'">
        <div style="width: 50%;margin: 0 25%; padding: 10px">
          <form
            class="form-horizontal"
            role="form"
            style="display: flex;flex-flow: column;"
          >
            <div class="form-group">
              <label for="currentpass">رمز عبور فعلی:</label>
              <input
                style="text-align:center"
                class="form-control dir-ltr"
                type="password"
                v-model="currentPassword"
                id="currentpass"
              />
            </div>
            <div class="form-group">
              <label for="newpass">رمز عبور جدید</label>
              <input
                style="text-align:center"
                class="form-control dir-ltr"
                type="password"
                v-model="newPassword"
                id="newpass"
              />
            </div>
            <div class="form-group">
              <label for="renewpass">تکرار رمز عبور جدید</label>
              <input
                style="text-align:center"
                class="form-control dir-ltr"
                type="password"
                v-model="renewPassword"
                id="renewpass"
              />
            </div>
            <div class="form-group" style="display:flex">
              <button
                type="button"
                class="btn btn-secondary"
                @click="changepassword()"
              >
                تغییر رمز
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  </section>
</template>
<script>
import ImageCroppie from "../../components/ImageCroppie";
import * as webService from "../../services/webService";
import { mapState, mapActions } from "vuex";
import * as $ from "jquery";
export default {
  name: "Dashboard",
  components: {
    ImageCroppie
  },
  data() {
    return {
      activeSection: "profile",
      baseUrl: process.env.VUE_APP_API_URL,
      defaultImage: require("../../assets/img/default-picture.png"),
      croppedImage: null,
      profilepicture: "",
      profilepicname: "",
      withdrawReqAmount: 0,
      currentPassword: "",
      discountCode: "",
      newPassword: "",
      renewPassword: "",
      user: {},
      userlink: "",
      requests: [],
      loadingRequests: false,
      currentPage: 1,
      perPage: 10,
      headers: [],
      orderPayModalShow: false,
      orderDetailsModalShow: false,
      talentActionModalShow: false,
      rejectcameoModalShow: false,
      currentOrder: [],
      currentOrderDetails: [],
      discountSectionShow: true,
      discountErrorShow: false,
      discountErrorText: "",
      discountsucceedShow: false
    };
  },
  computed: {
    ...mapState(["currentUser", "userStatus", "allTalents"]),
    balance() {
      return this.user.balance + " تومان";
    }
  },
  methods: {
    ...mapActions(["setCurrentUser", "setUserStatus", "setTalents"]),
    logout() {
      this.$cookies.remove("sctoken");
      this.$cookies.remove("talent");
      this.setCurrentUser({});
      this.setUserStatus({ isLoggedin: false, isTalent: false });
      this.$router.push({ name: "Home" });
    },
    convertDate(date) {
      this.$moment.locale("en");
      return this.$moment(date, "YYYY-MM-DD HH:mm:ss")
        .locale("fa")
        .add("210", "minutes")
        .format("jYYYY/jMM/jDD HH:mm:ss");
    },
    changepic(blob) {
      var senddata = new FormData();
      senddata.append("image", blob, "image.jpg");
      var that = this;
      webService.post(
        this.baseUrl + "user/profilepic",
        senddata,
        {
          sctoken: this.$cookies.get("sctoken"),
          "content-type": false,
          cache: false,
          "cross-domain": true,
          "process-data": false
        },
        true,
        function(response) {
          that.$swal({
            icon: "success",
            title: "عکس شما با موفقیت تغییر کرد",
            showConfirmButton: true,
            focusConfirm: false
          });
          that.user.profilepicture = response.data.filename;
          that.setCurrentUser(that.user);
        },
        function(error) {
          that.$swal({
            imageUrl: "img/sadface.png",
            imageWidth: 190,
            imageHeight: 190,
            title: "تغییر عکس با خطا مواجه شد",
            showConfirmButton: true
          });
        }
      );
    },
    changeinfo() {
      var requestUrl = "https://api.starcameo.ir/user";
      var postedDataJson = {
        firstname: this.user.firstname,
        lastname: this.user.lastname
      };
      if (this.user.email != "") {
        postedDataJson = { ...postedDataJson, email: this.user.email };
      }
      if (this.user.cardnumber != "") {
        postedDataJson = { ...postedDataJson, card: this.user.cardnumber };
      }
      var that = this;
      webService.post(
        this.baseUrl + "user",
        postedDataJson,
        {
          sctoken: this.$cookies.get("sctoken"),
          "content-type": "application/json; charset=utf-8",
          "data-type": "json",
          "cross-domain": true
        },
        true,
        function(response) {
          that.$swal({
            icon: "success",
            title: "مشخصات بروزرسانی شد",
            showConfirmButton: true,
            focusConfirm: false
          });
        },
        function(error) {}
      );
    },
    withdraw() {
      var that = this;
      if (this.withdrawReqAmount < 1000) {
        that.$swal({
          imageUrl: "img/sadface.png",
          imageWidth: 190,
          imageHeight: 190,
          title: "مبلغ درخواستی نمی تواند کمتر از 1000 تومان باشد",
          showConfirmButton: true
        });
        return false;
      }
      webService.post(
        this.baseUrl + "withdraw",
        {
          amount: this.withdrawReqAmount
        },
        {
          sctoken: this.$cookies.get("sctoken"),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          crossDomain: true
        },
        true,
        function(response) {
          that.$swal({
            icon: "success",
            title: "درخواست تسویه شما ثبت شد",
            showConfirmButton: true
          });
        },
        function(error) {
          var err = error.data.message;
          if (err == "Amount can't be under 1000.") {
            that.$swal({
              imageUrl: "img/sadface.png",
              imageWidth: 190,
              imageHeight: 190,
              title: "مبلغ درخواستی نمی تواند کمتر از 1000 تومان باشد",
              showConfirmButton: true
            });
          } else if (err == "Insufficient funds!") {
            that.$swal({
              imageUrl: "img/sadface.png",
              imageWidth: 190,
              imageHeight: 190,
              title: "مبلغ درخواستی نمی تواند بیشتر از موجود حساب باشد",
              showConfirmButton: true
            });
          }
        }
      );
    },
    changepassword() {
      if (this.currentPassword == "") {
        this.$swal({
          imageUrl: "img/sadface.png",
          imageWidth: 190,
          imageHeight: 190,
          title: "لطفاً گذرواژه فعلی خود را وارد نمایید",
          showConfirmButton: true,
          focusConfirm: false,
          confirmButtonText: "بستن"
        });
        return;
      } else if (this.currentPassword.length < 6) {
        this.$swal({
          imageUrl: "img/sadface.png",
          imageWidth: 190,
          imageHeight: 190,
          title: "گذرواژه فعلی باید حداقل 6 حرف باشد",
          showConfirmButton: true,
          focusConfirm: false,
          confirmButtonText: "بستن"
        });
        return;
      } else if (this.newPassword == "") {
        this.$swal({
          imageUrl: "img/sadface.png",
          imageWidth: 190,
          imageHeight: 190,
          title: "لطفاً گذرواژه جدید خود را وارد نمایید",
          showConfirmButton: true,
          focusConfirm: false,
          confirmButtonText: "بستن"
        });
        return;
      } else if (this.newPassword.length < 6) {
        this.$swal({
          imageUrl: "img/sadface.png",
          imageWidth: 190,
          imageHeight: 190,
          title: "گذرواژه جدید باید حداقل 6 حرف باشد",
          showConfirmButton: true,
          focusConfirm: false,
          confirmButtonText: "بستن"
        });
        return;
      } else if (this.newPassword != this.renewPassword) {
        this.$swal({
          imageUrl: "img/sadface.png",
          imageWidth: 190,
          imageHeight: 190,
          title: "گذرواژه های جدید وارد شده یکسان نیستند",
          showConfirmButton: true,
          focusConfirm: false,
          confirmButtonText: "بستن"
        });
        return;
      }
      var that = this;
      webService.post(
        this.baseUrl + "user/changepass",
        {
          phonenumber: this.user.phonenumber,
          password: this.currentPassword,
          newpassword: this.newPassword
        },
        {
          sctoken: this.$cookies.get("sctoken"),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          crossDomain: true
        },
        true,
        function(response) {
          that.$swal({
            icon: "success",
            title: "رمز عبور با موفقیت تغییر کرد",
            showConfirmButton: true
          });
        },
        function(error) {}
      );
    },
    showRequestDetails(item) {
      this.currentOrderDetails = item;
      var currentlevel = item.level;
      if (currentlevel == "0") {
        this.currentOrderDetails.orderstate = "در انتظار پرداخت";
        this.currentOrderDetails.headerColor = "#0072bb";
      } else if (
        currentlevel == "1" ||
        currentlevel == "-3" ||
        currentlevel == "3"
      ) {
        this.currentOrderDetails.orderstate = "درحال بررسی";
        this.currentOrderDetails.headerColor = "#f7a118";
      } else if (currentlevel == "2") {
        this.currentOrderDetails.orderstate = "در انتظار";
        this.currentOrderDetails.headerColor = "#f7a118";
      } else if (currentlevel == "4") {
        this.currentOrderDetails.orderstate = "اماده دانلود";
        this.currentOrderDetails.headerColor = "#62a146";
      } else if (currentlevel == "-1" || currentlevel == "-2") {
        this.currentOrderDetails.orderstate = "رد شده";
        this.currentOrderDetails.headerColor = "#bf4746";
      } else if (currentlevel == "-4") {
        this.currentOrderDetails.orderstate = "منقضی شده";
        this.currentOrderDetails.headerColor = "#707070";
      }

      this.currentOrderDetails.submitDate = this.$moment(
        item.date.substr(0, 10)
      )
        .locale("fa")
        .format("DD . MMMM . YYYY");
      this.currentOrderDetails.reqnumber =
        "SC-" + item.rid.substr(item.rid.length - 5, 5);
      this.currentOrderDetails.currentorderremainedtime =
        72 -
        this.$moment()
          .add("-210", "minutes")
          .diff(this.$moment(item.date), "hours");
      if (this.currentOrderDetails.currentorderremainedtime <= 0) {
        this.currentOrderDetails.currentorderremainedtime = 0;
      }
      this.orderDetailsModalShow = true;
    },
    showTalentActions(item) {
      this.currentOrderDetails = item;
      var currentlevel = item.level;
      if (currentlevel == "2") {
        this.currentOrderDetails.orderstate = "در انتظار";
        this.currentOrderDetails.headerColor = "#0072bb";
      } else if (currentlevel == "3") {
        this.currentOrderDetails.orderstate = "درحال بررسی";
        this.currentOrderDetails.headerColor = "#f7a118";
      } else if (currentlevel == "4") {
        this.currentOrderDetails.orderstate = "تکمیل شده";
        this.currentOrderDetails.headerColor = "#62a146";
      }

      this.currentOrderDetails.submitDate = this.$moment(
        item.date.substr(0, 10)
      )
        .locale("fa")
        .format("DD . MMMM . YYYY");
      this.currentOrderDetails.reqnumber =
        "SC-" + item.rid.substr(item.rid.length - 5, 5);
      this.currentOrderDetails.currentorderremainedtime =
        72 -
        this.$moment()
          .add("-210", "minutes")
          .diff(this.$moment(item.date), "hours");
      if (this.currentOrderDetails.currentorderremainedtime <= 0) {
        this.currentOrderDetails.currentorderremainedtime = 0;
      }
      this.talentActionModalShow = true;
    },
    rowClass(item, type) {
      if (item) {
        if (this.userStatus.isTalent) {
          if (item.level == 2) {
            return "table-blue";
          } else if (item.level == 3) {
            return "table-orange";
          } else if (item.level == 4) {
            return "table-green";
          }
        } else {
          if (item.paid != "0") {
            if (
              item.level == 1 ||
              item.level == 2 ||
              item.level == 3 ||
              item.level == -3
            ) {
              return "table-orange";
            } else if (item.level == 4) {
              return "table-green";
            } else if (item.level == -1 || item.level == -2) {
              return "table-red";
            } else if (item.level == -4) {
              return "table-gray";
            }
          } else {
            return "table-blue";
          }
        }
      }
    },
    getRequestes() {
      this.loadingRequests = true;
      var that = this;
      webService.get(
        this.baseUrl + "requests",
        {},
        {
          sctoken: this.$cookies.get("sctoken"),
          "content-type": "application/json; charset=utf-8",
          "data-type": "json",
          "cross-domain": true
        },
        true,
        function(response) {
          that.loadingRequests = false;
          if (that.userStatus.isTalent) {
            that.headers = [
              {
                key: "date",
                label: "تاریخ",
                sortable: true
              },
              {
                key: "rid",
                label: "شماره پیگیری",
                sortable: true
              },
              {
                key: "fromuser",
                label: "درخواست از"
              },
              {
                key: "requesttitle",
                label: "موضوع"
              },
              {
                key: "level",
                label: "وضعیت"
              },
              {
                key: "actions",
                label: "عملیات"
              }
            ];
          } else {
            that.headers = [
              {
                key: "date",
                label: "تاریخ",
                sortable: true
              },
              {
                key: "rid",
                label: "شماره پیگیری",
                sortable: true
              },
              {
                key: "talentname",
                label: "درخواست از"
              },
              {
                key: "requesttitle",
                label: "موضوع"
              },
              {
                key: "level",
                label: "وضعیت"
              },
              {
                key: "actions",
                label: "عملیات"
              }
            ];
          }
          if (response.data.data.message != "No new requests available.") {
            that.requests = response.data.data.requests;
          }
        },
        function(error) {
          that.loadingRequests = false;
        }
      );
    },
    showFactor(order) {
      this.currentOrder = [];
      this.discountSectionShow = true;
      this.discountErrorShow = false;
      this.discountErrorText = "";
      this.discountsucceedShow = false;
      this.currentOrder.id = order.rid;
      this.currentOrder.currentdate = this.$moment()
        .locale("fa")
        .format("YYYY/MM/DD");
      this.currentOrder.currentorderid = order.rid;
      this.currentOrder.reqnumber =
        "SC-" + order.rid.substr(order.rid.length - 5, 5);
      this.currentOrder.talnetname = order.talentname;
      this.currentOrder.price =
        (order.price * 10).toLocaleString() + "  " + "ریال";
      this.currentOrder.hastopay =
        order.price - this.currentUser.balance <= 0
          ? "0 ریال"
          : ((order.price - this.currentUser.balance) * 10).toLocaleString() +
            "  " +
            "ریال";

      this.orderPayModalShow = true;
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
    pay() {
      var that = this;
      var gateway = $('input[name="gateway"]:checked').val();
      var requestUrl = "";
      if (gateway && gateway != "") {
        requestUrl =
          this.baseUrl +
          `requests/${this.currentOrder.id}/pay?gateway=${gateway}`;
      } else {
        requestUrl = that.baseUrl + `requests/${this.currentOrder.id}/pay`;
      }
      webService.get(
        requestUrl,
        {},
        {
          sctoken: that.$cookies.get("sctoken"),
          platform: "web"
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
              onClose: () => that.getRequestes()
            });
          }
          that.orderPayModalShow = false;
        },
        function(error) {
          var err = error.data.message;
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
              confirmButtonText: "تایید"
            });
          }
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
          that.orderPayModalShow = false;
        }
      );
    },
    downloadCameo(item) {
      var that = this;
      this.progressSwal = this.$swal({
        title: '<span>در حال دانلود: <span id="progress"></span></span>',
        showConfirmButton: false,
        allowOutsideClick: false
      });
      var request = new XMLHttpRequest();
      request.open("GET", this.baseUrl + "cameo/" + item.cameo, true);
      request.setRequestHeader("scbeta", "somesecretshitforthebetaapi");
      request.setRequestHeader("sctoken", this.$cookies.get("sctoken"));
      request.setRequestHeader("platform", "web");
      request.responseType = "blob";
      request.addEventListener(
        "progress",
        function(evt) {
          if (evt.lengthComputable) {
            var percentComplete = evt.loaded / evt.total;
            $("#progress").html(
              "<b>" + Math.round(percentComplete * 100) + "% </b>"
            );
          }
        },
        false
      );
      request.onload = function() {
        that.progressSwal.close();
        if (request.status === 200) {
          var filename = "cameo.mp4";
          var blob = new Blob([request.response], {
            type: "video/mp4"
          });
          var link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      };
      request.send();
    },
    choosecameo() {
      this.talentActionModalShow = false;
      var that = this;
      this.choosecameoSwal = this.$swal({
        title: "انتخاب ویدیو برای بارگذاری",
        html: `
      <div class="upload-btn-wrapper">
      <button class="uploadbtn">انتخاب کمیو:</button>
      <input type="file" name="cameo" accept="video/*" id="cameo" />
      </div>`,
        showCancelButton: true,
        confirmButtonColor: "rgb(98, 161, 70)",
        cancelButtonColor: "#e53935",
        confirmButtonText: "بارگذاری کمیو",
        cancelButtonText: "انصراف"
      }).then(result => {
        if (result.value) {
          var cameo = $("#cameo").get(0).files[0];
          if (cameo) {
            var senddata = new FormData();
            senddata.append("cameo", cameo);
            that.uploadProgressSwal = that.$swal({
              title: `<span>چهره محترم، با توجه به حجم
                     بالای ویدیو انتخاب شده و سرعت اینترنت، بارگذاری زمان بر خواهد بود.
                     <br>لطفا شکیبا باشید<br>پیشرفت: <span id="status"></span></span>`,
              showConfirmButton: false,
              allowOutsideClick: false
            });
            var thata = that;
            webService.post(
              that.baseUrl +
                "requests/" +
                that.currentOrderDetails.rid +
                "/uploadcameo",
              senddata,
              {
                sctoken: that.$cookies.get("sctoken"),
                "data-type": "json",
                "cross-domain": true,
                "process-data": false,
                "content-type": false,
                cache: false
              },
              true,
              function(response) {
                thata.uploadProgressSwal.close();
                thata.$swal({
                  icon: "success",
                  title: "کمیو با موفقیت آپلود شد",
                  showConfirmButton: true,
                  confirmButtonText: "تایید",
                  focusConfirm: false,
                  onClose: () => {
                    that.getRequestes();
                  }
                });
              },
              function(error) {
                thata.uploadProgressSwal.close();
                thata.$swal({
                  imageUrl: "img/sadface.png",
                  imageWidth: 190,
                  imageHeight: 190,
                  title: "آپلود با خطا مواجه شد",
                  showConfirmButton: true,
                  confirmButtonText: "تایید"
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
          } else {
            thata.$swal({
              icon: "warning",
              title: "لطفا یک ویدیو انتخاب کنید",
              showConfirmButton: true,
              focusConfirm: false,
              confirmButtonText: "بستن"
            });
          }
        }
      });
      $("#cameo").on("change", function() {
        if ($(this).val() != "") {
          $(this)
            .prev()
            .css("background-color", "rgb(98, 161, 70)");
          $(this)
            .prev()
            .text(
              $("#cameo")
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
            .text("انتخاب کمیو:");
        }
      });
    },
    rejectcameo() {
      this.talentActionModalShow = false;
      this.rejectcameoModalShow = true;
      var that = this;
      setTimeout(function() {
        $('input[name="rejectreason"]').click(function() {
          if ($('input[name="rejectreason"]:checked').length !== 0) {
            $("#submitrejectbtn").removeAttr("disabled");
          } else {
            $("#submitrejectbtn").attr("disabled", "true");
          }
        });
      }, 1000);
    },
    submitReject() {
      var that = this;
      this.currentOrderDetails.rejectreason = "";
      if ($('input[name="rejectreason"]:checked').length !== 0) {
        $.each($('input[name="rejectreason"]:checked'), function(index, value) {
          that.currentOrderDetails.rejectreason += value.value;
          that.currentOrderDetails.rejectreason += " , ";
        });
      }
      if ($("#rejreason").val() != "") {
        this.currentOrderDetails.rejectreason += $("#rejreason").val();
      } else
        this.currentOrderDetails.rejectreason = this.currentOrderDetails.rejectreason.substr(
          0,
          that.currentOrderDetails.rejectreason.length - 3
        );
      webService.post(
        this.baseUrl + "requests/" + this.currentOrderDetails.rid + "/reject",
        {
          description: this.currentOrderDetails.rejectreason
        },
        {
          sctoken: this.$cookies.get("sctoken"),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          crossDomain: true
        },
        true,
        function(response) {
          that.$swal({
            icon: "warning",
            title: "درخواست رد شد",
            showConfirmButton: true,
            focusConfirm: false,
            confirmButtonText: "بستن"
          });
          that.rejectcameoModalShow = false;
          that.getRequestes();
        },
        function(error) {
          that.$swal({
            icon: "warning",
            title: "رد درخواست با خطا مواجه شد",
            showConfirmButton: true,
            focusConfirm: false,
            confirmButtonText: "بستن"
          });
        }
      );
    }
  },
  mounted() {
    var that = this;
    if (this.userStatus.isLoggedin) {
      if (this.allTalents.length == 0) {
        this.setTalents().then(res => {
          that.getRequestes();
        });
      } else {
        that.getRequestes();
      }
      if (this.$route.params && this.$route.params.activeSection) {
        this.activeSection = this.$route.params.activeSection;
      }
      if (this.userStatus.isLoggedin) {
        this.user = this.currentUser;
        this.defaultImage =
          this.baseUrl + "img/" + this.currentUser.profilepicture;
        if (this.userStatus.isTalent) {
          this.userlink = `https://localhost:8080/talent/?fname=${this.user.firstname}&lname=${this.user.lastname}`;
        }
      }
    } else {
      this.$router.push({
        name: "Login",
        params: { nextUrl: "Dashboard" }
      });
    }
  },
  watch: {
    userStatus: {
      handler: function(n, o) {
        if (this.userStatus.isLoggedin) {
          if (this.allTalents.length == 0) {
            this.setTalents().then(res => {
              this.getRequestes();
            });
          } else {
            this.getRequestes();
          }
          this.user = this.currentUser;
          this.defaultImage =
            this.baseUrl + "img/" + this.currentUser.profilepicture;
          if (this.userStatus.isTalent) {
            this.userlink = `https://localhost:8080/talent/?fname=${this.user.firstname}&lname=${this.user.lastname}`;
          }
        }
      },
      deep: true
    }
  }
};
</script>
<style scoped>
.dashboard {
  padding: 0px 20px;
  margin-top: 7em;
}
.right-menu {
  text-align: right;
}
.right-menu > ul > li > a {
  font-size: medium;
}
.right-menu-nav > li.active > a,
.right-menu-nav > li > ul > li.active > a {
  color: #f7a118 !important;
  font-size: 20x !important;
  font-weight: bold !important;
}
.right-menu > ul > li {
  padding: 0.2em;
}
.right-menu-nav {
  padding-right: 10px !important;
  border: 1px solid black;
  border-radius: 15px;
  padding-top: 5%;
  padding-bottom: 5%;
}
.profile-section {
  float: right;
  text-align: right;
}
.orders-table {
  text-align: right;
}
.link {
  direction: ltr;
}

#upload-demo {
  width: 250px;
  height: 250px;
  padding-bottom: 25px;
}

figure figcaption {
  position: absolute;
  bottom: 0;
  color: #fff;
  width: 100%;
  padding-left: 9px;
  padding-bottom: 5px;
  text-shadow: 0 0 10px #000;
}

.page-link {
  color: unset;
}

.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
  margin: 0 auto;
  margin-top: 1em;
}

.uploadbtn {
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
#table-append_info {
  color: white !important;
}
@media (max-width: 575px) {
  .dashboard-content {
    padding: 0 !important;
  }
}
@media (max-width: 991px) {
  .right-menu-nav {
    flex-direction: row;
    padding: 10px;
  }
}
</style>
<style>
.gambar {
  width: 60%;
  border-radius: 7em;
}
.table-curved {
  border-collapse: collapse;
  margin-left: 10px;
  text-align: center;
  width: 100%;
}
.table-curved tbody tr,
.table-curved thead tr {
  line-height: 30px;
}
.table-curved td:first-child,
.table-curved th:first-child {
  border-radius: 0 2em 2em 0;
  padding-right: 1em;
  direction: ltr;
}
.table-curved td:last-child,
.table-curved th:last-child {
  border-radius: 2em 0 0 2em;
  padding-left: 1em;
}
.table-curved th {
  padding: 3px 10px;
  border: none !important;
  background-color: #363636 !important;
  color: white !important;
  vertical-align: middle !important;
}
.table-curved td {
  padding: 0;
  border: none;
  line-height: 42px;
}
.table-curved > table > tbody > tr {
  color: white;
}

.table-curved > table {
  border-spacing: 0px 20px;
  border-collapse: separate !important;
}
.page-link {
  color: white;
}
.table-orange {
  background: #f7a118;
}
.table-green {
  background: #62a146;
}
.table-red {
  background: #bf4746;
}
.table-gray {
  background: #707070;
}
.table-blue {
  background: #0072bb;
}
.page-item:first-child .page-link {
  border-radius: 0 25px 25px 0;
}
.page-item:last-child .page-link {
  border-radius: 25px 0 0 25px;
}
.page-item {
  flex-grow: 0 !important;
}
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

.details-modal > .modal-dialog > .modal-content > .modal-body {
  padding: 0;
}
.detailsModal-header {
  font-size: 16px;
  display: block;
  border-radius: 0.5em 0.5em 0 0;
  text-align: right;
  height: 45px;
  padding: 10px;
  color: white;
  font-weight: 500;
}
.detailsModal-body {
  color: #757575;
  display: block;
}
.floatRight991 {
  float: left;
  font-size: 14px;
  font-weight: 600;
}
.en {
  font-family: IRANSansEn !important;
}
.detailsModal-body .t2 {
  width: 100%;
  padding: 0 2em 0.5em 0;
}
.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
  margin: 0 auto;
  margin-top: 1em;
}
.uploadbtn {
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
@media (max-width: 991px) {
  .table-curved tbody tr td:nth-child(2) {
    border-radius: 0 2em 2em 0;
  }
  .table-curved tbody tr td:nth-child(1) {
    display: none;
  }
  .table-curved thead tr th:nth-child(2) {
    border-radius: 0 2em 2em 0;
  }
  .table-curved thead tr th:nth-child(1) {
    display: none;
  }
}
@media (max-width: 767px) {
  .table-curved thead tr th:nth-child(5) {
    display: none;
  }
  .table-curved tbody tr td:nth-child(5) {
    display: none;
  }
}
@media (max-width: 575px) {
  .table-curved tbody tr td:nth-child(2) {
    display: none;
  }
  .table-curved tbody tr td:nth-child(3) {
    border-radius: 0 2em 2em 0;
  }
  .table-curved thead tr th:nth-child(2) {
    display: none;
  }
  .table-curved thead tr th:nth-child(3) {
    border-radius: 0 2em 2em 0;
  }
}
</style>
