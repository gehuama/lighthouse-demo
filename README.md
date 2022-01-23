# lighthouse-demo
开源的自动化化工具，用于改进网络应用的质量（https://www.npmjs.com/package/lighthouse）

lighthouse报告分析了加载页面生命周期中各种性能指标

## 其他性能测试工具 
[webpagetest](https://www.webpagetest.org/)

## Lighthouse使用
### 安装
- npm install -g lighthouse

- 安装 简单服务 用来模拟
- npm install express morgan compression --save-dev

### 京东为例
- 注意浏览器的lighthouse无法指定语言，需要中文报告，因此用命令来进行
```
lighthouse https://m.jd.com/ --locale zh --quiet --chrome-flags="--headless" --only-categories=performance
```
- --locale zh 指定语言为中文
- --quiet 安静模式-没有其他日志
- --chrome-flags="--headless" 无头部信息
- --only-categories=performance 只包含类型=性能信息

### 性能指标
#### FP 首次渲染
- First Paint（首次渲染）表示了浏览器从开始请求网站到屏幕渲染第一个像素点的时间
#### FCP
- First Contentful Paint(首次内容渲染)表示浏览器渲染出第一个内容的时间，这个内容可以是文本、图片或者SVG元素等，不包括iframe和白色背景的canvas元素 

#### 改进FP和FCP
- 加快服务器响应速度
  - 升级服务器配置
  - 合理设置缓存
  - 优化数据库索引

- 加大服务器宽带
- 服务器开启gzip压缩
- 开启服务器缓存（redis）
- 避免重定向操作
- 使用dns-prefetch 进行DNS预解析
- 采用域名分片技术突破同域6个TCP链接限制或者采用HTTP2
- 使用CDN减少网络跳转
- 压缩JS和CSS和图片等资源
   - TerserWebpackPlugin
   - purgecss-webpack-plugin
- 减少http请求，合并js和css，合理内嵌js和css

#### SI
- [Speed index(速度指数)](https://web.dev/speed-index)表明了网页内容的可见填充速度
- 速度指数衡量页面加载期间内容的视觉显示速度
#### 改进SI
- [最小化主线程工作]()
- 脚本
  - [优化第三方的JS脚本]()
  - [对输入进行防抖处理]()
  - [使用 web workers]()
- 样式和布局
  - 缩小样式计算的范围并降低其复杂性
  - [避免复杂的布局和（布局抖动）]()
- 渲染
  - [坚持仅合成器的属性和管理层计数]()
  - [简化绘制的复杂度、减少绘制区域]()
- 解析HTML和CSS
  - [提取关键CSS]()
  - [压缩CSS]()
  - [延迟加载非关键的CSS]()
- 脚本解析和编译
  - [通过代码拆分减少JS的负载]()
  - [删除未使用的JS]()

#### 长任务：超过50ms的为长任务



#### LCP 最大内容绘制
- [Largest Contentful Paint（最大内容绘制）](https://web.dev/lighthouse-largest-contentful-paint/)标记了渲染出最大文本或图片的时间
- 最大内容绘制（LCP）是测量感知加载速度的一个以用户为中心的重要指标

#### 改进LCP
- [使用PRPL模式做到即时加载](https://web.dev/apply-instant-loading-with-prpl/)
  - 推送 (Push)（或预加载）最重要的资源。
  - 尽快渲染 (Render) 初始路线。
  - 预缓存 (Pre-cache) 剩余资产。
  - 延迟加载 (Lazy load) 其他路线和非关键资产。
- 优化关键渲染路径
- 优化css
- 优化图像
- 优化网页姿态
- 优化脚本

#### TTI
- [Time to Interactive(可交互时间)](https://web.dev/interactive/) 指标测量页面从开始加载到主要子资源完成渲染，并能够快速、可靠地响应用户输入所需的时间
- [webpagetest](https://www.webpagetest.org/)
- 虽然TTI可以在实际情况下进行测量，但我们不建议这样做，因为用户交互会影响网页的TTI，从而导致报告出现大量差异。如需了解页面在实际情况中的交换性，应该测量First Input Delay 首次输入延迟（FID）
#### 改进TTI

#### FID
- [First Input Delay 首次输入延迟 (FID)](https://web.dev/fid/)FID 测量从用户第一次与页面交互（例如当他们单击链接、点按按钮或使用由 JavaScript 驱动的自定义控件）直到浏览器对交互作出响应，并实际能够开始处理事件处理程序所经过的时间。
#### 改进FID

#### CLS
- [Cumulative Layout Shift 累积布局偏移 (CLS)](https://web.dev/cls/)CLS 测量整个页面生命周期内发生的所有意外布局偏移中最大一连串的布局偏移分数。
#### 改进CLS
- 始终在图像和视频元素上包含尺寸属性
- 首选转化动画，而不是触发局部拼一个的属性动画
- 除非是对用户交互做出响应，否则切勿在现有内容的上方插入内容
### performance面板
- 面板说明
    概览、性能、详情
- - 概览区域
- - - FPS-页面帧率
- - - CPU-CPU资源消耗
- - - 网络-网络请求流量
- - 性能区域
- - - 网络-网络指标记录展示了页面中的每个网络请求所消耗的时长
- - - 主要-主要指标记录渲染主线程的任务执行过程
- - - 帧-帧指标就是浏览器生成每帧的记录
- - - 时间-时间指标用来记录一些关键时间节点在何时产生的数据信息
- - - 光栅-光栅化线程池负责调用GPU生成位图
- - - GPU-GPU指标记录了GPU进程的任务执行过程
- - - Chrome_ChildIOThread-IO线程主要用来接收用户输入，网络等事件
- - - Compositor-合成指标记录合成线程的任务执行过程
- - - GPUMemoryThread-交互指标用来记录交互操作

- 核心流程
- - 导航阶段

| 事件 |  含义 ｜
| ---- | ---- | 
| beforeunload |  事件触发于window、document和他们的资源即将卸载时｜
|navigationStart|相同的浏览器环境下鞋子前一个文档结束之时|
|事件：pagehide|当浏览器在显示与会话历史记录不同的页面的过程中隐藏当前页面时，pagehide（页面隐藏）事件会被发送到一个window|
| 事件：visibilitychange|当浏览器的某个标签切换到后台，或从后台切换到前台时就触发该消息|
|事件：unload|当文档或者一个子资源正在被卸载时，触发unload｜
|unloadEventEnd|事件处理程序结束之时|
|send request|发送请求
|receive data|接收响应
|commitNavigationEnd| 提交本次导航结束
|domLoading|解析器开始工作时

- - 解析HTMl阶段

|事件|含义|
|----|----|
|receive data| 接收数据
|complete loading| 加载完成
|praseHTML| 解析HTMl
|recalculateStyle| 重新计算样式式
|layout| 布局
|update layer tree| 更新图层树
|paint| 绘制（绘制可不是生成图像，而仅仅是生成一些绘制指令）
|raster| GPU光栅化
|compositor| 复合图层
|display| 显示
|dominteractive| 主文档的解析器结束工作时
|readystatechange| interactive（可交互）
|domContentLoadedEventStart| 所有的需要被运行的脚本已经被解析之时
|DOMContentLoaded| 当初始的HTML文档被完全加载和解析完成之后，DOMContentLoaded事件被触发，而无需等待样式表、图像框架的完全加载
|domContentLoadedEventEnd| 这个时刻为所有需要尽早执行的脚本不管是否按顺序，都已经执行完毕
|domComplete| 主文档的解析器结束工作
|readystatechange| complete（完成）
|loadEventStart| load事件被现在的文档触发之时
|load| 当整个页面及所有依赖资源样式表和图片都已经完成加载时，将触发load事件
|loadEventEnd| load事件处理程序被终止
|pageShow| 当一条会话历史记录被执行的时候将会触发页面显示（pageShow）事件


#### 问题
- prefetch 用于数据预获取
  - 如果你认为首页不需要某个资源，但是以后可能会用到，你就可以设置prefetch，在浏览器空闲的加载这个资源
  - 一般用路由懒加载

- preload 用于资源预加载，例如css
  - preload 表示此资源是显示首屏的关键需要，需要尽快加载，浏览器会提升它的加载优先级和权重
  - preload 优先级不同，而非不同的内容

- 安静窗口
  - 1. 并请求最多两个   
  - 2. 没有长任务
  - 3. 连续持续5秒
- 能不引第三方代码就不要引用，如果必须要引用，先放个假的，例如分享朋友圈、播放器等

- css 如何延迟加载
  - 设置 defer="defer"
- load unload 都不可靠
  - load是因为现在是单页面，load时间只关心JS，但是js加载完毕不代表页面渲染出来
  - unload触发不稳定
  - 如果是单页面应用，就不要通过load来判断性能，或者来判断是否加载完毕
  - 建议使用pagehide或者visibilitychange事件

- js的合并请求
 - http://taobao.js/a.js,b.js,c.js
