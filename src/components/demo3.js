import React, { Component } from 'react';
import "./css/demo3.scss"
// css 处理
// 1 行内样式
// className 样式
const age = 1 // jsx 使用表达式

const TestComponent2 = () =>{
  return (
    <div>
       <h1 className='hook' style={{color:"#fff",background:'#37f'}}>hooks组件 jsx css {age}</h1>
       <h1 className='title1'> classname css</h1>
    </div>
  )
}

export default TestComponent2;