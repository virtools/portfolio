<template>
  <div class="bg position-fixed d-block vw-100 vh-100">
    <canvas id="canvas01" ref="canvas01"></canvas>
    <canvas id="canvas02" ref="canvas02"></canvas>
  </div>
</template>
<script>
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
export default {
  name: "bg",

  mounted() {
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
    let colorList = [];
    let lifeTime = [];

    for (let i = 0; i < 5; i++) {
      moveIndexListG.push([]);
      colorList.push(Math.random() * 360);
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
        /*color += 5 - Math.random() * 10;
        color = (color + 360) % 360;*/

        for (let i = 0; i < colorList.length; i++) {
          //colorList[i] += 5 - Math.random() * 10;
          //colorList[i] = (colorList[i] + 360) % 360;
          colorList[i] += Math.random() * 10;
          colorList[i] %= 360;
        }
      }

      //ctx02.clearRect(0, 0, cWidth, cHeight);
      ctx02.save();
      ctx02.globalCompositeOperation = "destination-out";
      ctx02.fillStyle = "rgba(0,0,0,0.1)";
      ctx02.fillRect(0, 0, cWidth, cHeight);
      //ctx02.clip();
      ctx02.restore();

      ctx02.globalCompositeOperation = "source-over";
      ctx02.lineWidth = 1;
      ctx02.fillStyle = "none";
      //ctx02.strokeStyle = "rgba(100,240,240,0.75)";
      ctx02.lineJoin = "round";
      ctx02.lineCap = "round";

      ctx02.beginPath();
      //setShadow(ctx02, 0, 0, 5, "rgba(200,250,250,0.2)");

      for (let i = 0; i < moveIndexListG.length; i++) {
        ctx02.strokeStyle = `hsla(${colorList[i]},100%,75%,0.85)`;
        setShadow(ctx02, 0, 0, 5, `hsla(${colorList[i]},100%,65%,0.1)`);
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
<style scoped>
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
</style>
