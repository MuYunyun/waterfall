# waterfalljs

![](http://files.cnblogs.com/files/MuYunyun/waterfall.gif)

[效果展示](http://muyunyun.cn/waterfall)

### feature

- [x] 支持同步/异步获取图片数据(基于发布/订阅模式)

- [x] 按需加载(每次渲染指定的条数)

- [x] 兼容各尺寸的屏幕

- [x] 无依赖(打包 JS 文件 3 kb)

- [x] 较好的扩展性

- [ ] 图片懒加载

- [ ] 兼容性扩展

- [ ] UI 优化

### usage

```bash
npm install jswaterfall --save
```

```js
window.onload = function() {
  const waterfall = new Waterfall({
    number: 20,                 // 一次性加载的图片个数；必填
    // width: 1250,             // 容器 width；选填：设置 width 的话，使 window.resize 事件失效
    // container: 'waterfall',  // 容器 id；选填：默认为 'waterfall'
  })

  waterfall.on("load", function () {
    // 模拟 ajax 异步添加图片
    setTimeout(function () {
      const $waterfall = document.getElementById('waterfall')
      const imgList = $waterfall.getElementsByTagName('img')
      const fragment = document.createDocumentFragment()
      for (let i = 0; i < 20; i++) {
        const img = document.createElement('img')
        img.setAttribute('src', `images/${i + 1}.png`)
        img.setAttribute('class', 'waterfall-box')
        fragment.appendChild(img)
      }
      $waterfall.appendChild(fragment)
      waterfall.done() // 这句不管同步/异步都要加上，表示正在 loading
    }, 1000)
  })
}
```
