目前直接拿到老的。
原则上，和antd达到一样的实现效果是我么你的目标

总共有三个地方
payment
www-frontend
www-tutor

缺陷

差异
antd visible属性只对component组件有效
antd的modal 有两种模式。其实他们严格执行了收控和非受控。也就是把关闭的权限给自己了。并且没有调用onCancel

变更
children -> content