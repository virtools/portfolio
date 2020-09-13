<template>
  <div class="wrap">
    <header class="sticky-top">
      <div class="navbar navbar-expand-md navbar-dark bg-dark shadow-sm">
        <div class="container d-flex justify-content-between">
          <a href="javascript:void(0);" class="navbar-brand d-flex align-items-center">
            <!-- <img src="./img/logo.png" class="img-thumbnail mr-2" /> -->
            <strong>Portfolio</strong>
          </a>
        </div>
      </div>
    </header>
    <section>
      <div class="container mt-4">
        <h3>前端修練精神時光屋-第二屆</h3>
        <div class="my-4">
          <h6>
            由六角學院與Adobe XD Taiwan社群所舉辦的「
            <a href="https://challenge.thef2e.com/" target="_blank" rel="nofollow noopener noreferrer"
              >The F2E - 第二屆 前端 & UI 修練精神時光屋</a
            >」
          </h6>
          <h6>一週挑戰一個修練主題，總計九週 (2019/7/4-2019/9/9)，可挑選「前端工程師」、「UI 設計師」的挑戰方向。</h6>
          <h6 class="my-4">
            <a
              class="btn btn-sm btn-outline-primary"
              role="button"
              href="https://challenge.thef2e.com/user/2241"
              target="_blank"
              rel="nofollow noopener noreferrer"
              >活動網站的作品</a
            >
          </h6>
        </div>
      </div>
      <div class="container mt-4">
        <div class="row">
          <div class="col-md-6 col-lg-4 col-xl-3" v-for="item in F2E_list" :key="item.id">
            <card
              :title="item.title"
              :content="item.content"
              :img_url="item.img_url"
              :code_url="item.code_url"
              :demo_url="item.demo_url"
            ></card>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container mt-4">
        <h3>個人</h3>
      </div>
      <div class="container mt-4">
        <div class="row">
          <div class="col-md-6 col-lg-4 col-xl-3" v-for="item in personal_list" :key="item.id">
            <card
              :title="item.title"
              :content="item.content"
              :img_url="item.img_url"
              :code_url="item.code_url"
              :demo_url="item.demo_url"
              img_align="center center"
            ></card>
          </div>
        </div>
      </div>
    </section>
    <footer>
      <div class="info"></div>
    </footer>
    <!-- <div class="side"></div> -->
  </div>
</template>
<script>
import Axios from "axios";
import Card from "@vue/components/card";
export default {
  name: "app",
  components: { Card },
  data() {
    return {
      F2E_list: [],
      personal_list: [],
    };
  },
  mounted() {
    Axios.get("dataList", { data: { filters: { tags: "F2E" } } }).then((response) => {
      this.F2E_list = response.data;
    });
    Axios.get("dataList", { data: { filters: { tags: "personal" } } }).then((response) => {
      this.personal_list = response.data;
    });
    /*.catch((error) => {
        throw new Error(error);
      });*/
  },
};
</script>
<!--<style scoped></style>-->
<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC&display=swap");
* {
  font-family: "Noto Sans TC", var(--font-family-sans-serif);
}
.wrap {
  position: relative;
  /*background: url(https://cdn.jsdelivr.net/gh/frontendsophie/hexo-theme-autumn@1.0.0/source/img/button-bg.png)
    #f3f3f3;*/
}
.side {
  position: absolute;
  display: block;
  width: 100px;
  height: 100%;
  background-color: #eee;
  right: 0px;
  top: 0px;
}
.img {
  display: block;
  padding-bottom: 52%;
  background-color: #ddd;
  background-size: cover;
}
.navbar {
  background-image: url(~@img/navbar_bg.png);
  background-size: 300px;
  background-position: center top;
}
.info {
  min-height: 150px;
  background-color: #e0e5eb;
  border-top: 1px solid #cdd3da;
}
@media (min-width: 576px) {
}
@media (min-width: 768px) {
  .img {
    padding-bottom: 52%;
  }
}
@media (min-width: 992px) {
  .img {
    padding-bottom: 70%;
  }
}
@media (min-width: 1200px) {
  .img {
    padding-bottom: 80%;
  }
}
</style>
