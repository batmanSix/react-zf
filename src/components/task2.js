import React from 'react';

// 组件数据传递
// export default class Task2 extends React.Component{

//   constructor(props){
//     super(props)
//   }

//   render(){
//     return(
//       <div>年龄：{this.props.age}</div>
//     )
//   }

// }

// 组件可以传递 函数，数组 ，jsx，对象 props是只读



const Task2 = props =>{

  const handleclock = () => {
    console.log(props)
    props.getmsg(25)
  }

  return(
    <div>
      年龄：{props.age}
      <button onClick={handleclock}>子组件向父亲组件传递数据：25</button>
    </div>
  )
}

export default Task2