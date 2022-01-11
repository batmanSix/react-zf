import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  HashRouter,
} from "react-router-dom";

const Test = () => <div>2</div>;

// ? 默认路由 Route path="/"
const Home = () => {
  return (
    <Router>
      <div>
        默认展示
        <Route path="/" component={Test}></Route>
      </div>
    </Router>
  );
};

export default Home;
