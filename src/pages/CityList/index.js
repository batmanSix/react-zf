import React, { Component } from "react";
import { NavBar,Toast} from "antd-mobile";
import { List, AutoSizer } from 'react-virtualized'
import "./index.scss"
import axios from "axios";
import {getCurrentCity} from "../../utils/index.js"
import NavHeader from "../../components/NavHeader"


// 索引（A、B等）的高度
const TITLE_HEIGHT = 36
// 每个城市名称的高度
const NAME_HEIGHT = 50

// 封装处理字母索引的方法
const formatCityIndex = letter => {
  switch (letter) {
    case '#':
      return '当前定位'
    case 'hot':
      return '热门城市'
    default:
      return letter.toUpperCase()
  }
}

// 有房源的城市
const HOUSE_CITY = ['北京', '上海', '广州', '深圳']

export default class CityList extends Component {

  constructor(props){
    super(props)
   
      
    // 创建ref对象
    this.cityListComponent = React.createRef()

    console.log(this.cityListComponent)

  }

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

    console.log(cityList, cityIndex, curCity)
    this.setState({
      cityList,
      cityIndex
    })
  }

  
  changeCity({ label, value }) {
    if (HOUSE_CITY.includes(label)) {
      // 有
      localStorage.setItem('hkzf_city', JSON.stringify({ label, value }))
      this.props.history.go(-1)
    } else {
      console.log(Toast)
      Toast.info('该城市暂无房源数据', 1, null, false)
    }
  }

    // List组件渲染每一行的方法：
    rowRenderer = ({
      key, // Unique key within array of rows
      index, // 索引号
      isScrolling, // 当前项是否正在滚动中
      isVisible, // 当前项在 List 中是可见的
      style // 注意：重点属性，一定要给每一个行数据添加该样式！作用：指定每一行的位置
    }) => {
      // 获取每一行的字母索引
      const { cityIndex, cityList } = this.state
      const letter = cityIndex[index]
  
      // 获取指定字母索引下的城市列表数据
      // console.log(cityList[letter])
  
      return (
        <div key={key} style={style} className="city">
          <div className="title">{formatCityIndex(letter)}</div>
          {cityList[letter].map(item => (
            <div
              className="name"
              key={item.value}
              onClick={() => this.changeCity(item)}
            >
              {item.label}
            </div>
          ))}
        </div>
      )
    }
  
    // 创建动态计算每一行高度的方法
    getRowHeight = ({ index }) => {
      // 索引标题高度 + 城市数量 * 城市名称的高度
      // TITLE_HEIGHT + cityList[cityIndex[index]].length * NAME_HEIGHT
      const { cityList, cityIndex } = this.state
      return TITLE_HEIGHT + cityList[cityIndex[index]].length * NAME_HEIGHT
    }
  
    // 封装渲染右侧索引列表的方法
    renderCityIndex() {
      // 获取到 cityIndex，并遍历其，实现渲染
      const { cityIndex, activeIndex } = this.state
      return cityIndex.map((item, index) => (
        <li
          className="city-index-item"
          key={item}
          onClick={() => {
            // console.log('当前索引号：', index)
            this.cityListComponent.current.scrollToRow(index)
          }}
        >
          <span className={activeIndex === index ? 'index-active' : ''}>
            {item === 'hot' ? '热' : item.toUpperCase()}
          </span>
        </li>
      ))
    }

  async componentDidMount(){
    this.getCityList()
    // 调用 measureAllRows，提前计算 List 中每一行的高度，实现 scrollToRow 的精确跳转
    this.cityListComponent.current.measureAllRows()
  }s

  render() {
    return (
      <div className="city">
        <NavHeader>城市选择</NavHeader>

          {/* 城市列表 */}
          <AutoSizer>
          {({ width, height }) => (
            <List
              ref={this.cityListComponent}
              width={width}
              height={height}
              rowCount={this.state.cityIndex.length}
              rowHeight={this.getRowHeight}
              rowRenderer={this.rowRenderer}
              onRowsRendered={this.onRowsRendered}
              scrollToAlignment="start"
            />
          )}
        </AutoSizer>

        {/* 右侧索引列表 */}
        <ul className="city-index">{this.renderCityIndex()}</ul>
      </div>
    );
  }
}
