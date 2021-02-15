<template>
  <div class="callback">
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
          <img :src="require('../../assets/img/paylogo.png')" alt="paylogo" />
        </div>
        <div class="row factorsection">
          <span> تاریخ: {{ new Date() | moment("jYYYY/jMM/jDD") }} </span>
          <span class="en">
            شماره درخواست:
            {{ currentOrder.reqnumber }}
          </span>
          <span>
            درخواست کننده:
            {{ currentOrder.fromuser }}
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
          <span>
            وضعیت:
            {{ currentOrder.statusMessage }}
          </span>
          <span v-show="!currentOrder.status">
            پیغام:
            {{ currentOrder.message }}
          </span>
          <span v-show="currentOrder.status">
            شماره فاکتور:
            {{ currentOrder.factornumber }}
          </span>
        </div>
        <div class="row factorsection factorfooter">
          <button
            class="btn-primary backbutton"
            @click="
              $router.push({
                name: 'Dashboard',
                params: { activeSection: 'orders' }
              })
            "
          >
            بازگشت به داشبورد
          </button>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
import * as $ from "jquery";
import * as webService from "../../services/webService";
export default {
  name: "Callback",
  data() {
    return {
      baseUrl: process.env.VUE_APP_API_URL,
      currentOrder: [],
      orderPayModalShow: false
    };
  },
  methods: {
    showFactor(order, status) {
      // rid = "88cece7c-03ed-40d5-899c-9e90327cb843";
      this.currentOrder = [];
      var that = this;
      this.currentOrder.factornumber = order.factornumber;
      this.currentOrder.message = order.message;
      if (order.rid && order.rid.length != 0) {
        this.currentOrder.reqnumber =
          "SC-" + order.rid.substr(order.rid.length - 5, 5);
      }
      this.currentOrder.talnetname = order.talentname;
      this.currentOrder.fromuser = order.fromuser;
      this.currentOrder.price =
        (order.price * 10).toLocaleString() + "  " + "ریال";
      this.currentOrder.statusMessage = status ? "موفقیت آمیز" : "ناموفق";
      this.currentOrder.status = status;
      this.orderPayModalShow = true;
    }
  },
  mounted() {
    var that = this;
    var urlParams = new URLSearchParams(window.location.search);
    var gateway = urlParams.get("gateway");
    var request = urlParams.get("request");
    var status = urlParams.get("status");
    var token = urlParams.get("token");
    var tref = urlParams.get("tref");
    var In = urlParams.get("in");
    var id = urlParams.get("id");
    var param = {};
    if (gateway == "payir") {
      param = {
        gateway: gateway,
        request: request,
        status: status,
        token: token
      };
    } else if (gateway == "pep") {
      param = {
        gateway: gateway,
        request: request,
        tref: tref,
        in: In,
        id: id
      };
    } else {
      param = {
        request: request,
        status: status,
        token: token
      };
    }
    webService.get(
      this.baseUrl + "requests/verify",
      param,
      {},
      true,
      function(response) {
        if (response.data.status == "success") {
          if (response.data.data.message == "Payment was successful.") {
            that.showFactor(response.data.data, true);
          } else {
            that.showFactor(response.data.data, false);
          }
        }
      },
      function(error) {
        if (error.data) {
          var err = error.data.message;
          if (err == "Unsuccessful payment.") {
            that.$swal({
              imageUrl: "img/sadface.png",
              imageWidth: 190,
              imageHeight: 190,
              title: "پرداخت ناموفق",
              showConfirmButton: true,
              focusConfirm: false,
              confirmButtonText: "بازگشت به پنل کاربری",
              onClose: () => {
                that.$router.push({
                  name: "Dashboard",
                  params: { activeSection: "orders" }
                });
              }
            });
          } else if (err == "Already paid!") {
            that.$swal({
              imageUrl: "img/sadface.png",
              imageWidth: 190,
              imageHeight: 190,
              title: "این فاکتور قبلا پرداخت شده است",
              showConfirmButton: true,
              focusConfirm: false,
              confirmButtonText: "بازگشت به پنل کاربری",
              onClose: () => {
                that.$router.push({
                  name: "Dashboard",
                  params: { activeSection: "orders" }
                });
              }
            });
          }
          if (err == "Request not found.") {
            that.$swal({
              imageUrl: "img/sadface.png",
              imageWidth: 190,
              imageHeight: 190,
              title: "درخواست مورد نظر یافت نشد",
              showConfirmButton: true,
              focusConfirm: false,
              confirmButtonText: "بازگشت به پنل کاربری",
              onClose: () => {
                that.$router.push({
                  name: "Dashboard",
                  params: { activeSection: "orders" }
                });
              }
            });
          }
        } else {
          that.$swal({
            imageUrl: "img/sadface.png",
            imageWidth: 190,
            imageHeight: 190,
            title: "پرداخت نا موفق. لطفا با پشتیبانی تماس بگیرید.",
            showConfirmButton: true,
            focusConfirm: false,
            confirmButtonText: "بازگشت به پنل کاربری",
            onClose: () => {
              that.$router.push({
                name: "Dashboard",
                params: { activeSection: "requests" }
              });
            }
          });
        }
      }
    );
  }
};
</script>
<style>
.modal-body {
  display: flex;
  padding: 36px 20%;
  text-align: center;
  position: relative;
  flex: 1 1 auto;
}
.factor-modal > .modal-dialog > .modal-content {
  border-radius: 0.6em;
  background-color: rgb(245, 245, 245);
  justify-content: center;
  color: #545454;
}
</style>
<style scoped>
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
.backbutton {
  margin-top: 0.5em;
  border-radius: 25px;
  width: 147px;
  height: 32px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  background-color: #0072bb;
}
</style>
