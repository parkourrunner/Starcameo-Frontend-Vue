import axios from "axios";
import * as webService from "./webService";
var baseURL = process.env.VUE_APP_API_URL;

const checklogin = function(token, callback, errorback) {
  webService.get(
    baseURL + "user",
    {},
    {
      scbeta: "somesecretshitforthebetaapi",
      sctoken: token,
      platform: "web"
    },
    true,
    result => {
      if (callback) {
        callback(result.data.data);
      } else {
        return result.data.data;
      }
    },
    error => {
      if (error.response) {
        if (error.response.data.status == "fail") {
          error.response.data = error.response.data.data;
        }
      }
      if (errorback) {
        if (error.response) {
          errorback(error.response);
        } else {
          errorback(error);
        }
      }
      return error;
    }
  );
};

const login = async function(phone, password, callback, errorback) {
  var requestUrl = baseURL + "signin";
  var postedDataJson = JSON.stringify({
    phonenumber: phone,
    password: password,
    platform: "web"
  });
  await axios
    .post(requestUrl, postedDataJson, {
      headers: {
        scbeta: "somesecretshitforthebetaapi",
        "content-type": "application/json",
        "data-type": "json",
        "cross-domain": true
      }
    })
    .then(response => {
      if (callback) {
        callback(response.data);
      }
      return true;
    })
    .catch(error => {
      if (error.response.data.status == "fail") {
        error.response.data = error.response.data.data;
      }
      if (errorback) {
        errorback(error.response);
      }
      return false;
    });
};

const getUser = function() {
  var that = this;
  var token = this.$cookies.get("sctoken");
  webService.get(
    baseURL + "user",
    {},
    {
      scbeta: "somesecretshitforthebetaapi",
      sctoken: token,
      platform: "web"
    },
    true,
    function(response) {
      if (response.data.data.onrest) {
        that.$cookies.set("talent", "1");
      } else {
        that.$cookies.set("talent", "0");
      }
    },
    function(error) {
      if (error.response.data.status == "fail") {
        error.response.data = error.response.data.data;
      }
    }
  );
};

const logout = function(params) {};

export { checklogin, login, logout, getUser };
