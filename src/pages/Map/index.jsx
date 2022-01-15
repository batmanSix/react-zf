import React, { Component } from 'react';
import "./index.scss"
import NavHeader from "../../components/NavHeader"
class Map extends Component{



  componentDidMount(){
    console.log(window.BMapGL)
    // 在react 脚手架中全局对象是window来访问的
    const map = new window.BMapGL.Map('container')


    const point = new window.BMapGL.Point(116.404,39.915)

    map.centerAndZoom(point,15)
  }


  

  render(){
    return(
      <div className='map'>
        {/* 顶部导航栏 */}
        <NavHeader>地图找房</NavHeader>
        <div id='container'></div>
      </div>
    ) 
  }
}

export default Map;
