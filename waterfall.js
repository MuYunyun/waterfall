(function () {
  function eventEmitter() {
    this.sub = {}
  }

  eventEmitter.prototype.on = function(eventName, func) {
    if (!this.sub[eventName]) {
      this.sub[eventName] = []
    }
    this.sub[eventName].push(func)
  }

  eventEmitter.prototype.emit = function(eventName) {
    const argsList = Array.prototype.slice.call(arguments, 1)
    for (let i = 0, length = this.sub[eventName].length; i < length; i++) {
      this.sub[eventName][i].apply(this, argsList)
    }
  }

  function Waterfall(options = {}) {
    eventEmitter.call(this)
    this.opts = {
      width: `${options.width
        || document.body.clientWidth
        || document.documentElement.clientWidth}px`,
      container: options.container || 'waterfall',
      resize: options.resize || false,
    }
    this.init()
  }

  Waterfall.prototype = Object.create(eventEmitter.prototype)
  Waterfall.prototype.constructor = Waterfall

  const proto = Waterfall.prototype

  proto.init = function() {
    const $waterfall = document.getElementById(this.opts.container)
    $waterfall.style.width = this.opts.width
    const imgList = $waterfall.getElementsByTagName('img')
    if (this.opts.resize) {
      this.resize(imgList)
    }
    const singleImgWidth = imgList[0].offsetWidth // 瀑布流默认每张图片宽度相等
    const perNum = Math.floor(parseInt(this.opts.width, 10) / singleImgWidth)
    const perList = [] // 存储第一列的各图片的高度
    for (let i = 0; i < perNum; i++) {
      perList.push(imgList[i].offsetHeight)
    }

    let pointer = this.getMinPointer(perList) || 0

    for (let i = perNum; i < imgList.length; i++) {
      imgList[i].style.position = 'absolute' // 核心语句
      imgList[i].style.left = `${imgList[pointer].offsetLeft}px`
      imgList[i].style.top = `${perList[pointer]}px`

      perList[pointer] = perList[pointer] + imgList[i].offsetHeight // 数组最小的值加上相应图片的高度
      pointer = this.getMinPointer(perList)
    }
  }

  // 获取最小高度的数组下标
  proto.getMinPointer = function(perList) {
    const minHeight = Math.min.apply(null, perList)
    for (let i in perList) {
      if (perList[i] === minHeight) {
        pointer = i
        return i
      }
    }
  }

  // 重置 position: absolute 防止 onresize 的时候产生干扰
  proto.resize = function(imgList) {
    for (let i = 0; i < imgList.length; i++) {
      imgList[i].style.position = 'static'
    }
  }

  // window.addEventListener('resize', function () {
  //   Waterfall({ resize: true })
  // }, false)

  // window.addEventListener('scroll', function() {
  //   const $waterfall = document.getElementById('waterfall')
  //   const imgList = $waterfall.getElementsByTagName('img')
  //   const scrollPX = document.body.scrollTop || document.documentElement.scrollTop
  //   const bsHeight = document.body.clientHeight || document.documentElement.clientHeight
  //   if (scrollPX + bsHeight > imgList[imgList.length - 1].offsetTop) {// 浏览器高度 + 滚动距离 < 最后一张图片的 offsetTop
  //     const fragment = document.createDocumentFragment()
  //     for (let i = 0; i < 20; i++) {
  //       const img = document.createElement('img')
  //       img.setAttribute('src', `images/${i + 1}.png`)
  //       img.setAttribute('class', 'waterfall-box')
  //       fragment.appendChild(img)
  //     }
  //     $waterfall.appendChild(fragment)
  //   }
  //   Waterfall()
  // }, false)

  const util = {
    // addLoadEvent: function (func) {
    //   const oldFunc = window.onload
    //   if (typeof window.onload !== 'function') {
    //     window.onload = func
    //   } else {
    //     window.onload = function () {
    //       oldFunc()
    //       func()
    //     }
    //   }
    // },
  }

  // util.addLoadEvent(Waterfall)

  window.Waterfall = Waterfall
}())