import React, {useEffect, useState} from 'react';
import Base from '../basic_component/base';
import {ReactComponent as SvgNotice} from "../../img/icon/svg_notice.svg";
import {ReactComponent as SvgBubble} from "../../img/icon/svg_speach_bubble.svg";
import Mini from "../basic_component/inner_mini";

function Notice() {
  // noticeItems 상태를 관리합니다. 초기값은 빈 배열입니다.
  const [noticeItems, setNoticeItems] = useState([]);

  // useEffect를 사용하여 컴포넌트가 마운트될 때 초기 데이터를 설정합니다.
  // 예제에서는 데모를 위해 비워두었지만, 여기에 API 호출 등을 넣어 데이터를 설정할 수 있습니다.
  useEffect(() => {
    // setNoticeItems(...)를 사용하여 실제 데이터로 상태를 업데이트합니다.
  }, []);

  return (
    <>
      <div className="margin_gap_2"></div>
      <Base showTitle="알림장" showRefreshButton={false} showAllButton={true}>
        {noticeItems.length > 0 ? (
          noticeItems.map((item) => (
            <Mini key={item.id} item={item} SvgName1={SvgNotice} SvgName2={SvgBubble}/>
          ))
        ) : (
          // noticeItems 배열이 비어 있을 경우 표시될 내용
          <div className="un_auth_wrap">
            <h2>작성된 알림장이 없습니다.</h2>
          </div>
        )}
      </Base>
    </>
  );
}

export default Notice;
