import React,{Component} from 'react';

class Kangbo extends Component{

  constructor(props){
    super(props)
  }

  render(){
    return(
      <div>这是一个类组件 {this.props.title}</div>
    )
  }
}

export default Kangbo