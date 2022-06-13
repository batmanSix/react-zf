import React, { Component } from "react";
import styles from "./index.module.css";
import NavHeader from "../../components/NavHeader";
import axios from "axios";
import {Toast} from "antd-mobile"


const BMapGL = window.BMapGL;

// 覆盖物样式
const labelStyle = {
  cursor: "pointer",
  border: "0px solid rgb(255, 0, 0)",
  padding: "0px",
  whiteSpace: "nowrap",
  fontSize: "12px",
  color: "rgb(255, 255, 255)",
  textAlign: "center",
};


class Map extends Component {
  constructor(props) {
    super(props);
  }


  // 渲染
  async renderOverlays(id) {
    try {
      // 开启loading
      Toast.loading('加载中...', 0, null, false)

      const res = await API.get(`/area/map?id=${id}`)
      // 关闭 loading
      Toast.hide()

      const data = res.data.body

      // 调用 getTypeAndZoom 方法获取级别和类型
      const { nextZoom, type } = this.getTypeAndZoom()

      data.forEach(item => {
        // 创建覆盖物
        this.createOverlays(item, nextZoom, type)
      })
    } catch (e) {
      // 关闭 loading
      Toast.hide()
    }
  }

  createOverlays(){
    
  }


  componentDidMount() {
    const { label, value } = JSON.parse(localStorage.getItem("hkzf_city"));

    // 在react 脚手架中全局对象是window来访问的
    const map = new BMapGL.Map("container");

    const myGeo = new BMapGL.Geocoder();
    // 将地址解析结果显示在地图上，并调整地图视野
    myGeo.getPoint(
      label,
      async (point) => {
        if (point) {
          //  初始化地图
          map.centerAndZoom(point, 11);
          // 添加常用控件
          map.addControl(new BMapGL.NavigationControl());
          map.addControl(new BMapGL.ScaleControl());

          const res = await axios.get(
            `http://localhost:8080/area/map?id=${value}`
          );

          res.data.body.map((it) => {
            const {
              coord: { longitude, latitude },
              label: areaName,
              count,
              value
            } = it;
            const areaPoint = new BMapGL.Point(longitude, latitude)
            const label = new BMapGL.Label("", {
              position: areaPoint,
              offset: new BMapGL.Size(-35, -35),
            });
            
            // 唯一标识
            label.id = value

            label.setContent(
              `<div class="${styles.bubble}">
                <p class="${styles.name}">${areaName}</p>
                <p>${count}套</p>
              </div>
              `
            );

            label.setStyle(labelStyle);

            label.addEventListener("click", () => {
              console.log("点击",label.id);
              map.centerAndZoom(areaPoint,13)

              setTimeout(() => {
                map.clearOverlays()
              }, 0);
            });

            map.addOverlay(label);
          });
        }
      },
      label
    );
  }

  render() {
    return (
      <div className={styles.map}>
        {/* 顶部导航栏 */}
        <NavHeader>地图找房</NavHeader>
        <div id="container" className={styles.container}></div>
      </div>
    );
  }
}

export default Map;
