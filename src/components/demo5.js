import React, { Component } from "react";

// react 事件对象

const add = (...test) => {
  return test;
};


const test = {
  a: 1,
  b: 2,
};

// reactt 事件处理
class Kangbo1 extends Component {

  state = {
    count :1
  }

  handleClick = (e) => {
    e.stopPropagation(); // 组织冒泡
    e.preventDefault(); // 阻止浏览器默认行为
    console.log('事件绑定')
  } 

  add = (e) =>{
    e.stopPropagation(); 
    this.setState({
      count: this.state.count + 1
    })
    
  }

  mins = (e) =>{
    e.stopPropagation(); 
    this.setState({
      count: this.state.count - 1
    })
  }
  
  constructor(props) {
    super(props);

    //1 绑定this this.event  = this.onevent.bind(this)


    // 箭头函数


    // 在class 里使用箭头函数
  }

  render() {
    return (
      <div
        onClick={() => {
          console.log(add(test, { c: 3 }));
        }}
      >
        这是一个类组件 {this.props.title}
        <div style={{fontSize:'28px'}}
          onClick={(e)=>this.handleClick(e)}
        >
          这是一个类组件 事件绑定
        </div>
        <div style={{fontSize:'20px'}}>{this.state.count}</div>
        <button onClick={this.add}>加</button>
        <button onClick={this.mins}>减</button>
      </div>
    );
  }
}

export default Kangbo1;
