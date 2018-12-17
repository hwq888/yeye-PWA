/*
全局Vue过滤器
 */
/** 根据value值查询[{value:'',name:''}]的name值(数字类型的比对)
 * @param value {Number} 传入的value值
 * @param obj {obj} 数组对象[{value:'',name:''}]
 **/
export const optionVal = (value, obj) => {
  // 后台异常状态比较多，异常状态显示接口返回的值
  const arr = obj.filter(item => +item.value === +value)[0]
  return arr ? arr.name : value
}
/** 根据value值查询[{value:'',name:''}]的name值(字符串类型的比对)
 * @param value {String} 传入的value值
 * @param obj {obj} 数组对象[{value:'',name:''}]
 **/
export const optionStringVal = (value, obj) => {
  // 后台异常状态比较多，异常状态显示接口返回的值
  const arr = obj.filter(item => item.value === value)[0]
  return arr ? arr.name : value
}
/** 金额千分位格式化
 * @param num {Number} 金额
 * @param digits {Number} 保留小数点后几位数 默认保留两位小数
 **/
export const addThousandSign = (num, digits = 2) => {
  if (typeof num === 'number') {
    num = parseFloat(num)
    num = '' + num.toFixed(digits)
    return num.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,')
  } else {
    return ''
  }
}
