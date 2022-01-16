import React, { Component } from 'react';
import styles from './index.module.css'
import NavHeader from "../../components/NavHeader"

const BMapGL = window.BMapGL

// 覆盖物样式
const labelStyle = {
  cursor: 'pointer',
  border: '0px solid rgb(255, 0, 0)',
  padding: '0px',
  whiteSpace: 'nowrap',
  fontSize: '12px',
  color: 'rgb(255, 255, 255)',
  textAlign: 'center'
}
class Map extends Component{



  componentDidMount(){
    const {label,value} = JSON.parse(localStorage.getItem('hkzf_city'))

    // 在react 脚手架中全局对象是window来访问的
    const map = new BMapGL.Map('container')


    const myGeo = new BMapGL.Geocoder()
    // 将地址解析结果显示在地图上，并调整地图视野
    myGeo.getPoint(
      label,
      async point => {
        if (point) {
          //  初始化地图
          map.centerAndZoom(point, 11)
          // 添加常用控件
          map.addControl(new BMapGL.NavigationControl())
          map.addControl(new BMapGL.ScaleControl())

          const opts ={
            position: point,

          }
          const label = new BMapGL.Label('文本覆盖物',opts)

          label.setContent(
            `<div class="${styles.bubble}">
              <p class="${styles.name}">上海</p>
              <p>99套</p>
            </div>
            `
          )

          label.setStyle(labelStyle)

          map.addOverlay(label)

      
        }
      },
      label
    )

  

  }


  

  render(){
    return(
      <div className={styles.map}>
        {/* 顶部导航栏 */}
        <NavHeader>地图找房</NavHeader>
        <div id='container' className={styles.container}></div>
      </div>
    ) 
  }
}

export default Map;
