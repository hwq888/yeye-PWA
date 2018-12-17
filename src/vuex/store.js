import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
  ProjectName: '',
  showHeader: '',
  headerTitle: '',
  loadingShow: false,
  toastShow: false,
  toastMsg: '',
  toastWidth: 'auto',
  Tip: {
    type: '',
    showError: false,
    showSuc: false,
    msg: ''
  }
}

// 定义所需的 mutations
const mutations = {
  // 显示提示框
  SHOWTOAST (state, data) {
    state.toastMsg = data.text || data
    state.toastWidth = data.width || 'auto'
    state.toastShow = true
  },
  // 清空显示提示框
  CLEARSHOWTOAST (state, data) {
    state.toastShow = false
    // state.toastMsg = '';
  },
  // 显示或者隐藏—更新公共头部标题
  UPDATE_TITLE (state, data) {
    const ua = window.navigator.userAgent.toLowerCase()
    if (ua.indexOf('micromessenger') > -1) {
      state.showHeader = false
    } else {
      state.showHeader = data.show
    }
    state.headerTitle = data.title
    document.title = data.title
    // document.title = state.ProjectName+'-'+data.title;
  },
  // 更新项目名称
  UPDATE_PROJECTNAME (state, name) {
    state.ProjectName = name
  },
  // 更新提示框
  SHOW_TIP_MSG (state, data) {
    state.Tip.msg = data.msg
    state.Tip.type = data.type
    if (state.Tip.type === 'suc') {
      state.Tip.showSuc = true
      setTimeout(() => {
        state.Tip.showSuc = false
      }, 2000)
    }
    if (state.Tip.type === 'error') {
      state.Tip.showError = true
      setTimeout(() => {
        state.Tip.showError = false
      }, 2000)
    }
  },
  // loading更新
  UPDATE_LOADING (state, data) {
    state.loadingShow = data
  }
}

// 创建 store 实例
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})
