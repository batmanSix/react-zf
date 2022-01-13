import React, { Component } from "react";
import { Carousel, Flex, Grid,WingBlank } from "antd-mobile";
import axios from "axios";
import { BASE_URL } from "../../utils/url";
import "./index.scss";
import nav1 from "../../assets/images/nav-1.png";
import nav2 from "../../assets/images/nav-2.png";
import nav3 from "../../assets/images/nav-3.png";
import nav4 from "../../assets/images/nav-4.png";
import SearchHeader from "../../components/SearchHeader"

// 导航栏数组
const navItem = [
  {
    id: 1,
    img: nav1,
    title: "整租",
    path: "/home/list",
  },
  {
    id: 2,
    img: nav2,
    title: "合租",
    path: "/home/list",
  },
  {
    id: 3,
    img: nav3,
    title: "地图找房",
    path: "",
  },
  {
    id: 4,
    img: nav4,
    title: "去出租",
    path: "/home/list",
  },
];

export default class Index extends Component {
  state = {
    swiper: [], // 轮播图数据
    isSwiperLoaded: false, // 解决轮播图不能重新刷新
    groups: [], // 租房数据
    news: [],
    curCity: '', //当前城市
  };

  async getSwiperList() {
    const res = await axios.get("http://localhost:8080/home/swiper");

    this.setState(() => {
      return {
        swiper: res.data.body,
        isSwiperLoaded: true,
      };
    });
  }

  async getGroupsList() {
    const res = await axios.get(
      "http://localhost:8080/home/groups?area=AREA%7C88cff55c-aaa4-e2e0"
    );
    console.log(res);
    this.setState(() => {
      return {
        groups: res.data.body,
      };
    });
  }

  async getNewsList(){
    const res = await axios.get(
      'http://localhost:8080/home/news?area=AREA%7C88cff55c-aaa4-e2e0'
    )

    this.setState({
      news: res.data.body
    })
  }

  // 渲染轮播图
  renderSwiper() {
    return this.state.swiper.map((item) => (
      <a
        key={item.id}
        href="http://itcast.cn"
        style={{
          display: "inline-block",
          width: "100%",
          height: 212,
        }}
      >
        <img
          src={"http://localhost:8080" + item.imgSrc}
          alt=""
          style={{ width: "100%", verticalAlign: "top" }}
        />
      </a>
    ));
  }

  // 渲染导航菜单
  renderNavigation() {
    return navItem.map((item) => (
      <Flex.Item
        key={item.id}
        onClick={() => this.props.history.push(item.path)}
      >
        <img className="nav-icon" src={item.img} alt="" />
        <p className="nav-title">{item.title}</p>
      </Flex.Item>
    ));
  }

  // 最新资讯
  renderNews(){
    return this.state.news.map(item => (
      <div className="news-item" key={item.id}>
        <div className="imgwrap">
          <img
            className="img"
            src={`http://localhost:8080${item.imgSrc}`}
            alt=""
          />
        </div>
        <Flex className="content" direction="column" justify="between">
          <h3 className="title">{item.title}</h3>
          <Flex className="info" justify="between">
            <span>{item.from}</span>
            <span>{item.date}</span>
          </Flex>
        </Flex>
      </div>
    ))
  }

  // 渲染grid 组件
  renderGroups() {
    return (
      <Grid
        data={this.state.groups}
        columnNum={2}
        square={false}
        hasLine={false}
        renderItem={(item) => (
          <Flex className="group-item" justify="around" key={item.id}>
            <div className="desc">
              <p className="title">{item.title}</p>
              <span className="info">{item.desc}</span>
            </div>
            <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
          </Flex>
        )}
      />
    );
  }

  // 获取城市信息
  getLocation(){
    const current = new window.BMapGL.LocalCity()
    current.get(async res=>{
      const result = await axios.get(`http://localhost:8080/area/info?name=${res.name}`)
      console.log(result)
      this.setState(()=>{
        return{
          curCity: result.data.body.label
        }
      })
    })
  }

  componentDidMount() {
    this.getSwiperList();
    this.getGroupsList();
    this.getNewsList();
    this.getLocation()
  }
  render() {
    return (
      <div className="index">
        <div className="swiper">
          {this.state.isSwiperLoaded ? (
            <Carousel autoplay infinite autoplayInterval={2000}>
              {this.renderSwiper()}
            </Carousel>
          ) : (
            ''
          )}
          <SearchHeader cityName={this.state.curCity}></SearchHeader>
        </div>

        <div className="nav">
          {/* 导航菜单 */}
          <Flex>{this.renderNavigation()}</Flex>
        </div>

        <div className="groups">
          <Flex justify="between">
            <Flex.Item align="start">
              <p className="group-title">租房小组</p>
            </Flex.Item>
            <Flex.Item align="end">
              <p className="more">更多</p>
            </Flex.Item>
          </Flex>
          {/* 租房grid 组件 */}
          {this.renderGroups()}
        </div>

        <div className="news">
          <h3 className="group-title">最新资讯</h3>
          <WingBlank size="md">{this.renderNews()}</WingBlank>
        </div>
      </div>
    );
  }
}
