/**
 * 用正则表达式判断是否配置
 * @param {正则表达式} a 
 * @param {字符串} b 
 * @returns {boolean}
 */
let judgeTest = (a, b) => {
  return a.test(b);
}

const Judge = {
  /**
   * 功能：判断字符串是否为空,空格也算空
   * 参数：str:需要判断的字符串
   * 返回: true,false
   */
  isEmpty(str) {
    return typeof str == "undefined" || str == null || (str = str + "", str.trim() == "" || str.trim() == "undefined" || str.trim() == "null");
  },
  /**
   * 功能：判断字符串是否是非空
   * 参数：str:需要判断的字符串
   * 返回: true,false
   */
  isNotEmpty(str) {
    return !this.isEmpty(str);
  },

  /**
   * 功能:判断字符串是否日期，正确格式为:yyyy-mm-dd或者yyyy/mm/dd
   * 参数：strValue:要校验的日期字符串
   * 返回：true,false
   */
  isDate(strValue) {
    if (this.isEmpty(strValue)) return false;
    let r = strValue.match(/^(\d{4})(-|\/)(\d{2})\2(\d{2})$/);
    if (r == null) return false;
    let d = new Date(r[1], r[3] - 1, r[4]);
    return d.getFullYear() == r[1] && d.getMonth() + 1 == r[3] && d.getDate() == r[4];
  },
  /**
   * 功能：判断是否长时间，形如 (2003-12-05 13:04:06)
   * 参数：str:要校验的日期字符串
   * 返回: true,false
   */
  isDateTime(str) {
    let reg = /^(\d{4})(-|\/)(\d{2})\2(\d{2}) (\d{2}):(\d{2}):(\d{2})$/;
    let r = str.match(reg);
    if (r == null) return false;
    let d = new Date(r[1], r[3] - 1, r[4], r[5], r[6], r[7]);
    return d.getFullYear() == r[1] && d.getMonth() + 1 == r[3] && d.getDate() == r[4] && d.getHours() == r[5] && d.getMinutes() == r[6] && d.getSeconds() == r[7];
  },
  /**
   * 功能：判断字符串是否为字母或数字
   * 参数：strValue:要校验的字符串
   * 返回：true,false
   */
  isAlphaNumeric(strValue) {
    if (this.isEmpty(strValue)) return false;
    // 只能是 A-Z a-z 0-9 之间的字母数字 或者为空
    let pattern = /^[A-Za-z0-9]+$/;
    return judgeTest(pattern, strValue);
  },
  /**
   * 功能:判断是否为中文、英文、字母或_
   * 参数：strValue:要校验的字符串
   * 返回: true,false
   */
  isCnAndEnNumeric(strValue) {
    let pattern = /^[_0-9a-zA-Z\u4e00-\u9fa5]+$/;
    return judgeTest(pattern, strValue);
  },
  /**
   * 功能:判断是否为英文、字母或_
   * 参数：strValue:要校验的字符串
   * 返回: true,false
   */
  isEnNumeric(strValue) {
    let pattern = /^[_0-9a-zA-Z]+$/;
    return judgeTest(pattern, strValue);
  },
  /**
   * 功能:判断是否为中文
   * 参数： strValue:要校验的字符串 
   * 返回: true,false
   */
  isCnAndEn(strValue) {
    if (this.isEmpty(strValue)) return false;
    let pattern = /^[\u4e00-\u9fa5]+$/;
    return judgeTest(pattern, strValue);
  },
  /**
   * 功能:判断是否是正确的Email 邮箱
   * 参数： strValue:要校验的字符串
   * 返回：true,false
   */
  isEmail(strValue) {
    if (this.isEmpty(strValue)) return false;
    let pattern = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    return judgeTest(pattern, strValue);
  },
  /**
   * 功能:判断是否是货币
   * 参数： strValue:要校验的字符串
   * 返回: true,false
   */
  isMoney(strValue) {
    if (this.isEmpty(strValue)) return false;
    let pattern = /^[+-]?\d+(,\d{3})*(\.\d+)?$/;
    return judgeTest(pattern, strValue);
  },
  /**
   * 功能：判断是否为数字
   * 参数: strValue:要校验的字符串
   * 返回: true,false
   */
  isNumeric(strValue) {
    if (this.isEmpty(strValue)) return false;
    let pattern = /^[0-9]*$/;
    return judgeTest(pattern, strValue);
  },
  /**
   * 功能:判断是否为浮点数（不带正负号）
   * 参数： strValue：要校验的字符串
   * 返回: true,false
   */
  isNumberFloat(strValue) {
    if (this.isEmpty(strValue)) return false;
    let pattern = /^\d+(\.\d+)?$/;
    return judgeTest(pattern, strValue);
  },
  /**
   * 功能：判断是否为手机号码
   * 参数： strValue：要校验的字符串
   * 返回: true,false
   */
  isMobile(strValue) {
    if (this.isEmpty(strValue)) return false;
    let pattern = /^(1)[0-9]{10}$/;
    return judgeTest(pattern, strValue);
  },
  /**
   * 功能：判断是否为电话
   * 参数： strValue：要校验的字符串
   * 返回: true,false
   */
  isPhone(strValue) {
    if (this.isEmpty(strValue)) return false;
    let pattern = /(^\(\d{3,5}\)\d{6,8}(-\d{2,8})?$)|(^\d+-\d+$)|(^(1)[0-9]{10}$)/;
    return judgeTest(pattern, strValue);
  },

  /**
   * 功能：判断是否为传真
   * 参数： strValue：要校验的字符串
   * 返回: true,false
   */
  isFax(strValue) {
    if (this.isEmpty(strValue)) return false;
    let pattern = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
    return judgeTest(pattern, strValue);
  },
  /**
   * 功能：判断是否为固话
   * 参数： strValue：要校验的字符串
   * 返回: true,false
   */
  isTel(strValue) {
    if (this.isEmpty(strValue)) return false;
    let pattern = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
    return judgeTest(pattern, strValue);
  },
  /**
   * 功能：判断是否为邮政编码
   * 参数： strValue：要校验的字符串
   * 返回: true,false
   */
  isPostalCode(strValue) {
    if (this.isEmpty(strValue)) return false;
    let pattern = /(^\d{6}$)/;
    return judgeTest(pattern, strValue);
  },
  /**
   * 功能：判断是否为合法的URL
   * 参数： strValue：要校验的字符串
   * 返回: true,false
   */
  isURL(strValue) {
    if (this.isEmpty(strValue)) return false;
    let pattern = /^(http|https|ftp):\/\/(\w+\.)+[a-z]{2,3}(\/\w+)*(\/\w+\.\w+)*(\?\w+=\w*(&\w+=\w*)*)*/;
    return judgeTest(pattern, strValue);
  },
  /**
   * 功能:验证身份证的有效性
   * 参数： strValue：要校验的字符串
   * 返回: true,false
   */
  isCardID(strValue) {
    if (this.isEmpty(strValue)) {
      return false;
    }
    strValue = strValue.toUpperCase();
    let vcity = {
      11: "北京",
      12: "天津",
      13: "河北",
      14: "山西",
      15: "内蒙古",
      21: "辽宁",
      22: "吉林",
      23: "黑龙江",
      31: "上海",
      32: "江苏",
      33: "浙江",
      34: "安徽",
      35: "福建",
      36: "江西",
      37: "山东",
      41: "河南",
      42: "湖北",
      43: "湖南",
      44: "广东",
      45: "广西",
      46: "海南",
      50: "重庆",
      51: "四川",
      52: "贵州",
      53: "云南",
      54: "西藏",
      61: "陕西",
      62: "甘肃",
      63: "青海",
      64: "宁夏",
      65: "新疆",
      71: "台湾",
      81: "香港",
      82: "澳门",
      91: "国外"
    };
    //校验长度，类型,身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    let pattern = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
    if (judgeTest(pattern, strValue) === false) {
      return false;
    }
    //检查省份
    let province = strValue.substr(0, 2);
    if (vcity[province] == undefined) {
      return false;
    }
    //校验生日
    let len = strValue.length;
    //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
    if (len == 15) {
      let re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
      let arr_data = strValue.match(re_fifteen);
      let year = Number("19" + arr_data[2]);
      let month = Number(arr_data[3]);
      let day = Number(arr_data[4]);
      let birthday = new Date("19" + year + "/" + month + "/" + day);
      //let birthday = new Date();
      birthday.setFullYear(year);
      birthday.setMonth(month - 1);
      birthday.setDate(day);
      let now = new Date();
      let now_year = now.getFullYear();
      //年月日是否合理
      if (birthday.getFullYear() == year && birthday.getMonth() + 1 == month && birthday.getDate() == day) {
        //判断年份的范围（3岁到100岁之间)
        let time = now_year - year;
        if (!(time >= 3 && time <= 200)) {
          return false;
        }
      } else {
        return false;
      }
    }
    //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
    if (len == 18) {
      let re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
      let arr_data = strValue.match(re_eighteen);
      let year = Number(arr_data[2]);
      let month = Number(arr_data[3]);
      let day = Number(arr_data[4]);
      let birthday = new Date(year + "/" + month + "/" + day);
      //let birthday = new Date();
      birthday.setFullYear(year);
      birthday.setMonth(month - 1);
      birthday.setDate(day);
      let now = new Date();
      let now_year = now.getFullYear();
      //年月日是否合理
      if (birthday.getFullYear() == year && birthday.getMonth() + 1 == month && birthday.getDate() == day) {
        //判断年份的范围（3岁到100岁之间)
        let time = now_year - year;
        if (!(time >= 3 && time <= 200)) {
          return false;
        }
      } else {
        return false;
      }
    }
    //检验位的检测
    //15位转18位
    if (strValue.length == 15) {
      let arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
      let arrCh = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
      let cardTemp = 0,
        i;
      strValue = strValue.substr(0, 6) + "19" + strValue.substr(6, strValue.length - 6);
      for (i = 0; i < 17; i++) {
        cardTemp += strValue.substr(i, 1) * arrInt[i];
      }
      strValue += arrCh[cardTemp % 11];
    }
    if (strValue.length == 18) {
      let arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
      let arrCh = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
      let cardTemp = 0,
        i, valnum;
      for (i = 0; i < 17; i++) {
        cardTemp += Number.parseInt(strValue.substr(i, 1)) * arrInt[i];
      }
      valnum = arrCh[cardTemp % 11];
      if (valnum != strValue.substr(17, 1)) {
        return false;
      }
    }
    return true;
  },
  /**
   * 功能:判断是否为6位数字密码
   * 参数 strValue
   */
  isPwd(strValue) {
    if (this.isEmpty(strValue)) return false;
    let pattern = /^[0-9]{6}$/;
    return judgeTest(pattern, strValue);
  },
  /**
   * 功能:判断是否为6位数字强密码
   * 参数 strValue : 需要检验的密码字符串
   *      filter ： 要过滤数组,数组中的每一项都不能包含当前的密码串，否则认为密码为弱密码，比如可以用身份证，手机等校验
   */
  isStrongPwd(strValue, filters) {
    if (!/^\d{6}$/.judgeTest(strValue)) return false;
    // 不是6位数字
    if (/([\d])\1{2}/.judgeTest(strValue)) return false;
    // 3个一样
    let str = strValue.replace(/\d/g, function ($0, pos) {
      return Number.parseInt($0) - pos;
    });
    if (/^(\d)\1+$/.judgeTest(str)) return false;
    // 顺增
    str = strValue.replace(/\d/g, function ($0, pos) {
      return Number.parseInt($0) + pos;
    });
    if (/^(\d)\1+$/.judgeTest(str)) return false;
    // 顺减
    let temp = "";
    for (let i = 0; i < strValue.length; i++) {
      let c = strValue.charAt(i);
      if (temp.indexOf(c) == -1) {
        temp += c;
      }
    }
    if (temp.length <= 2) return false;
    let flag = true;
    let map = {};
    for (let i = 0; i < strValue.length; i++) {
      let c = strValue.charAt(i);
      if (this.isEmpty(map[c])) {
        map[c] = 0;
      }
      map[c] = map[c] + 1;
      if (map[c] >= strValue.length / 2) {
        flag = false;
      }
    }
    if (flag == false) {
      return false;
    }
    if (filters && filters.length > 0) {
      for (let i = 0; i < filters.length; i++) {
        let filter = filters[i];
        if (filter.indexOf(strValue) > -1) {
          return false;
        }
      }
    }
    return true;
  },
  /**
         * 功能:判断是否为银行卡号(银行卡号Luhm校验)
         *      Luhm校验规则：16位银行卡号（19位通用）:
                1.将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2。
                2.将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。
                3.将加法和加上校验位能被 10 整除。
         * 参数： strValue：需要检验的银行卡字符串
         */
  isBankCode(strValue) {
    strValue = strValue.trim();
    if (!this.isNumeric(strValue)) {
      return false;
    }
    let length = strValue.length;
    if (length < 12) {
      return false;
    } else if (length > 19 || length == 18) {
      return true;
    }
    let flag = true;
    let iRet = 0,
      i = 0,
      mark = 0,
      temp = 0;
    while (i < length - 1) {
      mark += Number.parseInt(strValue.charAt(i));
      i++;
      temp = Number.parseInt(strValue.charAt(i)) * 2;
      i++;
      mark = Math.floor(temp / 10) + temp % 10;
    }
    if (mark % 10 == 0) {
      flag = true;
    } else {
      flag = Number.parseInt(strValue.charAt(length - 1)) == 10 - mark % 10 || Number.parseInt(strValue.charAt(length - 1)) == mark % 10;
    }
    if (!flag) {
      //开头6位
      //				let strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,63,65,68,69,84,87,88,90,91,92,93,94,95,96,97,98,99";
      //				if (strBin.indexOf(strValue.substring(0, 2)) == -1) {
      //					return false;
      //				}
      let lastNum = strValue.substr(strValue.length - 1, 1);
      //取出最后一位（与luhm进行比较）
      let first15Num = strValue.substr(0, strValue.length - 1);
      //前15或18位
      let newArr = [];
      for (let i = first15Num.length - 1; i > -1; i--) {
        //前15或18位倒序存进数组
        newArr.push(first15Num.substr(i, 1));
      }
      let arrJiShu = [];
      //奇数位*2的积 <9
      let arrJiShu2 = [];
      //奇数位*2的积 >9
      let arrOuShu = [];
      //偶数位数组
      for (let j = 0; j < newArr.length; j++) {
        if ((j + 1) % 2 == 1) {
          //奇数位
          if (Number.parseInt(newArr[j]) * 2 < 9) arrJiShu.push(Number.parseInt(newArr[j]) * 2);
          else arrJiShu2.push(Number.parseInt(newArr[j]) * 2);
        } else //偶数位
          arrOuShu.push(newArr[j]);
      }
      let jishu_child1 = [];
      //奇数位*2 >9 的分割之后的数组个位数
      let jishu_child2 = [];
      //奇数位*2 >9 的分割之后的数组十位数
      for (let h = 0; h < arrJiShu2.length; h++) {
        jishu_child1.push(Number.parseInt(arrJiShu2[h]) % 10);
        jishu_child2.push(Number.parseInt(arrJiShu2[h]) / 10);
      }
      let sumJiShu = 0;
      //奇数位*2 < 9 的数组之和
      let sumOuShu = 0;
      //偶数位数组之和
      let sumJiShuChild1 = 0;
      //奇数位*2 >9 的分割之后的数组个位数之和
      let sumJiShuChild2 = 0;
      //奇数位*2 >9 的分割之后的数组十位数之和
      let sumTotal = 0;
      for (let m = 0; m < arrJiShu.length; m++) {
        sumJiShu = sumJiShu + Number.parseInt(arrJiShu[m]);
      }
      for (let n = 0; n < arrOuShu.length; n++) {
        sumOuShu = sumOuShu + Number.parseInt(arrOuShu[n]);
      }
      for (let p = 0; p < jishu_child1.length; p++) {
        sumJiShuChild1 = sumJiShuChild1 + Number.parseInt(jishu_child1[p]);
        sumJiShuChild2 = sumJiShuChild2 + Number.parseInt(jishu_child2[p]);
      }
      //计算总和
      sumTotal = Number.parseInt(sumJiShu) + Number.parseInt(sumOuShu) + Number.parseInt(sumJiShuChild1) + Number.parseInt(sumJiShuChild2);
      //计算Luhm值
      let k = Number.parseInt(sumTotal) % 10 == 0 ? 10 : Number.parseInt(sumTotal) % 10;
      let luhm = Number.parseInt(10 - k);
      lastNum = Number.parseInt(lastNum);
      flag = lastNum == luhm || luhm % lastNum == 0 || lastNum % luhm == 0 || lastNum + luhm == 10;
    }
    return flag;
  },
  /**
   * 判断是否为QQ 到11位
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isQq(a) {
    if (this.isEmpty(a)) return !1;
    let d = /^[1-9]\d{4,11}$/;
    return judgeTest(d, a)
  },
  /**
   * 判断是否是几位小数，比如1.02、1.341、0.3143等格式
   * @param a 校验的值
   * @param b 表示要校验几位，可不传，默认为2位
   * @returns {boolean}
   */
  isFormatNumber(a, b = 2) {
    if (this.isEmpty(a)) return !1;
    let d = new RegExp("^[0-9]+.[0-9]{" + b + "}$");
    return judgeTest(d, a)
  },

  /**
   * 判断是否是微信号
   * @param a 校验的值
   * @returns {boolean}
   */
  isWeChat(a) {
    if (this.isEmpty(a)) return false;
    let d = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
    return judgeTest(d, a)
  },

};

export default Judge