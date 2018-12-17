import http from './http.js'
let baseUrl = 'https://www.easy-mock.com/mock/5b48653cda0b3f7a5a8750ce/pwa'
export default {
  // 新闻列表
  getNewList: function (params) {
    return http.get(baseUrl + '/newList', params)
    // return fetch(baseUrl + '/newList').then(response => response.json())
    //   .then(responseJson => {
    //     return responseJson
    //   })
    //   .catch(error => {
    //     console.error(error)
    //   })
  },
  // 图片列表
  getImgList: function (params) {
    return http.get(baseUrl + '/imgList', params)
  }
}
