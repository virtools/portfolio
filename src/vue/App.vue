<template>
  <div class="wrap">
    <div class="bg position-fixed d-block vw-100 vh-100">
      <canvas id="canvas01" ref="canvas01"></canvas>
      <canvas id="canvas02" ref="canvas02"></canvas>
    </div>
    <div class="content">
      <header class="sticky-top">
        <div class="navbar navbar-expand-md navbar-dark bg-dark shadow-sm">
          <div class="container d-flex justify-content-between">
            <a href="javascript:void(0);" class="navbar-brand d-flex align-items-center">
              <!-- <img :src="img_logo" class="img-thumbnail mr-2" /> -->
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
  setShadow,
  clearShadow,
  Rect,
  pushVector,
  getDistance,
  toPosRate,
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

      polygon = voronoiCreate(
        posList,
        triangulationData.triangleList,
        triangulationData.shell,
        mainRect
      );
      polygonList = polygon.polygonListShow;
    }
    let canvas01, ctx01, canvas02, ctx02, cWidth, cHeight;
    canvas01 = this.$refs.canvas01;
    ctx01 = canvas01.getContext("2d");
    canvas02 = this.$refs.canvas02;
    ctx02 = canvas02.getContext("2d");

    cWidth = canvas01.width = canvas02.width = window.innerWidth;
    cHeight = canvas01.height = canvas02.height = window.innerHeight;

    let mainRect = new Rect(0, 0, cWidth, cHeight);
    let posList;
    let triangulationData;
    let polygonList;
    let polygon;

    let lineLink;

    function draw(ctx) {
      ctx.clearRect(0, 0, cWidth, cHeight);
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, cWidth, cHeight);
      drawVoronoi(ctx, polygonList, {
        strokeStyle: "rgba(230,230,230,1.0)",
        //strokeStyle: "rgba(200,200,200,1.0)",
        fillStyle: "rgba(255,255,255,1.0)",
      });

      /*ctx.fillStyle = "#ff0000";
      lineLink[0].forEach((value, index) => {
        let p = polygon.polygonPosList[value];
        ctx.beginPath();
        ctx.arc(p[0], p[1], 5, 0, 2 * Math.PI, false);
        ctx.fill();
      });*/
    }
    function init() {
      posList = resetPosList(1000);
      calcVoronoi(posList);
      lineLink = [];
      polygon.polygonIndexList.forEach((indexList) => {
        for (let i = 0; i < indexList.length; i++) {
          if (!lineLink[indexList[i]]) {
            lineLink[indexList[i]] = [];
          }
          let data;
          data = indexList[(i - 1 + indexList.length) % indexList.length];
          if (!lineLink[indexList[i]].some((value) => value === data)) {
            lineLink[indexList[i]].push(data);
          }
          data = indexList[(i + 1) % indexList.length];
          if (!lineLink[indexList[i]].some((value) => value === data)) {
            lineLink[indexList[i]].push(data);
          }
        }
      });
      draw(ctx01);

      time = 0;
      interval = 0.05;
      totalDistance = 0;
      /*moveIndexList = [];
      addMoveIndex(moveIndexList);
      addMoveIndex(moveIndexList, moveIndexList[moveIndexList.length - 1]);
      addMoveIndex(moveIndexList, moveIndexList[moveIndexList.length - 1]);
      addMoveIndex(moveIndexList, moveIndexList[moveIndexList.length - 1]);
      addMoveIndex(moveIndexList, moveIndexList[moveIndexList.length - 1]);
      addMoveIndex(moveIndexList, moveIndexList[moveIndexList.length - 1]);*/
      for (let i = 0; i < moveIndexListG.length; i++) {
        moveIndexListG[i] = [];
        addMoveIndex(moveIndexListG[i]);
        addMoveIndex(
          moveIndexListG[i],
          moveIndexListG[i][moveIndexListG[i].length - 1]
        );
        addMoveIndex(
          moveIndexListG[i],
          moveIndexListG[i][moveIndexListG[i].length - 1]
        );
        addMoveIndex(
          moveIndexListG[i],
          moveIndexListG[i][moveIndexListG[i].length - 1]
        );
        addMoveIndex(
          moveIndexListG[i],
          moveIndexListG[i][moveIndexListG[i].length - 1]
        );
        addMoveIndex(
          moveIndexListG[i],
          moveIndexListG[i][moveIndexListG[i].length - 1]
        );
      }
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
      mainRect.width = cWidth = canvas01.width = canvas02.width =
        window.innerWidth;
      mainRect.height = cHeight = canvas01.height = canvas02.height =
        window.innerHeight;
      init();
    }

    let oldTime = Date.now();
    let moveIndexListG = [];
    //let moveIndexList;
    let time;
    let interval;
    let totalDistance;
    let maxDistance = 300;
    for (let i = 0; i < 5; i++) {
      moveIndexListG.push([]);
    }

    function addMoveIndex(moveIndexList, index = -1) {
      for (let i = 0; i < 10; i++) {
        let num =
          index === -1
            ? Math.floor(Math.random() * polygon.polygonPosList.length)
            : lineLink[index][
                Math.floor(Math.random() * lineLink[index].length)
              ];
        if (!moveIndexList.some((value) => value === num)) {
          moveIndexList.push(num);
          return;
        }
      }
    }
    function animate() {
      requestAnimationFrame(animate);
      let nowTime = Date.now();
      let delta = (nowTime - oldTime) / 1000;
      oldTime = nowTime;

      time += delta;
      if (time >= interval) {
        time %= interval;

        /*addMoveIndex(moveIndexList, moveIndexList[moveIndexList.length - 1]);
        moveIndexList.shift();*/
        for (let i = 0; i < moveIndexListG.length; i++) {
          addMoveIndex(
            moveIndexListG[i],
            moveIndexListG[i][moveIndexListG[i].length - 1]
          );
          moveIndexListG[i].shift();
        }
      }

      //ctx02.clearRect(0, 0, cWidth, cHeight);
      ctx02.save();
      ctx02.globalCompositeOperation = "destination-out";
      ctx02.fillStyle = "rgba(0,0,0,0.1)";
      ctx02.fillRect(0, 0, cWidth, cHeight);
      ctx02.clip();
      ctx02.restore();

      ctx02.globalCompositeOperation = "source-over";
      ctx02.lineWidth = 1;
      ctx02.fillStyle = "none";
      ctx02.strokeStyle = "rgba(150,200,200,0.75)";
      ctx02.lineJoin = "round";
      ctx02.lineCap = "round";

      ctx02.beginPath();
      setShadow(ctx02, 0, 0, 5, "rgba(200,250,250,0.2)");

      for (let i = 0; i < moveIndexListG.length; i++) {
        moveIndexListG[i].forEach((value, index, array) => {
          let p = polygon.polygonPosList[value];
          if (index == 0) {
            let p1 = polygon.polygonPosList[array[(index + 1) % array.length]];
            let p2 = toPosRate(p, p1, time / interval);
            ctx02.moveTo(p2[0], p2[1]);
          } else if (index == array.length - 1) {
            let p1 =
              polygon.polygonPosList[
                array[(index - 1 + array.length) % array.length]
              ];
            let p2 = toPosRate(p, p1, 1 - time / interval);
            ctx02.lineTo(p2[0], p2[1]);
          } else {
            ctx02.lineTo(p[0], p[1]);
          }
        });
        ctx02.stroke();
      }
      clearShadow(ctx02);
    }
    window.addEventListener("resize", debounce(resize));
    resize();
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
  /* display: none; */
}
.bg {
  background-color: #fff;
  z-index: -1;
}
#canvas01,
#canvas02 {
  position: absolute;
  display: block;
  left: 0px;
  top: 0px;
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
