import React from 'react';

class Task3 extends React.Component{
  constructor(props){
    super(props)
  }


  render(){
    console.log(this.props)
    return(
      <div>
        <h1>子节点:{this.props.children}</h1>
      </div>
    )
  }
}

export default Task3