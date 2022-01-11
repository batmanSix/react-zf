import React, { Component } from "react";

class Task extends Component {
  state = {
    comments: [
      {
        id: "1",
        name: "kangbo",
        content: "1",
      },
    ],
    user: "",
    content: "",
  };

  // 渲染list
  renderList = () => {
    return this.state.comments && this.state.comments.length === 0 ? (
      <div className="no-data">暂无评论</div>
    ) : (
      <div>
        <div>
          {this.state.comments.map((it) => (
            <li
              key={it.id}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p>姓名：{it.name}-</p>
              <p>内容：{it.content}</p>
            </li>
          ))}
        </div>
        <button onClick={this.addContent}>发表评论</button>
      </div>
    );
  };

  // 处理表单
  handle = (e)=>{
    const {name,value } = e.target
    this.setState({
      [name]:value
    })
  }

  // 发表评论
  addContent = ()=>{
    const {user,content,comments} = this.state
    console.log(user,content)
    if(!user.trim() || !content.trim()){
      alert('请输入内容')
      return false
    }
    const newarr = [{id:Math.random(),name:user,content:content}, ...comments]

    this.setState({
      comments: newarr,
      user: '',
      content: ''
    })

  }

  render() {
    const { user, content } = this.state;
    return (
      <div className="app">
        <div>
          <input
            className="user"
            type="text"
            placeholder="请输入人员"
            value={user}
            name="user"
            onChange={this.handle}
          ></input>
          <br></br>
          <textarea
            className="content"
            cols="30"
            rows="10"
            placeholder="请输入评论"
            value={content}
            name="content"
            onChange={this.handle}
          ></textarea>
        </div>

        {this.renderList()}
      </div>
    );
  }
}

export default Task;
