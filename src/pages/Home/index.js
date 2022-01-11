import React, { Component } from "react";
import { Route } from "react-router-dom";
import News from "../News/index.js";
import { TabBar } from "antd-mobile";
import "./index.scss";
import Index from "../Index/index.js";
import Profile from "../Profile/index.js";
import HouseList from "../HouseList/index.js";
// tabbar 数组
const tabItems = [
  {
    title: "首页",
    icon: "icon-ind",
    path: "/home",
  },
  {
    title: "找房",
    icon: "icon-findHouse",
    path: "/home/list",
  },
  {
    title: "资讯",
    icon: "icon-infom",
    path: "/home/news",
  },
  {
    title: "我的",
    icon: "icon-my",
    path: "/home/profile",
  },
];

class Home extends Component {
  state = {
    // 默认选中的TabBar菜单项
    selectedTab: this.props.location.pathname
  };

  componentDidUpdate(prevProps){
    if (prevProps.location.pathname !== this.props.location.pathname) {
      // 此时，就说明路由发生切换了
      this.setState({
        selectedTab: this.props.location.pathname
      })
    }

  }

  // 渲染 TabBar.Item
  renderTabBarItem() {
    return tabItems.map((item) => (
      <TabBar.Item
        title={item.title}
        key={item.title}
        icon={<i className={`iconfont ${item.icon}`} />}
        selectedIcon={<i className={`iconfont ${item.icon}`} />}
        selected={this.state.selectedTab === item.path}
        onPress={() => {
          this.setState({
            selectedTab: item.path,
          });

          // 路由切换
          this.props.history.push(item.path);
        }}
      />
    ));
  }


  render() {
    return (
      <div className="home">
        {/* 2.3 渲染子路由 */}
        <Route path="/home/news" component={News} />
        <Route exact path="/home" component={Index} />
        <Route path="/home/list" component={HouseList} />
        <Route path="/home/profile" component={Profile} />
        {/* TabBar */}

        <TabBar tintColor="#21b97a" noRenderContent={true} barTintColor="white">
          {this.renderTabBarItem()}
        </TabBar>
      </div>
    );
  }
}

export default Home;
