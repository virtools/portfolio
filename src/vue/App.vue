<template>
  <div class="wrap">
    <div class="bg position-fixed d-block vw-100 vh-100">
      <canvas ref="canvas"></canvas>
    </div>
    <div class="content">
      <header class="sticky-top">
        <div class="navbar navbar-expand-md navbar-dark bg-dark shadow-sm">
          <div class="container d-flex justify-content-between">
            <a href="javascript:void(0);" class="navbar-brand d-flex align-items-center">
              <img :src="img_logo" class="img-thumbnail mr-2" />
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
              <a
                href="https://challenge.thef2e.com/"
                target="_blank"
                rel="nofollow noopener noreferrer"
              >The F2E - 第二屆 前端 & UI 修練精神時光屋</a>」
            </h6>
            <h6>一週挑戰一個修練主題，總計九週 (2019/7/4-2019/9/9)，可挑選「前端工程師」、「UI 設計師」的挑戰方向。</h6>
            <h6 class="my-4">
              <a
                class="btn btn-sm btn-outline-primary"
                role="button"
                href="https://challenge.thef2e.com/user/2241"
                target="_blank"
                rel="nofollow noopener noreferrer"
              >活動網站的作品</a>
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
  </div>
</template>
<script>
import img_logo from "@img/logo.png";
import {
  Rect,
  pushVector,
  triangulationCreate,
  voronoiCreate,
} from "@js/voronoi_diagram.js";
import Axios from "axios";
import Card from "@vue/components/card";
export default {
  name: "app",
  components: { Card },
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

    function resetPosList(quantity) {
      let posList = [];
      for (let i = 0; i < quantity; i++) {
        posList.push([Math.random() * cWidth, Math.random() * cHeight]);
      }
      return posList;
    }
    function drawPosList(ctx, posList, options) {
      options = options || {};
      options.fillStyle = options.fillStyle || "#ff0000";
      options.size = options.size || 1;
      options.pos = options.pos || [0, 0];
      ctx.fillStyle = options.fillStyle;
      posList.forEach(function (el, index) {
        ctx.beginPath();
        ctx.arc(
          el[0] + options.pos[0],
          el[1] + options.pos[1],
          options.size,
          0,
          2 * Math.PI
        );
        ctx.fill();
      });
    }
    function drawTriangulation(ctx, posList, triangleList, options) {
      options = options || {};
      options.strokeStyle = options.strokeStyle || "#ffff00";
      options.fillStyle = options.fillStyle || "";
      options.lineWidth = options.lineWidth || 1;
      options.pos = options.pos || [0, 0];
      ctx.strokeStyle = options.strokeStyle;
      ctx.lineWidth = options.lineWidth;
      ctx.fillStyle = options.fillStyle;

      triangleList.forEach(function (polygon) {
        ctx.beginPath();
        drawPolygon(
          ctx,
          polygon.points.map(function (el) {
            return pushVector(posList[el], options.pos);
          })
        );
        if (options.fillStyle !== "") {
          ctx.fill();
        }
        if (options.strokeStyle !== "") {
          ctx.stroke();
        }
      });
    }
    function drawVoronoi(ctx, polygonList, options) {
      options = options || {};
      options.strokeStyle = options.strokeStyle || "#0000ff";
      options.fillStyle = options.fillStyle || "";
      options.lineWidth = options.lineWidth || 1;
      options.pos = options.pos || [0, 0];
      ctx.strokeStyle = options.strokeStyle;
      ctx.lineWidth = options.lineWidth;
      ctx.fillStyle = options.fillStyle;

      polygonList.forEach(function (polygon, i) {
        ctx.beginPath();
        drawPolygon(
          ctx,
          polygon.map(function (el) {
            return pushVector(el, options.pos);
          })
        );
        if (options.fillStyle !== "") {
          ctx.fill();
        }
        if (options.strokeStyle !== "") {
          ctx.stroke();
        }
      });
    }
    function drawShell(ctx, posList, shell, options) {
      options = options || {};
      options.strokeStyle = options.strokeStyle || "#ff00ff";
      options.fillStyle = options.fillStyle || "";
      options.lineWidth = options.lineWidth || 1;
      options.pos = options.pos || [0, 0];
      ctx.strokeStyle = options.strokeStyle;
      ctx.lineWidth = options.lineWidth;
      ctx.fillStyle = options.fillStyle;

      ctx.beginPath();
      drawPolygon(
        ctx,
        shell.map(function (el) {
          return pushVector(posList[el], options.pos);
        })
      );
      ctx.stroke();
    }
    function drawPolygon(ctx, polygon) {
      if (polygon.length > 0) {
        ctx.moveTo(polygon[0][0], polygon[0][1]);
      }
      let index;
      for (let i = 0, len = polygon.length; i < len; i++) {
        index = (i + 1) % len;
        ctx.lineTo(polygon[index][0], polygon[index][1]);
      }
    }

    function calcVoronoi(posList) {
      triangulationData = triangulationCreate(posList);

      polygonList = voronoiCreate(
        posList,
        triangulationData.triangleList,
        triangulationData.shell,
        mainRect
      );
    }
    let canvas, ctx, cWidth, cHeight;
    canvas = this.$refs.canvas;
    ctx = canvas.getContext("2d");

    cWidth = canvas.width = window.innerWidth;
    cHeight = canvas.height = window.innerHeight;

    let mainRect = new Rect(0, 0, cWidth, cHeight);
    let posList;
    let triangulationData;
    let polygonList;

    function draw() {
      ctx.clearRect(0, 0, cWidth, cHeight);
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, cWidth, cHeight);
      drawVoronoi(ctx, polygonList, {
        strokeStyle: "rgba(240,240,240,1.0)",
        fillStyle: "rgba(255,255,255,1.0)",
      });
    }
    function init() {
      posList = resetPosList(1000);
      calcVoronoi(posList);
      draw();
    }
    const debounce = function (func, delay = 250) {
      let timeout = null;
      return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          func.apply(context, args);
        }, delay);
      };
    };
    function resize() {
      mainRect.width = cWidth = canvas.width = window.innerWidth;
      mainRect.height = cHeight = canvas.height = window.innerHeight;
      init();
    }

    init();
    window.addEventListener("resize", debounce(resize));

    let oldTime = Date.now();
    function animate() {
      requestAnimationFrame(animate);
      let nowTime = Date.now();
      let delta = (nowTime - oldTime) / 1000;
      oldTime = nowTime;
      /*posList.forEach((value) => {
        value[0] += 2 * Math.random() - 1;
        value[1] += 2 * Math.random() - 1;
      });
      calcVoronoi(posList);
      draw();*/
    }
    animate();
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
.content {
}
.bg {
  background-color: #fff;
  z-index: -1;
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
