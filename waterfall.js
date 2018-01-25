function waterfall(options) {
  this.init = {
    width: `${options.width
    || document.body.clientWidth
    || document.documentElement.clientWidth}px`,
  }
  const waterfall = document.getElementById('waterfall')
  waterfall.style.width = this.init.width
  const imgList = waterfall.getElementsByTagName('img')
  const singleImgWidth = imgList[0].width // 瀑布流默认每张图片宽度相等
  const perNum = Math.floor(parseInt(this.init.width, 10) / singleImgWidth)
  const perList = [] // 存储第一列的各图片的高度
  for (let i = 0; i < perNum; i++) {
    perList.push(imgList[i].height)
  }

  const minHeight = Math.min.apply(null, perList)
  let pointer = 0
  for (let i in perList) {
    if (perList[i] === minHeight) {
      pointer = i
    }
  }

  for (let i = perNum; i < imgList.length; i++) {
    imgList[i].style.position = 'absolute' // 核心语句
    imgList[i].style.left = `${imgList[pointer].offsetLeft}px`
    imgList[i].style.top = `${imgList[pointer].offsetHeight}px`
  }
}