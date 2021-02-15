<template>
  <section class="section_gap">
    <div class="container">
      <h1 class="mb-30">
        <b>تماس با استارکمیو</b>
      </h1>
      <p>
        کاربر گرامی شما می توانید جهت ارائه هرگونه پیشنهاد یا انتقاد از طریق
        ایمیل
        <a
          href="mailto:info@starcameo.ir"
          style="color: #3333ff !important; border-bottom: 1px blue solid;"
          >info@starcameo.ir</a
        >
        با ما در ارتباط باشید.
      </p>
      <p>
        همچنین می توانید برای پیگیری درخواست های خود از طریق ایمیل
        <a
          href="mailto:support@starcameo.ir"
          style="color: #3333ff !important; border-bottom: 1px blue solid;"
          >support@starcameo.ir</a
        >
        اقدام نمایید .
      </p>
      <p>
        آدرس : تهران ،خیابان مطهری ، تقاطع سهروردی ، پلاک 94 ، ساختمان شناسا
      </p>
      <p>تلفن : 41087174-021</p>
    </div>
  </section>
</template>
<script>
export default {
  name: "Contact",
  data() {
    return {};
  }
};
</script>
<style scoped>
p {
  font-size: 20px !important;
  line-height: 1.9em;
  margin-bottom: 30px;
}
.section_gap {
  padding: 120px 0;
}
.container {
  text-align: justify;
}
.container > h1 {
  padding-bottom: 2%;
  color: white;
}
@media (max-width: 991px) {
  .section_gap {
    padding: 80px 0;
    margin-top: 71px;
  }
}
.mb-30 {
  margin-bottom: 30px;
}
</style>
