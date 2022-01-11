import Home from "./pages/Home/index.js";
import CityList from "./pages/CityList/index.js";
import { BrowserRouter as Router, Route, Link,Redirect } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
        {/* 配置 路由出口**/}
        <Route path="/" exact render={()=> <Redirect to="/home"></Redirect>}></Route>
        {/* <ul>
          <li>
            <Link to="/home">首页</Link>
          </li>
          <li>
            <Link to="/city">城市选择</Link>
          </li>
        </ul> */}

        {/** 配置路由view **/}
        <Route path="/home" component={Home}></Route>
        <Route path="/city" component={CityList}></Route>
      </div>
    </Router>
  );
}

export default App;
