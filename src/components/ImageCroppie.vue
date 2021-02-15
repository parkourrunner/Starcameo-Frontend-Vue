<template>
  <label class="cabinet">
    <figure>
      <img
        :src="defaultImage"
        class="gambar img-thumbnail"
        id="item-img-output"
        alt="imageOutput"
        @click="emitUpload"
      />
      <figcaption @click="emitUpload">
        <i class="fa fa-camera"></i>
      </figcaption>
    </figure>
    <div class="wrap">
      <div class="container">
        <vodal
          :show="show"
          animation="fade"
          @hide="show = false"
          :height="412"
          :width="300"
        >
          <div class="vodal-header"></div>
          <div class="vodal-body">
            <div id="croppie"></div>
          </div>
          <div class="vodal-footer">
            <button type="button" class="btn btn-default" @click="show = false">
              {{ cancelButtonText }}
            </button>
            <button class="vodal-confirm-btn" @click="cropImage">
              {{ okButtonText }}
            </button>
          </div>
          <input
            type="file"
            class="item-img file"
            ref="upload"
            value="Choose a file"
            style="display:none"
            accept="image/*"
            v-on:input="setUpFileUploader"
          />
        </vodal>
      </div>
    </div>
  </label>
</template>
<script>
import Croppie from "croppie";
import Vodal from "vodal";

