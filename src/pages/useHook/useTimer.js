import { useEffect, useRef, useState } from "react";
import Timer from "../../util/timer";

export default function useTimer(status, time) {
  const [timer, setTimer] = useState(0);
  const refTimer = useRef();
  useEffect(() => {
    if (status === "start") {
      const info = {
        minInterval: 1000,
        // 这个时间需要当前时间参与下初始化。
        time: Date.now() + time,
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
  }, [status, time]);
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
