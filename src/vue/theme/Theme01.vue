<template>
  <div class="wrap">
    <Bg></Bg>
    <div class="content">
      <header class="sticky-top">
        <div class="navbar navbar-expand-md navbar-dark bg-dark shadow-sm">
          <div class="container d-flex justify-content-between">
            <a
              href="javascript:void(0);"
              class="navbar-brand d-flex align-items-center"
            >
              <img :src="img_logo" class="img-thumbnail mr-2" />
              <strong>Portfolio</strong>
            </a>
          </div>
        </div>
      </header>
      <section>
        <div class="title-sticky container mt-4 p-3">
          <h3>前端修練精神時光屋-第二屆</h3>
        </div>
        <div class="container mt-4">
          <div class="my-4">
            <h6>
              由六角學院與Adobe XD Taiwan社群所舉辦的「
              <a
                href="https://challenge.thef2e.com/"
                target="_blank"
                rel="nofollow noopener noreferrer"
                >The F2E - 第二屆 前端 & UI 修練精神時光屋</a
              >」
            </h6>
            <h6>
              一週挑戰一個修練主題，總計九週
              (2019/7/4-2019/9/9)，可挑選「前端工程師」、「UI
              設計師」的挑戰方向。
            </h6>
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
            <div
              class="col-md-6 col-lg-4 col-xl-3"
              v-for="item in F2E_list"
              :key="item.id"
            >
              <Card
                :title="item.title"
                :content="item.content"
                :img_url="item.img_url"
                :code_url="item.code_url"
                :demo_url="item.demo_url"
              ></Card>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="title-sticky container mt-4 p-3">
          <h3>個人</h3>
        </div>
        <div class="container mt-4">
          <div class="row">
            <div
              class="col-md-6 col-lg-4 col-xl-3"
              v-for="item in personal_list"
              :key="item.id"
            >
              <Card
                :title="item.title"
                :content="item.content"
                :img_url="item.img_url"
                :code_url="item.code_url"
                :demo_url="item.demo_url"
                img_align="center center"
              ></Card>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div class="info d-flex align-items-end">
          <div class="container p-3">
            <div
              class="text-center d-flex justify-content-center align-items-center"
            >
              <div class="name">
                <i class="material-icons align-middle">person</i>
                <a class="align-middle">阿偉</a>
              </div>
              <div class="email ml-2">
                <i class="material-icons align-middle">email</i>
                <a class="align-middle" href="mailto:flashmx29403229@gmail.com"
                  >flashmx29403229@gmail.com</a
                >
              </div>
            </div>
          </div>
        </div>
      </footer>
      <!-- <div class="side"></div> -->
    </div>
  </div>
</template>
<script>
import img_logo from "@img/logo.png";

import Axios from "axios";
import Bg from "@vue/components/Bg";
import Card from "@vue/components/Card";
export default {
  name: "theme01",
  components: { Card, Bg },
  data() {
    return {
      F2E_list: [],
      personal_list: [],
      img_logo: img_logo,
    };
  },
  mounted() {
    Axios.get("dataList", { data: { filters: { tags: "F2E" } } }).then(
      (response) => {
        this.F2E_list = response.data;
      }
    );
    Axios.get("dataList", { data: { filters: { tags: "personal" } } }).then(
      (response) => {
        this.personal_list = response.data;
      }
    );
    /*.catch((error) => {
        throw new Error(error);
      });*/
  },
};
</script>
<!--<style scoped></style>-->
<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC&display=swap");

body {
  overflow-x: hidden;
}
.wrap {
  position: relative;
  /*background: url(https://cdn.jsdelivr.net/gh/frontendsophie/hexo-theme-autumn@1.0.0/source/img/button-bg.png)
    #f3f3f3;*/
}
.content {
  /* display: none; */
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
  min-height: 80px;
  /*background-color: #e0e5eb;
  border-top: 1px solid #cdd3da;*/
  background-color: rgba(255, 255, 255, 0.75);
  border-top: 1px solid #e3e8ec;
  color: #505050;
  font-size: 0.9rem;
}
.info i {
  font-size: 0.95rem;
}
.info a {
  color: #505050;
  text-decoration: none;
}
.info a[href]:hover {
  color: #2373a1;
  text-decoration: underline;
}
.title-sticky {
  /*position: sticky;
  top: 56px;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.2);
  text-shadow: 0px 0px 5px #fff;*/
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
