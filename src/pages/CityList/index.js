import React, { Component } from "react";
import { NavBar ,Icon} from "antd-mobile";
import "./index.scss"
import axios from "axios";
export default class CityList extends Component {

  state = {
    cityList: {},
    cityIndex: [],
    // 指定右侧字母索引列表高亮的索引号
    activeIndex: 0
  }

  onLeftClick = ()=>{
    this.props.history.go(-1)
  }

  // 格式化数据
  formatterCity = data =>{
    const cityList = {}    
    data.map(it=>{
      const first = it.short.substr(0,1)
      if(cityList[first]){
        cityList[first].push(it)
      }else{
        cityList[first]= [it]
      }
    })

    const cityIndex = Object.keys(cityList).sort()

    return{
      cityList,
      cityIndex
    }
  }

  async getCityList(){
   const result = await axios.get('http://localhost:8080/area/city?level=1')
   const {cityList, cityIndex} = this.formatterCity(result.data.body)


   const hotRes = await axios.get('http://localhost:8080/area/hot')
   cityList['hot'] = hotRes.data.body
   cityIndex.unshift('hot')

    // 获取当前定位城市
    const curCity = await getCurrentCity()
    cityList['#'] = [curCity]
    cityIndex.unshift('#')

    // console.log(cityList, cityIndex, curCity)
    this.setState({
      cityList,
      cityIndex
    })
  }

  componentDidMount(){
    this.getCityList()
  }

  render() {
    return (
      <div className="city">
        <NavBar
          mode="light"
          icon={<i className="iconfont icon-back">

          </i>}
          onLeftClick={this.onLeftClick}
        >
          城市选择
        </NavBar>
      </div>
    );
  }
}
