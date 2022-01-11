// 首页接口api

import  {get,post} from "../utils/http.js"

// 获取首页轮播图
export const getSwiperList = params => {
  const resq = {
    url: '/home/swiper',
    ...params
  }
  return get(resq)
}