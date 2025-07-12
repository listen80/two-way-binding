# two-way-binding

## 项目简介
此项目 `two-way-binding` 主要用于实现双向绑定功能，借鉴 Vue 的核心思想，写一个简单便捷的数据绑定方案的例子。

## 项目展示
[体验双向绑定](src/)

## 快速开始项目

### 环境准备
- 本例子使用es module,不需要babel转换，请确保浏览器支持es module

### 安装依赖
- 本项目使用yarn,也可以使用npm
- 本项目没有使用构建工具
- 本项目没有使用任何框架
- 开发依赖任意http-server即可

### 项目启动
在本项目中，你可以通过以下步骤来体验 DIY 的 Vue 双向绑定功能：
1. 克隆项目到本地：
   ```bash
   git clone https://github.com/your-repo/two-way-binding.git
   ```
2. 进入项目目录：
   ```bash
   cd two-way-binding
   ```
3. 安装项目依赖：
   ```bash
   yarn install
   ```
4. 启动开发服务器：
   ```bash
   yarn start
   ```
按照以上步骤操作后，你就可以在浏览器中体验 `two-way-binding` 的双向绑定功能了。通过修改代码，你还能进一步深入理解 Vue 双向绑定的核心原理。

## 代码结构原理
### src 目录下文件作用解析

### 双向绑定原理
本项目借助 Vue 的双向绑定思想，通常会涉及数据劫持（如使用 `Object.defineProperty` 或 `Proxy`）来监听数据变化，同时监听 DOM 事件（如 `input`、`change` 等）来更新数据，实现数据与视图的同步更新。通过克隆项目并修改代码，开发者能直观感受这一过程。
