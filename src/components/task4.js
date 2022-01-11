import React, { Component } from "react";

// 生命周期 react class 组件才有生周期函数

//  constructor 创建组件的时候最先执行

// render 每次渲染组件都会触发 渲染ui不能调用setState

// componentDidMount // 渲染完成 挂载dom 发送网络请求

// 组件更新时   componentDidMount  new props newstate forceupdate  这三个都会触发组件重新渲染
// 组件完成更新后触发 1 发送请求 2dom 操作 这里 setState要在if 中嵌套否则会导致递归更新

// 组件卸载时候 componentWilUnMount

// 废弃的狗子 componentWillMount componentWillReviceprops componentWillUpdate
export default class Lifecyc extends Component {
  state = {
    count: 1,
  };

  constructor(props) {
    super(props);

    console.warn("生命周期constructor");

    // 这里还没有完成渲染
    const title = document.getElementById("title");
    console.log(title);
  }

  handleclick() {
    this.setState({
      count: this.state.count + 1,
    });
  }

  componentDidUpdate(prevProps) {
    console.warn("生命周期componentDidUpdate");
    console.log(prevProps,this.props)
    // 比较前后两次的props 是否相同
    if (prevProps.count !== this.props.count) {
      // this.setState({
      // })
    }
  }

  componentWillUnmount() {
    console.warn("生命周期 componentWillUnmount");
  }

  componentDidMount() {
    const title = document.getElementById("title");
    console.log(title);
    console.warn("生命周期componentDidMount");
  }

  render() {
    console.warn("生命周期render");
    return (
      <div
        id="title"
        onClick={() => {
          this.handleclick();
        }}
      >
        生命周期例子
        <p>打豆豆{this.state.count}次</p>
      </div>
    );
  }
}
