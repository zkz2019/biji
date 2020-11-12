import { format } from '@/utils/utils.js'

export function getDates(date) {
  console.log('dates', date, date && date.length == 2)
  let dates = []
  if (date && date.length == 2) {
    console.log('a')
    let before = format(date[0], 'yyyy-MM-dd HH:mm:ss')
    let after = format(date[1], 'yyyy-MM-dd HH:mm:ss')
    return (dates = [before, after])
  } else {
    console.log('b')
    let T = new Date()
    let YM = format(T, 'yyyy-MM')
    let time = format(T, 'dd HH:mm:ss')
    return (dates = [`${YM}-01 00:00:00`, `${YM}-${time}`])
  }
}

export function getparam(that) {
  let T = new Date()
  let YM = format(T, 'yyyy-MM')
  // let time = format(T, "dd HH:mm:ss");
  let time = format(T, 'dd')
  // let tValue = [`${YM}-01 00:00:00`, `${YM}-${time}`];
  let tValue = [`${YM}-01 00:00:00`, YM + '-' + time + ' 23:59:59']
  that.param.sdate = tValue[0]
  that.param.edate = tValue[1]
  console.log('tValue,time', tValue, that.param)
}
