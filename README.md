# two-way-binding

## 项目简介
主要实现双向绑定功能，借鉴 Vue 的核心思想，写一个简单便捷的数据绑定方案的例子。

## 项目演示
[体验一下](https://listen80.github.io/two-way-binding/public/)

## 开始项目
### 环境准备
- 本例子使用es module,不需要babel转换，请确保浏览器支持es module
- 本例子使用原生css，不使用任何css框架
- 本例子使用template标签，template标签的内容会插入到页面中。

### 依赖
- 本项目使用yarn,也可以使用npm
- 本项目使用rollup构建
- 本项目没有任何运行时依赖
- 本项目没有使用任何框架

## 代码结构原理
### 文件作用解析
- component
  - props
  - componentProps
    - script
      - data
        - observe
      - methods
      - components
    - template
      - compile
        - Element nodes
          - Directive parsing
          - Attribute parsing
          - Event parsing
        - Text nodes
          - Expression parsing
    - style
      - mount
  - el
    - replace


### 双向绑定原理
- 数据劫持（如使用 `Object.defineProperty`）来监听数据变化
- 同时监听 DOM 事件（如 `input`、`change` 等）来更新数据
- 自定义指令model快速实现上文逻辑，建立数据与视图的联系
