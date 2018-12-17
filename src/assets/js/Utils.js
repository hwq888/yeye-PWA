/**
 * Creation time:2018/3/3.
 */
export default{
  regExp: {// 正则表达式
    kong: /\S/, // 非空
    phone: /^1\d{10}$/, // 手机号
    number: /^[0-9]*$/, // 只能是数字x
    numberd: /^\d+(\.\d+)?$/, // 只能是数字和小数点
    numberdOrAmount: /^\d+(\.\d{2})?$/, // 限制输入数字，且小数点保留两位
    amount: /^([+-]?)((\d{1,3}(,\d{3})*)|(\d+))(\.\d{2})?$/, // 金额 开头只可为正号或者负号,也可以没有符号,小数点前可以输入任意位数的数字,小数点后只能输入两位数字.
    amountPlus: /^((\d{1,3}(,\d{3})*)|(\d+))(\.\d{2})?$/, // 只为正数的金额 ,其他跟amountReg一样
    regAmount: /^(([1-9][0-9]*)|(([0]))|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/, // 金额的正则表达式 可为：0
    area: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, // 文本域：10-200个汉字或字母
    isZh: /^[\u4E00-\u9FA5]{2,10}$/, // 姓名
    contactReg: /^[A-Za-z\u4e00-\u9fa5]+$|[a-z]]/, // 联系人：姓名至少一个汉字或字母
    contractNoReg: /\S/, // 合同编号 匹配由数字和26个英文字母组成的字符串
    nameReg: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, // 名称 至少一个汉字或字母
    busReg: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, // 商家/公司名称 姓名至少一个汉字或字母
    email: /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/, // 邮箱号码
    jypassword: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,15}$/,  // 8-15位交易密码由数字和字母组成
    password: /^[\x21-\x7E]{6,20}$/, // 密码
    phoneEmail: /^[1]{1}[0-9]{10}$|(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/, // 匹配手机邮箱
    idCard: /(^\d{15}$)|(^\d{17}([0-9]|X)$)/, // 简单身份证校验
    banknum: /^(\d{16}|\d{18}|\d{19})$/ // 银行卡
  },
  /*
  *说明：localStorage存储对象
  * key：对象  obj：对象的值
  * */
  setLocalStorage (key, obj) {
    localStorage.setItem(key, JSON.stringify(obj))
  },
  /*
   *说明：获取localStorage获取对象数据
   *key：对象
   * */
  getLocalStorage (key) {
    return JSON.parse(localStorage.getItem(key))
  },
  /*
   *说明：localStorage删除对象
   * key：对象  obj：对象的值
   * */
  delLocalStorage (key) {
    localStorage.removeItem(key)
  },
  /*
   *说明：localStorage删除所有
   * key：对象  obj：对象的值
   * */
  delAllLocalStorage () {
    localStorage.clear()
  },
  /*
    *说明：设置cookie方法
    *key：对象  val：对象的值   time：过去时间（小时）
    * */
  setCookie (key, val, time) {
    if (time) {
      let date = new Date() // 获取当前时间
      const hours = time // 将date设置为n小时以后的时间
      date.setTime(date.getTime() + hours * 3600 * 1000) // 格式化为cookie识别的时间
      document.cookie = key + '=' + val + ';expires=' + date.toGMTString() // 设置cookie
    } else {
      document.cookie = key + '=' + val
    }
  },
  /*
  *说明：获取cookie方法
   *key：对象
   * */
  getCookie (key) {
    const getCookie = document.cookie.replace(/[ ]/g, '') // 获取cookie，并且将获得的cookie格式化，去掉空格字符
    const arrCookie = getCookie.split(';') // 将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
    let tips // 声明变量tips
    for (let i = 0; i < arrCookie.length; i++) { // 使用for循环查找cookie中的tips变量
      const arr = arrCookie[i].split('=') // 将单条cookie用"等号"为标识，将单条cookie保存为arr数组
      if (key === arr[0]) { // 匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
        tips = arr[1] // 将cookie的值赋给变量tips
        break // 终止for循环遍历
      }
    }
    return tips
  },
  /*
   *说明：删除cookie方法
   *key：对象
   * */
  deleteCookie (key) { // 删除cookie方法
    let date = new Date() // 获取当前时间
    date.setTime(date.getTime() - 10000) // 将date设置为过去的时间
    document.cookie = key + '=v; expires =' + date.toGMTString()// 设置cookie
  },
  /** 金额千分位格式化
   * @param num {Number} 金额
   * @param digits {Number} 保留小数点后几位数
   **/
  addThousandSign (num, digits) {
    num = parseFloat(num)
    num = '' + num.toFixed(digits)
    return num.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,')
  },
  /** 删除金额千分位格式化
   * @param num {String} 金额
   **/
  delThousandSign (num) {
    let x = num.split(',')
    return parseFloat(x.join(''))
  },
  /** 获取字符串指定前几位
   * @param str {String} 原字符串
   * @param num {Number} 需求的位数
   **/
  getStrFirstPart (str, num) {
    str = '' + str
    num = Number(num)
    if (num > str.length) {
      num = str.length
    }
    return str.slice(0, num)
  },

  /** 获取字符串指定最后几位
   * @param str {String} 原字符串
   * @param num {Number} 需求的位数
   **/
  getStrLastPart (str, num) {
    str = '' + str
    num = Number(num)
    return str.slice(-num)
  },
  // 数组去重
  removeRepeatItem (arr) {
    let newArr = []
    for (let i = 0; i < arr.length; i++) {
      if (newArr.indexOf(arr[i]) === -1) {
        newArr.push(arr[i])
      }
    }
    return newArr
  },
  // 判断是否是微信浏览器
  isweixin () {
    const ua = window.navigator.userAgent.toLowerCase()
    if (ua.indexOf('micromessenger') > -1) {
      return true
    } else {
      return false
    }
  },
  /*
   *说明：对象复制
   *data：参数传递
   * */
  dataClone (data) {
    let obj = {}
    obj = JSON.parse(JSON.stringify(data))
    return obj
  },
  /*
   *说明：银行卡每4位加入空格
   *num：参数传递
   * */
  bankCardNumRule (num) {
    if (/\S{5}/.test(num)) {
      return num.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ')
    } else {
      return num
    }
  },
  /*
   *说明：去掉所用空格
   *num：参数传递
   * */
  bankCardNumUtil (num) {
    return num.replace(/\s/g, '')
  }
}
