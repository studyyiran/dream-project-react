import React, { useMemo, useEffect, useState } from "react";
import util from "../../util";
import Timer from "../../util/timer";
import RenderTimer from "../../pages/components/renderTimer";

export function AppLayout(props) {
  const [timer, setTimer] = useState();
  const timer2 = useMemo(() => {
    const minInterval = 1000;
    let count = 0;
    const limit = 60 * 30;
    const info = {
      minInterval: 1000,
      time: 0,
      runCallBack: times => {
        count++;
        if (count > limit) {
          count = 0;
          util.notifyMe("你已经学了很久了。check me now！");
        }
        setTimer(times);
      },
      finishCallBack: () => {
        console.log("finishCallBack");
      }
    };
    const timer = new Timer(info);
    return timer;
  }, []);

  useEffect(() => {
    return () => {
      console.log("willUnMount");
      timer2 && timer2.stop();
    };
  }, [timer2]);
  return (
    <div>
      <RenderTimer timer={timer} />
      {props.children}
    </div>
  );
  // 为什么不执行？
  // const timer = useCallback(() => {
  //   timerRun();
  // }, []);
}
