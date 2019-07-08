/*
根据排布的算法，计算出正确的坐标。
 */
import moment from "moment";

export default function listMapAddPosInfo(
  list = [],
  minInterval,
  startCalcTime,
  contentSpaceType = 1
) {
  const setContentSpace = getCell();
  return list.map(item => {
    function calcContentSpace() {
      const perWordWrap = 1;
      let contentSpace =
        contentSpaceType === "calc"
          ? Math.ceil(
              (perWordWrap * content.length) /
                eventEndTime.diff(eventStartTime, minInterval)
            )
          : contentSpaceType;
      if (contentSpace <= 0) {
        contentSpace = 1;
      }
      if (contentSpace > 2) {
        contentSpace = 2;
      }
      return contentSpace;
    }
    const { attr } = item;
    let { eventStartTime, eventEndTime, content } = attr;
    eventStartTime = moment(eventStartTime);
    eventEndTime = moment(eventEndTime);
    const contentSpace = calcContentSpace(attr);
    let fillByStartEndPos = setContentSpace(contentSpace);

    attr.posInfo = {
      contentSpace,
      startTimePos: eventStartTime.diff(startCalcTime, minInterval),
      endTimePos: eventEndTime.diff(startCalcTime, minInterval)
    };
    attr.posInfo.contentPos = fillByStartEndPos(
      attr.posInfo.startTimePos,
      attr.posInfo.endTimePos
    );
    return item;
  });

  function getCell() {
    const cell = [[]];
    return contentSpace => {
      return (lengthStartPos, lengthEndPos) => {
        let contentPos = 0;
        while (!checkCanFill()) {
          contentPos++;
        }
        fillInto();
        function checkCanFill() {
          let result = true;
          loop((b, a) => {
            if (cell && cell[a] && cell[a][b] && cell[a][b] === true) {
              result = false;
              return "break";
            }
          });
          return result;
        }
        function fillInto() {
          loop((b, a) => {
            if (!cell[a]) {
              cell[a] = [];
            }
            cell[a][b] = true;
          });
        }
        function loop(callBack) {
          for (let length = lengthStartPos; length < lengthEndPos; length++) {
            for (let width = 0; width < contentSpace; width++) {
              if (callBack(length, contentPos + width) === "break") {
                break;
              }
            }
          }
        }
        return contentPos;
      };
    };
  }
}
