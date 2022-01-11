import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  HashRouter,
} from "react-router-dom";

// ? react 路由 v5
// ? 编程是导航

const Home = () => <div>后台首页页面</div>;

const Detail = (props) => {
  const toback = () => {
    props.history.go(-1);
  };
  return <button onClick={toback}> 返回</button>;
};

class Login extends React.Component {
  handleLogin = () => {
    console.log(this);
    this.props.history.push("/home");
  };

  render() {
    return (
      <div>
        <button onClick={this.handleLogin}>登录页面</button>
      </div>
    );
  }
}

class LoginView extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <p>编程导航</p>

          <Link to="/login">去登录页面</Link>
          <Route to="/login" component={Login}></Route>
          <Route to="/detail" component={Detail}></Route>
        </div>
      </Router>
    );
  }
}

export default LoginView;
