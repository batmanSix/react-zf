import React, { Component } from "react";
const age = 1; // jsx 使用表达式
const names = {
  test: "zhangsan",
};

const list = [{name:"1"},{name:"kangbo"}];

const TestComponent1 = () => {
  return (
    <div>
      <h1 className="hook">
        hooks组件 {age} {names?.test}
      </h1>
      <div>
        <div>
          {
             list.map((number)=>(<li key={number.name}>{ number.name }</li>))
          }
        </div>
      </div>
    </div>
  );
};

// a?.b
// // 等同于
// a == null ? undefined : a.b

// a?.[x]
// // 等同于
// a == null ? undefined : a[x]

// a?.b()
// // 等同于
// a == null ? undefined : a.b()

// a?.()
// // 等同于
// a == null ? undefined : a()

// // 或赋值运算符
// x ||= y
// // 等同于
// x || (x = y)

// // 与赋值运算符
// x &&= y
// // 等同于
// x && (x = y)

// // Null 赋值运算符
// x ??= y
// // 等同于
// x ?? (x = y)

export default TestComponent1;
