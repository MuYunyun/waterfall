function Waterfall(options = {}) {
  this.options = {
    width: `${options.width
    || document.body.clientWidth
    || document.documentElement.clientWidth}px`,
    container: options.container || 'waterfall',
    resize: options.resize || false,
  }
  const $waterfall = document.getElementById(this.options.container)
  $waterfall.style.width = this.options.width
  const imgList = $waterfall.getElementsByTagName('img')
  if (this.options.resize) {
    resize(imgList)
  }
  const singleImgWidth = imgList[0].offsetWidth // 瀑布流默认每张图片宽度相等
  const perNum = Math.floor(parseInt(this.options.width, 10) / singleImgWidth)
  const perList = [] // 存储第一列的各图片的高度
  for (let i = 0; i < perNum; i++) {
    perList.push(imgList[i].offsetHeight)
  }

  let pointer = getMinPointer(perList) || 0

  for (let i = perNum; i < imgList.length; i++) {
    imgList[i].style.position = 'absolute' // 核心语句
    imgList[i].style.left = `${imgList[pointer].offsetLeft}px`
    imgList[i].style.top = `${perList[pointer]}px`

    perList[pointer] = perList[pointer] + imgList[i].offsetHeight // 数组最小的值加上相应图片的高度
    pointer = getMinPointer(perList)
  }
}

// 获取最小高度的数组下标
function getMinPointer(perList) {
  const minHeight = Math.min.apply(null, perList)
  for (let i in perList) {
    if (perList[i] === minHeight) {
      pointer = i
      return i
    }
  }
}

// 重置 position: absolute 防止 onresize 的时候产生干扰
function resize(imgList) {
  for (let i = 0; i < imgList.length; i++) {
    imgList[i].style.position = 'static'
  }
}

window.onresize = function() {
  Waterfall({resize: true})
}

window.onscroll = function() {
  const $waterfall = document.getElementById('waterfall')
  const imgList = $waterfall.getElementsByTagName('img')
  const scrollPX = document.body.scrollTop || document.documentElement.scrollTop
  const bsHeight = document.body.clientHeight || document.documentElement.clientHeight
  if (scrollPX + bsHeight > imgList[imgList.length - 1].offsetTop) {// 浏览器高度 + 滚动距离 < 最后一张图片的 offsetTop
    const fragment = document.createDocumentFragment()
    for(let i = 0; i < 20; i++) {
      const img = document.createElement('img')
      img.setAttribute('src', `images/${i+1}.png`)
      img.setAttribute('class', 'waterfall-box')
      fragment.appendChild(img)
    }
    $waterfall.appendChild(fragment)
  }
  Waterfall()
}

addLoadEvent(Waterfall)