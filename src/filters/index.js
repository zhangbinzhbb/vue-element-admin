// import parseTime, formatTime and set to filter
export {
  parseTime,
  formatTime
} from '@/utils'

/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [{
    value: 1E18,
    symbol: 'E'
  },
  {
    value: 1E15,
    symbol: 'P'
  },
  {
    value: 1E12,
    symbol: 'T'
  },
  {
    value: 1E9,
    symbol: 'G'
  },
  {
    value: 1E6,
    symbol: 'M'
  },
  {
    value: 1E3,
    symbol: 'k'
  }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * Upper case first char
 * @param {String} string
 */
// 货币
export function currency(money) {
  const res = +money
  if (res.isNaN()) {
    return Math.floor(res * 100) / 100
  } else {
    return money
  }
}

// 货币格式化，每隔三位加一个逗号  // 价格4500元 提取字符串里的数字
export function money1(value) {
  if (!value) return
  value = value.toString()
  var num = value.replace(/[^0-9]/ig, '')
  // const name = value.slice(num.length, (value.length) - 1)
  return num.replace(/^(-?)(\d+)((\.\d+)?)$/, (s, s1, s2, s3) => {
    const rex = /\d{1,3}(?=(\d{3})+$)/g
    const result = s1 + s2.replace(rex, '$&,') + s3
    return result
  })
}

// 货币格式化，每隔三位加一个逗号
export function money(value) {
  if (!value) return
  value = value.toString()
  return value.replace(/^(-?)(\d+)((\.\d+)?)$/, (s, s1, s2, s3) => {
    const rex = /\d{1,3}(?=(\d{3})+$)/g
    const result = s1 + s2.replace(rex, '$&,') + s3
    return result
  })
}

export function formatMoney(str) {
  if (!str) {
    return str
  }

  if ((typeof str) === 'number') {
    str = str + ''
  }

  str = str.replace('.00', '')
  // console.log('str1:', str)
  // str = str.replace(/[^0-9]/ig, '')
  if (str === 0) {
    return null
  }
  // console.log('str2:', str)
  let vv
  let money = null
  let result = str
  money = str

  if ((money >= 10) && (money < 10000)) {
    vv = Math.pow(10, 4) // 保留2位小数，四舍五入
    result = Math.round((money / 10000) * vv) / vv + '万'
  }
  if ((money >= 10000) && (money < 99999999)) {
    vv = Math.pow(10, 2) // 保留2位小数，四舍五入
    result = Math.round((money / 10000) * vv) / vv + '万'
  }
  if (money >= 100000000) {
    vv = Math.pow(10, 2) // 保留2位小数，四舍五入
    result = Math.round((money / 100000000) * vv) / vv + '亿'
  } else if (money < 10) {
    result = ''
  } else {
    console.log('...')
  }
  return result
}
