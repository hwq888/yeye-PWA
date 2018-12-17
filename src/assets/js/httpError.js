/**
 * Creation time:2018/3/3.
 */
import Api from './Api'
export default{
  install (Vue) {
    Vue.prototype.$Error = function (obj, error) {
      const _this = obj
      if (typeof error.response !== 'object') return
      let state = error.response.status
      if (state === 401) {
        Api.delInfo()
        _this.$alert('账户登录超时，请重新登录！', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            _this.$router.replace('/login')
          }
        })
      } else if (state === 403) {
        _this.$message({
          message: '该系统用户没有权限！',
          type: 'error'
        })
      } else {
        _this.$message({
          message: '服务器繁忙，请稍后再试！',
          type: 'error'
        })
      }
    }
  }
}
