import React from 'react';

function BaseContentsGrid({selectListType, showRefreshButton, showAllButton, showTitle, backgroundColor, children}) {

  const componentStyle = {
    background: backgroundColor, // 배경색 설정 props
  };

  return (
    <div>
      <div className="top_sticky_title">
        {showTitle}
        {
          selectListType && <div></div>
        }
      </div>
      <div className="components_wrap non_box_shadow" style={componentStyle}>
        <div>
            <div className="components_title">
              <div className="button_wrap">
                {showRefreshButton && <button>새로고침</button>}
                {showAllButton && <button>전체보기</button>}
              </div>
            </div>
          <div className="inner_grid">
            {children}
          </div>
        </div>
      </div>
      <div className="margin_gap"/>
    </div>
  );
}

export default BaseContentsGrid;
