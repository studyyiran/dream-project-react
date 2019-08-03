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

function notifyMe(string) {
  // 先检查浏览器是否支持
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // 检查用户是否同意接受通知
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification(string);
  }

  // 否则我们需要向用户获取权限
  else if (Notification.permission !== "denied") {
    Notification.requestPermission(function(permission) {
      // 如果用户同意，就可以向他们发送通知
      if (permission === "granted") {
        var notification = new Notification(string);
      }
    });
  }
  // 最后，如果执行到这里，说明用户已经拒绝对相关通知进行授权
  // 出于尊重，我们不应该再打扰他们了
}

const util = {
  notifyMe
};

export default util;
