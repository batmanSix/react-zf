import React from 'react';
// 表单处理受控组件

// 受控组件 非受控组件

// 受控组件 多表单元素优化
class ReactControll extends React.Component{
  state = {
    count:''
  }

  handleChange = (e)=>  {
    this.setState({
      count: e.target.value 
    })
  }


  // 不同的元素的表单处理
  handleChange1 = (e)=>  {
    const {target} = e
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({
      [name]:value
    })
  }

  

  render(){
    return(
      <div>
        <input type="text" value={this.state.count} onChange={this.handleChange}></input>        
      </div>
    )
  }

}

export default ReactControll

// react hooks 风格受控组件

// import { useState } from 'react';

// function MyControlledInput({ }) {
//   const [ value, setValue ] = useState('');
//   const onChange = (event) => {
//     setValue(event.target.value);
//   }
  
//   return (
//     <>
//         <div>Input value: {value}</div>
//         <input value={value} onChange={onChange} />
//     </>
//   )
// }