# Starter
- 风格统一化
- 响应式
- 栅格模型，如实现 cards

## 容器
- 流体容器
  - `width: auto`
- 固定容器
  - 阈值 `@media (min-width: @screen-lg-min).container { css.. }` 大于`@screen-lg-min`(1200px)时触发指定的css配置
- 栅格系统
  - 类似 `.row` 和 `.col-xs-4` 这种预定义的类，可以用来快速创建栅格布局。