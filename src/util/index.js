// 这种根据是否能在页面中获取，来做插入，感觉不太好。但是我实在没有别的手段，来跟踪，标记一个dom。目前只能这样。
/*
root 和父节点需要绑定关系
dom 需要绑定的子节点
id 用来保存节点信息的id

 */
/*
这个函数，主要用于保存状态。
但是她非常可笑。
他只能保存最里面的状态。因为子状态会被父状态重置。。也就是说，无论子状态怎么折腾，父状态都屏蔽了他。
我觉得react真是不错。这根本玩不起来。这个思路不太对就。
 */

function cacheDomWithId(dom, id) {
  let slot = document.querySelector(`#${id}`);
  if (!slot) {
    slot = document.createElement("div");
    slot.id = id;
    slot.appendChild(dom);
  }
  return slot;
}
