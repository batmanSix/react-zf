import React, { Component } from 'react';


// ? jsx 仅仅是creteelement 方法的语法糖
// jsx 是被 babel/preset-react 创建编译为createelement方法，react 元素是一个对象
// class 组件必须是大写开头 
// class TestComponent extends Component {
//   render() {
//     return (
//       <h1>文字信息</h1>
//     )
//   }
// }


// ? 组件更新机制：  setState 的两个作用 1：修改state 2:更新ui组件
// ? 父组件重新渲染的时候，也会渲染子组件（但只会渲染当前子组件树 当前子组件跟所有后代子组件）
// ? 组件性能优化 1 减轻state ：只存储跟组件渲染相关的数据 比如：count loading list数据等
// ? 不用做渲染的数据不用放在state中，比如定时id，多个方法中要使用到这个数据的时候要放在this 中

// ? 避免不必要的重新渲染 
// ? 使用钩子函数 shouldComponentUpdate(nextProps,nextState), 通过返回值确定是否要重新渲染，返回true 重新渲染，false则不渲染
// ? shouldComponentUpdate 触发时机：更新阶段组件重新渲染 shouldComponentUpdate =》render

// ? pureComponent 纯组件性能优化
// ? pureComponent 自己实现了 shouldComponentUpdate 不需要手动比较，会自动进行潜比较
// ? 引用数据类型需要增加深层嵌套加速对比 使用库 immutable 或者使用 shallowEqual 来让我们的代码进行对比 

// export default TestComponent;

// class 组件

const age = 1 // jsx 使用表达式
const TestComponent = () =>{
  return (
    <h1 className='hook'>hooks组件 {age}</h1>
  )
}

export default TestComponent;