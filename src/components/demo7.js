import React,{createRef} from 'react';
// 非受控组件

// 推荐用受控组件处理
class ReactControll1 extends React.Component{
  constructor(){
    super()
    this.txtRef = createRef()
  }

  handleChange = (e)=>  {
    this.setState({
      count: e.target.value 
    })
  }

  getText = () =>{
    console.log(this.txtRef.current.value)
  }


  

  render(){
    return(
      <div>
        <input type="text" ref={this.txtRef}></input>  
        <button onClick={this.getText}>获取文本值</button>      
      </div>
    )
  }

}

export default ReactControll1