export default {
  props: {
    defaultImage: {
      type: String,
      default: ""
    },
    croppedImage: {
      type: Blob,
      default: null
    },
    pictureName: {
      type: String,
      default: ""
    },
    height: {
      type: Number,
      default: 200
    },
    circle: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 200
    },
    okButtonText: {
      type: String,
      default: "تایید"
    },
    cancelButtonText: {
      type: String,
      default: "لغو"
    },
    onConfirm: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      croppie: null,
      image: null,
      show: false,
      uploadedPictureName: ""
    };
  },
  mounted() {
    this.$on("imgUploaded", function(imageData) {
      this.croppie.destroy();
      this.image = imageData;
      this.setUpCroppie();
    });
    this.image = this.defaultImage;
    this.setUpCroppie();
  },
  methods: {
    showModal() {
      this.show = true;
    },
    hide() {
      this.show = false;
    },
    emitUpload() {
      this.$refs.upload.click();
    },
    cropImage() {
      this.croppie
        .result({
          type: "base64",
          format: "jpeg",
          size: {
            width: 500,
            height: 500
          }
        })
        .then(response => {
          this.image = response;
          this.$emit("update:defaultImage", response);
          const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
            const byteCharacters = atob(b64Data);
            const byteArrays = [];
            for (
              let offset = 0;
              offset < byteCharacters.length;
              offset += sliceSize
            ) {
              const slice = byteCharacters.slice(offset, offset + sliceSize);

              const byteNumbers = new Array(slice.length);
              for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
              }

              const byteArray = new Uint8Array(byteNumbers);
              byteArrays.push(byteArray);
            }

            const blob = new Blob(byteArrays, {
              type: contentType
            });
            return blob;
          };
          const contentType = "image/jpg";
          const b64Data = response.slice(23);
          const blob = b64toBlob(b64Data, contentType);
          this.$emit("update:croppedImage", blob);
          this.$emit("update:pictureName", this.uploadedPictureName);
          if (this.onConfirm != null) {
            this.onConfirm(blob);
          }
          this.hide();
        });
    },
    setUpCroppie() {
      let el = document.getElementById("croppie");
      this.croppie = new Croppie(el, {
        viewport: {
          width: this.width,
          height: this.height,
          type: this.circle ? "circle" : "square"
        },
        showZoomer: true,
        enableOrientation: true,
        enforceBoundary: false,
        enableExif: true
      });
      this.croppie.bind({
        url: this.image
      });
    },
    setUpFileUploader(e) {
      this.showModal();
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      this.uploadedPictureName = files[0].name;
      this.createImage(files[0]);
      e.target.value = "";
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm.image = e.target.result;
        vm.$emit("imgUploaded", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  },
  components: {
    Vodal
  }
};
</script>
<style src="croppie/croppie.css"></style>
<style>
@import "~vodal/common.css";
html {
  font-family: "Open Sans", sans-serif;
}
a {
  text-decoration: none;
  background-color: transparent;
}
a:hover {
  outline: 0;
  text-decoration: none;
}
a:focus {
  outline: none;
  text-decoration: none;
}
button {
  color: inherit;
  font: inherit;
  margin: 0;
  overflow: visible;
  text-transform: none;
  -webkit-appearance: button;
  cursor: pointer;
}
button:focus {
  outline: none;
}
button::-moz-focus-inner,
input::-moz-focus-inner {
  border: 0;
  padding: 0;
}
/* -- container -- */
#app,
.wrap {
  height: 100%;
}
.wrap > div {
  width: 100%;
  text-align: center !important;
}
.btn-area {
  width: 600px;
  margin: 0 auto;
}
/* -- scale animation -- */
@keyframes scale {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
}
.scale {
  animation: scale both 0.4s cubic-bezier(0.4, 0, 0, 1.5);
}
/* -- btn -- */
.btn:hover {
  box-shadow: 0 0 50px rgba(255, 255, 255, 0.3);
}
.btn:active {
  box-shadow: 0 0 50px rgba(255, 255, 255, 0.3),
    inset 2px 2px 2px rgba(0, 0, 0, 0.2), 0 0 1px rgba(0, 0, 0, 0);
}
@media (max-width: 600px) {
  .container {
    padding-top: 30px !important;
  }
  .title {
    font-size: 40px;
  }
  .intro {
    font-size: 20px;
  }
  .btn {
    width: 35%;
    font-size: 16px;
    line-height: 34px;
    margin: 10px 0 10px 10%;
  }
  .btn-area {
    width: 100%;
  }
}
/* -- title -- */
.vodal-header {
  font-size: 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e9e9e9;
}
/* -- body -- */
.vodal-body {
  padding-top: 15px;
}
/** -- footer -- */
.vodal-footer {
  text-align: center;
}
/* -- button -- */
.vodal-open-btn {
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
.vodal-cancel-btn,
.vodal-confirm-btn {
  font: inherit;
  bottom: 16px;
  padding: 4px 15px;
  border-radius: 3px;
  transition: background 0.2s;
  border: 1px solid #03a9f4;
}
.vodal-confirm-btn {
  color: #fff;
  background: #03a9f4;
}
.vodal-confirm-btn:hover {
  background: #0098e3;
}
.vodal-cancel-btn {
  color: #03a9f4;
  background: #fff;
}
.vodal-cancel-btn:hover {
  background: #fafafa;
}
.vodal-cancel-btn:focus,
.vodal-confirm-btn:focus {
  outline: none;
}
.vodal-confirm-btn:active {
  background: #0087d2;
}
.vodal-cancel-btn:active {
  background: #fafafa;
  box-shadow: inset 1px 1px 1px rgba(0, 0, 0, 0.2), 0 0 1px transparent;
}
.croppie-container {
  width: initial;
  height: initial;
}
label.cabinet {
  display: block;
}
label.cabinet input.file {
  position: relative;
  height: 0;
  width: auto;
  opacity: 0;
  -moz-opacity: 0;
  filter: progid: DXImageTransform.Microsoft.Alpha(opacity=0);
  margin-top: -30px;
}
.gambar {
  width: 50%;
  cursor: pointer;
}
figure figcaption {
  position: absolute;
  bottom: 0;
  color: #fff;
  width: 100%;
  padding-left: 9px;
  padding-bottom: 5px;
  text-shadow: 0 0 10px #000;
  cursor: pointer;
}
.vodal {
  overflow-x: hidden;
  overflow-y: auto;
}
.vodal-mask {
  background: transparent;
}
.vodal-dialog {
  max-width: 300px !important;
  position: relative;
  margin: 1.75rem auto;
  padding: 15px 15px 0 15px;
}
.vodal-header {
  display: flex;
  -ms-flex-align: start;
  align-items: flex-start;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 1rem 1rem;
  border-bottom: 1px solid #e9ecef;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
}
.vodal-body {
  position: relative;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 1rem;
}
#croppie {
  width: 250px;
  height: 250px;
  padding-bottom: 25px;
  margin: 0 auto;
}
.vodal-footer {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: end;
  padding: 1rem;
  border-top: 1px solid #e9ecef;
  border-bottom-right-radius: 0.3rem;
  border-bottom-left-radius: 0.3rem;
  justify-content: flex-start !important;
}
</style>
