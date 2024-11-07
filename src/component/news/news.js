import React from 'react';
import Base from '../basic_component/base';
import Mini from '../basic_component/inner_mini';
import { ReactComponent as SvgNotice } from "../../img/icon/svg_notice.svg";
import { ReactComponent as SvgBubble } from "../../img/icon/svg_speach_bubble.svg";

function News({ newsItems, height }) {
  const componentStyle = {
    height: height,
  };

  // newsItems 배열의 존재 여부와 비어 있는지 확인
  const hasNews = newsItems && newsItems.length > 0;

  return (
    <Base showTitle="내 소식" showRefreshButton={true} showAllButton={true} innerStyle={componentStyle}>
      {hasNews ? (
        newsItems.map((item) => (
          <Mini key={item.id} item={item} SvgName1={SvgNotice} SvgName2={SvgBubble}/>
        ))
      ) : (
        <div className="un_auth_wrap">
          <h2>작성된 글이 없습니다.</h2>
        </div>
      )}
    </Base>
  );
}

export default News;
