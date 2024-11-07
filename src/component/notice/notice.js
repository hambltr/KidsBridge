import React, {useEffect, useState} from 'react';
import Base from '../basic_component/base';
import {ReactComponent as SvgNotice} from "../../img/icon/svg_notice.svg";
import {ReactComponent as SvgBubble} from "../../img/icon/svg_speach_bubble.svg";
import Mini from "../basic_component/inner_mini";

function Notice() {

  const [noticeItems, setNoticeItems] = useState([]);

  useEffect(() => {

  }, []);

  return (
    <>
      <div className="margin_gap_2"></div>
      <Base showTitle="알림장" showRefreshButton={false} showAllButton={false}>
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
