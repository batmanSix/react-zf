import React from "react";
import { BrowserRouter as Router, Link, Route,Switch,HashRouter} from "react-router-dom";

// ? react 路由 v5
// ? react 核心路由 router route link

// ? react 常用组件说明
// ? BrowserRouter 是html5 api 实现 没有#  HashRouter 是 # 模式
// ? Link 是导航连接 to 指定pathname 跟 locations.pathname 一致
// ? Route path 路由地址 component 指定组件 Route 路由位置



const Lists = () => <div>这是一个list 页面</div>;

const Detail = () => <div>这是一个detail 页面</div>

class List extends React.Component {
  render() {
    return (
      <Router>
        <h1>路由基础</h1>
        <Link to="/list">页面一</Link>
        <Link to="/detail">页面2</Link>
        
        <Route exact path="/list" component={Lists}></Route>
        <Route  path="/detail" component={Detail}></Route>
      </Router>
    );
  }
}

export default List;
