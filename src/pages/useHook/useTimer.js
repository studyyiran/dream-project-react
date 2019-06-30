import { useEffect, useRef, useState } from "react";
import Timer from "../../util/timer";

export default function useTimer(status, time) {
  const [timer, setTimer] = useState(0);
  const refTimer = useRef();
  // 这块为什么不能带time万？
  useEffect(() => {
    if (status === "start") {
      const info = {
        minInterval: -1000,
        time,
        runCallBack: times => {
          if (times) {
            setTimer(times);
          } else {
          }
        },
        finishCallBack: () => {
          setTimer([]);
        }
      };
      refTimer.current = new Timer(info);
      refTimer.current.start();
    } else {
      refTimer &&
        refTimer.current &&
        refTimer.current.stop &&
        refTimer.current.stop();
    }
  }, [status]);
  useEffect(() => {
    // 退出页面关闭
    return () => {
      refTimer &&
        refTimer.current &&
        refTimer.current.stop &&
        refTimer.current.stop();
    };
  }, []);
  return timer;
}
