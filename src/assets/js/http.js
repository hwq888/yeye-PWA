import axios from 'axios'
import store from '../../vuex/store'
import Utils from './Utils'
// import {goLogin} from './native'

// 设置请求头token
const ajaxToken = function () {
  const userLoginInfo = Utils.getCookie('userLoginInfo')
  if (userLoginInfo) {
    axios.defaults.headers.common['token'] = JSON.parse(userLoginInfo).token // 登录成功后服务端生成并返回给客户端
    axios.defaults.headers.common['version'] = '1.1' // 接口版本号: 为了兼容不同版本的升级
    axios.defaults.headers.common['client'] = '3' // 客户端来源:1-安卓；2-苹果；3-H5
  }
}

// 超时时间
axios.defaults.timeout = 50000
// http请求拦截器
axios.interceptors.request.use(config => {
  // debugger
  ajaxToken()
  return config
}, error => {
  return Promise.reject(error)
})

// http响应拦截器
axios.interceptors.response.use(data => { // 响应成功关闭loading
  // debugger
  // console.log(data)
  // console.log(data.headers['content-type'])
  if (data.headers['content-type'].indexOf('text/html') > -1) {
    location.href = './offline.html'
  } else {
    let code = Number(data.data.code)
    switch (code) {
      // case 2001:
      // store.commit('SHOWTOAST', '用户不存在')
      // const param = {url: window.location.href}
      // goLogin(JSON.stringify(param))
      // break
      // case 4000:
      //   store.commit('SHOWTOAST', '登录失效了')
      //   break
      case 5000:
        store.commit('SHOWTOAST', '服务器内部处理异常')
        break
      case 404:
        store.commit('SHOWTOAST', '该请求没有找到指定资源')
        break
      default:
        return data
    }
  }
}, error => {
  // console.log(error)
  if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
    // 请求超时处理
    store.commit('UPDATE_LOADING', false)
    store.commit('SHOWTOAST', '服务器繁忙，请稍后再试')
  } else {
    return Promise.reject(error)
  }
})

// let baseUrl = ''
export default {
  // ifHtml: function (res) {
  //   console.log(res.getResponseHeader('Content-Type'))
  //   console.log(res.headers.contentType)
  //   debugger
  //   // 判断响应是否 html 页面
  //   return res.headers.contentType.indexOf('text/html') > -1
  // },
  get: function (url, params) {
    ajaxToken()
    // return axios.get(url, {params: params}).then(res => {
    //   debugger
    //   console.log(this.ifHtml(res))
    //   if (this.ifHtml(res)) {
    //     debugger
    //     location.href = './offline.html'
    //   } else {
    //     debugger
    //     return res.data
    //   }
    // })
    return axios.get(url, {params: params}).then(res => res.data)
  },
  post: function (url, params) {
    ajaxToken()
    return axios.post(url, params).then(res => res.data)
  },
  postForm: function (url, params) {
    ajaxToken()
    return axios({
      url: url,
      method: 'post',
      data: params,
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(res => res.data)
  },
  put: function (url, params) {
    ajaxToken()
    return axios.put(url, params).then(res => res.data)
  },
  putForm: function (url, params) {
    ajaxToken()
    return axios({
      url: url,
      method: 'put',
      data: params,
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(res => res.data)
  },
  delete: function (url, params) {
    ajaxToken()
    return axios.delete(url, params).then(res => res.data)
  },
  deleteForm: function (url, params) {
    ajaxToken()
    return axios({
      url: url,
      method: 'delete',
      data: params,
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(res => res.data)
  }
}
