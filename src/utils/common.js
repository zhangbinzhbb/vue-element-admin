// 弹出layui窗口 - 固定宽度和高度，上下居中
export function layerOpenWindow(title, url, width, height, func) {
  // const clientWidth = document.body.clientWidth - 200
  var pageHeight = top.document.documentElement.clientHeight - 50
  var etype = BrowserType() // 判断当前浏览类型
  if (etype === 'IE10') {
    pageHeight = top.document.documentElement.clientHeight - 50
  }
  if (height !== '' && height > pageHeight) { // 如果页面设置高度大小网页可视区域，则用可视区域高度赋值
    height = pageHeight
  }
  // var hh = (top.document.documentElement.clientHeight - height) / 2;
  if (etype === 'IE10') {
    layer.open({
      type: 2,
      title: title,
      shadeClose: false,
      offset: 'auto',
      shade: [0.8, '#393D49'],
      area: [width, height],
      tips: [1, '#c00'],
      scrollbar: false,
      content: url,
      end: func,
      maxmin: true,
      maxHeight: true,
      maxWidth: true
    })
  } else {
    layer.open({
      type: 2,
      title: title,
      shadeClose: false,
      offset: 'auto',
      shade: [0.8, '#393D49'],
      // area: [clientWidth + 'px', height],
      area: [width, height],
      tips: [1, '#c00'],
      scrollbar: false,
      content: url,
      end: func,
      maxmin: true
    })
  }
}

// url 拼接解析
export function appendParams(url, params) {
  var newUrl = url
  if (url.indexOf('?') === -1) {
    newUrl = newUrl + '?'
  } else {
    newUrl = newUrl + '&'
  }
  if ($.isPlainObject(params)) {
    newUrl += $.param(params)
  } else {
    newUrl += params
  }
  return newUrl
}

// 获取url中的参数
// http://localhost/index.html?q1=abc&q2=efg&q3=h 的url，获取 q1 参数值的方法
// this.url_project_id = getUrlKey("keyValues")
export function getUrlKey(name) {
  // eslint-disable-next-line no-sparse-arrays
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1].replace(/\+/g, '%20')) || null
}

// 判断当前浏览类型
function BrowserType() {
  var userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
  var isOpera = userAgent.indexOf('Opera') > -1 // 判断是否Opera浏览器
  var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera // 判断是否IE浏览器
  var isEdge = userAgent.indexOf('Windows NT 6.1; Trident/7.0;') > -1 && !isIE // 判断是否IE的Edge浏览器
  var isFF = userAgent.indexOf('Firefox') > -1 // 判断是否Firefox浏览器
  var isSafari = userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') == -1 // 判断是否Safari浏览器
  var isChrome = userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1 // 判断Chrome浏览器
  if (isIE) {
    var reIE = new RegExp('MSIE (\\d+\\.\\d+);')
    reIE.test(userAgent)
    var fIEVersion = parseFloat(RegExp['$1'])
    if (fIEVersion === 7) {
      return 'IE7'
    } else if (fIEVersion === 8) {
      return 'IE8'
    } else if (fIEVersion === 9) {
      return 'IE9'
    } else if (fIEVersion === 10) {
      return 'IE10'
    } else if (fIEVersion === 11) {
      return 'IE11'
    } else {
      return '0'
    } // IE版本过低
  } // isIE end

  if (isFF) {
    return 'FF'
  }
  if (isOpera) {
    return 'Opera'
  }
  if (isSafari) {
    return 'Safari'
  }
  if (isChrome) {
    return 'Chrome'
  }
  if (isEdge) {
    return 'Edge'
  }
}
