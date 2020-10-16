import "material-design-icons/iconfont/material-icons.css";
import Vue from "vue";
import "bootstrap/dist/css/bootstrap.css";
import App from "./vue/App";
import Mock from "mockjs";

const app = new Vue({
  el: "#app",
  render: (h) => h(App),
});
const guid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
import dataList from "./res/data";
dataList.forEach((el) => (el.id = guid()));
Mock.setup({
  timeout: "50-150",
});
Mock.mock("dataList", "get", (data) => {
  if (data.body) {
    let list = dataList.filter((el) => !(el["visibility"] && el["visibility"] == "hidden"));
    const params = JSON.parse(data.body);

    if (params.filters) {
      for (let key in params.filters) {
        if (key === "tags") {
          //filters tags的篩選
          const condition = params.filters[key].split(/\,/g);
          list = list.filter((el) => {
            if (!el[key]) {
              return true;
            }
            const tags = el[key].split(/\,/g);
            for (let elem of tags) {
              return condition.includes(elem);
            }
          });
        } else {
          //filters屬性內資料與資料中相符就顯示
          list = list.filter((el) => el[key] === params.filters[key]);
        }
      }
    }
    return list;
  }

  return dataList;
});
