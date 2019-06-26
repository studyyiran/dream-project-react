import React, { useEffect, useState } from "react";
import Connect from "./connect";
import ReviewList from "./components/reviewList";
import Layout from "../components/layout";

// 第一个疑惑，其实connect里面的内容，并不知道是否有副作用。（pure？纯函数？无状态？傻傻分不清）
// 他的作用从文档上来看，是为了剥离redux影响。我觉得是这个意思。只要需要剥离redux的，都可以connect一下。
// 感觉上，connect以前可能是redux本身的内容，后来才分到react-redux，不知道是不是真的。
function Page(props) {
  const { setReviewList, getReviewList, reviewList } = props;
  useEffect(() => {
    // 这个和直接调用不一样。props传过来的，包装了dispatch
    getReviewList();
  }, [getReviewList, setReviewList]);
  return (
    <Layout>
      <ReviewList {...props} />
    </Layout>
  );
}

// 为什么connect传入的页不是jsx 而是 Component
// 为什么这个connect这么矫情 他返回的是什么？在function内部return就不行了？
export default Connect(Page);
// export default function() {
//   return Connect(Page);
// }
