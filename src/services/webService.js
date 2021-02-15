import axios from "axios";
import store from "../store/index";

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
// axios.defaults.headers['Access-Control-Allow-Origin'] = process.env.VUE_APP_API_URL;

axios.interceptors.response.use(response => {
  return response;
});

const get = async function(
  url,
  params = {},
  headers = {},
  overlay,
  callback = null,
  onerror = null,
  otherConfigs = null
) {
  try {
    var head = {
      "Access-Control-Allow-Origin": "*",
      scbeta: "somesecretshitforthebetaapi",
      platform: "web"
    };
    var par = {};
    if (Object.keys(headers).length != 0) {
      head = { ...head, ...headers };
    }
    if (Object.keys(params).length != 0) {
      par = { ...par, ...params };
    }
    let config = {
      headers: head,
      params: par
    };

    if (otherConfigs) {
      config = { ...config, ...otherConfigs };
    }
    if (overlay) {
      store.commit("SET_OVERLAY", true);
    }
    var result = await axios
      .get(url, config)
      .then(result => {
        if (overlay) {
          store.commit("SET_OVERLAY", false);
        }
        if (callback) {
          callback(result);
        } else {
          return result;
        }
      })
      .catch(error => {
        if (overlay) {
          store.commit("SET_OVERLAY", false);
        }
        if (error.response.data.status == "fail") {
          error.response.data = error.response.data.data;
        }
        if (onerror) {
          onerror(error.response);
        } else {
          exceptionHandler(error);
          return error;
        }
      });
  } catch (e) {
    return null;
  }
};

const post = async function(
  url,
  data = null,
  headers = {},
  overlay,
  callback = null,
  onerror = null,
  otherConfigs = null
) {
  try {
    var head = {
      "Access-Control-Allow-Origin": "*",
      scbeta: "somesecretshitforthebetaapi",
      platform: "web"
    };
    if (Object.keys(headers).length != 0) {
      head = { ...head, ...headers };
    }
    let config = {
      headers: head
    };
    if (otherConfigs) {
      config = { ...config, ...otherConfigs };
    }
    if (overlay) {
      store.commit("SET_OVERLAY", true);
    }
    var result = await axios
      .post(url, data, config)
      .then(result => {
        if (overlay) {
          store.commit("SET_OVERLAY", false);
        }
        if (callback) {
          callback(result.data);
        } else {
          return result.data;
        }
      })
      .catch(error => {
        if (overlay) {
          store.commit("SET_OVERLAY", false);
        }
        if (error.response.data.status == "fail") {
          error.response.data = error.response.data.data;
        }
        if (onerror) {
          onerror(error.response);
        } else {
          exceptionHandler(error);
          return error;
        }
      });
  } catch (e) {
    return null;
  }
};

const exceptionHandler = function(error) {
  if (error.response.data.status == "fail") {
    error.response.data = error.response.data.data;
  }
  if (error.response.status === 401) {
    console.error("Unauthorized");
  } else if (error.response.status === 403) {
    console.error("Unauthorized");
  } else if (error.response.status === 404) {
    console.error("URL Not Found");
  } else if (error.response.status < 600 && error.response.status >= 500) {
    console.error("SERVER Error");
  } else {
    console.error(error.response.status, error.response.data.message);
  }
};
export { get, post };
