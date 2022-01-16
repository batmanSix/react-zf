import React from "react";
import { NavBar } from "antd-mobile";
import "./index.scss";
import { withRouter } from "react-router-dom";

// 导入 props 校验的包
import PropTypes from 'prop-types'
import styles from './index.module.css'
function NavHeader({ children, history,onLeftClick,rightContent,className }) {
  const defaultHandler = () => history.go(-1);
  return (
    <div className="navbar">
      <NavBar
        className={[styles.navBar, className || ''].join(' ')}
        mode="light"
        icon={<i className="iconfont icon-back" />}
        onLeftClick={onLeftClick || defaultHandler}
        rightContent={rightContent}
      >
        {children}
      </NavBar>
    </div>
  );
}

// 添加props校验
NavHeader.propTypes = {
  children: PropTypes.string.isRequired, // 类似vue 的slot
  onLeftClick: PropTypes.func, // function 
  className: PropTypes.string, // string
  rightContent: PropTypes.array // array
}


// withRouter 高阶组件 给非router 路由组件传递路由信息
export default withRouter(NavHeader);
